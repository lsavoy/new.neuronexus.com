const express = require("express");
const mongoose = require("mongoose");
const routeLabel = require("route-label");
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require("querystring");
const categoryRepo = require("knowledge_center/repositories/category.repository");
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
      res.render("knowledge_center/views/know_list.ejs", {
        page_name: "knowledge-category-management",
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
      res.render("knowledge_center/views/know_add.ejs", {
        page_name: "knowledge-category-management",
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
        parent_id: null,
        isDeleted: false,
      });
      if (_.isEmpty(checkData)) {
        req.body.parent_id = null;

        if (req.files.length > 0) {
          for (let i = 0; i < req.files.length; i++) {
            req.body.image = req.files[i].filename;
          }
        }

        let newCategory = await categoryRepo.save(req.body);
        if(newCategory){
          let slugValue = slug(newCategory.name, { lower: true, replacement: "-" });
          var insertedId = newCategory._id.toString();
          var last5Digit = insertedId.substring( insertedId.length - 5, insertedId.length);
          var updatedSlug = `${slugValue}-${last5Digit}`;

          let newprobeFinderSlugUpdate = await supportRepo.updateById(insertedId,{ slug: updatedSlug });
          if(newprobeFinderSlugUpdate){
            req.flash("success", "Category created succesfully.");
            res.redirect(namedRouter.urlFor("admin.knowledge_category.list"));
          } 
        }
        
      } else {
        req.flash("error", "Category exist with same title");
        res.redirect(namedRouter.urlFor("admin.knowledge_category.create"));
      }
    } catch (e) {
      const error = errorHandler(e);
      req.flash("error", error.message);
      res.redirect(namedRouter.urlFor("admin.knowledge_category.create"));
    }
  }

  async update(req, res) {
    try {
      //const categoryId = req.body.id;
      let checkData = await categoryRepo.getByField({
        name: req.body.name,
        parent_id: null,
        isDeleted: false,
        _id: {
          $ne: req.body.id
        },
      });
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



        let categoryUpdate = await categoryRepo.updateById(req.body.id, req.body);
        if (categoryUpdate) {
          let slugValue = slug(categoryUpdate.name, { lower: true, replacement: "-" });
          var insertedId = categoryUpdate._id.toString();
          var last5Digit = insertedId.substring( insertedId.length - 5, insertedId.length);
          var updatedSlug = `${slugValue}-${last5Digit}`;

          let newprobeFinderSlugUpdate = await categoryRepo.updateById(insertedId,{ slug: updatedSlug });
          if(newprobeFinderSlugUpdate){
            req.flash("success", "Category Updated Successfully");
            res.redirect(namedRouter.urlFor("admin.knowledge_category.list"));
          }
        } else {
          res.redirect(
            namedRouter.urlFor("admin.knowledge_category.edit", {
              id: req.body.id
            })
          );
        }
      } else {
        req.flash("error", "Category already exist with same title");
        res.redirect(
          namedRouter.urlFor("admin.knowledge_category.edit", {
            id: req.body.id
          })
        );
      }
    } catch (e) {
      req.flash("error", e.message);
      res.redirect(namedRouter.urlFor("admin.knowledge_category.edit", {
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
        res.render("knowledge_center/views/know_edit.ejs", {
          page_name: "knowledge-category-management",
          page_title: "Category Edit",
          user: req.user,
          permission: req.permission,
          response: categorys,
        });
      } else {
        req.flash("error", "Sorry, record not found!");
        res.redirect(namedRouter.urlFor("admin.knowledge_category.list"));
      }
    } catch (e) {
      return res.status(500).send({
        message: e.message
      });
    }
  }

  async delete(req, res) {
    try {
      let categoryData = await categoryRepo.getByField({
        status: "Active",
        isDeleted: false,
        parent_id: mongoose.Types.ObjectId(req.params.id),
      });

      if (!_.isEmpty(categoryData)) {
        req.flash("error", "This category already in use");
        res.redirect(namedRouter.urlFor("admin.knowledge_category.list"));
        return false;
      } else {
        let categoryDelete = await categoryRepo.updateById(req.params.id, {
          isDeleted: true,
        });
        req.flash("success", "Category removed successfully");
        res.redirect(namedRouter.urlFor("admin.knowledge_category.list"));
      }
    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  async statusChange(req, res) {
    try {
      let categoryData = await categoryRepo.getByField({
        status: "Active",
        isDeleted: false,
        parent_id: mongoose.Types.ObjectId(req.params.id),
      });

      if (!_.isEmpty(categoryData)) {
        req.flash("error", "This category already in use");
        res.redirect(namedRouter.urlFor("admin.knowledge_category.list"));
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
          res.redirect(namedRouter.urlFor("admin.knowledge_category.list"));
        }
      }
    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  // For Sub Category

  async listsubcategory(req, res) {
    try {
      let result = {};
      let id = req.params.id;
      var parents = await categoryRepo.getAllByFieldWithSort({
        isDeleted: false,
        parent_id: null
      }, {
        title: 1
      });

      result.categoryId = id;
      res.render("knowledge_center/views/know_listSubCategory.ejs", {
        page_name: "sub-knowledge-category-management",
        page_title: "Sub Categories",
        user: req.user,
        permission: req.permission,
        parents: parents,
        response: result,
      });
    } catch (e) {
      return res.status(500).send({
        message: e.message
      });
    }
  }

  async getAllsubcategory(req, res) {
    try {
      let subcategorys = await categoryRepo.getAllsubcategory(req);
      if (_.has(req.body, "sort")) {
        var sortOrder = req.body.sort.sort;
        var sortField = req.body.sort.field;
      } else {
        var sortOrder = -1;
        var sortField = "_id";
      }
      let meta = {
        page: req.body.pagination.page,
        pages: subcategorys.pageCount,
        perpage: req.body.pagination.perpage,
        total: subcategorys.totalCount,
        sort: sortOrder,
        field: sortField,
      };

      return {
        status: 200,
        meta: meta,
        data: subcategorys.data,
        message: `Data fetched succesfully.`,
      };
    } catch (e) {
      throw e;
    }
  }

  async createsubcategory(req, res) {
    try {
      var parents = await categoryRepo.getAllByField({ isDeleted: false, parent_id: null, status: 'Active' });
      res.render("knowledge_center/views/know_addSubCategory.ejs", {
        page_name: "sub-knowledge-category-management",
        page_title: "Create New Sub Category",
        user: req.user,
        permission: req.permission,
        parentcat: parents,
      });
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  }

  async insertsubcategory(req, res) {
    try {
      let checkData = await categoryRepo.getByField({
        name: req.body.name,
        parent_id: {
          $ne: null
        },
        isDeleted: false,
      });
      if (_.isEmpty(checkData)) {
        if (req.files.length > 0) {
          for (let i = 0; i < req.files.length; i++) {
            req.body.image = req.files[i].filename;
          }
        }
        let newsubCategory = await categoryRepo.save(req.body);
        if(newsubCategory){
          let slugValue = slug(newsubCategory.name, { lower: true, replacement: "-" });
          var insertedId = newsubCategory._id.toString();
          var last5Digit = insertedId.substring( insertedId.length - 5, insertedId.length);
          var updatedSlug = `${slugValue}-${last5Digit}`;

          let newprobeFinderSlugUpdate = await categoryRepo.updateById(insertedId,{ slug: updatedSlug });
          if(newprobeFinderSlugUpdate){
            req.flash("success", "Sub Category created succesfully.");
            res.redirect(namedRouter.urlFor("admin.knowledge_subcategory.list"));
          }
        }
        
      } else {
        req.flash("error", "Sub Category exist with same name");
        res.redirect(namedRouter.urlFor("admin.knowledge_subcategory.create"));
      }
    } catch (e) {
      req.flash("error", e.message);
      res.redirect(namedRouter.urlFor("admin.knowledge_subcategory.create"));
    }
  }

  async editsubcategory(req, res) {
    try {
      var parents = await categoryRepo.getAllByField({
        isDeleted: false,
        parent_id: null,
        status: 'Active'
      });
      let categorys = await categoryRepo.getById(req.params.id);
      if (!_.isEmpty(categorys)) {
        res.render("knowledge_center/views/know_editSubCategory.ejs", {
          page_name: "sub-knowledge-category-management",
          page_title: "Sub Category Edit",
          user: req.user,
          permission: req.permission,
          response: categorys,
          parentcat: parents,
        });
      } else {
        req.flash("error", "Sorry, record not found!");
        res.redirect(namedRouter.urlFor("admin.knowledge_subcategory.list"));
      }
    } catch (e) {
      req.flash("error", e.message);
      res.redirect(namedRouter.urlFor("admin.knowledge_subcategory.list"));
    }
  }

  async updatesubcategory(req, res) {
    try {
      const subcategoryId = req.body.id;
      let checkData = await categoryRepo.getByField({
        name: req.body.name,
        parent_id: {
          $ne: null
        },
        isDeleted: false,
        _id: {
          $ne: subcategoryId
        },
      });
      if (_.isEmpty(checkData)) {

        let categoryValue = await categoryRepo.getById(subcategoryId);
        if (req.files.length > 0) {

          if (fs.existsSync('./public/uploads/category/' + categoryValue.image) && categoryValue.image) {
            fs.unlinkSync('./public/uploads/category/' + categoryValue.image);
          }

          for (let i = 0; i < req.files.length; i++) {
            req.body.image = req.files[i].filename;
          }
        }

        let subcategoryUpdate = await categoryRepo.updateById(
          subcategoryId,
          req.body
        );
        if (subcategoryUpdate) {
          let slugValue = slug(subcategoryUpdate.name, { lower: true, replacement: "-" });
          var insertedId = subcategoryUpdate._id.toString();
          var last5Digit = insertedId.substring( insertedId.length - 5, insertedId.length);
          var updatedSlug = `${slugValue}-${last5Digit}`;

          let newprobeFinderSlugUpdate = await categoryRepo.updateById(insertedId,{ slug: updatedSlug });
          if(newprobeFinderSlugUpdate){
            req.flash("success", "Sub Category Updated Successfully");
            res.redirect(namedRouter.urlFor("admin.knowledge_subcategory.list"));
          }
          
        } else {
          res.redirect(
            namedRouter.urlFor("admin.knowledge_subcategory.edit", {
              id: subcategoryId
            })
          );
        }
      } else {
        req.flash("error", "Sub Category already exist with same title");
        res.redirect(
          namedRouter.urlFor("admin.knowledge_subcategory.edit", {
            id: subcategoryId
          })
        );
      }
    } catch (e) {
      req.flash("error", e.message);
      res.redirect(namedRouter.urlFor("admin.knowledge_subcategory.list"));
    }
  }

  async deletesubcategory(req, res) {
    try {
      let categoryData = await categoryRepo.getByField({
        status: "Active",
        isDeleted: false,
        parent_id: {
          $ne: null
        },
        cat_id: mongoose.Types.ObjectId(req.params.id),
      });

      if (!_.isEmpty(categoryData)) {
        req.flash("error", "This sub category already used in");
        res.redirect(namedRouter.urlFor("admin.knowledge_subcategory.list"));
      } else {
        let categoryDelete = await categoryRepo.updateById(req.params.id, {
          isDeleted: true,
        });
        req.flash("success", "Sub Category removed successfully");
        res.redirect(namedRouter.urlFor("admin.knowledge_subcategory.list"));
      }
    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  async statusChangesubcategory(req, res) {
    try {
      let categoryData = await categoryRepo.getByField({
        status: "Active",
        isDeleted: false,
        parent_id: {
          $ne: null
        },
        cat_id: mongoose.Types.ObjectId(req.params.id),
      });

      if (!_.isEmpty(categoryData)) {
        req.flash("error", "You can`t change this status");
        res.redirect(namedRouter.urlFor("admin.knowledge_subcategory.list"));
      } else {
        let category = await categoryRepo.getById(req.params.id);
        if (!_.isEmpty(category)) {
          let categoryStatus =
            category.status == "Active" ? "Inactive" : "Active";
          let categoryUpdate = categoryRepo.updateById(req.params.id, {
            status: categoryStatus,
          });

          req.flash("success", "Sub Category status has changed successfully");
          res.redirect(namedRouter.urlFor("admin.knowledge_subcategory.list"));
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