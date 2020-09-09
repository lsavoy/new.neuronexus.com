const scienceRepo = require('about/repositories/science-update-collaboration.repository');
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
    async editscience(req, res) {
        try {
            let result = {};
            let cms = await scienceRepo.scienceGetByField({ "isDeleted": false });
            if (!_.isEmpty(cms)) {
                result.cms_data = cms;
                res.render('about/views/edit_science-update-collaboration.ejs', {
                    page_name: 'science-update-collaboration-management',
                    page_title: 'Science Update Collaboration page',
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
    async updatescience(req, res) {
        try {
            const aboutId = req.body.id;
            let about = await scienceRepo.scienceGetByField({
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

            let cmsIdUpdate = scienceRepo.scienceUpdateById(req.body, aboutId)
            if (cmsIdUpdate) {
                req.flash('success', "Content updated successfully");
                res.redirect(namedRouter.urlFor('admin.about.edit_science_update_collaboration'));
            }


        } catch (e) {
            return res.status(500).send({ message: e.message });
        }

    };

    //LeaderShip........................

    /* @Method: insert
      // @Description: save science_update_collaboration_tab action
      */
    async insert(req, res) {

        try {


            if (req.files.length > 0) {
                for (let i = 0; i < req.files.length; i++) {
                    req.body.image = req.files[i].filename;
                }
            }

            let newRecord = await scienceRepo.save(req.body);
            req.flash('success', 'Record created succesfully.');
            res.redirect(namedRouter.urlFor('admin.about.science_update_collaboration_tab.list'));

        } catch (e) {

            const error = errorHandler(e);
            req.flash('error', error.message);
            //res.status(500).send({message: error.message});
            res.redirect(namedRouter.urlFor('admin.about.science_update_collaboration_tab.create'));
        }
    };


    /* @Method: update
    // @Description: science_update_collaboration_tab update action
    */
    async update(req, res) {

        try {
            const science_update_collaboration_tabId = req.body.pid;
            let science_update_collaboration_tabData = await scienceRepo.getById(science_update_collaboration_tabId);


            if (_.isEmpty(science_update_collaboration_tabData)) {
                req.flash('error', 'Record not found.');
                res.redirect(namedRouter.urlFor('admin.about.science_update_collaboration_tab.edit', {
                    id: science_update_collaboration_tabId
                }));
            } else {



                let science_update_collaboration_tabValue = await scienceRepo.getById(science_update_collaboration_tabId);

                if (req.files.length > 0) {

                    if (fs.existsSync('./public/uploads/cms/' + science_update_collaboration_tabValue.image) && science_update_collaboration_tabValue.image) {
                        fs.unlinkSync('./public/uploads/cms/' + science_update_collaboration_tabValue.image);
                    }

                    for (let i = 0; i < req.files.length; i++) {
                        req.body.image = req.files[i].filename;
                    }
                }

                let science_update_collaboration_tabUpdate = await scienceRepo.updateById(req.body, science_update_collaboration_tabId);
                if (science_update_collaboration_tabUpdate) {
                    req.flash('success', "Record Updated Successfully");
                    res.redirect(namedRouter.urlFor('admin.about.science_update_collaboration_tab.list'));
                } else {
                    res.redirect(namedRouter.urlFor('admin.about.science_update_collaboration_tab.edit', {
                        id: science_update_collaboration_tabId
                    }));
                }


            }
        } catch (e) {
            const error = errorHandler(e);
            req.flash('error', error.message);
            res.redirect(namedRouter.urlFor('admin.about.science_update_collaboration_tab.edit', {
                id: req.body.pid
            }));
        }

    };

    /* @Method: list
    // @Description: To list all the science_update_collaboration_tab from DB
    */

    async list(req, res) {
        try {

            res.render('about/views/list_science-update-collaboration_tabs.ejs', {
                page_name: 'science-update-collaboration-tab-management',
                page_title: 'Science Update Collaboration Tab List',
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
    // @Description: To get all the science_update_collaboration_tab from DB
    */
    async getAll(req, res) {
        try {
            let science_update_collaboration_tabs = await scienceRepo.getAll(req);

            if (_.has(req.body, 'sort')) {
                var sortOrder = req.body.sort.sort;
                var sortField = req.body.sort.field;
            } else {
                var sortOrder = -1;
                var sortField = '_id';
            }
            let meta = {
                "page": req.body.pagination.page,
                "pages": science_update_collaboration_tabs.pageCount,
                "perpage": req.body.pagination.perpage,
                "total": science_update_collaboration_tabs.totalCount,
                "sort": sortOrder,
                "field": sortField
            };

            return {
                status: 200,
                meta: meta,
                data: science_update_collaboration_tabs.data,
                message: `Data fetched succesfully.`
            };
        } catch (e) {
            throw e;
        }
    }

    /* @Method: create
    // @Description: create science_update_collaboration_tab action
    */
    async create(req, res) {
        try {
            res.render('about/views/add_science-update-collaboration_tab.ejs', {
                page_name: 'science-update-collaboration-tab-management',
                page_title: 'Science Update Collaboration Tab Create',
                user: req.user,
                permission: req.permission,
            });
        } catch (e) {
            throw (e);
        }
    };

    /*
    // @Method: edit
    // @Description:  science_update_collaboration_tab edit page
    */
    async edit(req, res) {
        try {
            let science_update_collaboration_tabValue = await scienceRepo.getById(req.params.id);
            if (!_.isEmpty(science_update_collaboration_tabValue)) {
                res.render('about/views/edit_science-update-collaboration_tab.ejs', {
                    page_name: 'science-update-collaboration-tab-management',
                    page_title: 'Science Update Collaboration Tab Edit',
                    user: req.user,
                    permission: req.permission,
                    response: science_update_collaboration_tabValue
                });
            } else {
                req.flash('error', "Sorry, Record not found!");
                res.redirect(namedRouter.urlFor('admin.about.science_update_collaboration_tab.list'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };


    /* @Method: delete
    // @Description: science_update_collaboration_tab delete
    */
    async delete(req, res) {
        try {


            let science_update_collaboration_tabValue = await scienceRepo.getById(req.params.id);

            if (science_update_collaboration_tabValue.image) {

                if (fs.existsSync('./public/uploads/cms/' + science_update_collaboration_tabValue.image) && science_update_collaboration_tabValue.image) {
                    fs.unlinkSync('./public/uploads/cms/' + science_update_collaboration_tabValue.image);
                }

            }

            let science_update_collaboration_tabDelete = await scienceRepo.updateById({
                "isDeleted": true
            }, req.params.id);
            req.flash('success', 'Record removed successfully');
            res.redirect(namedRouter.urlFor('admin.about.science_update_collaboration_tab.list'));

        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /*
    // @Method: statusChange
    // @Description: science_update_collaboration_tab status change action
    */
    async statusChange(req, res) {
        try {

            let science_update_collaboration_tab = await scienceRepo.getById(req.params.id);
            if (!_.isEmpty(science_update_collaboration_tab)) {
                let science_update_collaboration_tabStatus = (science_update_collaboration_tab.status == 'Active') ? 'Inactive' : 'Active';
                let science_update_collaboration_tabUpdate = scienceRepo.updateById({
                    'status': science_update_collaboration_tabStatus
                }, req.params.id);

                req.flash('success', "Record status has changed successfully");
                res.redirect(namedRouter.urlFor('admin.about.science_update_collaboration_tab.list'));
            }

        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };




}

module.exports = new cmsController();