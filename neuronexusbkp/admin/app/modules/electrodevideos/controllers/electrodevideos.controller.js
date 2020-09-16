const express = require("express");
const mongoose = require("mongoose");
const routeLabel = require("route-label");
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require("querystring");
const electrodevideosRepo = require("electrodevideos/repositories/electrodevideos.repository");
const errorHandler = require("../../../errorHandler");
const fs = require("fs");
const gm = require("gm").subClass({
  imageMagick: true,
});

const slug = require("slug");
const { exit } = require("process");

class ElectrodevideosController {
  constructor() { }

  async list(req, res) {
    try {
      res.render("electrodevideos/views/list.ejs", {
        page_name: "electrodevideos-management",
        page_title: "Electrodevideos",
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
      res.render("electrodevideos/views/add.ejs", {
        page_name: "electrodevideos-management",
        page_title: "Create New Electrodevideos",
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
          res.redirect(namedRouter.urlFor("admin.electrodevideos.create"));
          return false;
        }
      }


      req.body.slug = slug(req.body.title, { lower: true, replacement: "-" });
      let newElectrodevideos = await electrodevideosRepo.save(req.body);
      if (newElectrodevideos) {
        var insertedId = newElectrodevideos._id.toString();
        var last5Digit = insertedId.substring(insertedId.length - 5, insertedId.length);
        var updatedSlug = `${req.body.slug}-${last5Digit}`;

        let newprobeFinderSlugUpdate = await electrodevideosRepo.updateById(insertedId, { slug: updatedSlug });
        if (newprobeFinderSlugUpdate) {
          req.flash("success", "Electrodevideos created succesfully.");
          res.redirect(namedRouter.urlFor("admin.electrodevideos.list"));
        }
      }

    } catch (e) {
      const error = errorHandler(e);
      req.flash("error", error.message);
      res.redirect(namedRouter.urlFor("admin.electrodevideos.create"));
    }
  }

  async update(req, res) {
    try {


      let electrodevideosValue = await electrodevideosRepo.getById(req.body.id);

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
          res.redirect(namedRouter.urlFor("admin.electrodevideos.edit", { id: req.body.id }));
          return false;
        }

        if (fs.existsSync('./public/uploads/electrodevideos/' + electrodevideosValue.media) && electrodevideosValue.media) {
          fs.unlinkSync('./public/uploads/electrodevideos/' + electrodevideosValue.media);
        }

      }

      //if(checkData.slug == '' || checkData.slug == undefined || checkData.slug ==  null){
      req.body.slug = slug(req.body.title, { lower: true, replacement: "-" });
      //}

      let electrodevideosUpdate = await electrodevideosRepo.updateById(electrodevideosValue._id, req.body);
      if (electrodevideosUpdate) {
        var insertedId = electrodevideosUpdate._id.toString();
        var last5Digit = insertedId.substring(insertedId.length - 5, insertedId.length);
        var updatedSlug = `${req.body.slug}-${last5Digit}`;
        let newprobeFinderSlugUpdate = await electrodevideosRepo.updateById(insertedId, { slug: updatedSlug });
        if (newprobeFinderSlugUpdate) {
          req.flash("success", "Electrodevideos Updated Successfully");
          res.redirect(namedRouter.urlFor("admin.electrodevideos.list"));
        }
      } else {
        res.redirect(namedRouter.urlFor("admin.electrodevideos.edit", { id: req.body.id }));
      }

    } catch (e) {
      req.flash("error", e.message);
      res.redirect(namedRouter.urlFor("admin.electrodevideos.edit", {
        id: req.body.id
      }));
    }
  }

  async getAll(req, res) {
    try {
      let electrodevideos = await electrodevideosRepo.getAll(req);

      if (_.has(req.body, "sort")) {
        var sortOrder = req.body.sort.sort;
        var sortField = req.body.sort.field;
      } else {
        var sortOrder = -1;
        var sortField = "_id";
      }
      let meta = {
        page: req.body.pagination.page,
        pages: electrodevideos.pageCount,
        perpage: req.body.pagination.perpage,
        total: electrodevideos.totalCount,
        sort: sortOrder,
        field: sortField,
      };

      return {
        status: 200,
        meta: meta,
        data: electrodevideos.data,
        message: `Data fetched succesfully.`,
      };
    } catch (e) {
      throw e;
    }
  }

  async edit(req, res) {
    try {
      let electrodevideos = await electrodevideosRepo.getById(req.params.id);
      if (!_.isEmpty(electrodevideos)) {
        res.render("electrodevideos/views/edit.ejs", {
          page_name: "electrodevideos-management",
          page_title: "Electrodevideos Edit",
          user: req.user,
          permission: req.permission,
          response: electrodevideos,
        });
      } else {
        req.flash("error", "Sorry, record not found!");
        res.redirect(namedRouter.urlFor("admin.electrodevideos.list"));
      }
    } catch (e) {
      return res.status(500).send({
        message: e.message
      });
    }
  }

  async delete(req, res) {
    try {

      let electrodevideosValue = await electrodevideosRepo.getById(req.params.id);
      if (electrodevideosValue) {
        if (fs.existsSync('./public/uploads/electrodevideos/' + electrodevideosValue.media) && electrodevideosValue.media) {
          fs.unlinkSync('./public/uploads/electrodevideos/' + electrodevideosValue.media);
        }
      }

      let electrodevideosDelete = await electrodevideosRepo.updateById(req.params.id, {
        isDeleted: true,
      });
      req.flash("success", "Electrodevideos removed successfully");
      res.redirect(namedRouter.urlFor("admin.electrodevideos.list"));

    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  async statusChange(req, res) {
    try {


      let electrodevideos = await electrodevideosRepo.getById(req.params.id);
      if (!_.isEmpty(electrodevideos)) {
        let electrodevideosStatus =
          electrodevideos.status == "Active" ? "Inactive" : "Active";
        let electrodevideosUpdate = electrodevideosRepo.updateById(req.params.id, {
          status: electrodevideosStatus,
        });

        req.flash("success", "Electrodevideos status has changed successfully");
        res.redirect(namedRouter.urlFor("admin.electrodevideos.list"));
      }

    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }


}

module.exports = new ElectrodevideosController();