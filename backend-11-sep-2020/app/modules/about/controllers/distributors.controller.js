const distributorsRepo = require('about/repositories/distributors.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const errorHandler = require("../../../errorHandler");
const fs = require("fs");
const gm = require("gm").subClass({
    imageMagick: true,
});
const countrydata = require('../../../config/countries.json');

class cmsController {
    constructor() {
        this.cms = [];

    }

    /*
    // @Method: editmeet_the_team
    // @Description:  Edit meet_the_team page Content
    */
    async editdistributors(req, res) {
        try {
            let result = {};
            let cms = await distributorsRepo.distributorsGetByField({ "isDeleted": false });
            if (!_.isEmpty(cms)) {
                result.cms_data = cms;
                res.render('about/views/edit_distributors.ejs', {
                    page_name: 'distributors-management',
                    page_title: 'Distributors page',
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
    async updatedistributors(req, res) {
        try {
            const distributorsId = req.body.id;
            let distributors = await distributorsRepo.distributorsGetByField({
                _id: req.body.id,
                'isDeleted': false
            });
            if (req.files.length > 0) {
                for (let i = 0; i < req.files.length; i++) {

                    if (req.files[i].fieldname == 'image') {
                        if (fs.existsSync('./public/uploads/cms/' + distributors.image) && distributors.image) {
                            fs.unlinkSync('./public/uploads/cms/' + distributors.image);
                        }
                        req.body.image = req.files[i].filename;
                    }

                }
            }

            let cmsIdUpdate = distributorsRepo.distributorsUpdateById(req.body, distributorsId)
            if (cmsIdUpdate) {
                req.flash('success', "Content updated successfully");
                res.redirect(namedRouter.urlFor('admin.about.edit_distributors'));
            }


        } catch (e) {
            return res.status(500).send({ message: e.message });
        }

    };

    //LeaderShip........................

    /* @Method: insert
      // @Description: save partners action
      */
    async insert(req, res) {

        try {


            if (req.files.length > 0) {
                for (let i = 0; i < req.files.length; i++) {
                    req.body.image = req.files[i].filename;
                }
            }

            let newRecord = await distributorsRepo.save(req.body);
            req.flash('success', 'Record created succesfully.');
            res.redirect(namedRouter.urlFor('admin.about.partners.list'));

        } catch (e) {

            const error = errorHandler(e);
            req.flash('error', error.message);
            //res.status(500).send({message: error.message});
            res.redirect(namedRouter.urlFor('admin.about.partners.create'));
        }
    };


    /* @Method: update
    // @Description: partners update action
    */
    async update(req, res) {

        try {
            const partnersId = req.body.pid;
            let partnersData = await distributorsRepo.getById(partnersId);


            if (_.isEmpty(partnersData)) {
                req.flash('error', 'Record not found.');
                res.redirect(namedRouter.urlFor('admin.about.partners.edit', {
                    id: partnersId
                }));
            } else {



                let partnersValue = await distributorsRepo.getById(partnersId);

                if (req.files.length > 0) {

                    if (fs.existsSync('./public/uploads/cms/' + partnersValue.image) && partnersValue.image) {
                        fs.unlinkSync('./public/uploads/cms/' + partnersValue.image);
                    }

                    for (let i = 0; i < req.files.length; i++) {
                        req.body.image = req.files[i].filename;
                    }
                }

                let partnersUpdate = await distributorsRepo.updateById(req.body, partnersId);
                if (partnersUpdate) {
                    req.flash('success', "Record Updated Successfully");
                    res.redirect(namedRouter.urlFor('admin.about.partners.list'));
                } else {
                    res.redirect(namedRouter.urlFor('admin.about.partners.edit', {
                        id: partnersId
                    }));
                }


            }
        } catch (e) {
            const error = errorHandler(e);
            req.flash('error', error.message);
            res.redirect(namedRouter.urlFor('admin.about.partners.edit', {
                id: req.body.pid
            }));
        }

    };

    /* @Method: list
    // @Description: To list all the partners from DB
    */

    async list(req, res) {
        try {

            res.render('about/views/list_partners.ejs', {
                page_name: 'partners-management',
                page_title: 'Partners List',
                permission: req.permission,
                user: req.user,
            });
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /* @Method: getAll
    // @Description: To get all the partners from DB
    */
    async getAll(req, res) {
        try {
            let partners = await distributorsRepo.getAll(req);

            if (_.has(req.body, 'sort')) {
                var sortOrder = req.body.sort.sort;
                var sortField = req.body.sort.field;
            } else {
                var sortOrder = -1;
                var sortField = '_id';
            }
            let meta = {
                "page": req.body.pagination.page,
                "pages": partners.pageCount,
                "perpage": req.body.pagination.perpage,
                "total": partners.totalCount,
                "sort": sortOrder,
                "field": sortField
            };

            return {
                status: 200,
                meta: meta,
                data: partners.data,
                message: `Data fetched succesfully.`
            };
        } catch (e) {
            throw e;
        }
    }

    /* @Method: create
    // @Description: create partners action
    */
    async create(req, res) {

        try {


            res.render('about/views/add_partners.ejs', {
                page_name: 'partners-management',
                page_title: 'Partners Create',
                country_list: countrydata,
                permission: req.permission,
                user: req.user
            });
        } catch (e) {
            throw (e);
        }
    };

    /*
    // @Method: edit
    // @Description:  partners edit page
    */
    async edit(req, res) {
        try {
            let partnersValue = await distributorsRepo.getById(req.params.id);
            if (!_.isEmpty(partnersValue)) {
                res.render('about/views/edit_partners.ejs', {
                    page_name: 'partners-management',
                    page_title: 'Partners Edit',
                    user: req.user,
                    permission: req.permission,
                    country_list: countrydata,
                    response: partnersValue
                });
            } else {
                req.flash('error', "Sorry, Record not found!");
                res.redirect(namedRouter.urlFor('admin.about.partners.list'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };


    /* @Method: delete
    // @Description: partners delete
    */
    async delete(req, res) {
        try {


            let partnersValue = await distributorsRepo.getById(req.params.id);

            if (partnersValue.image) {

                if (fs.existsSync('./public/uploads/cms/' + partnersValue.image) && partnersValue.image) {
                    fs.unlinkSync('./public/uploads/cms/' + partnersValue.image);
                }

            }

            let partnersDelete = await distributorsRepo.updateById({
                "isDeleted": true
            }, req.params.id);
            req.flash('success', 'Record removed successfully');
            res.redirect(namedRouter.urlFor('admin.about.partners.list'));

        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /*
    // @Method: statusChange
    // @Description: partners status change action
    */
    async statusChange(req, res) {
        try {

            let partners = await distributorsRepo.getById(req.params.id);
            if (!_.isEmpty(partners)) {
                let partnersStatus = (partners.status == 'Active') ? 'Inactive' : 'Active';
                let partnersUpdate = distributorsRepo.updateById({
                    'status': partnersStatus
                }, req.params.id);

                req.flash('success', "Record status has changed successfully");
                res.redirect(namedRouter.urlFor('admin.about.partners.list'));
            }

        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };




}

module.exports = new cmsController();