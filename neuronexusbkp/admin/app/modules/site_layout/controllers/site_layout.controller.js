const express = require("express");
const mongoose = require("mongoose");
const routeLabel = require("route-label");
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require("querystring");
const probeFinderRepo = require("probe_finder/repositories/probe_finder.repository");


const siteLayoutRepo = require("site_layout/repositories/site_layout.repository");

const errorHandler = require("../../../errorHandler");
const fs = require("fs");
const gm = require("gm").subClass({
  imageMagick: true,
});
const slug = require("slug");

class siteLayoutController {
  constructor() { }

  async list(req, res) {
    try {
      res.render("site_layout/views/list.ejs", {
        page_name: "siteLayout-management",
        page_title: "Site Layout List",
        user: req.user,
        permission: req.permission,
      });
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  }

  async create(req, res) {
    try {
      res.render("site_layout/views/add.ejs", {
        page_name: "siteLayout-management",
        page_title: "Site Layout Add",
        user: req.user,
        permission: req.permission,
      });
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  }


  async store(req, res) {
    try {
      let checkData = await siteLayoutRepo.getByField({
        title: req.body.title,
        isDeleted: false,
      });
      if (_.isEmpty(checkData)) {
        let newsiteLayout = await siteLayoutRepo.save(req.body);
        if (newsiteLayout) {
          let slugData = slug(newsiteLayout.title, { lower: true, replacement: "-" });
          var insertedId = newsiteLayout._id.toString();
          var last5Digit = insertedId.substring(insertedId.length - 5, insertedId.length);
          var updatedSlug = `${slugData}-${last5Digit}`;

          let newnewsiteLayoutSlugUpdate = await siteLayoutRepo.updateById(insertedId, { slug: updatedSlug });
          if (newnewsiteLayoutSlugUpdate) {
            req.flash("success", "Site Layout created succesfully.");
            res.redirect(namedRouter.urlFor("admin.site-layout.list"));
          }
        }
      } else {
        req.flash("error", "Site Layout exist with same name");
        res.redirect(namedRouter.urlFor("admin.site-layout.create"));
      }
    } catch (e) {

      req.flash("error", e.message);
      res.redirect(namedRouter.urlFor("admin.site-layout.create"));
    }
  }

  async update(req, res) {
    try {
      let checkData = await siteLayoutRepo.getByField({ 'isDeleted': false, '_id': req.body.id });
      if (checkData) {

        let siteLayoutUpdate = await siteLayoutRepo.updateById(checkData._id, req.body);
        if (siteLayoutUpdate) {

          let slugData = slug(siteLayoutUpdate.title, { lower: true, replacement: "-" });
          var insertedId = siteLayoutUpdate._id.toString();
          var last5Digit = insertedId.substring(insertedId.length - 5, insertedId.length);
          var updatedSlug = `${slugData}-${last5Digit}`;

          let newnewsiteLayoutSlugUpdate = await siteLayoutRepo.updateById(insertedId, { slug: updatedSlug });
          if (newnewsiteLayoutSlugUpdate) {
            req.flash("success", "Site Layout Updated Successfully");
            res.redirect(namedRouter.urlFor("admin.site-layout.list"));
          }
        } else {
          req.flash("error", "Site Layout Update faild");
          res.redirect(namedRouter.urlFor("admin.site-layout.edit", { id: checkData._id }));
        }
      } else {
        req.flash("error", "Not found");
        res.redirect(namedRouter.urlFor("admin.site-layout.list"));
      }
    } catch (e) {

      req.flash("error", e.message);
      res.redirect(
        namedRouter.urlFor("admin.site-layout.edit", { id: req.body.id })
      );
    }
  }

  async getAll(req, res) {
    try {
      let probeFinder = await siteLayoutRepo.getAll(req);
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
      let siteLayout = await siteLayoutRepo.getById(req.params.id);

      if (!_.isEmpty(siteLayout)) {
        res.render("site_layout/views/edit.ejs", {
          page_name: "siteLayout-management",
          page_title: "Site Layout Edit",
          user: req.user,
          response: siteLayout,
          permission: req.permission,
        });
      } else {
        req.flash("error", "Sorry, record not found!");
        res.redirect(namedRouter.urlFor("admin.site-layout.list"));
      }
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  }

  async delete(req, res) {
    try {
      let checksiteLayout = await siteLayoutRepo.getById(req.params.id);
      if (checksiteLayout) {
        let checkProbeFinder = await probeFinderRepo.getByField({ 'site_layout_id': checksiteLayout._id });
        if (_.isEmpty(checkProbeFinder)) {
          let channelDelete = await siteLayoutRepo.delete(checksiteLayout._id);
          if (channelDelete) {
            req.flash("success", "Site Layout removed successfully");
            res.redirect(namedRouter.urlFor("admin.site-layout.list"));
          }
        } else {
          req.flash("error", "Sorry! This site-Layout already used anather product");
          res.redirect(namedRouter.urlFor("admin.site-layout.list"));
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
      let siteLayout = await siteLayoutRepo.getById(req.params.id);
      if (!_.isEmpty(siteLayout)) {
        let siteLayoutStatus = (siteLayout.status == "Active" ? "Inactive" : "Active");
        let siteLayoutUpdate = siteLayoutRepo.updateById(req.params.id, { status: siteLayoutStatus });
        if (siteLayoutUpdate) {
          req.flash("success", "Site Layout status has changed successfully");
          res.redirect(namedRouter.urlFor("admin.site-layout.list"));
        }
      }

    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }


}

module.exports = new siteLayoutController();
