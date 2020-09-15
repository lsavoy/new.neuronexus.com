const express = require("express");
const mongoose = require("mongoose");
const routeLabel = require("route-label");
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require("querystring");
const probeFinderRepo = require("probe_finder/repositories/probe_finder.repository");
const categoryMasterRepo = require("category/repositories/category.repository");
const channelsRepo = require("channels/repositories/channels.repository");
const experimentRepo = require("experiment/repositories/experiment.repository");
const shankLengthRepo = require("shank_length/repositories/shank_length.repository");
const shanksRepo = require("shanks/repositories/shanks.repository");
const siteAreaRepo = require("site_area/repositories/site_area.repository");
const siteLayoutRepo = require("site_layout/repositories/site_layout.repository");

const errorHandler = require("../../../errorHandler");
const fs = require("fs");
const gm = require("gm").subClass({
  imageMagick: true,
});
const slug = require("slug");

class probeFinderController {
  constructor() { }

  async list(req, res) {
    try {
      res.render("probe_finder/views/list.ejs", {
        page_name: "probeFinder-management",
        page_title: "Probe Finder List",
        user: req.user,
        permission: req.permission,
      });
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  }

  async create(req, res) {
    try {
      let channels = await channelsRepo.getAllByField({ 'status': 'Active', 'isDeleted': false });
      let experiment = await experimentRepo.getAllByField({ 'status': 'Active', 'isDeleted': false });
      let shankLength = await shankLengthRepo.getAllByField({ 'status': 'Active', 'isDeleted': false });
      let shank = await shanksRepo.getAllByField({ 'status': 'Active', 'isDeleted': false });
      let siteArea = await siteAreaRepo.getAllByField({ 'status': 'Active', 'isDeleted': false });
      let siteLayout = await siteLayoutRepo.getAllByField({ 'status': 'Active', 'isDeleted': false });

      res.render("probe_finder/views/add.ejs", {
        page_name: "probeFinder-management",
        page_title: "probe Finder Add",
        user: req.user,
        channels: channels,
        experiment: experiment,
        shankLength: shankLength,
        shank: shank,
        siteArea: siteArea,
        siteLayout: siteLayout,
        permission: req.permission,
      });
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  }


  async store(req, res) {
    try {
      let checkData = await probeFinderRepo.getByField({
        name: req.body.name,
        isDeleted: false,
      });
      if (_.isEmpty(checkData)) {
        if (req.files.length > 0) {
          req.body.image = req.files[0].filename;
        }
        if (req.body.site_layout_id == '') {
          req.body.site_layout_id = null
        }
        if (req.body.site_area_id == '') {
          req.body.site_area_id = null
        }
        if (req.body.shanks_id == '') {
          req.body.shanks_id = null
        }
        if (req.body.shank_length_id == '') {
          req.body.shank_length_id = null
        }
        if (req.body.experiment_id == '') {
          req.body.experiment_id = null
        }
        if (req.body.channel_id == '') {
          req.body.channel_id = null
        }
        req.body.slug = slug(req.body.name, { lower: true, replacement: "-" });
        let newprobeFinder = await probeFinderRepo.save(req.body);

        if (newprobeFinder) {
          var insertedId = newprobeFinder._id.toString();
          var last5Digit = insertedId.substring(insertedId.length - 5, insertedId.length);
          var updatedSlug = `${req.body.slug}-${last5Digit}`;

          let newprobeFinderSlugUpdate = await probeFinderRepo.updateById(insertedId, { slug: updatedSlug });
          if (newprobeFinderSlugUpdate) {
            req.flash("success", "Probe Finder created succesfully.");
            res.redirect(namedRouter.urlFor("admin.probe-finder.list"));
          }
        }
      } else {
        req.flash("error", "Probe Finder exist with same name");
        res.redirect(namedRouter.urlFor("admin.probe-finder.create"));
      }
    } catch (e) {

      req.flash("error", e.message);
      res.redirect(namedRouter.urlFor("admin.probe-finder.create"));
    }
  }

  async update(req, res) {
    try {
      let checkData = await probeFinderRepo.getByField({ 'isDeleted': false, '_id': req.body.id });
      if (checkData) {
        if (req.files.length > 0) {
          if (checkData.image != "") {
            fs.unlink("./public/uploads/probeFinder/" + checkData.image, function (err) {
              if (err) req.flash("error", err.message);
            }
            );
          }
          req.body.image = req.files[0].filename;
        }
        if (req.body.site_layout_id == '') {
          req.body.site_layout_id = null
        }
        if (req.body.site_area_id == '') {
          req.body.site_area_id = null
        }
        if (req.body.shanks_id == '') {
          req.body.shanks_id = null
        }
        if (req.body.shank_length_id == '') {
          req.body.shank_length_id = null
        }
        if (req.body.experiment_id == '') {
          req.body.experiment_id = null
        }
        if (req.body.channel_id == '') {
          req.body.channel_id = null
        }
        if (checkData.slug == '' || checkData.slug == undefined) {
          req.body.slug = slug(req.body.name, { lower: true, replacement: "-" });
        }
        let probeFinderUpdate = await probeFinderRepo.updateById(checkData._id, req.body);
        if (probeFinderUpdate) {

          var insertedId = probeFinderUpdate._id.toString();
          var last5Digit = insertedId.substring(insertedId.length - 5, insertedId.length);
          var updatedSlug = `${req.body.slug}-${last5Digit}`;

          let newprobeFinderSlugUpdate = await probeFinderRepo.updateById(insertedId, { slug: updatedSlug });
          if (newprobeFinderSlugUpdate) {
            req.flash("success", "Probe Finder Updated Successfully");
            res.redirect(namedRouter.urlFor("admin.probe-finder.list"));
          }
        } else {
          req.flash("error", "Probe Finder Update faild");
          res.redirect(namedRouter.urlFor("admin.probe-finder.edit", { id: checkData._id }));
        }
      } else {
        req.flash("error", "Not found");
        res.redirect(namedRouter.urlFor("admin.probe-finder.list"));
      }
    } catch (e) {

      req.flash("error", e.message);
      res.redirect(
        namedRouter.urlFor("admin.probe-finder.edit", { id: req.body.id })
      );
    }
  }

  async getAll(req, res) {
    try {
      let probeFinder = await probeFinderRepo.getAll(req);
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

  async editcategoryname(req, res) {
    try {
      let selectedcategory = await probeFinderRepo.getCategoryNameByField({ 'status': 'Active', 'isDeleted': false });
      let categoryMaster = await categoryMasterRepo.getAllByField({ isDeleted: false, status: 'Active' }, { name: 1 });

      if (!_.isEmpty(selectedcategory)) {
        res.render("probe_finder/views/edit_menu_name.ejs", {
          page_name: "probeFinder-menu-management",
          page_title: "probe Finder Edit",
          user: req.user,
          response: selectedcategory,
          categoryMaster: categoryMaster,
          permission: req.permission,
        });
      } else {
        req.flash("error", "Sorry, record not found!");
        res.redirect(namedRouter.urlFor("admin.probe-finder.editcategory"));
      }
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  }
  async updatecategoryname(req, res) {
    try {
      console.log(req.body)
      let menunameUpdate = await probeFinderRepo.updateCategoryNameById(req.body.id, req.body)
      console.log(menunameUpdate)
      if (menunameUpdate) {
        req.flash('success', "Menu name updated successfully");
        res.redirect(namedRouter.urlFor('admin.probe-finder.editcategory'));
      }

    } catch (e) {

      req.flash("error", e.message);
      res.redirect(
        namedRouter.urlFor("admin.probe-finder.editcategory")
      );
    }
  }


  async edit(req, res) {
    try {
      let channels = await channelsRepo.getAllByField({ 'status': 'Active', 'isDeleted': false });
      let experiment = await experimentRepo.getAllByField({ 'status': 'Active', 'isDeleted': false });
      let shankLength = await shankLengthRepo.getAllByField({ 'status': 'Active', 'isDeleted': false });
      let shanks = await shanksRepo.getAllByField({ 'status': 'Active', 'isDeleted': false });
      let siteArea = await siteAreaRepo.getAllByField({ 'status': 'Active', 'isDeleted': false });
      let siteLayout = await siteLayoutRepo.getAllByField({ 'status': 'Active', 'isDeleted': false });
      let probeFinder = await probeFinderRepo.getById(req.params.id);

      if (!_.isEmpty(probeFinder)) {
        res.render("probe_finder/views/edit.ejs", {
          page_name: "probeFinder-management",
          page_title: "probe Finder Edit",
          user: req.user,
          response: probeFinder,
          channels: channels,
          experiment: experiment,
          shankLength: shankLength,
          shanks: shanks,
          siteArea: siteArea,
          siteLayout: siteLayout,
          permission: req.permission,
        });
      } else {
        req.flash("error", "Sorry, record not found!");
        res.redirect(namedRouter.urlFor("admin.probe-finder.list"));
      }
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  }

  async delete(req, res) {
    try {
      let probeFinderData = await probeFinderRepo.getByField({
        status: "Active",
        isDeleted: false,
        probeFinder_id: mongoose.Types.ObjectId(req.params.id),
      });

      if (!_.isEmpty(probeFinderData)) {
        req.flash("error", "This probe finder already used in");
        res.redirect(namedRouter.urlFor("admin.probe-finder.list"));
      } else {
        let probeFinderDelete = await probeFinderRepo.updateById(req.params.id, {
          isDeleted: true,
        });
        req.flash("success", "Probe Finder removed successfully");
        res.redirect(namedRouter.urlFor("admin.probe-finder.list"));
      }
    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  async statusChange(req, res) {
    try {
      let probeFinder = await probeFinderRepo.getById(req.params.id);
      if (!_.isEmpty(probeFinder)) {
        let probeFinderStatus =
          probeFinder.status == "Active" ? "Inactive" : "Active";
        let probeFinderUpdate = probeFinderRepo.updateById(req.params.id, {
          status: probeFinderStatus,
        });

        req.flash("success", "Probe Finder status has changed successfully");
        res.redirect(namedRouter.urlFor("admin.probe-finder.list"));
      }

    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }


}

module.exports = new probeFinderController();
