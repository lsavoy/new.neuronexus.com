const knowledgeCenterRepo = require('knowledge_center/repositories/knowledgecenter.repository');
const knowledgeSubCategoryRepo = require('knowledge_center/repositories/category.repository');
const mongoose = require('mongoose');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');
const fs = require('fs');
const errorHandler = require('../../../errorHandler');


class knowledgeCenterController {

  /* @Method: list
  // @Description: To list all the knowledge center from DB
  */
  async list(req, res) {
    try {
      res.render('knowledge_center/views/list.ejs', {
        page_name: 'knowledge-center-management',
        page_title: 'Knowledge Center List',
        user: req.user,
        permission: req.permission,
      });
    } catch (e) {
      return res.status(500).send({
        message: e.message
      });
    }
  };

  /* @Method: getAll
  // @Description: To get all the contact from DB
  */
  async getAll(req, res) {
    try {
      let contactData = await knowledgeCenterRepo.getAll(req);
      if (_.has(req.body, 'sort')) {
        var sortOrder = req.body.sort.sort;
        var sortField = req.body.sort.field;
      } else {
        var sortOrder = -1;
        var sortField = '_id';
      }
      let meta = {
        "page": req.body.pagination.page,
        "pages": contactData.pageCount,
        "perpage": req.body.pagination.perpage,
        "total": contactData.totalCount,
        "sort": sortOrder,
        "field": sortField
      };
      return {
        status: 200,
        meta: meta,
        data: contactData.data,
        message: `Data fetched succesfully.`
      };
    } catch (e) {
      throw e;
    }
  }

  async create(req, res) {
    try {

      const subCat = await knowledgeSubCategoryRepo.getAllsubcategorywithoutfilter(req);
      res.render("knowledge_center/views/add.ejs", {
        page_name: "knowledge-center-management",
        page_title: "Create New Knowledge Center",
        subCategory: subCat,
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
      let newKnowledge = await knowledgeCenterRepo.save(req.body);
      if(newKnowledge){
        let slugValue = slug(newKnowledge.title, { lower: true, replacement: "-" });
          var insertedId = newKnowledge._id.toString();
          var last5Digit = insertedId.substring( insertedId.length - 5, insertedId.length);
          var updatedSlug = `${slugValue}-${last5Digit}`;

          let newprobeFinderSlugUpdate = await knowledgeCenterRepo.updateById(insertedId,{ slug: updatedSlug });
          if(newprobeFinderSlugUpdate){
            req.flash("success", "Knowledge center created succesfully.");
            res.redirect(namedRouter.urlFor("admin.knowledgecenter.list"));
          }
      }
    } catch (e) {
      const error = errorHandler(e);
      req.flash("error", error.message);
      res.redirect(namedRouter.urlFor("admin.knowledgecenter.create"));
    }
  }

  async edit(req, res) {
    try {
      const subCat = await knowledgeSubCategoryRepo.getAllsubcategorywithoutfilter(req);
      let knowledge = await knowledgeCenterRepo.getById(req.params.id);
      if (!_.isEmpty(knowledge)) {
        res.render("knowledge_center/views/edit.ejs", {
          page_name: "knowledge-center-management",
          page_title: "Update Knowledge Center",
          user: req.user,
          permission: req.permission,
          subCategory: subCat,
          response: knowledge,
        });
      } else {
        req.flash("error", "Sorry, record not found!");
        res.redirect(namedRouter.urlFor("admin.knowledgecenter.list"));
      }
    } catch (e) {
      return res.status(500).send({
        message: e.message
      });
    }
  }

  async update(req, res) {
    try {
      const knowledgeCenterId = req.body.id;
      req.body.sub_category_id = mongoose.Types.ObjectId(req.body.sub_category_id);

      let knowledgeUpdate = await knowledgeCenterRepo.updateById(req.body, req.body.id);
      if (knowledgeUpdate) {
          let slugValue = slug(knowledgeUpdate.title, { lower: true, replacement: "-" });
          var insertedId = knowledgeUpdate._id.toString();
          var last5Digit = insertedId.substring( insertedId.length - 5, insertedId.length);
          var updatedSlug = `${slugValue}-${last5Digit}`;

          let newprobeFinderSlugUpdate = await knowledgeCenterRepo.updateById(insertedId,{ slug: updatedSlug });
          if(newprobeFinderSlugUpdate){
            req.flash("success", "Knowledge Center Updated Successfully");
            res.redirect(namedRouter.urlFor("admin.knowledgecenter.list"));
          }
        
      } else {
        res.redirect(
          namedRouter.urlFor("admin.knowledgecenter.edit", {
            id: req.body.id
          })
        );
      }
    } catch (e) {
      req.flash("error", e.message);
      res.redirect(namedRouter.urlFor("admin.knowledgecenter.edit", {
        id: req.body.id
      }));
    }
  }

  async delete(req, res) {
    try {

      let knowledgeCenterValue = await knowledgeCenterRepo.getById(req.params.id);
      let knowledgeCenterDelete = await knowledgeCenterRepo.updateById({
        isDeleted: true,
      }, req.params.id);
      req.flash("success", "Knowledge center removed successfully");
      res.redirect(namedRouter.urlFor("admin.knowledgecenter.list"));

    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  async statusChange(req, res) {
    try {

      let knowledge = await knowledgeCenterRepo.getById(req.params.id);
      if (!_.isEmpty(knowledge)) {
        let knowledgeStatus =
          knowledge.status == "Active" ? "Inactive" : "Active";
        let knowledgeUpdate = knowledgeCenterRepo.updateById({
          status: knowledgeStatus,
        }, req.params.id);

        req.flash("success", "Knowledge center status has changed successfully");
        res.redirect(namedRouter.urlFor("admin.knowledgecenter.list"));
      }

    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }
}

module.exports = new knowledgeCenterController();