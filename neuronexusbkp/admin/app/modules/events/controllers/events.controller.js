const express = require("express");
const mongoose = require("mongoose");
const routeLabel = require("route-label");
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require("querystring");
const eventsRepo = require("events/repositories/events.repository");
const errorHandler = require("../../../errorHandler");
const fs = require("fs");
const gm = require("gm").subClass({
  imageMagick: true,
});

const slug = require("slug");

class EventsController {
  constructor() { }


  /*
  // @Method: editmeet_the_team
  // @Description:  Edit meet_the_team page Content
  */
  async editevents_static_contents(req, res) {
    try {
      let result = {};
      let cms = await eventsRepo.events_static_contentsGetByField({ "isDeleted": false });
      if (!_.isEmpty(cms)) {
        result.cms_data = cms;
        res.render('events/views/edit_events_static_contents.ejs', {
          page_name: 'events-static-management',
          page_title: 'Events Update page',
          user: req.user,
          permission: req.permission,
          response: result
        });
      } else {
        req.flash('error', "Sorry record not found!");

      }
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  };

  /* @Method: update
  // @Description: coupon update action
  */
  async updateevents_static_contents(req, res) {
    try {
      const aboutId = req.body.id;

      let about = await eventsRepo.events_static_contentsGetByField({
        _id: req.body.id,
        'isDeleted': false
      });
      if (req.files.length > 0) {
        for (let i = 0; i < req.files.length; i++) {


          if (req.files[i].fieldname == 'header_banner_image') {
            if (fs.existsSync('./public/uploads/events/' + about.header_banner_image) && about.header_banner_image) {
              fs.unlinkSync('./public/uploads/events/' + about.header_banner_image);
            }
            req.body.header_banner_image = req.files[i].filename;
          }

        }
      }


      let cmsIdUpdate = eventsRepo.events_static_contentsUpdateById(req.body, aboutId)
      if (cmsIdUpdate) {
        req.flash('success', "Content updated successfully");
        res.redirect(namedRouter.urlFor('admin.events_update.editstatic'));
      }


    } catch (e) {
      return res.status(500).send({ message: e.message });
    }

  };

  async list(req, res) {
    try {
      res.render("events/views/list.ejs", {
        page_name: "events-management",
        page_title: "Events",
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
      res.render("events/views/add.ejs", {
        page_name: "events-management",
        page_title: "Create New Events",
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

      // console.log(req.body)
      // if (req.files && req.files.length > 0) {
      //   for (let i = 0; i < req.files.length; i++) {
      //     req.body.image = req.files[i].filename;
      //   }
      // }
      req.body.slug = slug(req.body.title, { lower: true, replacement: "-" });
      let newEvents = await eventsRepo.save(req.body);
      if (newEvents) {
        var insertedId = newEvents._id.toString();
        var last5Digit = insertedId.substring(insertedId.length - 5, insertedId.length);
        var updatedSlug = `${req.body.slug}-${last5Digit}`;

        let newprobeFinderSlugUpdate = await eventsRepo.updateById(insertedId, { slug: updatedSlug });
        if (newprobeFinderSlugUpdate) {
          req.flash("success", "Events created succesfully.");
          res.redirect(namedRouter.urlFor("admin.events.list"));
        }
      }

    } catch (e) {
      const error = errorHandler(e);
      req.flash("error", error.message);
      res.redirect(namedRouter.urlFor("admin.events.create"));
    }
  }

  async update(req, res) {
    try {


      let eventsValue = await eventsRepo.getById(req.body.id);

      // if (req.files && req.files.length > 0) {

      //   if (fs.existsSync('./public/uploads/events/' + eventsValue.image) && eventsValue.image) {
      //     fs.unlinkSync('./public/uploads/events/' + eventsValue.image);
      //   }

      //   for (let i = 0; i < req.files.length; i++) {
      //     req.body.image = req.files[i].filename;
      //   }
      // }

      //if(checkData.slug == '' || checkData.slug == undefined || checkData.slug ==  null){
      req.body.slug = slug(req.body.title, { lower: true, replacement: "-" });
      //}

      let eventsUpdate = await eventsRepo.updateById(eventsValue._id, req.body);
      if (eventsUpdate) {
        var insertedId = eventsUpdate._id.toString();
        var last5Digit = insertedId.substring(insertedId.length - 5, insertedId.length);
        var updatedSlug = `${req.body.slug}-${last5Digit}`;
        let newprobeFinderSlugUpdate = await eventsRepo.updateById(insertedId, { slug: updatedSlug });
        if (newprobeFinderSlugUpdate) {
          req.flash("success", "Events Updated Successfully");
          res.redirect(namedRouter.urlFor("admin.events.list"));
        }
      } else {
        res.redirect(namedRouter.urlFor("admin.events.edit", { id: req.body.id }));
      }

    } catch (e) {
      req.flash("error", e.message);
      res.redirect(namedRouter.urlFor("admin.events.edit", {
        id: req.body.id
      }));
    }
  }

  async getAll(req, res) {
    try {
      let events = await eventsRepo.getAll(req);

      if (_.has(req.body, "sort")) {
        var sortOrder = req.body.sort.sort;
        var sortField = req.body.sort.field;
      } else {
        var sortOrder = -1;
        var sortField = "_id";
      }
      let meta = {
        page: req.body.pagination.page,
        pages: events.pageCount,
        perpage: req.body.pagination.perpage,
        total: events.totalCount,
        sort: sortOrder,
        field: sortField,
      };

      return {
        status: 200,
        meta: meta,
        data: events.data,
        message: `Data fetched succesfully.`,
      };
    } catch (e) {
      throw e;
    }
  }

  async edit(req, res) {
    try {
      let events = await eventsRepo.getById(req.params.id);
      if (!_.isEmpty(events)) {
        res.render("events/views/edit.ejs", {
          page_name: "events-management",
          page_title: "Events Edit",
          user: req.user,
          permission: req.permission,
          response: events,
        });
      } else {
        req.flash("error", "Sorry, record not found!");
        res.redirect(namedRouter.urlFor("admin.events.list"));
      }
    } catch (e) {
      return res.status(500).send({
        message: e.message
      });
    }
  }

  async delete(req, res) {
    try {

      // let eventsValue = await eventsRepo.getById(req.params.id);
      // if (eventsValue) {
      //   if (fs.existsSync('./public/uploads/events/' + eventsValue.image) && eventsValue.image) {
      //     fs.unlinkSync('./public/uploads/events/' + eventsValue.image);
      //   }
      // }

      let eventsDelete = await eventsRepo.updateById(req.params.id, {
        isDeleted: true,
      });
      req.flash("success", "Events removed successfully");
      res.redirect(namedRouter.urlFor("admin.events.list"));

    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  async statusChange(req, res) {
    try {


      let events = await eventsRepo.getById(req.params.id);
      if (!_.isEmpty(events)) {
        let eventsStatus =
          events.status == "Active" ? "Inactive" : "Active";
        let eventsUpdate = eventsRepo.updateById(req.params.id, {
          status: eventsStatus,
        });

        req.flash("success", "Events status has changed successfully");
        res.redirect(namedRouter.urlFor("admin.events.list"));
      }

    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }


}

module.exports = new EventsController();