const express = require("express");
const mongoose = require("mongoose");
const routeLabel = require("route-label");
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require("querystring");

const channelsRepo = require("channels/repositories/channels.repository");

const probeFinderRepo = require("probe_finder/repositories/probe_finder.repository");

const slug = require("slug");

class channelController {
  constructor() { }

  async list(req, res) {
    try {
      res.render("channels/views/list.ejs", {
        page_name: "channels-management",
        page_title: "Channels List",
        user: req.user,
        permission: req.permission,
      });
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  }

  async create(req, res) {
    try {
      res.render("channels/views/add.ejs", {
        page_name: "channels-management",
        page_title: "Channels Add",
        user: req.user,
        permission: req.permission,
      });
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  }


  async store(req, res) {
    try {
      let checkData = await channelsRepo.getByField({
        title: req.body.title,
        isDeleted: false,
      });
      if (_.isEmpty(checkData)) {
        let newchannels = await channelsRepo.save(req.body);
        if (newchannels) {
          let slugData = slug(newchannels.title, { lower: true, replacement: "-" });
          var insertedId = newchannels._id.toString();
          var last5Digit = insertedId.substring(insertedId.length - 5, insertedId.length);
          var updatedSlug = `${slugData}-${last5Digit}`;

          let newnewchannelsSlugUpdate = await channelsRepo.updateById(insertedId, { slug: updatedSlug });
          if (newnewchannelsSlugUpdate) {
            req.flash("success", "Channels created succesfully.");
            res.redirect(namedRouter.urlFor("admin.channels.list"));
          }
        }
      } else {
        req.flash("error", "Channels exist with same name");
        res.redirect(namedRouter.urlFor("admin.channels.create"));
      }
    } catch (e) {

      req.flash("error", e.message);
      res.redirect(namedRouter.urlFor("admin.channels.create"));
    }
  }

  async update(req, res) {
    try {
      let checkData = await channelsRepo.getByField({ 'isDeleted': false, '_id': req.body.id });
      if (checkData) {

        let channelsUpdate = await channelsRepo.updateById(checkData._id, req.body);
        if (channelsUpdate) {

          let slugData = slug(channelsUpdate.title, { lower: true, replacement: "-" });
          var insertedId = channelsUpdate._id.toString();
          var last5Digit = insertedId.substring(insertedId.length - 5, insertedId.length);
          var updatedSlug = `${slugData}-${last5Digit}`;

          let newnewchannelsSlugUpdate = await channelsRepo.updateById(insertedId, { slug: updatedSlug });
          if (newnewchannelsSlugUpdate) {
            req.flash("success", "Channels Updated Successfully");
            res.redirect(namedRouter.urlFor("admin.channels.list"));
          }
        } else {
          req.flash("error", "Channels Update faild");
          res.redirect(namedRouter.urlFor("admin.channels.edit", { id: checkData._id }));
        }
      } else {
        req.flash("error", "Not found");
        res.redirect(namedRouter.urlFor("admin.channels.list"));
      }
    } catch (e) {

      req.flash("error", e.message);
      res.redirect(
        namedRouter.urlFor("admin.channels.edit", { id: req.body.id })
      );
    }
  }

  async getAll(req, res) {
    try {
      let probeFinder = await channelsRepo.getAll(req);
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
      let channels = await channelsRepo.getById(req.params.id);

      if (!_.isEmpty(channels)) {
        res.render("channels/views/edit.ejs", {
          page_name: "channels-management",
          page_title: "Channels Edit",
          user: req.user,
          response: channels,
          permission: req.permission,
        });
      } else {
        req.flash("error", "Sorry, record not found!");
        res.redirect(namedRouter.urlFor("admin.channels.list"));
      }
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  }

  async delete(req, res) {
    try {

      let checkChannels = await channelsRepo.getById(req.params.id);
      if (checkChannels) {
        let checkProbeFinder = await probeFinderRepo.getByField({ 'channel_id': checkChannels._id });
        if (_.isEmpty(checkProbeFinder)) {
          let channelDelete = await channelsRepo.delete(checkChannels._id);
          if (channelDelete) {
            req.flash("success", "Channels removed successfully");
            res.redirect(namedRouter.urlFor("admin.channels.list"));
          }

        } else {
          req.flash("error", "Sorry! This chennel already used anather product");
          res.redirect(namedRouter.urlFor("admin.channels.list"));
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
      let channels = await channelsRepo.getById(req.params.id);
      if (!_.isEmpty(channels)) {
        let channelsStatus = (channels.status == "Active" ? "Inactive" : "Active");
        let channelsUpdate = channelsRepo.updateById(req.params.id, { status: channelsStatus });
        if (channelsUpdate) {
          req.flash("success", "Channel status has changed successfully");
          res.redirect(namedRouter.urlFor("admin.channels.list"));
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
