const imageCarouselRepo = require('image_carousel/repositories/imagecarousel.repository');
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


class ImageCarouselController {

    async list(req, res) {
        try {
            res.render('image_carousel/views/list.ejs', {
                page_name: 'image-carousel-management',
                page_title: 'Image Carousel List',
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
            let resultList = await imageCarouselRepo.getAll(req);

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
            let item = await imageCarouselRepo.getById(req.params.id);
            if (!_.isEmpty(item)) {
                res.render('image_carousel/views/edit.ejs', {
                    page_name: 'image-carousel-management',
                    page_title: 'Image Carousel Edit',
                    user: req.user,
                    permission: req.permission,
                    response: item
                });
            } else {
                req.flash('error', "Sorry image not found!");
                res.redirect(namedRouter.urlFor('image_carousel.list'));
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

            let dbItem = await imageCarouselRepo.getById(itemId);
            if (!_.isEmpty(dbItem)) {
                if (req.files.length > 0) {
                    if (dbItem.carouse_img != '') {
                        for (var y = 0; y < req.files.length; y++) {
                            if (req.files[y].fieldname == 'carousel_img') {
                                if (fs.existsSync('./public/uploads/imageCarousel/' + dbItem.carouse_img)) {
                                    fs.unlinkSync('./public/uploads/imageCarousel/' + dbItem.carouse_img);
                                }
                                // if (fs.existsSync('./public/uploads/imageCarousel/thumb/' + dbItem.carouse_img)) {
                                //     fs.unlinkSync('./public/uploads/imageCarousel/thumb/' + dbItem.carouse_img);
                                // }
                            }
                        }
                    }
                    // gm("public/uploads/imageCarousel/" + req.files[0].filename)
                    //     .resize(100)
                    //     .write(
                    //         "public/uploads/imageCarousel/thumb/" + req.files[0].filename,
                    //         function (err) {
                    //             if (err) req.flash("error", err.message);
                    //         }
                    //     );
                    req.body.carousel_img = req.files[0].filename;
                }
            }

            let itemUpdate = await imageCarouselRepo.updateById(itemId, req.body);
            if (itemUpdate) {
                req.flash('success', "Image Updated Successfully");
                res.redirect(namedRouter.urlFor('image_carousel.list'));
            } else {
                res.redirect(namedRouter.urlFor('image_carousel.edit', {
                    id: featureId
                }));
            }
        } catch (e) {
            const error = errorHandler(e);
            req.flash('error', error.message);
            res.redirect(namedRouter.urlFor('image_carousel.edit', {
                id: req.body.mid
            }));
        }

    };

    async create(req, res) {
        try {

            res.render("image_carousel/views/add.ejs", {
                page_name: 'image-carousel-management',
                page_title: 'Image Carousel List',
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
                // gm("public/uploads/imageCarousel/" + req.files[0].filename)
                //     .resize(200)
                //     .write(
                //         "public/uploads/imageCarousel/thumb/" + req.files[0].filename,
                //         function (err) {
                //             console.error('>>', err);
                //             if (err) req.flash("error", err.message);
                //         }
                //     );
                req.body.carousel_img = req.files[0].filename;
            }
            let newItem = await imageCarouselRepo.save(req.body);
            if (newItem) {
                req.flash("success", "Image carousel item created succesfully.");
                res.redirect(namedRouter.urlFor("image_carousel.list"));
            }
        } catch (e) {
            req.flash("error", e.message);
            res.redirect(namedRouter.urlFor("image_carousel.create"));
        }
    }

    async delete(req, res) {
        try {
            let dbItem = await imageCarouselRepo.getById(req.params.id);
            if (_.isEmpty(dbItem)) {
                req.flash("error", "This image item did not exists.");
                res.redirect(namedRouter.urlFor("image_carousel.list"));
            } else {
                let itemDelete = await imageCarouselRepo.updateById(req.params.id, {
                    isDeleted: true,
                });
                req.flash("success", "Image removed successfully");
                res.redirect(namedRouter.urlFor("image_carousel.list"));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message,
            });
        }
    }

    async statusChange(req, res) {
        try {

            let dbItem = await imageCarouselRepo.getById(req.params.id);
            if (!_.isEmpty(dbItem)) {
                let newStatus =
                    dbItem.status == "Active" ? "Inactive" : "Active";
                let itemUpdate = imageCarouselRepo.updateById(req.params.id, {
                    status: newStatus,
                });

                req.flash("success", "Image status has changed successfully");
                res.redirect(namedRouter.urlFor("image_carousel.list"));
            }

        } catch (e) {
            return res.status(500).send({
                message: e.message,
            });
        }
    }
}

module.exports = new ImageCarouselController();
