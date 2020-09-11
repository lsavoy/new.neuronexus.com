const careersRepo = require('about/repositories/careers.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const errorHandler = require("../../../errorHandler");
const fs = require("fs");
const gm = require("gm").subClass({
    imageMagick: true,
});


class cmsController {
    constructor() {
        this.cms = [];

    }

    /*
    // @Method: editmeet_the_team
    // @Description:  Edit meet_the_team page Content
    */
    async editcareers(req, res) {
        try {
            let result = {};
            let cms = await careersRepo.careersGetByField({ "isDeleted": false });
            if (!_.isEmpty(cms)) {
                result.cms_data = cms;
                res.render('about/views/edit_careers.ejs', {
                    page_name: 'careers-management',
                    page_title: 'Careers page',
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
    async updatecareers(req, res) {
        try {
            const aboutId = req.body.id;
            let about = await careersRepo.careersGetByField({
                _id: req.body.id,
                'isDeleted': false
            });
            if (req.files.length > 0) {
                for (let i = 0; i < req.files.length; i++) {

                    if (req.files[i].fieldname == 'image') {
                        if (fs.existsSync('./public/uploads/cms/' + about.image) && about.image) {
                            fs.unlinkSync('./public/uploads/cms/' + about.image);
                        }
                        req.body.image = req.files[i].filename;
                    }

                }
            }

            let cmsIdUpdate = careersRepo.careersUpdateById(req.body, aboutId)
            if (cmsIdUpdate) {
                req.flash('success', "Content updated successfully");
                res.redirect(namedRouter.urlFor('admin.about.edit_careers'));
            }


        } catch (e) {
            return res.status(500).send({ message: e.message });
        }

    };

    //LeaderShip........................

    /* @Method: insert
      // @Description: save careers_opening action
      */
    async insert(req, res) {

        try {


            if (req.files.length > 0) {
                for (let i = 0; i < req.files.length; i++) {
                    req.body.image = req.files[i].filename;
                }
            }

            let newRecord = await careersRepo.save(req.body);
            req.flash('success', 'Record created succesfully.');
            res.redirect(namedRouter.urlFor('admin.about.careers_opening.list'));

        } catch (e) {

            const error = errorHandler(e);
            req.flash('error', error.message);
            //res.status(500).send({message: error.message});
            res.redirect(namedRouter.urlFor('admin.about.careers_opening.create'));
        }
    };


    /* @Method: update
    // @Description: careers_opening update action
    */
    async update(req, res) {

        try {
            const careers_openingId = req.body.pid;
            let careers_openingData = await careersRepo.getById(careers_openingId);


            if (_.isEmpty(careers_openingData)) {
                req.flash('error', 'Record not found.');
                res.redirect(namedRouter.urlFor('admin.about.careers_opening.edit', {
                    id: careers_openingId
                }));
            } else {



                let careers_openingValue = await careersRepo.getById(careers_openingId);

                if (req.files.length > 0) {

                    if (fs.existsSync('./public/uploads/cms/' + careers_openingValue.image) && careers_openingValue.image) {
                        fs.unlinkSync('./public/uploads/cms/' + careers_openingValue.image);
                    }

                    for (let i = 0; i < req.files.length; i++) {
                        req.body.image = req.files[i].filename;
                    }
                }

                let careers_openingUpdate = await careersRepo.updateById(req.body, careers_openingId);
                if (careers_openingUpdate) {
                    req.flash('success', "Record Updated Successfully");
                    res.redirect(namedRouter.urlFor('admin.about.careers_opening.list'));
                } else {
                    res.redirect(namedRouter.urlFor('admin.about.careers_opening.edit', {
                        id: careers_openingId
                    }));
                }


            }
        } catch (e) {
            const error = errorHandler(e);
            req.flash('error', error.message);
            res.redirect(namedRouter.urlFor('admin.about.careers_opening.edit', {
                id: req.body.pid
            }));
        }

    };

    /* @Method: list
    // @Description: To list all the careers_opening from DB
    */

    async list(req, res) {
        try {

            res.render('about/views/list_careers_openings.ejs', {
                page_name: 'careers-opening-management',
                page_title: 'Careers Opening List',
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
    // @Description: To get all the careers_opening from DB
    */
    async getAll(req, res) {
        try {
            let careers_openings = await careersRepo.getAll(req);

            if (_.has(req.body, 'sort')) {
                var sortOrder = req.body.sort.sort;
                var sortField = req.body.sort.field;
            } else {
                var sortOrder = -1;
                var sortField = '_id';
            }
            let meta = {
                "page": req.body.pagination.page,
                "pages": careers_openings.pageCount,
                "perpage": req.body.pagination.perpage,
                "total": careers_openings.totalCount,
                "sort": sortOrder,
                "field": sortField
            };

            return {
                status: 200,
                meta: meta,
                data: careers_openings.data,
                message: `Data fetched succesfully.`
            };
        } catch (e) {
            throw e;
        }
    }

    /* @Method: create
    // @Description: create careers_opening action
    */
    async create(req, res) {
        try {
            res.render('about/views/add_careers_opening.ejs', {
                page_name: 'careers-opening-management',
                page_title: 'Careers Opening Create',
                user: req.user,
                permission: req.permission,
            });
        } catch (e) {
            throw (e);
        }
    };

    /*
    // @Method: edit
    // @Description:  careers_opening edit page
    */
    async edit(req, res) {
        try {
            let careers_openingValue = await careersRepo.getById(req.params.id);
            if (!_.isEmpty(careers_openingValue)) {
                res.render('about/views/edit_careers_opening.ejs', {
                    page_name: 'careers-opening-management',
                    page_title: 'Careers Opening Edit',
                    user: req.user,
                    permission: req.permission,
                    response: careers_openingValue
                });
            } else {
                req.flash('error', "Sorry, Record not found!");
                res.redirect(namedRouter.urlFor('admin.about.careers_opening.list'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };


    /* @Method: delete
    // @Description: careers_opening delete
    */
    async delete(req, res) {
        try {


            let careers_openingValue = await careersRepo.getById(req.params.id);

            if (careers_openingValue.image) {

                if (fs.existsSync('./public/uploads/cms/' + careers_openingValue.image) && careers_openingValue.image) {
                    fs.unlinkSync('./public/uploads/cms/' + careers_openingValue.image);
                }

            }

            let careers_openingDelete = await careersRepo.updateById({
                "isDeleted": true
            }, req.params.id);
            req.flash('success', 'Record removed successfully');
            res.redirect(namedRouter.urlFor('admin.about.careers_opening.list'));

        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /*
    // @Method: statusChange
    // @Description: careers_opening status change action
    */
    async statusChange(req, res) {
        try {

            let careers_opening = await careersRepo.getById(req.params.id);
            if (!_.isEmpty(careers_opening)) {
                let careers_openingStatus = (careers_opening.status == 'Active') ? 'Inactive' : 'Active';
                let careers_openingUpdate = careersRepo.updateById({
                    'status': careers_openingStatus
                }, req.params.id);

                req.flash('success', "Record status has changed successfully");
                res.redirect(namedRouter.urlFor('admin.about.careers_opening.list'));
            }

        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };




}

module.exports = new cmsController();