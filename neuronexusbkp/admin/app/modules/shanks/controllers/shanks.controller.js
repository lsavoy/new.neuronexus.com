const express = require("express");
const mongoose = require("mongoose");
const routeLabel = require("route-label");
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require("querystring");
const probeFinderRepo = require("probe_finder/repositories/probe_finder.repository");


const shanksRepo = require("shanks/repositories/shanks.repository");

const errorHandler = require("../../../errorHandler");
const fs = require("fs");
const gm = require("gm").subClass({
  imageMagick: true,
});
const slug = require("slug");

class channelController {
  constructor() { }

  async list(req, res) {
    try {
      res.render("shanks/views/list.ejs", {
        page_name: "shanks-management",
        page_title: "Shanks List",
        user: req.user,
        permission: req.permission,
      });
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  }

  async create(req, res) {
    try {
      res.render("shanks/views/add.ejs", {
        page_name: "shanks-management",
        page_title: "Shanks Add",
        user: req.user,
        permission: req.permission,
      });
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  }


  async store(req, res) {
    try {
      let checkData = await shanksRepo.getByField({
        title: req.body.title,
        isDeleted: false,
      });
      if (_.isEmpty(checkData)) {
        let newshanks = await shanksRepo.save(req.body);
        if (newshanks) {
          let slugData = slug(newshanks.title, { lower: true, replacement: "-" });
          var insertedId = newshanks._id.toString();
          var last5Digit = insertedId.substring(insertedId.length - 5, insertedId.length);
          var updatedSlug = `${slugData}-${last5Digit}`;

          let newnewshanksSlugUpdate = await shanksRepo.updateById(insertedId, { slug: updatedSlug });
          if (newnewshanksSlugUpdate) {
            req.flash("success", "shanks created succesfully.");
            res.redirect(namedRouter.urlFor("admin.shanks.list"));
          }
        }
      } else {
        req.flash("error", "shanks exist with same name");
        res.redirect(namedRouter.urlFor("admin.shanks.create"));
      }
    } catch (e) {

      req.flash("error", e.message);
      res.redirect(namedRouter.urlFor("admin.shanks.create"));
    }
  }

  async update(req, res) {
    try {
      let checkData = await shanksRepo.getByField({ 'isDeleted': false, '_id': req.body.id });
      if (checkData) {

        let shanksUpdate = await shanksRepo.updateById(checkData._id, req.body);
        if (shanksUpdate) {

          let slugData = slug(shanksUpdate.title, { lower: true, replacement: "-" });
          var insertedId = shanksUpdate._id.toString();
          var last5Digit = insertedId.substring(insertedId.length - 5, insertedId.length);
          var updatedSlug = `${slugData}-${last5Digit}`;

          let newnewshanksSlugUpdate = await shanksRepo.updateById(insertedId, { slug: updatedSlug });
          if (newnewshanksSlugUpdate) {
            req.flash("success", "shanks Updated Successfully");
            res.redirect(namedRouter.urlFor("admin.shanks.list"));
          }
        } else {
          req.flash("error", "shanks Update faild");
          res.redirect(namedRouter.urlFor("admin.shanks.edit", { id: checkData._id }));
        }
      } else {
        req.flash("error", "Not found");
        res.redirect(namedRouter.urlFor("admin.shanks.list"));
      }
    } catch (e) {

      req.flash("error", e.message);
      res.redirect(
        namedRouter.urlFor("admin.shanks.edit", { id: req.body.id })
      );
    }
  }

  async getAll(req, res) {
    try {
      let probeFinder = await shanksRepo.getAll(req);
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
      let shanks = await shanksRepo.getById(req.params.id);

      if (!_.isEmpty(shanks)) {
        res.render("shanks/views/edit.ejs", {
          page_name: "shanks-management",
          page_title: "Shanks Edit",
          user: req.user,
          response: shanks,
          permission: req.permission,
        });
      } else {
        req.flash("error", "Sorry, record not found!");
        res.redirect(namedRouter.urlFor("admin.shanks.list"));
      }
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  }

  async delete(req, res) {
    try {
      let checkshanks = await shanksRepo.getById(req.params.id);
      if (checkshanks) {
        let checkProbeFinder = await probeFinderRepo.getByField({ 'shanks_id': checkshanks._id });
        if (_.isEmpty(checkProbeFinder)) {
          let channelDelete = await shanksRepo.delete(checkshanks._id);
          if (channelDelete) {
            req.flash("success", "shanks removed successfully");
            res.redirect(namedRouter.urlFor("admin.shanks.list"));
          }
        } else {
          req.flash("error", "Sorry! This chennel already used anather product");
          res.redirect(namedRouter.urlFor("admin.shanks.list"));
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
      let shanks = await shanksRepo.getById(req.params.id);
      if (!_.isEmpty(shanks)) {
        let shanksStatus = (shanks.status == "Active" ? "Inactive" : "Active");
        let shanksUpdate = shanksRepo.updateById(req.params.id, { status: shanksStatus });
        if (shanksUpdate) {
          req.flash("success", "Shanks status has changed successfully");
          res.redirect(namedRouter.urlFor("admin.shanks.list"));
        }
      }

    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }


}

module.exports = new channelController();
