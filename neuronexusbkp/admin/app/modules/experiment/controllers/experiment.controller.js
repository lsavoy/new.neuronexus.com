const express = require("express");
const mongoose = require("mongoose");
const routeLabel = require("route-label");
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require("querystring");
const probeFinderRepo = require("probe_finder/repositories/probe_finder.repository");


const experimentRepo = require("experiment/repositories/experiment.repository");

const errorHandler = require("../../../errorHandler");
const fs = require("fs");
const gm = require("gm").subClass({
  imageMagick: true,
});
const slug = require("slug");

class experimentController {
  constructor() { }

  async list(req, res) {
    try {
      res.render("experiment/views/list.ejs", {
        page_name: "experiment-management",
        page_title: "Experiment List",
        user: req.user,
        permission: req.permission,
      });
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  }

  async create(req, res) {
    try {
      res.render("experiment/views/add.ejs", {
        page_name: "experiment-management",
        page_title: "Experiment Add",
        user: req.user,
        permission: req.permission,
      });
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  }


  async store(req, res) {
    try {
      let checkData = await experimentRepo.getByField({
        title: req.body.title,
        isDeleted: false,
      });
      if (_.isEmpty(checkData)) {
        let newexperiment = await experimentRepo.save(req.body);
        if (newexperiment) {
          let slugData = slug(newexperiment.title, { lower: true, replacement: "-" });
          var insertedId = newexperiment._id.toString();
          var last5Digit = insertedId.substring(insertedId.length - 5, insertedId.length);
          var updatedSlug = `${slugData}-${last5Digit}`;

          let newnewexperimentSlugUpdate = await experimentRepo.updateById(insertedId, { slug: updatedSlug });
          if (newnewexperimentSlugUpdate) {
            req.flash("success", "Experiment created succesfully.");
            res.redirect(namedRouter.urlFor("admin.experiment.list"));
          }
        }
      } else {
        req.flash("error", "Experiment exist with same name");
        res.redirect(namedRouter.urlFor("admin.experiment.create"));
      }
    } catch (e) {

      req.flash("error", e.message);
      res.redirect(namedRouter.urlFor("admin.experiment.create"));
    }
  }

  async update(req, res) {
    try {
      let checkData = await experimentRepo.getByField({ 'isDeleted': false, '_id': req.body.id });
      if (checkData) {

        let experimentUpdate = await experimentRepo.updateById(checkData._id, req.body);
        if (experimentUpdate) {

          let slugData = slug(experimentUpdate.title, { lower: true, replacement: "-" });
          var insertedId = experimentUpdate._id.toString();
          var last5Digit = insertedId.substring(insertedId.length - 5, insertedId.length);
          var updatedSlug = `${slugData}-${last5Digit}`;

          let newnewexperimentSlugUpdate = await experimentRepo.updateById(insertedId, { slug: updatedSlug });
          if (newnewexperimentSlugUpdate) {
            req.flash("success", "Experiment Updated Successfully");
            res.redirect(namedRouter.urlFor("admin.experiment.list"));
          }
        } else {
          req.flash("error", "Experiment Update faild");
          res.redirect(namedRouter.urlFor("admin.experiment.edit", { id: checkData._id }));
        }
      } else {
        req.flash("error", "Not found");
        res.redirect(namedRouter.urlFor("admin.experiment.list"));
      }
    } catch (e) {

      req.flash("error", e.message);
      res.redirect(
        namedRouter.urlFor("admin.experiment.edit", { id: req.body.id })
      );
    }
  }

  async getAll(req, res) {
    try {
      let probeFinder = await experimentRepo.getAll(req);
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
      let experiment = await experimentRepo.getById(req.params.id);

      if (!_.isEmpty(experiment)) {
        res.render("experiment/views/edit.ejs", {
          page_name: "experiment-management",
          page_title: "Experiment Edit",
          user: req.user,
          response: experiment,
          permission: req.permission,
        });
      } else {
        req.flash("error", "Sorry, record not found!");
        res.redirect(namedRouter.urlFor("admin.experiment.list"));
      }
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  }

  async delete(req, res) {
    try {
      let checkexperiment = await experimentRepo.getById(req.params.id);
      if (checkexperiment) {
        let checkProbeFinder = await probeFinderRepo.getByField({ 'experiment_id': checkexperiment._id });
        if (_.isEmpty(checkProbeFinder)) {
          let channelDelete = await experimentRepo.delete(checkexperiment._id);
          if (channelDelete) {
            req.flash("success", "Experiment removed successfully");
            res.redirect(namedRouter.urlFor("admin.experiment.list"));
          }
        } else {
          req.flash("error", "Sorry! This Experiment already used anather product");
          res.redirect(namedRouter.urlFor("admin.experiment.list"));
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
      let experiment = await experimentRepo.getById(req.params.id);
      if (!_.isEmpty(experiment)) {
        let experimentStatus = (experiment.status == "Active" ? "Inactive" : "Active");
        let experimentUpdate = experimentRepo.updateById(req.params.id, { status: experimentStatus });
        if (experimentUpdate) {
          req.flash("success", "Experiment status has changed successfully");
          res.redirect(namedRouter.urlFor("admin.experiment.list"));
        }
      }

    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }


}

module.exports = new experimentController();
