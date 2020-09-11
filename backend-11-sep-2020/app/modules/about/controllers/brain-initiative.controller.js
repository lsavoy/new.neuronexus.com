const brainRepo = require('about/repositories/brain-initiative.repository');
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
    async editbrain(req, res) {
        try {
            let result = {};
            let cms = await brainRepo.brainGetByField({ "isDeleted": false });
            if (!_.isEmpty(cms)) {
                result.cms_data = cms;
                res.render('about/views/edit_brain-initiative.ejs', {
                    page_name: 'brain-initiative-management',
                    page_title: 'Brain initiative page',
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
    async updatebrain(req, res) {
        try {
            const aboutId = req.body.id;
            let about = await brainRepo.brainGetByField({
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

            let cmsIdUpdate = brainRepo.brainUpdateById(req.body, aboutId)
            if (cmsIdUpdate) {
                req.flash('success', "Content updated successfully");
                res.redirect(namedRouter.urlFor('admin.about.edit_brain_initiative'));
            }


        } catch (e) {
            return res.status(500).send({ message: e.message });
        }

    };

    //LeaderShip........................

    /* @Method: insert
      // @Description: save brain_initiative_tab action
      */
    async insert(req, res) {

        try {


            if (req.files.length > 0) {
                for (let i = 0; i < req.files.length; i++) {
                    req.body.image = req.files[i].filename;
                }
            }

            let newRecord = await brainRepo.save(req.body);
            req.flash('success', 'Record created succesfully.');
            res.redirect(namedRouter.urlFor('admin.about.brain_initiative_tab.list'));

        } catch (e) {

            const error = errorHandler(e);
            req.flash('error', error.message);
            //res.status(500).send({message: error.message});
            res.redirect(namedRouter.urlFor('admin.about.brain_initiative_tab.create'));
        }
    };


    /* @Method: update
    // @Description: brain_initiative_tab update action
    */
    async update(req, res) {

        try {
            const brain_initiative_tabId = req.body.pid;
            let brain_initiative_tabData = await brainRepo.getById(brain_initiative_tabId);


            if (_.isEmpty(brain_initiative_tabData)) {
                req.flash('error', 'Record not found.');
                res.redirect(namedRouter.urlFor('admin.about.brain_initiative_tab.edit', {
                    id: brain_initiative_tabId
                }));
            } else {



                let brain_initiative_tabValue = await brainRepo.getById(brain_initiative_tabId);

                if (req.files.length > 0) {

                    if (fs.existsSync('./public/uploads/cms/' + brain_initiative_tabValue.image) && brain_initiative_tabValue.image) {
                        fs.unlinkSync('./public/uploads/cms/' + brain_initiative_tabValue.image);
                    }

                    for (let i = 0; i < req.files.length; i++) {
                        req.body.image = req.files[i].filename;
                    }
                }

                let brain_initiative_tabUpdate = await brainRepo.updateById(req.body, brain_initiative_tabId);
                if (brain_initiative_tabUpdate) {
                    req.flash('success', "Record Updated Successfully");
                    res.redirect(namedRouter.urlFor('admin.about.brain_initiative_tab.list'));
                } else {
                    res.redirect(namedRouter.urlFor('admin.about.brain_initiative_tab.edit', {
                        id: brain_initiative_tabId
                    }));
                }


            }
        } catch (e) {
            const error = errorHandler(e);
            req.flash('error', error.message);
            res.redirect(namedRouter.urlFor('admin.about.brain_initiative_tab.edit', {
                id: req.body.pid
            }));
        }

    };

    /* @Method: list
    // @Description: To list all the brain_initiative_tab from DB
    */

    async list(req, res) {
        try {

            res.render('about/views/list_brain-initiative-tabs.ejs', {
                page_name: 'brain-initiative-tab-management',
                page_title: 'Brain Initiative Tab List',
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
    // @Description: To get all the brain_initiative_tab from DB
    */
    async getAll(req, res) {
        try {
            let brain_initiative_tabs = await brainRepo.getAll(req);

            if (_.has(req.body, 'sort')) {
                var sortOrder = req.body.sort.sort;
                var sortField = req.body.sort.field;
            } else {
                var sortOrder = -1;
                var sortField = '_id';
            }
            let meta = {
                "page": req.body.pagination.page,
                "pages": brain_initiative_tabs.pageCount,
                "perpage": req.body.pagination.perpage,
                "total": brain_initiative_tabs.totalCount,
                "sort": sortOrder,
                "field": sortField
            };

            return {
                status: 200,
                meta: meta,
                data: brain_initiative_tabs.data,
                message: `Data fetched succesfully.`
            };
        } catch (e) {
            throw e;
        }
    }

    /* @Method: create
    // @Description: create brain_initiative_tab action
    */
    async create(req, res) {
        try {
            res.render('about/views/add_brain_initiative_tab.ejs', {
                page_name: 'brain-initiative-tab-management',
                page_title: 'Brain Initiative Tab Create',
                user: req.user,
                permission: req.permission,
            });
        } catch (e) {
            throw (e);
        }
    };

    /*
    // @Method: edit
    // @Description:  brain_initiative_tab edit page
    */
    async edit(req, res) {
        try {
            let brain_initiative_tabValue = await brainRepo.getById(req.params.id);
            if (!_.isEmpty(brain_initiative_tabValue)) {
                res.render('about/views/edit_brain_initiative_tab.ejs', {
                    page_name: 'brain-initiative-tab-management',
                    page_title: 'Brain Initiative Tab Edit',
                    user: req.user,
                    permission: req.permission,
                    response: brain_initiative_tabValue
                });
            } else {
                req.flash('error', "Sorry, Record not found!");
                res.redirect(namedRouter.urlFor('admin.about.brain_initiative_tab.list'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };


    /* @Method: delete
    // @Description: brain_initiative_tab delete
    */
    async delete(req, res) {
        try {


            let brain_initiative_tabValue = await brainRepo.getById(req.params.id);

            if (brain_initiative_tabValue.image) {

                if (fs.existsSync('./public/uploads/cms/' + brain_initiative_tabValue.image) && brain_initiative_tabValue.image) {
                    fs.unlinkSync('./public/uploads/cms/' + brain_initiative_tabValue.image);
                }

            }

            let brain_initiative_tabDelete = await brainRepo.updateById({
                "isDeleted": true
            }, req.params.id);
            req.flash('success', 'Record removed successfully');
            res.redirect(namedRouter.urlFor('admin.about.brain_initiative_tab.list'));

        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /*
    // @Method: statusChange
    // @Description: brain_initiative_tab status change action
    */
    async statusChange(req, res) {
        try {

            let brain_initiative_tab = await brainRepo.getById(req.params.id);
            if (!_.isEmpty(brain_initiative_tab)) {
                let brain_initiative_tabStatus = (brain_initiative_tab.status == 'Active') ? 'Inactive' : 'Active';
                let brain_initiative_tabUpdate = brainRepo.updateById({
                    'status': brain_initiative_tabStatus
                }, req.params.id);

                req.flash('success', "Record status has changed successfully");
                res.redirect(namedRouter.urlFor('admin.about.brain_initiative_tab.list'));
            }

        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    //LeaderShip..........................


}

module.exports = new cmsController();