const express = require("express");
const mongoose = require("mongoose");
const routeLabel = require("route-label");
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require("querystring");
const softwarevideosRepo = require("softwarevideos/repositories/softwarevideos.repository");
const errorHandler = require("../../../errorHandler");
const fs = require("fs");
const gm = require("gm").subClass({
  imageMagick: true,
});

const slug = require("slug");
const { exit } = require("process");

class SoftwarevideosController {
  constructor() { }

  async list(req, res) {
    try {
      res.render("softwarevideos/views/list.ejs", {
        page_name: "softwarevideos-management",
        page_title: "Software videos",
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
      res.render("softwarevideos/views/add.ejs", {
        page_name: "softwarevideos-management",
        page_title: "Create New Software videos",
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
          res.redirect(namedRouter.urlFor("admin.softwarevideos.create"));
          return false;
        }
      }


      req.body.slug = slug(req.body.title, { lower: true, replacement: "-" });
      let newSoftwarevideos = await softwarevideosRepo.save(req.body);
      if (newSoftwarevideos) {
        var insertedId = newSoftwarevideos._id.toString();
        var last5Digit = insertedId.substring(insertedId.length - 5, insertedId.length);
        var updatedSlug = `${req.body.slug}-${last5Digit}`;

        let newprobeFinderSlugUpdate = await softwarevideosRepo.updateById(insertedId, { slug: updatedSlug });
        if (newprobeFinderSlugUpdate) {
          req.flash("success", "Softwarevideos created succesfully.");
          res.redirect(namedRouter.urlFor("admin.softwarevideos.list"));
        }
      }

    } catch (e) {
      const error = errorHandler(e);
      req.flash("error", error.message);
      res.redirect(namedRouter.urlFor("admin.softwarevideos.create"));
    }
  }

  async update(req, res) {
    try {


      let softwarevideosValue = await softwarevideosRepo.getById(req.body.id);

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
          res.redirect(namedRouter.urlFor("admin.softwarevideos.edit", { id: req.body.id }));
          return false;
        }

        if (fs.existsSync('./public/uploads/softwarevideos/' + softwarevideosValue.media) && softwarevideosValue.media) {
          fs.unlinkSync('./public/uploads/softwarevideos/' + softwarevideosValue.media);
        }

      }

      //if(checkData.slug == '' || checkData.slug == undefined || checkData.slug ==  null){
      req.body.slug = slug(req.body.title, { lower: true, replacement: "-" });
      //}

      let softwarevideosUpdate = await softwarevideosRepo.updateById(softwarevideosValue._id, req.body);
      if (softwarevideosUpdate) {
        var insertedId = softwarevideosUpdate._id.toString();
        var last5Digit = insertedId.substring(insertedId.length - 5, insertedId.length);
        var updatedSlug = `${req.body.slug}-${last5Digit}`;
        let newprobeFinderSlugUpdate = await softwarevideosRepo.updateById(insertedId, { slug: updatedSlug });
        if (newprobeFinderSlugUpdate) {
          req.flash("success", "Softwarevideos Updated Successfully");
          res.redirect(namedRouter.urlFor("admin.softwarevideos.list"));
        }
      } else {
        res.redirect(namedRouter.urlFor("admin.softwarevideos.edit", { id: req.body.id }));
      }

    } catch (e) {
      req.flash("error", e.message);
      res.redirect(namedRouter.urlFor("admin.softwarevideos.edit", {
        id: req.body.id
      }));
    }
  }

  async getAll(req, res) {
    try {
      let softwarevideos = await softwarevideosRepo.getAll(req);

      if (_.has(req.body, "sort")) {
        var sortOrder = req.body.sort.sort;
        var sortField = req.body.sort.field;
      } else {
        var sortOrder = -1;
        var sortField = "_id";
      }
      let meta = {
        page: req.body.pagination.page,
        pages: softwarevideos.pageCount,
        perpage: req.body.pagination.perpage,
        total: softwarevideos.totalCount,
        sort: sortOrder,
        field: sortField,
      };

      return {
        status: 200,
        meta: meta,
        data: softwarevideos.data,
        message: `Data fetched succesfully.`,
      };
    } catch (e) {
      throw e;
    }
  }

  async edit(req, res) {
    try {
      let softwarevideos = await softwarevideosRepo.getById(req.params.id);
      if (!_.isEmpty(softwarevideos)) {
        res.render("softwarevideos/views/edit.ejs", {
          page_name: "softwarevideos-management",
          page_title: "Softwarevideos Edit",
          user: req.user,
          permission: req.permission,
          response: softwarevideos,
        });
      } else {
        req.flash("error", "Sorry, record not found!");
        res.redirect(namedRouter.urlFor("admin.softwarevideos.list"));
      }
    } catch (e) {
      return res.status(500).send({
        message: e.message
      });
    }
  }

  async delete(req, res) {
    try {

      let softwarevideosValue = await softwarevideosRepo.getById(req.params.id);
      if (softwarevideosValue) {
        if (fs.existsSync('./public/uploads/softwarevideos/' + softwarevideosValue.media) && softwarevideosValue.media) {
          fs.unlinkSync('./public/uploads/softwarevideos/' + softwarevideosValue.media);
        }
      }

      let softwarevideosDelete = await softwarevideosRepo.updateById(req.params.id, {
        isDeleted: true,
      });
      req.flash("success", "Softwarevideos removed successfully");
      res.redirect(namedRouter.urlFor("admin.softwarevideos.list"));

    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  async statusChange(req, res) {
    try {


      let softwarevideos = await softwarevideosRepo.getById(req.params.id);
      if (!_.isEmpty(softwarevideos)) {
        let softwarevideosStatus =
          softwarevideos.status == "Active" ? "Inactive" : "Active";
        let softwarevideosUpdate = softwarevideosRepo.updateById(req.params.id, {
          status: softwarevideosStatus,
        });

        req.flash("success", "Softwarevideos status has changed successfully");
        res.redirect(namedRouter.urlFor("admin.softwarevideos.list"));
      }

    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }


}

module.exports = new SoftwarevideosController();