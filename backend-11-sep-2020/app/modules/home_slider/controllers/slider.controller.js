const sliderRepo = require('home_slider/repositories/slider.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');
const fs = require('fs');
const errorHandler = require('../../../errorHandler');


class sliderController {


    async editslidervideo(req, res) {
        try {
            let result = {};
            let cms = await sliderRepo.slidervideoGetByField({ "isDeleted": false });
            if (!_.isEmpty(cms)) {
                result.cms_data = cms;
                res.render('home_slider/views/edit_video.ejs', {
                    page_name: 'slidervideo-management',
                    page_title: 'Slider page',
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


    async updateslidervideo(req, res) {
        try {
            const aboutId = req.body.id;

            let about = await sliderRepo.slidervideoGetByField({
                _id: req.body.id,
                'isDeleted': false
            });
            if (req.files.length > 0) {
                for (let i = 0; i < req.files.length; i++) {

                    if (req.files[i].fieldname == 'slider_video') {
                        if (fs.existsSync('./public/uploads/slider/' + about.slider_video) && about.slider_video) {
                            fs.unlinkSync('./public/uploads/slider/' + about.slider_video);
                        }
                        req.body.slider_video = req.files[i].filename;
                    }

                }
            }


            let cmsIdUpdate = sliderRepo.slidervideoUpdateById(req.body, aboutId)
            if (cmsIdUpdate) {
                req.flash('success', "Content updated successfully");
                res.redirect(namedRouter.urlFor('admin.slider.editslidervideo'));
            }


        } catch (e) {
            return res.status(500).send({ message: e.message });
        }

    };



    //Slider........................

    /* @Method: insert
      // @Description: save slider action
      */
    async insert(req, res) {

        try {




            let newRecord = await sliderRepo.save(req.body);
            req.flash('success', 'Record created succesfully.');
            res.redirect(namedRouter.urlFor('admin.slider.list'));

        } catch (e) {

            const error = errorHandler(e);
            req.flash('error', error.message);
            //res.status(500).send({message: error.message});
            res.redirect(namedRouter.urlFor('admin.slider.create'));
        }
    };


    /* @Method: update
    // @Description: slider update action
    */
    async update(req, res) {

        try {
            const sliderId = req.body.id;
            let sliderData = await sliderRepo.getById(sliderId);


            if (_.isEmpty(sliderData)) {
                req.flash('error', 'Record not found.');
                res.redirect(namedRouter.urlFor('admin.slider.edit', {
                    id: sliderId
                }));
            } else {




                let sliderUpdate = await sliderRepo.updateById(req.body, sliderId);
                if (sliderUpdate) {
                    req.flash('success', "Record Updated Successfully");
                    res.redirect(namedRouter.urlFor('admin.slider.list'));
                } else {
                    res.redirect(namedRouter.urlFor('admin.slider.edit', {
                        id: sliderId
                    }));
                }


            }
        } catch (e) {
            const error = errorHandler(e);
            req.flash('error', error.message);
            res.redirect(namedRouter.urlFor('admin.slider.edit', {
                id: req.body.id
            }));
        }

    };

    /* @Method: list
    // @Description: To list all the slider from DB
    */

    async list(req, res) {
        try {

            res.render('home_slider/views/list.ejs', {
                page_name: 'slider-management',
                page_title: 'Slider List',
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
    // @Description: To get all the slider from DB
    */
    async getAll(req, res) {
        try {
            let slider = await sliderRepo.getAll(req);

            if (_.has(req.body, 'sort')) {
                var sortOrder = req.body.sort.sort;
                var sortField = req.body.sort.field;
            } else {
                var sortOrder = -1;
                var sortField = '_id';
            }
            let meta = {
                "page": req.body.pagination.page,
                "pages": slider.pageCount,
                "perpage": req.body.pagination.perpage,
                "total": slider.totalCount,
                "sort": sortOrder,
                "field": sortField
            };

            return {
                status: 200,
                meta: meta,
                data: slider.data,
                message: `Data fetched succesfully.`
            };
        } catch (e) {
            throw e;
        }
    }

    /* @Method: create
    // @Description: create slider action
    */
    async create(req, res) {

        try {


            res.render('home_slider/views/add.ejs', {
                page_name: 'slider-management',
                page_title: 'Slider Create',
                user: req.user,
                permission: req.permission,
            });
        } catch (e) {
            throw (e);
        }
    };

    /*
    // @Method: edit
    // @Description:  slider edit page
    */
    async edit(req, res) {
        try {
            let sliderValue = await sliderRepo.getById(req.params.id);
            if (!_.isEmpty(sliderValue)) {
                res.render('home_slider/views/edit.ejs', {
                    page_name: 'slider-management',
                    page_title: 'Slider Edit',
                    user: req.user,
                    permission: req.permission,
                    response: sliderValue
                });
            } else {
                req.flash('error', "Sorry, Record not found!");
                res.redirect(namedRouter.urlFor('admin.slider.list'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };


    /* @Method: delete
    // @Description: slider delete
    */
    async delete(req, res) {
        try {


            let sliderValue = await sliderRepo.getById(req.params.id);


            let sliderDelete = await sliderRepo.updateById({
                "isDeleted": true
            }, req.params.id);
            req.flash('success', 'Record removed successfully');
            res.redirect(namedRouter.urlFor('admin.slider.list'));

        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /*
    // @Method: statusChange
    // @Description: slider status change action
    */
    async statusChange(req, res) {
        try {

            let slider = await sliderRepo.getById(req.params.id);
            if (!_.isEmpty(slider)) {
                let sliderStatus = (slider.status == 'Active') ? 'Inactive' : 'Active';
                let sliderUpdate = sliderRepo.updateById({
                    'status': sliderStatus
                }, req.params.id);

                req.flash('success', "Record status has changed successfully");
                res.redirect(namedRouter.urlFor('admin.slider.list'));
            }

        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

}

module.exports = new sliderController();