const topBlogRepo = require('top_blog/repositories/topblog.repository');
const slug = require('slug');
const express = require('express');
const mongoose = require("mongoose");
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');
var striptags = require('striptags');
const fs = require('fs');

const errorHandler = require('../../../helpers/errorHandler');

var gm = require('gm').subClass({
    imageMagick: true
});


class TopBlogController {

    async list(req, res) {
        try {
            res.render('top_blog/views/list.ejs', {
                page_name: 'blog-post-management',
                page_title: 'Blog Post List',
                user: req.user,
                permission: req.permission,
            });
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    async getAllData(req, res) {
        try {
            let resultList = await topBlogRepo.getAll(req);

            if (_.has(req.body, "sort")) {
                var sortOrder = req.body.sort.sort;
                var sortField = req.body.sort.field;
            } else {
                var sortOrder = -1;
                var sortField = "_id";
            }

            let meta = {
                page: req.body.pagination.page,
                pages: resultList.pageCount,
                perpage: req.body.pagination.perpage,
                total: resultList.totalCount,
                sort: sortOrder,
                field: sortField,
            };

            return {
                status: 200,
                meta: meta,
                data: resultList.data,
                message: `Data fetched succesfully.`,
            };
        } catch (e) {
            throw e;
        }
    }

    async edit(req, res) {
        try {
            let item = await topBlogRepo.getById(req.params.id);
            if (!_.isEmpty(item)) {
                res.render('top_blog/views/edit.ejs', {
                    page_name: 'blog-post-management',
                    page_title: 'Blog Post Edit',
                    user: req.user,
                    permission: req.permission,
                    response: item
                });
            } else {
                req.flash('error', "Sorry blog not found!");
                res.redirect(namedRouter.urlFor('top_blog.list'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    async update(req, res) {
        try {
            const itemId = req.body.id;

            let dbItem = await topBlogRepo.getById(itemId);
            if (!_.isEmpty(dbItem)) {
                if (req.files.length > 0) {
                    if (dbItem.resource != '') {
                        if (fs.existsSync('./public/uploads/post/' + dbItem.resource)) {
                            fs.unlinkSync('./public/uploads/post/' + dbItem.resource);
                        }
                    }
                    if (req.files[0].mimetype.startsWith('image')) {
                        req.body.resource_type = 'Image';
                    } else {
                        req.body.resource_type = 'Video';
                    }
                    req.body.resource = req.files[0].filename;
                }
            }

            let itemUpdate = await topBlogRepo.updateById(itemId, req.body);
            if (itemUpdate) {
                req.flash('success', "Blog Updated Successfully");
                res.redirect(namedRouter.urlFor('top_blog.list'));
            } else {
                res.redirect(namedRouter.urlFor('top_blog.edit', {
                    id: featureId
                }));
            }
        } catch (e) {
            const error = errorHandler(e);
            req.flash('error', error.message);
            res.redirect(namedRouter.urlFor('top_blog.edit', {
                id: req.body.mid
            }));
        }

    };

    async create(req, res) {
        try {

            res.render("top_blog/views/add.ejs", {
                page_name: 'blog-post-management',
                page_title: 'Blog Post List',
                user: req.user,
                permission: req.permission,
            });
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    }

    async store(req, res) {
        try {
            if (req.files.length > 0) {
                if (req.files[0].mimetype.startsWith('image')) {
                    req.body.resource_type = 'Image';
                } else {
                    req.body.resource_type = 'Video';
                }
                req.body.resource = req.files[0].filename;
            }
            let newItem = await topBlogRepo.save(req.body);
            if (newItem) {
                req.flash("success", "Blog created succesfully.");
                res.redirect(namedRouter.urlFor("top_blog.list"));
            }
        } catch (e) {
            req.flash("error", e.message);
            res.redirect(namedRouter.urlFor("top_blog.create"));
        }
    }

    async delete(req, res) {
        try {
            let dbItem = await topBlogRepo.getById(req.params.id);
            if (_.isEmpty(dbItem)) {
                req.flash("error", "This blog did not exists.");
                res.redirect(namedRouter.urlFor("top_blog.list"));
            } else {
                let itemDelete = await topBlogRepo.updateById(req.params.id, {
                    isDeleted: true,
                });
                req.flash("success", "Blog removed successfully");
                res.redirect(namedRouter.urlFor("top_blog.list"));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message,
            });
        }
    }

    async statusChange(req, res) {
        try {

            let dbItem = await topBlogRepo.getById(req.params.id);
            if (!_.isEmpty(dbItem)) {
                let newStatus =
                    dbItem.status == "Active" ? "Inactive" : "Active";
                let itemUpdate = topBlogRepo.updateById(req.params.id, {
                    status: newStatus,
                });

                req.flash("success", "Blog status has changed successfully");
                res.redirect(namedRouter.urlFor("top_blog.list"));
            }

        } catch (e) {
            return res.status(500).send({
                message: e.message,
            });
        }
    }
}

module.exports = new TopBlogController();
