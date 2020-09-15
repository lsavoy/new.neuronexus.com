const express = require("express");
const mongoose = require("mongoose");
const routeLabel = require("route-label");
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require("querystring");
const testimonialsRepo = require("science_update/repositories/testimonials.repository");
const errorHandler = require("../../../errorHandler");
const fs = require("fs");
const gm = require("gm").subClass({
  imageMagick: true,
});

const slug = require("slug");

class TestimonialsController {
  constructor() { }

  async list(req, res) {
    try {
      res.render("science_update/views/testimonials_list.ejs", {
        page_name: "science-testimonials-management",
        page_title: "Testimonials",
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
      res.render("science_update/views/testimonials_add.ejs", {
        page_name: "science-testimonials-management",
        page_title: "Create New Testimonials",
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

      console.log(req.body)
      if (req.files && req.files.length > 0) {
        for (let i = 0; i < req.files.length; i++) {
          req.body.video = req.files[i].filename;
        }
      }
      req.body.slug = slug(req.body.title, { lower: true, replacement: "-" });
      let newTestimonials = await testimonialsRepo.save(req.body);
      if (newTestimonials) {
        var insertedId = newTestimonials._id.toString();
        var last5Digit = insertedId.substring(insertedId.length - 5, insertedId.length);
        var updatedSlug = `${req.body.slug}-${last5Digit}`;

        let newprobeFinderSlugUpdate = await testimonialsRepo.updateById(insertedId, { slug: updatedSlug });
        if (newprobeFinderSlugUpdate) {
          req.flash("success", "Testimonials created succesfully.");
          res.redirect(namedRouter.urlFor("admin.science_testimonials.list"));
        }
      }

    } catch (e) {
      const error = errorHandler(e);
      req.flash("error", error.message);
      res.redirect(namedRouter.urlFor("admin.science_testimonials.create"));
    }
  }

  async update(req, res) {
    try {


      let testimonialsValue = await testimonialsRepo.getById(req.body.id);

      if (req.files && req.files.length > 0) {

        if (fs.existsSync('./public/uploads/testimonials/' + testimonialsValue.video) && testimonialsValue.video) {
          fs.unlinkSync('./public/uploads/testimonials/' + testimonialsValue.video);
        }

        for (let i = 0; i < req.files.length; i++) {
          req.body.video = req.files[i].filename;
        }
      }

      //if(checkData.slug == '' || checkData.slug == undefined || checkData.slug ==  null){
      req.body.slug = slug(req.body.title, { lower: true, replacement: "-" });
      //}

      let testimonialsUpdate = await testimonialsRepo.updateById(testimonialsValue._id, req.body);
      if (testimonialsUpdate) {
        var insertedId = testimonialsUpdate._id.toString();
        var last5Digit = insertedId.substring(insertedId.length - 5, insertedId.length);
        var updatedSlug = `${req.body.slug}-${last5Digit}`;
        let newprobeFinderSlugUpdate = await testimonialsRepo.updateById(insertedId, { slug: updatedSlug });
        if (newprobeFinderSlugUpdate) {
          req.flash("success", "Testimonials Updated Successfully");
          res.redirect(namedRouter.urlFor("admin.science_testimonials.list"));
        }
      } else {
        res.redirect(namedRouter.urlFor("admin.science_testimonials.edit", { id: req.body.id }));
      }

    } catch (e) {
      req.flash("error", e.message);
      res.redirect(namedRouter.urlFor("admin.science_testimonials.edit", {
        id: req.body.id
      }));
    }
  }

  async getAll(req, res) {
    try {
      let testimonialss = await testimonialsRepo.getAll(req);

      if (_.has(req.body, "sort")) {
        var sortOrder = req.body.sort.sort;
        var sortField = req.body.sort.field;
      } else {
        var sortOrder = -1;
        var sortField = "_id";
      }
      let meta = {
        page: req.body.pagination.page,
        pages: testimonialss.pageCount,
        perpage: req.body.pagination.perpage,
        total: testimonialss.totalCount,
        sort: sortOrder,
        field: sortField,
      };

      return {
        status: 200,
        meta: meta,
        data: testimonialss.data,
        message: `Data fetched succesfully.`,
      };
    } catch (e) {
      throw e;
    }
  }

  async edit(req, res) {
    try {
      let testimonialss = await testimonialsRepo.getById(req.params.id);
      if (!_.isEmpty(testimonialss)) {
        res.render("science_update/views/testimonials_edit.ejs", {
          page_name: "science-testimonials-management",
          page_title: "Testimonials Edit",
          user: req.user,
          permission: req.permission,
          response: testimonialss,
        });
      } else {
        req.flash("error", "Sorry, record not found!");
        res.redirect(namedRouter.urlFor("admin.science_testimonials.list"));
      }
    } catch (e) {
      return res.status(500).send({
        message: e.message
      });
    }
  }

  async delete(req, res) {
    try {

      let testimonialsValue = await testimonialsRepo.getById(req.params.id);
      if (testimonialsValue) {
        if (fs.existsSync('./public/uploads/testimonials/' + testimonialsValue.video) && testimonialsValue.video) {
          fs.unlinkSync('./public/uploads/testimonials/' + testimonialsValue.video);
        }
      }

      let testimonialsDelete = await testimonialsRepo.updateById(req.params.id, {
        isDeleted: true,
      });
      req.flash("success", "Testimonials removed successfully");
      res.redirect(namedRouter.urlFor("admin.science_testimonials.list"));

    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  async statusChange(req, res) {
    try {


      let testimonials = await testimonialsRepo.getById(req.params.id);
      if (!_.isEmpty(testimonials)) {
        let testimonialsStatus =
          testimonials.status == "Active" ? "Inactive" : "Active";
        let testimonialsUpdate = testimonialsRepo.updateById(req.params.id, {
          status: testimonialsStatus,
        });

        req.flash("success", "Testimonials status has changed successfully");
        res.redirect(namedRouter.urlFor("admin.science_testimonials.list"));
      }

    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }


}

module.exports = new TestimonialsController();