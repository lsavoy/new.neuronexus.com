const express = require("express");
const mongoose = require("mongoose");
const routeLabel = require("route-label");
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require("querystring");
const trainingvideosRepo = require("trainingvideos/repositories/trainingvideos.repository");
const errorHandler = require("../../../errorHandler");
const fs = require("fs");
const gm = require("gm").subClass({
  imageMagick: true,
});

const slug = require("slug");
const { exit } = require("process");

class TrainingvideosController {
  constructor() { }

  async list(req, res) {
    try {
      res.render("trainingvideos/views/list.ejs", {
        page_name: "trainingvideos-management",
        page_title: "Training videos",
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
      res.render("trainingvideos/views/add.ejs", {
        page_name: "trainingvideos-management",
        page_title: "Create New Training videos",
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
          res.redirect(namedRouter.urlFor("admin.trainingvideos.create"));
          return false;
        }
      }


      req.body.slug = slug(req.body.title, { lower: true, replacement: "-" });
      let newTrainingvideos = await trainingvideosRepo.save(req.body);
      if (newTrainingvideos) {
        var insertedId = newTrainingvideos._id.toString();
        var last5Digit = insertedId.substring(insertedId.length - 5, insertedId.length);
        var updatedSlug = `${req.body.slug}-${last5Digit}`;

        let newprobeFinderSlugUpdate = await trainingvideosRepo.updateById(insertedId, { slug: updatedSlug });
        if (newprobeFinderSlugUpdate) {
          req.flash("success", "Trainingvideos created succesfully.");
          res.redirect(namedRouter.urlFor("admin.trainingvideos.list"));
        }
      }

    } catch (e) {
      const error = errorHandler(e);
      req.flash("error", error.message);
      res.redirect(namedRouter.urlFor("admin.trainingvideos.create"));
    }
  }

  async update(req, res) {
    try {


      let trainingvideosValue = await trainingvideosRepo.getById(req.body.id);

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
          res.redirect(namedRouter.urlFor("admin.trainingvideos.edit", { id: req.body.id }));
          return false;
        }

        if (fs.existsSync('./public/uploads/trainingvideos/' + trainingvideosValue.media) && trainingvideosValue.media) {
          fs.unlinkSync('./public/uploads/trainingvideos/' + trainingvideosValue.media);
        }

      }

      //if(checkData.slug == '' || checkData.slug == undefined || checkData.slug ==  null){
      req.body.slug = slug(req.body.title, { lower: true, replacement: "-" });
      //}

      let trainingvideosUpdate = await trainingvideosRepo.updateById(trainingvideosValue._id, req.body);
      if (trainingvideosUpdate) {
        var insertedId = trainingvideosUpdate._id.toString();
        var last5Digit = insertedId.substring(insertedId.length - 5, insertedId.length);
        var updatedSlug = `${req.body.slug}-${last5Digit}`;
        let newprobeFinderSlugUpdate = await trainingvideosRepo.updateById(insertedId, { slug: updatedSlug });
        if (newprobeFinderSlugUpdate) {
          req.flash("success", "Trainingvideos Updated Successfully");
          res.redirect(namedRouter.urlFor("admin.trainingvideos.list"));
        }
      } else {
        res.redirect(namedRouter.urlFor("admin.trainingvideos.edit", { id: req.body.id }));
      }

    } catch (e) {
      req.flash("error", e.message);
      res.redirect(namedRouter.urlFor("admin.trainingvideos.edit", {
        id: req.body.id
      }));
    }
  }

  async getAll(req, res) {
    try {
      let trainingvideos = await trainingvideosRepo.getAll(req);

      if (_.has(req.body, "sort")) {
        var sortOrder = req.body.sort.sort;
        var sortField = req.body.sort.field;
      } else {
        var sortOrder = -1;
        var sortField = "_id";
      }
      let meta = {
        page: req.body.pagination.page,
        pages: trainingvideos.pageCount,
        perpage: req.body.pagination.perpage,
        total: trainingvideos.totalCount,
        sort: sortOrder,
        field: sortField,
      };

      return {
        status: 200,
        meta: meta,
        data: trainingvideos.data,
        message: `Data fetched succesfully.`,
      };
    } catch (e) {
      throw e;
    }
  }

  async edit(req, res) {
    try {
      let trainingvideos = await trainingvideosRepo.getById(req.params.id);
      if (!_.isEmpty(trainingvideos)) {
        res.render("trainingvideos/views/edit.ejs", {
          page_name: "trainingvideos-management",
          page_title: "Trainingvideos Edit",
          user: req.user,
          permission: req.permission,
          response: trainingvideos,
        });
      } else {
        req.flash("error", "Sorry, record not found!");
        res.redirect(namedRouter.urlFor("admin.trainingvideos.list"));
      }
    } catch (e) {
      return res.status(500).send({
        message: e.message
      });
    }
  }

  async delete(req, res) {
    try {

      let trainingvideosValue = await trainingvideosRepo.getById(req.params.id);
      if (trainingvideosValue) {
        if (fs.existsSync('./public/uploads/trainingvideos/' + trainingvideosValue.media) && trainingvideosValue.media) {
          fs.unlinkSync('./public/uploads/trainingvideos/' + trainingvideosValue.media);
        }
      }

      let trainingvideosDelete = await trainingvideosRepo.updateById(req.params.id, {
        isDeleted: true,
      });
      req.flash("success", "Trainingvideos removed successfully");
      res.redirect(namedRouter.urlFor("admin.trainingvideos.list"));

    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  async statusChange(req, res) {
    try {


      let trainingvideos = await trainingvideosRepo.getById(req.params.id);
      if (!_.isEmpty(trainingvideos)) {
        let trainingvideosStatus =
          trainingvideos.status == "Active" ? "Inactive" : "Active";
        let trainingvideosUpdate = trainingvideosRepo.updateById(req.params.id, {
          status: trainingvideosStatus,
        });

        req.flash("success", "Trainingvideos status has changed successfully");
        res.redirect(namedRouter.urlFor("admin.trainingvideos.list"));
      }

    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }


}

module.exports = new TrainingvideosController();