const express = require("express");
const mongoose = require("mongoose");
const routeLabel = require("route-label");
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require("querystring");
const instrumentationvideosRepo = require("instrumentationvideos/repositories/instrumentationvideos.repository");
const errorHandler = require("../../../errorHandler");
const fs = require("fs");
const gm = require("gm").subClass({
  imageMagick: true,
});

const slug = require("slug");
const { exit } = require("process");

class InstrumentationvideosController {
  constructor() { }

  async list(req, res) {
    try {
      res.render("instrumentationvideos/views/list.ejs", {
        page_name: "instrumentationvideos-management",
        page_title: "Instrumentation videos",
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
      res.render("instrumentationvideos/views/add.ejs", {
        page_name: "instrumentationvideos-management",
        page_title: "Create New Instrumentation videos",
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

      // console.log(req.files); exit();

      if (req.files && req.files.length > 0) {
        req.body.type = "";

        for (let i = 0; i < req.files.length; i++) {
          req.body.media = req.files[i].filename;
          if (req.files[i].mimetype.indexOf("image") >= 0) {
            req.body.type = "image"
          }
          if (req.files[i].mimetype.indexOf("video") >= 0) {
            req.body.type = "video"
          }
        }

        if (req.body.type == "") {
          req.flash("error", "Only Video and Image is allowed.");
          res.redirect(namedRouter.urlFor("admin.instrumentationvideos.create"));
          return false;
        }
      }


      req.body.slug = slug(req.body.title, { lower: true, replacement: "-" });
      let newInstrumentationvideos = await instrumentationvideosRepo.save(req.body);
      if (newInstrumentationvideos) {
        var insertedId = newInstrumentationvideos._id.toString();
        var last5Digit = insertedId.substring(insertedId.length - 5, insertedId.length);
        var updatedSlug = `${req.body.slug}-${last5Digit}`;

        let newprobeFinderSlugUpdate = await instrumentationvideosRepo.updateById(insertedId, { slug: updatedSlug });
        if (newprobeFinderSlugUpdate) {
          req.flash("success", "Instrumentationvideos created succesfully.");
          res.redirect(namedRouter.urlFor("admin.instrumentationvideos.list"));
        }
      }

    } catch (e) {
      const error = errorHandler(e);
      req.flash("error", error.message);
      res.redirect(namedRouter.urlFor("admin.instrumentationvideos.create"));
    }
  }

  async update(req, res) {
    try {


      let instrumentationvideosValue = await instrumentationvideosRepo.getById(req.body.id);

      if (req.files && req.files.length > 0) {

        req.body.type = "";

        for (let i = 0; i < req.files.length; i++) {
          req.body.media = req.files[i].filename;
          if (req.files[i].mimetype.indexOf("image") >= 0) {
            req.body.type = "image"
          }
          if (req.files[i].mimetype.indexOf("video") >= 0) {
            req.body.type = "video"
          }
        }
        if (req.body.type == "") {
          req.flash("error", "Only Video and Image is allowed.");
          res.redirect(namedRouter.urlFor("admin.instrumentationvideos.edit", { id: req.body.id }));
          return false;
        }

        if (fs.existsSync('./public/uploads/instrumentationvideos/' + instrumentationvideosValue.media) && instrumentationvideosValue.media) {
          fs.unlinkSync('./public/uploads/instrumentationvideos/' + instrumentationvideosValue.media);
        }

      }

      //if(checkData.slug == '' || checkData.slug == undefined || checkData.slug ==  null){
      req.body.slug = slug(req.body.title, { lower: true, replacement: "-" });
      //}

      let instrumentationvideosUpdate = await instrumentationvideosRepo.updateById(instrumentationvideosValue._id, req.body);
      if (instrumentationvideosUpdate) {
        var insertedId = instrumentationvideosUpdate._id.toString();
        var last5Digit = insertedId.substring(insertedId.length - 5, insertedId.length);
        var updatedSlug = `${req.body.slug}-${last5Digit}`;
        let newprobeFinderSlugUpdate = await instrumentationvideosRepo.updateById(insertedId, { slug: updatedSlug });
        if (newprobeFinderSlugUpdate) {
          req.flash("success", "Instrumentationvideos Updated Successfully");
          res.redirect(namedRouter.urlFor("admin.instrumentationvideos.list"));
        }
      } else {
        res.redirect(namedRouter.urlFor("admin.instrumentationvideos.edit", { id: req.body.id }));
      }

    } catch (e) {
      req.flash("error", e.message);
      res.redirect(namedRouter.urlFor("admin.instrumentationvideos.edit", {
        id: req.body.id
      }));
    }
  }

  async getAll(req, res) {
    try {
      let instrumentationvideos = await instrumentationvideosRepo.getAll(req);

      if (_.has(req.body, "sort")) {
        var sortOrder = req.body.sort.sort;
        var sortField = req.body.sort.field;
      } else {
        var sortOrder = -1;
        var sortField = "_id";
      }
      let meta = {
        page: req.body.pagination.page,
        pages: instrumentationvideos.pageCount,
        perpage: req.body.pagination.perpage,
        total: instrumentationvideos.totalCount,
        sort: sortOrder,
        field: sortField,
      };

      return {
        status: 200,
        meta: meta,
        data: instrumentationvideos.data,
        message: `Data fetched succesfully.`,
      };
    } catch (e) {
      throw e;
    }
  }

  async edit(req, res) {
    try {
      let instrumentationvideos = await instrumentationvideosRepo.getById(req.params.id);
      if (!_.isEmpty(instrumentationvideos)) {
        res.render("instrumentationvideos/views/edit.ejs", {
          page_name: "instrumentationvideos-management",
          page_title: "Instrumentationvideos Edit",
          user: req.user,
          permission: req.permission,
          response: instrumentationvideos,
        });
      } else {
        req.flash("error", "Sorry, record not found!");
        res.redirect(namedRouter.urlFor("admin.instrumentationvideos.list"));
      }
    } catch (e) {
      return res.status(500).send({
        message: e.message
      });
    }
  }

  async delete(req, res) {
    try {

      let instrumentationvideosValue = await instrumentationvideosRepo.getById(req.params.id);
      if (instrumentationvideosValue) {
        if (fs.existsSync('./public/uploads/instrumentationvideos/' + instrumentationvideosValue.media) && instrumentationvideosValue.media) {
          fs.unlinkSync('./public/uploads/instrumentationvideos/' + instrumentationvideosValue.media);
        }
      }

      let instrumentationvideosDelete = await instrumentationvideosRepo.updateById(req.params.id, {
        isDeleted: true,
      });
      req.flash("success", "Instrumentationvideos removed successfully");
      res.redirect(namedRouter.urlFor("admin.instrumentationvideos.list"));

    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  async statusChange(req, res) {
    try {


      let instrumentationvideos = await instrumentationvideosRepo.getById(req.params.id);
      if (!_.isEmpty(instrumentationvideos)) {
        let instrumentationvideosStatus =
          instrumentationvideos.status == "Active" ? "Inactive" : "Active";
        let instrumentationvideosUpdate = instrumentationvideosRepo.updateById(req.params.id, {
          status: instrumentationvideosStatus,
        });

        req.flash("success", "Instrumentationvideos status has changed successfully");
        res.redirect(namedRouter.urlFor("admin.instrumentationvideos.list"));
      }

    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }


}

module.exports = new InstrumentationvideosController();