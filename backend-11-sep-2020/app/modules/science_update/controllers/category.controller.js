const express = require("express");
const mongoose = require("mongoose");
const routeLabel = require("route-label");
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require("querystring");
const categoryRepo = require("science_update/repositories/category.repository");
const scienceRepo = require("science_update/repositories/science.repository");
const errorHandler = require("../../../errorHandler");
const fs = require("fs");
const gm = require("gm").subClass({
  imageMagick: true,
});

const slug = require("slug");

class CategoryController {
  constructor() { }

  async list(req, res) {
    try {
      res.render("science_update/views/cat_list.ejs", {
        page_name: "science-category-management",
        page_title: "Categories",
        user: req.user,
        permission: req.permission,
      });
    } catch (e) {
      return res.status(500).send({
        message: e.message
      });
    }
  }

  async create(req, res) {
    try {
      res.render("science_update/views/cat_add.ejs", {
        page_name: "science-category-management",
        page_title: "Create New Category",
        user: req.user,
        permission: req.permission,
      });
    } catch (e) {
      return res.status(500).send({
        message: e.message
      });
    }
  }

  async insert(req, res) {
    try {
      let checkData = await categoryRepo.getByField({
        name: req.body.name,
        isDeleted: false,
      });
      if (_.isEmpty(checkData)) {

        if (req.files.length > 0) {
          for (let i = 0; i < req.files.length; i++) {
            req.body.image = req.files[i].filename;
          }
        }
        req.body.slug = slug(req.body.name, { lower: true, replacement: "-" });
        let newCategory = await categoryRepo.save(req.body);
        if(newCategory){
          var insertedId = newCategory._id.toString();
          var last5Digit = insertedId.substring( insertedId.length - 5, insertedId.length);
          var updatedSlug = `${req.body.slug}-${last5Digit}`;

          let newprobeFinderSlugUpdate = await categoryRepo.updateById(insertedId,{ slug: updatedSlug });
          if(newprobeFinderSlugUpdate){
            req.flash("success", "Category created succesfully.");
            res.redirect(namedRouter.urlFor("admin.science_category.list"));
          }
        }
      } else {
        req.flash("error", "Category exist with same title");
        res.redirect(namedRouter.urlFor("admin.science_category.create"));
      }
    } catch (e) {
      const error = errorHandler(e);
      req.flash("error", error.message);
      res.redirect(namedRouter.urlFor("admin.science_category.create"));
    }
  }

  async update(req, res) {
    try {
      let checkData = await categoryRepo.getByField({ name: req.body.name, isDeleted: false, _id: { $ne: req.body.id }, });
      if (_.isEmpty(checkData)) {

        let categoryValue = await categoryRepo.getById(req.body.id);

        if (req.files.length > 0) {

          if (fs.existsSync('./public/uploads/category/' + categoryValue.image) && categoryValue.image) {
            fs.unlinkSync('./public/uploads/category/' + categoryValue.image);
          }

          for (let i = 0; i < req.files.length; i++) {
            req.body.image = req.files[i].filename;
          }
        }

        //if(checkData.slug == '' || checkData.slug == undefined || checkData.slug ==  null){
          req.body.slug = slug(req.body.name, { lower: true, replacement: "-" });
        //}

        let categoryUpdate = await categoryRepo.updateById(categoryValue._id, req.body);
        if (categoryUpdate) {
          var insertedId = categoryUpdate._id.toString();
          var last5Digit = insertedId.substring( insertedId.length - 5, insertedId.length);
          var updatedSlug = `${req.body.slug}-${last5Digit}`;
          let newprobeFinderSlugUpdate = await categoryRepo.updateById(insertedId,{ slug: updatedSlug });
          if(newprobeFinderSlugUpdate){
            req.flash("success", "Category Updated Successfully");
            res.redirect(namedRouter.urlFor("admin.science_category.list"));
          }
        } else {
          res.redirect( namedRouter.urlFor("admin.science_category.edit", { id: req.body.id }) );
        }
      } else {
        req.flash("error", "Category already exist with same title");
        res.redirect( namedRouter.urlFor("admin.science_category.edit", { id: req.body.id }) );
      }
    } catch (e) {
      req.flash("error", e.message);
      res.redirect(namedRouter.urlFor("admin.science_category.edit", {
        id: req.body.id
      }));
    }
  }

  async getAll(req, res) {
    try {
      let categorys = await categoryRepo.getAll(req);

      if (_.has(req.body, "sort")) {
        var sortOrder = req.body.sort.sort;
        var sortField = req.body.sort.field;
      } else {
        var sortOrder = -1;
        var sortField = "_id";
      }
      let meta = {
        page: req.body.pagination.page,
        pages: categorys.pageCount,
        perpage: req.body.pagination.perpage,
        total: categorys.totalCount,
        sort: sortOrder,
        field: sortField,
      };

      return {
        status: 200,
        meta: meta,
        data: categorys.data,
        message: `Data fetched succesfully.`,
      };
    } catch (e) {
      throw e;
    }
  }

  async edit(req, res) {
    try {
      let categorys = await categoryRepo.getById(req.params.id);
      if (!_.isEmpty(categorys)) {
        res.render("science_update/views/cat_edit.ejs", {
          page_name: "science-category-management",
          page_title: "Category Edit",
          user: req.user,
          permission: req.permission,
          response: categorys,
        });
      } else {
        req.flash("error", "Sorry, record not found!");
        res.redirect(namedRouter.urlFor("admin.science_category.list"));
      }
    } catch (e) {
      return res.status(500).send({
        message: e.message
      });
    }
  }

  async delete(req, res) {
    try {

      let categoryData = await scienceRepo.getByField({
        status: "Active",
        isDeleted: false,
        category_id: mongoose.Types.ObjectId(req.params.id),
      });

      if (!_.isEmpty(categoryData)) {
        req.flash("error", "This category already in use");
        res.redirect(namedRouter.urlFor("admin.science_category.list"));
        return false;
      } else {
        let categoryDelete = await categoryRepo.updateById(req.params.id, {
          isDeleted: true,
        });
        req.flash("success", "Category removed successfully");
        res.redirect(namedRouter.urlFor("admin.science_category.list"));
      }
    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  async statusChange(req, res) {
    try {

      let categoryData = await scienceRepo.getByField({
        status: "Active",
        isDeleted: false,
        category_id: mongoose.Types.ObjectId(req.params.id),
      });

      if (!_.isEmpty(categoryData)) {
        req.flash("error", "This category already in use");
        res.redirect(namedRouter.urlFor("admin.science_category.list"));
        return false;
      } else {

        let category = await categoryRepo.getById(req.params.id);
        if (!_.isEmpty(category)) {
          let categoryStatus =
            category.status == "Active" ? "Inactive" : "Active";
          let categoryUpdate = categoryRepo.updateById(req.params.id, {
            status: categoryStatus,
          });

          req.flash("success", "Category status has changed successfully");
          res.redirect(namedRouter.urlFor("admin.science_category.list"));
        }
      }
    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }


}

module.exports = new CategoryController();