const express = require("express");
const mongoose = require("mongoose");
const routeLabel = require("route-label");
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require("querystring");
const categoryRepo = require("category/repositories/category.repository");
const productRepo = require("product_category/repositories/category.repository");;
const errorHandler = require("../../../errorHandler");
const fs = require("fs");
const gm = require("gm").subClass({
  imageMagick: true,
});
const slug = require("slug");

class categoryController {
  constructor() { }

  async list(req, res) {
    try {
      res.render("category/views/list.ejs", {
        page_name: "category-management",
        page_title: "Category List",
        user: req.user,
        permission: req.permission,
      });
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  }

  async create(req, res) {
    try {

      res.render("category/views/add.ejs", {
        page_name: "category-management",
        page_title: "Category List",
        user: req.user,
        permission: req.permission,
      });
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  }

  async store(req, res) {
    try {

      let checkData = await categoryRepo.getByField({
        name: req.body.name,
        isDeleted: false,
      });
      if (_.isEmpty(checkData)) {
        if (req.files.length > 0) {
          gm("public/uploads/category/" + req.files[0].filename)
            .resize(100)
            .write(
              "public/uploads/category/thumb/" + req.files[0].filename,
              function (err) {
                if (err) req.flash("error", err.message);
              }
            );
          req.body.image = req.files[0].filename;
        }
        req.body.slug = slug(req.body.name, { lower: true, replacement: "-" });
        let newcategory = await categoryRepo.save(req.body);
        if (newcategory) {
          var insertedId = newcategory._id.toString();
          var last5Digit = insertedId.substring(insertedId.length - 5, insertedId.length);
          var updatedSlug = `${req.body.slug}-${last5Digit}`;

          let newprobeFinderSlugUpdate = await categoryRepo.updateById(insertedId, { slug: updatedSlug });
          if (newprobeFinderSlugUpdate) {
            req.flash("success", "Category created succesfully.");
            res.redirect(namedRouter.urlFor("admin.category.list"));
          }

        }

      } else {
        req.flash("error", "Category exist with same name");
        res.redirect(namedRouter.urlFor("admin.category.create"));
      }
    } catch (e) {

      req.flash("error", e.message);
      res.redirect(namedRouter.urlFor("admin.category.create"));
    }
  }

  async update(req, res) {
    try {
      const categoryId = req.body.id;
      let checkData = await categoryRepo.getByField({
        name: req.body.name,
        isDeleted: false,
        _id: { $ne: categoryId },
      });
      let data = await categoryRepo.getByField({ isDeleted: false, _id: categoryId });
      if (_.isEmpty(checkData)) {
        if (req.files.length > 0) {
          if (data.image != "") {
            fs.unlink(
              "./public/uploads/category/" + data.image,
              function (err) {
                if (err) req.flash("error", err.message);
              }
            );
            fs.unlink(
              "./public/uploads/category/thumb/" + data.image,
              function (err) {
                if (err) req.flash("error", err.message);
              }
            );
          }
          gm("public/uploads/category/" + req.files[0].filename)
            .resize(100)
            .write(
              "public/uploads/category/thumb/" + req.files[0].filename,
              function (err) {
                if (err) req.flash("error", err.message);
              }
            );
          req.body.image = req.files[0].filename;
        }
        if (data.slug == '' || data.slug == undefined) {
          req.body.slug = slug(req.body.name, { lower: true, replacement: "-" });
        }
        let categoryUpdate = await categoryRepo.updateById(categoryId, req.body);

        if (categoryUpdate) {

          var insertedId = categoryUpdate._id.toString();
          var last5Digit = insertedId.substring(insertedId.length - 5, insertedId.length);
          var updatedSlug = `${req.body.slug}-${last5Digit}`;

          let newprobeFinderSlugUpdate = await categoryRepo.updateById(insertedId, { slug: updatedSlug });
          if (newprobeFinderSlugUpdate) {
            req.flash("success", "Category Updated Successfully");
            res.redirect(namedRouter.urlFor("admin.category.list"));
          }

        } else {
          res.redirect(
            namedRouter.urlFor("admin.category.edit", { id: categoryId })
          );
        }
      } else {
        req.flash("error", "Category already exist with same name");
        res.redirect(
          namedRouter.urlFor("admin.category.edit", { id: categoryId })
        );
      }
    } catch (e) {

      req.flash("error", e.message);
      res.redirect(
        namedRouter.urlFor("admin.category.edit", { id: req.body.id })
      );
    }
  }

  async getAll(req, res) {
    try {
      let category = await categoryRepo.getAll(req);


      if (_.has(req.body, "sort")) {
        var sortOrder = req.body.sort.sort;
        var sortField = req.body.sort.field;
      } else {
        var sortOrder = -1;
        var sortField = "_id";
      }
      let meta = {
        page: req.body.pagination.page,
        pages: category.pageCount,
        perpage: req.body.pagination.perpage,
        total: category.totalCount,
        sort: sortOrder,
        field: sortField,
      };

      return {
        status: 200,
        meta: meta,
        data: category.data,
        message: `Data fetched succesfully.`,
      };
    } catch (e) {

      throw e;
    }
  }

  async edit(req, res) {
    try {
      let category = await categoryRepo.getById(req.params.id);

      if (!_.isEmpty(category)) {
        res.render("category/views/edit.ejs", {
          page_name: "category-management",
          page_title: "Category Edit",
          user: req.user,
          response: category,
          permission: req.permission,
        });
      } else {
        req.flash("error", "Sorry, record not found!");
        res.redirect(namedRouter.urlFor("admin.category.list"));
      }
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  }

  async delete(req, res) {
    try {
      let categoryData = await productRepo.getByField({
        status: "Active",
        isDeleted: false,
        category_id: mongoose.Types.ObjectId(req.params.id),
      });

      if (!_.isEmpty(categoryData)) {
        req.flash("error", "This category already used in");
        res.redirect(namedRouter.urlFor("admin.category.list"));
      } else {
        let categoryDelete = await categoryRepo.updateById(req.params.id, {
          isDeleted: true,
        });
        req.flash("success", "Category removed successfully");
        res.redirect(namedRouter.urlFor("admin.category.list"));
      }
    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  async statusChange(req, res) {
    try {

      let category = await categoryRepo.getById(req.params.id);
      if (!_.isEmpty(category)) {
        let categoryStatus =
          category.status == "Active" ? "Inactive" : "Active";
        let categoryUpdate = categoryRepo.updateById(req.params.id, {
          status: categoryStatus,
        });

        req.flash("success", "category status has changed successfully");
        res.redirect(namedRouter.urlFor("admin.category.list"));
      }

    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }


}

module.exports = new categoryController();
