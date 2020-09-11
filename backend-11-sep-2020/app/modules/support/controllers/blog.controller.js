const express = require("express");
const mongoose = require("mongoose");
const routeLabel = require("route-label");
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require("querystring");
const blogRepo = require("support/repositories/blog.repository");
const errorHandler = require("../../../errorHandler");
const fs = require("fs");
const gm = require("gm").subClass({
  imageMagick: true,
});

const slug = require("slug");

class BlogController {
  constructor() { }

  async list(req, res) {
    try {
      res.render("support/views/blog_list.ejs", {
        page_name: "support-blog-management",
        page_title: "Blog",
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
      res.render("support/views/blog_add.ejs", {
        page_name: "support-blog-management",
        page_title: "Create New Blog",
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
          req.body.image = req.files[i].filename;
        }
      }
      req.body.slug = slug(req.body.title, { lower: true, replacement: "-" });
      let newBlog = await blogRepo.save(req.body);
      if (newBlog) {
        var insertedId = newBlog._id.toString();
        var last5Digit = insertedId.substring(insertedId.length - 5, insertedId.length);
        var updatedSlug = `${req.body.slug}-${last5Digit}`;

        let newprobeFinderSlugUpdate = await blogRepo.updateById(insertedId, { slug: updatedSlug });
        if (newprobeFinderSlugUpdate) {
          req.flash("success", "Blog created succesfully.");
          res.redirect(namedRouter.urlFor("admin.support_blog.list"));
        }
      }

    } catch (e) {
      const error = errorHandler(e);
      req.flash("error", error.message);
      res.redirect(namedRouter.urlFor("admin.support_blog.create"));
    }
  }

  async update(req, res) {
    try {


      let blogValue = await blogRepo.getById(req.body.id);

      if (req.files && req.files.length > 0) {

        if (fs.existsSync('./public/uploads/support/' + blogValue.image) && blogValue.image) {
          fs.unlinkSync('./public/uploads/support/' + blogValue.image);
        }

        for (let i = 0; i < req.files.length; i++) {
          req.body.image = req.files[i].filename;
        }
      }

      //if(checkData.slug == '' || checkData.slug == undefined || checkData.slug ==  null){
      req.body.slug = slug(req.body.title, { lower: true, replacement: "-" });
      //}

      let blogUpdate = await blogRepo.updateById(blogValue._id, req.body);
      if (blogUpdate) {
        var insertedId = blogUpdate._id.toString();
        var last5Digit = insertedId.substring(insertedId.length - 5, insertedId.length);
        var updatedSlug = `${req.body.slug}-${last5Digit}`;
        let newprobeFinderSlugUpdate = await blogRepo.updateById(insertedId, { slug: updatedSlug });
        if (newprobeFinderSlugUpdate) {
          req.flash("success", "Blog Updated Successfully");
          res.redirect(namedRouter.urlFor("admin.support_blog.list"));
        }
      } else {
        res.redirect(namedRouter.urlFor("admin.support_blog.edit", { id: req.body.id }));
      }

    } catch (e) {
      req.flash("error", e.message);
      res.redirect(namedRouter.urlFor("admin.support_blog.edit", {
        id: req.body.id
      }));
    }
  }

  async getAll(req, res) {
    try {
      let blogs = await blogRepo.getAll(req);

      if (_.has(req.body, "sort")) {
        var sortOrder = req.body.sort.sort;
        var sortField = req.body.sort.field;
      } else {
        var sortOrder = -1;
        var sortField = "_id";
      }
      let meta = {
        page: req.body.pagination.page,
        pages: blogs.pageCount,
        perpage: req.body.pagination.perpage,
        total: blogs.totalCount,
        sort: sortOrder,
        field: sortField,
      };

      return {
        status: 200,
        meta: meta,
        data: blogs.data,
        message: `Data fetched succesfully.`,
      };
    } catch (e) {
      throw e;
    }
  }

  async edit(req, res) {
    try {
      let blogs = await blogRepo.getById(req.params.id);
      if (!_.isEmpty(blogs)) {
        res.render("support/views/blog_edit.ejs", {
          page_name: "support-blog-management",
          page_title: "Blog Edit",
          user: req.user,
          permission: req.permission,
          response: blogs,
        });
      } else {
        req.flash("error", "Sorry, record not found!");
        res.redirect(namedRouter.urlFor("admin.support_blog.list"));
      }
    } catch (e) {
      return res.status(500).send({
        message: e.message
      });
    }
  }

  async delete(req, res) {
    try {

      let blogValue = await blogRepo.getById(req.params.id);
      if (blogValue) {
        if (fs.existsSync('./public/uploads/support/' + blogValue.image) && blogValue.image) {
          fs.unlinkSync('./public/uploads/support/' + blogValue.image);
        }
      }

      let blogDelete = await blogRepo.updateById(req.params.id, {
        isDeleted: true,
      });
      req.flash("success", "Blog removed successfully");
      res.redirect(namedRouter.urlFor("admin.support_blog.list"));

    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  async statusChange(req, res) {
    try {


      let blog = await blogRepo.getById(req.params.id);
      if (!_.isEmpty(blog)) {
        let blogStatus =
          blog.status == "Active" ? "Inactive" : "Active";
        let blogUpdate = blogRepo.updateById(req.params.id, {
          status: blogStatus,
        });

        req.flash("success", "Blog status has changed successfully");
        res.redirect(namedRouter.urlFor("admin.support_blog.list"));
      }

    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }


}

module.exports = new BlogController();