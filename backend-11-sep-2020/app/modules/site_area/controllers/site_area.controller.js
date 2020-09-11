const express = require("express");
const mongoose = require("mongoose");
const routeLabel = require("route-label");
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require("querystring");
const probeFinderRepo = require("probe_finder/repositories/probe_finder.repository");


const siteAreaRepo = require("site_area/repositories/site_area.repository");

const errorHandler = require("../../../errorHandler");
const fs = require("fs");
const gm = require("gm").subClass({
  imageMagick: true,
});
const slug = require("slug");

class siteAreaController {
  constructor() { }

  async list(req, res) {
    try {
      res.render("site_area/views/list.ejs", {
        page_name: "siteArea-management",
        page_title: "Site Area List",
        user: req.user,
        permission: req.permission,
      });
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  }

  async create(req, res) {
    try {
      res.render("site_area/views/add.ejs", {
        page_name: "siteArea-management",
        page_title: "Site Area Add",
        user: req.user,
        permission: req.permission,
      });
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  }


  async store(req, res) {
    try {
      let checkData = await siteAreaRepo.getByField({
        title: req.body.title,
        isDeleted: false,
      });
      if (_.isEmpty(checkData)) {
        let newsiteArea = await siteAreaRepo.save(req.body);
        if (newsiteArea) {
          let slugData = slug(newsiteArea.title, { lower: true, replacement: "-" });
          var insertedId = newsiteArea._id.toString();
          var last5Digit = insertedId.substring(insertedId.length - 5, insertedId.length);
          var updatedSlug = `${slugData}-${last5Digit}`;

          let newnewsiteAreaSlugUpdate = await siteAreaRepo.updateById(insertedId, { slug: updatedSlug });
          if (newnewsiteAreaSlugUpdate) {
            req.flash("success", "Site Area created succesfully.");
            res.redirect(namedRouter.urlFor("admin.site-area.list"));
          }
        }
      } else {
        req.flash("error", "Site Area exist with same name");
        res.redirect(namedRouter.urlFor("admin.site-area.create"));
      }
    } catch (e) {

      req.flash("error", e.message);
      res.redirect(namedRouter.urlFor("admin.site-area.create"));
    }
  }

  async update(req, res) {
    try {
      let checkData = await siteAreaRepo.getByField({ 'isDeleted': false, '_id': req.body.id });
      if (checkData) {

        let siteAreaUpdate = await siteAreaRepo.updateById(checkData._id, req.body);
        if (siteAreaUpdate) {

          let slugData = slug(siteAreaUpdate.title, { lower: true, replacement: "-" });
          var insertedId = siteAreaUpdate._id.toString();
          var last5Digit = insertedId.substring(insertedId.length - 5, insertedId.length);
          var updatedSlug = `${slugData}-${last5Digit}`;

          let newnewsiteAreaSlugUpdate = await siteAreaRepo.updateById(insertedId, { slug: updatedSlug });
          if (newnewsiteAreaSlugUpdate) {
            req.flash("success", "Site Area Updated Successfully");
            res.redirect(namedRouter.urlFor("admin.site-area.list"));
          }
        } else {
          req.flash("error", "Site Area Update faild");
          res.redirect(namedRouter.urlFor("admin.site-area.edit", { id: checkData._id }));
        }
      } else {
        req.flash("error", "Not found");
        res.redirect(namedRouter.urlFor("admin.site-area.list"));
      }
    } catch (e) {

      req.flash("error", e.message);
      res.redirect(
        namedRouter.urlFor("admin.site-area.edit", { id: req.body.id })
      );
    }
  }

  async getAll(req, res) {
    try {
      let probeFinder = await siteAreaRepo.getAll(req);
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
      let siteArea = await siteAreaRepo.getById(req.params.id);

      if (!_.isEmpty(siteArea)) {
        res.render("site_area/views/edit.ejs", {
          page_name: "siteArea-management",
          page_title: "Site Area Edit",
          user: req.user,
          response: siteArea,
          permission: req.permission,
        });
      } else {
        req.flash("error", "Sorry, record not found!");
        res.redirect(namedRouter.urlFor("admin.site-area.list"));
      }
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  }

  async delete(req, res) {
    try {
      let checksiteArea = await siteAreaRepo.getById(req.params.id);
      if (checksiteArea) {
        let checkProbeFinder = await probeFinderRepo.getByField({ 'site_area_id': checksiteArea._id });
        if (_.isEmpty(checkProbeFinder)) {
          let channelDelete = await siteAreaRepo.delete(checksiteArea._id);
          if (channelDelete) {
            req.flash("success", "Site Area removed successfully");
            res.redirect(namedRouter.urlFor("admin.site-area.list"));
          }
        } else {
          req.flash("error", "Sorry! This site-area already used anather product");
          res.redirect(namedRouter.urlFor("admin.site-area.list"));
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
      let siteArea = await siteAreaRepo.getById(req.params.id);
      if (!_.isEmpty(siteArea)) {
        let siteAreaStatus = (siteArea.status == "Active" ? "Inactive" : "Active");
        let siteAreaUpdate = siteAreaRepo.updateById(req.params.id, { status: siteAreaStatus });
        if (siteAreaUpdate) {
          req.flash("success", "Site Area status has changed successfully");
          res.redirect(namedRouter.urlFor("admin.site-area.list"));
        }
      }

    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }


}

module.exports = new siteAreaController();
