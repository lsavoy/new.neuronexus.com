const express = require("express");
const mongoose = require("mongoose");
const routeLabel = require("route-label");
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require("querystring");
const accessoriesvideosRepo = require("accessoriesvideos/repositories/accessoriesvideos.repository");
const errorHandler = require("../../../errorHandler");
const fs = require("fs");
const gm = require("gm").subClass({
  imageMagick: true,
});

const slug = require("slug");
const { exit } = require("process");

class AccessoriesvideosController {
  constructor() { }

  async list(req, res) {
    try {
      res.render("accessoriesvideos/views/list.ejs", {
        page_name: "accessoriesvideos-management",
        page_title: "Accessories videos",
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
      res.render("accessoriesvideos/views/add.ejs", {
        page_name: "accessoriesvideos-management",
        page_title: "Create New Accessories videos",
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
          res.redirect(namedRouter.urlFor("admin.accessoriesvideos.create"));
          return false;
        }
      }


      req.body.slug = slug(req.body.title, { lower: true, replacement: "-" });
      let newAccessoriesvideos = await accessoriesvideosRepo.save(req.body);
      if (newAccessoriesvideos) {
        var insertedId = newAccessoriesvideos._id.toString();
        var last5Digit = insertedId.substring(insertedId.length - 5, insertedId.length);
        var updatedSlug = `${req.body.slug}-${last5Digit}`;

        let newprobeFinderSlugUpdate = await accessoriesvideosRepo.updateById(insertedId, { slug: updatedSlug });
        if (newprobeFinderSlugUpdate) {
          req.flash("success", "Accessoriesvideos created succesfully.");
          res.redirect(namedRouter.urlFor("admin.accessoriesvideos.list"));
        }
      }

    } catch (e) {
      const error = errorHandler(e);
      req.flash("error", error.message);
      res.redirect(namedRouter.urlFor("admin.accessoriesvideos.create"));
    }
  }

  async update(req, res) {
    try {


      let accessoriesvideosValue = await accessoriesvideosRepo.getById(req.body.id);

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
          res.redirect(namedRouter.urlFor("admin.accessoriesvideos.edit", { id: req.body.id }));
          return false;
        }

        if (fs.existsSync('./public/uploads/accessoriesvideos/' + accessoriesvideosValue.media) && accessoriesvideosValue.media) {
          fs.unlinkSync('./public/uploads/accessoriesvideos/' + accessoriesvideosValue.media);
        }

      }

      //if(checkData.slug == '' || checkData.slug == undefined || checkData.slug ==  null){
      req.body.slug = slug(req.body.title, { lower: true, replacement: "-" });
      //}

      let accessoriesvideosUpdate = await accessoriesvideosRepo.updateById(accessoriesvideosValue._id, req.body);
      if (accessoriesvideosUpdate) {
        var insertedId = accessoriesvideosUpdate._id.toString();
        var last5Digit = insertedId.substring(insertedId.length - 5, insertedId.length);
        var updatedSlug = `${req.body.slug}-${last5Digit}`;
        let newprobeFinderSlugUpdate = await accessoriesvideosRepo.updateById(insertedId, { slug: updatedSlug });
        if (newprobeFinderSlugUpdate) {
          req.flash("success", "Accessoriesvideos Updated Successfully");
          res.redirect(namedRouter.urlFor("admin.accessoriesvideos.list"));
        }
      } else {
        res.redirect(namedRouter.urlFor("admin.accessoriesvideos.edit", { id: req.body.id }));
      }

    } catch (e) {
      req.flash("error", e.message);
      res.redirect(namedRouter.urlFor("admin.accessoriesvideos.edit", {
        id: req.body.id
      }));
    }
  }

  async getAll(req, res) {
    try {
      let accessoriesvideos = await accessoriesvideosRepo.getAll(req);

      if (_.has(req.body, "sort")) {
        var sortOrder = req.body.sort.sort;
        var sortField = req.body.sort.field;
      } else {
        var sortOrder = -1;
        var sortField = "_id";
      }
      let meta = {
        page: req.body.pagination.page,
        pages: accessoriesvideos.pageCount,
        perpage: req.body.pagination.perpage,
        total: accessoriesvideos.totalCount,
        sort: sortOrder,
        field: sortField,
      };

      return {
        status: 200,
        meta: meta,
        data: accessoriesvideos.data,
        message: `Data fetched succesfully.`,
      };
    } catch (e) {
      throw e;
    }
  }

  async edit(req, res) {
    try {
      let accessoriesvideos = await accessoriesvideosRepo.getById(req.params.id);
      if (!_.isEmpty(accessoriesvideos)) {
        res.render("accessoriesvideos/views/edit.ejs", {
          page_name: "accessoriesvideos-management",
          page_title: "Accessoriesvideos Edit",
          user: req.user,
          permission: req.permission,
          response: accessoriesvideos,
        });
      } else {
        req.flash("error", "Sorry, record not found!");
        res.redirect(namedRouter.urlFor("admin.accessoriesvideos.list"));
      }
    } catch (e) {
      return res.status(500).send({
        message: e.message
      });
    }
  }

  async delete(req, res) {
    try {

      let accessoriesvideosValue = await accessoriesvideosRepo.getById(req.params.id);
      if (accessoriesvideosValue) {
        if (fs.existsSync('./public/uploads/accessoriesvideos/' + accessoriesvideosValue.media) && accessoriesvideosValue.media) {
          fs.unlinkSync('./public/uploads/accessoriesvideos/' + accessoriesvideosValue.media);
        }
      }

      let accessoriesvideosDelete = await accessoriesvideosRepo.updateById(req.params.id, {
        isDeleted: true,
      });
      req.flash("success", "Accessoriesvideos removed successfully");
      res.redirect(namedRouter.urlFor("admin.accessoriesvideos.list"));

    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  async statusChange(req, res) {
    try {


      let accessoriesvideos = await accessoriesvideosRepo.getById(req.params.id);
      if (!_.isEmpty(accessoriesvideos)) {
        let accessoriesvideosStatus =
          accessoriesvideos.status == "Active" ? "Inactive" : "Active";
        let accessoriesvideosUpdate = accessoriesvideosRepo.updateById(req.params.id, {
          status: accessoriesvideosStatus,
        });

        req.flash("success", "Accessoriesvideos status has changed successfully");
        res.redirect(namedRouter.urlFor("admin.accessoriesvideos.list"));
      }

    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }


}

module.exports = new AccessoriesvideosController();