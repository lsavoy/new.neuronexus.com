const videoCarouselRepo = require('video_carousel/repositories/videocarousel.repository');
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


class VideocarouselController {

    async list(req, res) {
        try {
            res.render('video_carousel/views/list.ejs', {
                page_name: 'video-carousel-management',
                page_title: 'Video Carousel List',
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
            let resultList = await videoCarouselRepo.getAll(req);

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
            let item = await videoCarouselRepo.getById(req.params.id);
            if (!_.isEmpty(item)) {
                res.render('video_carousel/views/edit.ejs', {
                    page_name: 'video-carousel-management',
                    page_title: 'Video Carousel Edit',
                    user: req.user,
                    permission: req.permission,
                    response: item
                });
            } else {
                req.flash('error', "Sorry video not found!");
                res.redirect(namedRouter.urlFor('video_carousel.list'));
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
            let itemUpdate = await videoCarouselRepo.updateById(itemId, req.body);
            if (itemUpdate) {
                req.flash('success', "Video Updated Successfully");
                res.redirect(namedRouter.urlFor('video_carousel.list'));
            } else {
                res.redirect(namedRouter.urlFor('video_carousel.edit', {
                    id: featureId
                }));
            }
        } catch (e) {
            const error = errorHandler(e);
            req.flash('error', error.message);
            res.redirect(namedRouter.urlFor('video_carousel.edit', {
                id: req.body.mid
            }));
        }

    };

    async create(req, res) {
        try {

            res.render("video_carousel/views/add.ejs", {
                page_name: 'video-carousel-management',
                page_title: 'Video Carousel List',
                user: req.user,
                permission: req.permission,
            });
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    }

    async store(req, res) {
        try {
            let newItem = await videoCarouselRepo.save(req.body);
            if (newItem) {
                req.flash("success", "Video carousel item created succesfully.");
                res.redirect(namedRouter.urlFor("video_carousel.list"));
            }
        } catch (e) {
            req.flash("error", e.message);
            res.redirect(namedRouter.urlFor("video_carousel.create"));
        }
    }

    async delete(req, res) {
        try {
            let dbItem = await videoCarouselRepo.getById(req.params.id);
            if (_.isEmpty(dbItem)) {
                req.flash("error", "This video item did not exists.");
                res.redirect(namedRouter.urlFor("video_carousel.list"));
            } else {
                let itemDelete = await videoCarouselRepo.updateById(req.params.id, {
                    isDeleted: true,
                });
                req.flash("success", "Video removed successfully");
                res.redirect(namedRouter.urlFor("video_carousel.list"));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message,
            });
        }
    }

    async statusChange(req, res) {
        try {

            let dbItem = await videoCarouselRepo.getById(req.params.id);
            if (!_.isEmpty(dbItem)) {
                let newStatus =
                    dbItem.status == "Active" ? "Inactive" : "Active";
                let itemUpdate = videoCarouselRepo.updateById(req.params.id, {
                    status: newStatus,
                });

                req.flash("success", "Video status has changed successfully");
                res.redirect(namedRouter.urlFor("video_carousel.list"));
            }

        } catch (e) {
            return res.status(500).send({
                message: e.message,
            });
        }
    }
}

module.exports = new VideocarouselController();
