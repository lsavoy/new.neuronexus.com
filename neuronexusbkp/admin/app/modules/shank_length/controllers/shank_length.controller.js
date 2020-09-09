const express = require("express");
const mongoose = require("mongoose");
const routeLabel = require("route-label");
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require("querystring");
const probeFinderRepo = require("probe_finder/repositories/probe_finder.repository");

const shankLengthRepo = require("shank_length/repositories/shank_length.repository");

const errorHandler = require("../../../errorHandler");
const fs = require("fs");
const gm = require("gm").subClass({
  imageMagick: true,
});
const slug = require("slug");

class shankLengthController {
  constructor() { }

  async list(req, res) {
    try {
      res.render("shank_length/views/list.ejs", {
        page_name: "shankLength-management",
        page_title: "Shank Length List",
        user: req.user,
        permission: req.permission,
      });
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  }

  async create(req, res) {
    try {
      res.render("shank_length/views/add.ejs", {
        page_name: "shankLength-management",
        page_title: "Shank Length Add",
        user: req.user,
        permission: req.permission,
      });
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  }


  async store(req, res) {
    try {
      let checkData = await shankLengthRepo.getByField({
        title: req.body.title,
        isDeleted: false,
      });
      if (_.isEmpty(checkData)) {
        let newshankLength = await shankLengthRepo.save(req.body);
        if (newshankLength) {
          let slugData = slug(newshankLength.title, { lower: true, replacement: "-" });
          var insertedId = newshankLength._id.toString();
          var last5Digit = insertedId.substring(insertedId.length - 5, insertedId.length);
          var updatedSlug = `${slugData}-${last5Digit}`;

          let newnewshankLengthSlugUpdate = await shankLengthRepo.updateById(insertedId, { slug: updatedSlug });
          if (newnewshankLengthSlugUpdate) {
            req.flash("success", "Shank Length created succesfully.");
            res.redirect(namedRouter.urlFor("admin.shank-length.list"));
          }
        }
      } else {
        req.flash("error", "Shank Length exist with same name");
        res.redirect(namedRouter.urlFor("admin.shank-length.create"));
      }
    } catch (e) {

      req.flash("error", e.message);
      res.redirect(namedRouter.urlFor("admin.shank-length.create"));
    }
  }

  async update(req, res) {
    try {
      let checkData = await shankLengthRepo.getByField({ 'isDeleted': false, '_id': req.body.id });
      if (checkData) {

        let shankLengthUpdate = await shankLengthRepo.updateById(checkData._id, req.body);
        if (shankLengthUpdate) {

          let slugData = slug(shankLengthUpdate.title, { lower: true, replacement: "-" });
          var insertedId = shankLengthUpdate._id.toString();
          var last5Digit = insertedId.substring(insertedId.length - 5, insertedId.length);
          var updatedSlug = `${slugData}-${last5Digit}`;

          let newnewshankLengthSlugUpdate = await shankLengthRepo.updateById(insertedId, { slug: updatedSlug });
          if (newnewshankLengthSlugUpdate) {
            req.flash("success", "Shank Length Updated Successfully");
            res.redirect(namedRouter.urlFor("admin.shank-length.list"));
          }
        } else {
          req.flash("error", "Shank Length Update faild");
          res.redirect(namedRouter.urlFor("admin.shank-length.edit", { id: checkData._id }));
        }
      } else {
        req.flash("error", "Not found");
        res.redirect(namedRouter.urlFor("admin.shank-length.list"));
      }
    } catch (e) {

      req.flash("error", e.message);
      res.redirect(
        namedRouter.urlFor("admin.shank-length.edit", { id: req.body.id })
      );
    }
  }

  async getAll(req, res) {
    try {
      let probeFinder = await shankLengthRepo.getAll(req);
      if (_.has(req.body, "sort")) {
        var sortOrder = req.body.sort.sort;
        var sortField = req.body.sort.field;
      } else {
        var sortOrder = -1;
        var sortField = "_id";
      }
      let meta = {
        page: req.body.pagination.page,
        pages: probeFinder.pageCount,
        perpage: req.body.pagination.perpage,
        total: probeFinder.totalCount,
        sort: sortOrder,
        field: sortField,
      };

      return {
        status: 200,
        meta: meta,
        data: probeFinder.data,
        message: `Data fetched succesfully.`,
      };
    } catch (e) {

      throw e;
    }
  }

  async edit(req, res) {
    try {
      let shankLength = await shankLengthRepo.getById(req.params.id);

      if (!_.isEmpty(shankLength)) {
        res.render("shank_length/views/edit.ejs", {
          page_name: "shankLength-management",
          page_title: "Shank Length Edit",
          user: req.user,
          response: shankLength,
          permission: req.permission,
        });
      } else {
        req.flash("error", "Sorry, record not found!");
        res.redirect(namedRouter.urlFor("admin.shank-length.list"));
      }
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  }

  async delete(req, res) {
    try {
      let checkshankLength = await shankLengthRepo.getById(req.params.id);
      if (checkshankLength) {
        let checkProbeFinder = await probeFinderRepo.getByField({ 'shank_length_id': checkshankLength._id });
        if (_.isEmpty(checkProbeFinder)) {
          let channelDelete = await shankLengthRepo.delete(checkshankLength._id);
          if (channelDelete) {
            req.flash("success", "Shank Length removed successfully");
            res.redirect(namedRouter.urlFor("admin.shank-length.list"));
          }
        } else {
          req.flash("error", "Sorry! This shank-length already used anather product");
          res.redirect(namedRouter.urlFor("admin.shank-length.list"));
        }
      }
    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  async statusChange(req, res) {
    try {
      let shankLength = await shankLengthRepo.getById(req.params.id);
      if (!_.isEmpty(shankLength)) {
        let shankLengthStatus = (shankLength.status == "Active" ? "Inactive" : "Active");
        let shankLengthUpdate = shankLengthRepo.updateById(req.params.id, { status: shankLengthStatus });
        if (shankLengthUpdate) {
          req.flash("success", "Shank Length status has changed successfully");
          res.redirect(namedRouter.urlFor("admin.shank-length.list"));
        }
      }

    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }


}

module.exports = new shankLengthController();
