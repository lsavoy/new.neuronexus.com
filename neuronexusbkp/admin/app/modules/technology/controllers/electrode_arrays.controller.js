const express = require("express");
const mongoose = require("mongoose");
const routeLabel = require("route-label");
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require("querystring");
const electrode_arraysRepo = require("technology/repositories/electrode_arrays.repository");
const errorHandler = require("../../../errorHandler");
const fs = require("fs");
const gm = require("gm").subClass({
  imageMagick: true,
});

const slug = require("slug");

class ElectrodeArraysController {
  constructor() { }

  async list(req, res) {
    try {
      res.render("technology/views/electrode_arrays_list.ejs", {
        page_name: "technology-electrode_arrays-management",
        page_title: "Electrode Arrays Product",
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
      res.render("technology/views/electrode_arrays_add.ejs", {
        page_name: "technology-electrode_arrays-management",
        page_title: "Create New Electrode Arrays Product",
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

      console.log(req.body)
      if (req.files && req.files.length > 0) {
        for (let i = 0; i < req.files.length; i++) {
          req.body.image = req.files[i].filename;
        }
      }
      req.body.slug = slug(req.body.title, { lower: true, replacement: "-" });
      let newElectrodeArrays = await electrode_arraysRepo.save(req.body);
      if (newElectrodeArrays) {
        var insertedId = newElectrodeArrays._id.toString();
        var last5Digit = insertedId.substring(insertedId.length - 5, insertedId.length);
        var updatedSlug = `${req.body.slug}-${last5Digit}`;

        let newprobeFinderSlugUpdate = await electrode_arraysRepo.updateById(insertedId, { slug: updatedSlug });
        if (newprobeFinderSlugUpdate) {
          req.flash("success", "Electrode Arrays Product created succesfully.");
          res.redirect(namedRouter.urlFor("admin.technology_electrode_arrays.list"));
        }
      }

    } catch (e) {
      const error = errorHandler(e);
      req.flash("error", error.message);
      res.redirect(namedRouter.urlFor("admin.technology_electrode_arrays.create"));
    }
  }

  async update(req, res) {
    try {


      let electrode_arraysValue = await electrode_arraysRepo.getById(req.body.id);

      if (req.files && req.files.length > 0) {

        if (fs.existsSync('./public/uploads/technology/' + electrode_arraysValue.image) && electrode_arraysValue.image) {
          fs.unlinkSync('./public/uploads/technology/' + electrode_arraysValue.image);
        }

        for (let i = 0; i < req.files.length; i++) {
          req.body.image = req.files[i].filename;
        }
      }

      //if(checkData.slug == '' || checkData.slug == undefined || checkData.slug ==  null){
      req.body.slug = slug(req.body.title, { lower: true, replacement: "-" });
      //}

      let electrode_arraysUpdate = await electrode_arraysRepo.updateById(electrode_arraysValue._id, req.body);
      if (electrode_arraysUpdate) {
        var insertedId = electrode_arraysUpdate._id.toString();
        var last5Digit = insertedId.substring(insertedId.length - 5, insertedId.length);
        var updatedSlug = `${req.body.slug}-${last5Digit}`;
        let newprobeFinderSlugUpdate = await electrode_arraysRepo.updateById(insertedId, { slug: updatedSlug });
        if (newprobeFinderSlugUpdate) {
          req.flash("success", "Electrode Arrays Product Updated Successfully");
          res.redirect(namedRouter.urlFor("admin.technology_electrode_arrays.list"));
        }
      } else {
        res.redirect(namedRouter.urlFor("admin.technology_electrode_arrays.edit", { id: req.body.id }));
      }

    } catch (e) {
      req.flash("error", e.message);
      res.redirect(namedRouter.urlFor("admin.technology_electrode_arrays.edit", {
        id: req.body.id
      }));
    }
  }

  async getAll(req, res) {
    try {
      let electrode_arrayss = await electrode_arraysRepo.getAll(req);

      if (_.has(req.body, "sort")) {
        var sortOrder = req.body.sort.sort;
        var sortField = req.body.sort.field;
      } else {
        var sortOrder = -1;
        var sortField = "_id";
      }
      let meta = {
        page: req.body.pagination.page,
        pages: electrode_arrayss.pageCount,
        perpage: req.body.pagination.perpage,
        total: electrode_arrayss.totalCount,
        sort: sortOrder,
        field: sortField,
      };

      return {
        status: 200,
        meta: meta,
        data: electrode_arrayss.data,
        message: `Data fetched succesfully.`,
      };
    } catch (e) {
      throw e;
    }
  }

  async edit(req, res) {
    try {
      let electrode_arrayss = await electrode_arraysRepo.getById(req.params.id);
      if (!_.isEmpty(electrode_arrayss)) {
        res.render("technology/views/electrode_arrays_edit.ejs", {
          page_name: "technology-electrode_arrays-management",
          page_title: "Electrode Arrays Product Edit",
          user: req.user,
          permission: req.permission,
          response: electrode_arrayss,
        });
      } else {
        req.flash("error", "Sorry, record not found!");
        res.redirect(namedRouter.urlFor("admin.technology_electrode_arrays.list"));
      }
    } catch (e) {
      return res.status(500).send({
        message: e.message
      });
    }
  }

  async delete(req, res) {
    try {

      let electrode_arraysValue = await electrode_arraysRepo.getById(req.params.id);
      if (electrode_arraysValue) {
        if (fs.existsSync('./public/uploads/technology/' + electrode_arraysValue.image) && electrode_arraysValue.image) {
          fs.unlinkSync('./public/uploads/technology/' + electrode_arraysValue.image);
        }
      }

      let electrode_arraysDelete = await electrode_arraysRepo.updateById(req.params.id, {
        isDeleted: true,
      });
      req.flash("success", "Electrode Arrays Product removed successfully");
      res.redirect(namedRouter.urlFor("admin.technology_electrode_arrays.list"));

    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  async statusChange(req, res) {
    try {


      let electrode_arrays = await electrode_arraysRepo.getById(req.params.id);
      if (!_.isEmpty(electrode_arrays)) {
        let electrode_arraysStatus =
          electrode_arrays.status == "Active" ? "Inactive" : "Active";
        let electrode_arraysUpdate = electrode_arraysRepo.updateById(req.params.id, {
          status: electrode_arraysStatus,
        });

        req.flash("success", "Electrode Arrays Product status has changed successfully");
        res.redirect(namedRouter.urlFor("admin.technology_electrode_arrays.list"));
      }

    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }


}

module.exports = new ElectrodeArraysController();