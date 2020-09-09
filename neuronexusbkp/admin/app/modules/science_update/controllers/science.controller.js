const express = require("express");
const mongoose = require("mongoose");
const routeLabel = require("route-label");
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require("querystring");
const scienceRepo = require("science_update/repositories/science.repository");
const categoryRepo = require('science_update/repositories/category.repository');
const errorHandler = require("../../../errorHandler");
const fs = require("fs");
const gm = require("gm").subClass({
  imageMagick: true,
});
const slug = require("slug");

class ProductController {
  constructor() { }


  /*
    // @Method: editmeet_the_team
    // @Description:  Edit meet_the_team page Content
    */
  async editscience_static_contents(req, res) {
    try {
      let result = {};
      let cms = await scienceRepo.science_static_contentsGetByField({ "isDeleted": false });
      if (!_.isEmpty(cms)) {
        result.cms_data = cms;
        res.render('science_update/views/edit_science_static_contents.ejs', {
          page_name: 'science-static-management',
          page_title: 'Science Update page',
          user: req.user,
          permission: req.permission,
          response: result
        });
      } else {
        req.flash('error', "Sorry record not found!");

      }
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  };

  /* @Method: update
  // @Description: coupon update action
  */
  async updatescience_static_contents(req, res) {
    try {
      const aboutId = req.body.id;

      let about = await scienceRepo.science_static_contentsGetByField({
        _id: req.body.id,
        'isDeleted': false
      });
      if (req.files.length > 0) {
        for (let i = 0; i < req.files.length; i++) {


          if (req.files[i].fieldname == 'header_banner_image') {
            if (fs.existsSync('./public/uploads/science_update/' + about.header_banner_image) && about.header_banner_image) {
              fs.unlinkSync('./public/uploads/science_update/' + about.header_banner_image);
            }
            req.body.header_banner_image = req.files[i].filename;
          }

        }
      }


      let cmsIdUpdate = scienceRepo.science_static_contentsUpdateById(req.body, aboutId)
      if (cmsIdUpdate) {
        req.flash('success', "Content updated successfully");
        res.redirect(namedRouter.urlFor('admin.science_update.editstatic'));
      }


    } catch (e) {
      return res.status(500).send({ message: e.message });
    }

  };



  async list(req, res) {
    try {
      res.render("science_update/views/list.ejs", {
        page_name: "science-management",
        page_title: "Science Update",
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
      const search = { "isDeleted": false, "status": "Active" };
      const cat = await categoryRepo.getAllByField(search);
      res.render("science_update/views/add.ejs", {
        page_name: "science-management",
        page_title: "Create New Product",
        category: cat,
        permission: req.permission,
        user: req.user,
      });
    } catch (e) {
      return res.status(500).send({
        message: e.message
      });
    }
  }

  async insert(req, res) {
    try {
      req.body.parent_id = null;

      if (req.files.length > 0) {
        for (let i = 0; i < req.files.length; i++) {
          req.body.image = req.files[i].filename;
        }
      }

      req.body.admin_id = req.user._id
      req.body.slug = slug(req.body.title, { lower: true, replacement: "-" });

      if(req.body.show_author_image == 'on' ||  req.body.show_author_name == 'on' || req.body.show_post_date == 'on'){
        req.body.show_author_image = true;
        req.body.show_author_name = true;
        req.body.show_post_date = true
      }else{
        req.body.show_author_image = false;
        req.body.show_author_name = false;
        req.body.show_post_date = false
      }
      let newCategory = await scienceRepo.save(req.body);
      if(newCategory){
        var insertedId = newCategory._id.toString();
          var last5Digit = insertedId.substring( insertedId.length - 5, insertedId.length);
          var updatedSlug = `${req.body.slug}-${last5Digit}`;

          let newprobeFinderSlugUpdate = await scienceRepo.updateById(insertedId,{ slug: updatedSlug });
          if(newprobeFinderSlugUpdate){
            req.flash("success", "Record created succesfully.");
        res.redirect(namedRouter.urlFor("admin.science_update.list"));
          }

      }
    } catch (e) {
      const error = errorHandler(e);
      req.flash("error", error.message);
      res.redirect(namedRouter.urlFor("admin.science_update.create"));
    }
  }

  async update(req, res) {
    try {
      const scienceId = req.body.id;
      let scienceValue = await scienceRepo.getById(req.body.id);
      if (req.files.length > 0) {
        if (fs.existsSync('./public/uploads/science/' + scienceValue.image) && scienceValue.image) {
          fs.unlinkSync('./public/uploads/science/' + scienceValue.image);
        }
        for (let i = 0; i < req.files.length; i++) {
          req.body.image = req.files[i].filename;
        }
      }
      if(req.body.show_author_image == 'on' ||  req.body.show_author_name == 'on' || req.body.show_post_date == 'on'){
        req.body.show_author_image = true;
        req.body.show_author_name = true;
        req.body.show_post_date = true
      }else{
        req.body.show_author_image = false;
        req.body.show_author_name = false;
        req.body.show_post_date = false
      }
      let scienceUpdate = await scienceRepo.updateById(req.body.id, req.body);
      if (scienceUpdate) {
        let slugValue = slug(scienceUpdate.title, { lower: true, replacement: "-" });
        var insertedId = scienceUpdate._id.toString();
        var last5Digit = insertedId.substring( insertedId.length - 5, insertedId.length);
        var updatedSlug = `${slugValue}-${last5Digit}`;

        let newprobeFinderSlugUpdate = await scienceRepo.updateById(insertedId,{ slug: updatedSlug });
        if(newprobeFinderSlugUpdate){
          req.flash("success", "Record Updated Successfully");
          res.redirect(namedRouter.urlFor("admin.science_update.list"));
        }
      } else {
        res.redirect(
          namedRouter.urlFor("admin.science_update.edit", {
            id: req.body.id
          })
        );
      }

    } catch (e) {
      req.flash("error", e.message);
      res.redirect(namedRouter.urlFor("admin.science_update.edit", {
        id: req.body.id
      }));
    }
  }

  async getAll(req, res) {
    try {
      let sciences = await scienceRepo.getAll(req);

      if (_.has(req.body, "sort")) {
        var sortOrder = req.body.sort.sort;
        var sortField = req.body.sort.field;
      } else {
        var sortOrder = -1;
        var sortField = "_id";
      }
      let meta = {
        page: req.body.pagination.page,
        pages: sciences.pageCount,
        perpage: req.body.pagination.perpage,
        total: sciences.totalCount,
        sort: sortOrder,
        field: sortField,
      };

      return {
        status: 200,
        meta: meta,
        data: sciences.data,
        message: `Data fetched succesfully.`,
      };
    } catch (e) {
      throw e;
    }
  }

  async edit(req, res) {
    try {
      let sciences = await scienceRepo.getById(req.params.id);
      if (!_.isEmpty(sciences)) {
        const search = { "isDeleted": false, "status": "Active" };
        const cat = await categoryRepo.getAllByField(search);

        res.render("science_update/views/edit.ejs", {
          page_name: "science-science-management",
          page_title: "Record Edit",
          user: req.user,
          permission: req.permission,
          category: cat,
          response: sciences,
        });
      } else {
        req.flash("error", "Sorry, record not found!");
        res.redirect(namedRouter.urlFor("admin.science_update.list"));
      }
    } catch (e) {
      return res.status(500).send({
        message: e.message
      });
    }
  }

  async delete(req, res) {
    try {

      let scienceValue = await scienceRepo.getById(req.params.id);


      if (fs.existsSync('./public/uploads/science/' + scienceValue.image) && scienceValue.image) {
        fs.unlinkSync('./public/uploads/science/' + scienceValue.image);
      }



      let scienceDelete = await scienceRepo.updateById(req.params.id, {
        isDeleted: true,
      });
      req.flash("success", "Record removed successfully");
      res.redirect(namedRouter.urlFor("admin.science_update.list"));

    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  async statusChange(req, res) {
    try {

      let science = await scienceRepo.getById(req.params.id);
      if (!_.isEmpty(science)) {
        let scienceStatus =
          science.status == "Active" ? "Inactive" : "Active";
        let scienceUpdate = scienceRepo.updateById(req.params.id, {
          status: scienceStatus,
        });

        req.flash("success", "Record status has changed successfully");
        res.redirect(namedRouter.urlFor("admin.science_update.list"));
      }

    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }


}

module.exports = new ProductController();