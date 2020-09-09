const aboutRepo = require('about/repositories/about.repository');
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
    async editaboutus(req, res) {
        try {
            let result = {};
            let cms = await aboutRepo.aboutusGetByField({ "isDeleted": false });
            if (!_.isEmpty(cms)) {
                result.cms_data = cms;
                res.render('about/views/edit_aboutus.ejs', {
                    page_name: 'aboutus-management',
                    page_title: 'About page',
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
    async updateaboutus(req, res) {
        try {
            const aboutId = req.body.id;
            let about = await aboutRepo.aboutusGetByField({
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
                    if (req.files[i].fieldname == 'header_banner_image') {
                        if (fs.existsSync('./public/uploads/cms/' + about.header_banner_image) && about.header_banner_image) {
                            fs.unlinkSync('./public/uploads/cms/' + about.header_banner_image);
                        }
                        req.body.header_banner_image = req.files[i].filename;
                    }

                }
            }

            let cmsIdUpdate = aboutRepo.aboutusUpdateById(req.body, aboutId)
            if (cmsIdUpdate) {
                req.flash('success', "Content updated successfully");
                res.redirect(namedRouter.urlFor('admin.about.editaboutus'));
            }


        } catch (e) {
            return res.status(500).send({ message: e.message });
        }

    };



    /*
    // @Method: editmeet_the_team
    // @Description:  Edit meet_the_team page Content
    */
    async editmeet_the_team(req, res) {
        try {
            let result = {};
            let cms = await aboutRepo.meet_the_teamGetByField({ "isDeleted": false });
            if (!_.isEmpty(cms)) {
                result.cms_data = cms;
                res.render('about/views/edit_meet_the_team.ejs', {
                    page_name: 'meet_the_team-management',
                    page_title: 'Meet the team page',
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
    async updatemeet_the_team(req, res) {
        try {
            const aboutId = req.body.id;
            let about = await aboutRepo.meet_the_teamGetByField({
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

            let cmsIdUpdate = aboutRepo.meet_the_teamUpdateById(req.body, aboutId)
            if (cmsIdUpdate) {
                req.flash('success', "Content updated successfully");
                res.redirect(namedRouter.urlFor('admin.about.edit'));
            }


        } catch (e) {
            return res.status(500).send({ message: e.message });
        }

    };

    //LeaderShip........................

    /* @Method: insert
      // @Description: save leadership action
      */
    async insert(req, res) {

        try {


            if (req.files.length > 0) {
                for (let i = 0; i < req.files.length; i++) {
                    req.body.image = req.files[i].filename;
                }
            }

            let newLeadership = await aboutRepo.saveLeadership(req.body);
            req.flash('success', 'Leadership created succesfully.');
            res.redirect(namedRouter.urlFor('admin.about.leadership.list'));

        } catch (e) {

            const error = errorHandler(e);
            req.flash('error', error.message);
            //res.status(500).send({message: error.message});
            res.redirect(namedRouter.urlFor('admin.about.leadership.create'));
        }
    };


    /* @Method: update
    // @Description: leadership update action
    */
    async update(req, res) {

        try {
            const leadershipId = req.body.pid;
            let leadershipData = await aboutRepo.getByIdLeadership(leadershipId);


            if (_.isEmpty(leadershipData)) {
                req.flash('error', 'Leadership not found.');
                res.redirect(namedRouter.urlFor('admin.about.leadership.edit', {
                    id: leadershipId
                }));
            } else {



                let leadershipValue = await aboutRepo.getByIdLeadership(leadershipId);

                if (req.files.length > 0) {

                    if (fs.existsSync('./public/uploads/cms/' + leadershipValue.image) && leadershipValue.image) {
                        fs.unlinkSync('./public/uploads/cms/' + leadershipValue.image);
                    }

                    for (let i = 0; i < req.files.length; i++) {
                        req.body.image = req.files[i].filename;
                    }
                }

                let leadershipUpdate = await aboutRepo.updateByIdLeadership(req.body, leadershipId);
                if (leadershipUpdate) {
                    req.flash('success', "Leadership Updated Successfully");
                    res.redirect(namedRouter.urlFor('admin.about.leadership.list'));
                } else {
                    res.redirect(namedRouter.urlFor('admin.about.leadership.edit', {
                        id: leadershipId
                    }));
                }


            }
        } catch (e) {
            const error = errorHandler(e);
            req.flash('error', error.message);
            res.redirect(namedRouter.urlFor('admin.about.leadership.edit', {
                id: req.body.pid
            }));
        }

    };

    /* @Method: list
    // @Description: To list all the leadership from DB
    */

    async list(req, res) {
        try {

            res.render('about/views/list_leadership.ejs', {
                page_name: 'leadership-management',
                page_title: 'Leadership List',
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
    // @Description: To get all the leadership from DB
    */
    async getAll(req, res) {
        try {
            let leaderships = await aboutRepo.getAllLeadership(req);

            if (_.has(req.body, 'sort')) {
                var sortOrder = req.body.sort.sort;
                var sortField = req.body.sort.field;
            } else {
                var sortOrder = -1;
                var sortField = '_id';
            }
            let meta = {
                "page": req.body.pagination.page,
                "pages": leaderships.pageCount,
                "perpage": req.body.pagination.perpage,
                "total": leaderships.totalCount,
                "sort": sortOrder,
                "field": sortField
            };

            return {
                status: 200,
                meta: meta,
                data: leaderships.data,
                message: `Data fetched succesfully.`
            };
        } catch (e) {
            throw e;
        }
    }

    /* @Method: create
    // @Description: create leadership action
    */
    async create(req, res) {
        try {
            res.render('about/views/add_leadership.ejs', {
                page_name: 'leadership-management',
                page_title: 'Leadership Create',
                permission: req.permission,
                user: req.user
            });
        } catch (e) {
            throw (e);
        }
    };

    /*
    // @Method: edit
    // @Description:  leadership edit page
    */
    async edit(req, res) {
        try {
            let leadershipValue = await aboutRepo.getByIdLeadership(req.params.id);
            if (!_.isEmpty(leadershipValue)) {
                res.render('about/views/edit_leadership.ejs', {
                    page_name: 'leadership-management',
                    page_title: 'Leadership Edit',
                    user: req.user,
                    permission: req.permission,
                    response: leadershipValue
                });
            } else {
                req.flash('error', "Sorry, leadership not found!");
                res.redirect(namedRouter.urlFor('admin.about.leadership.list'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };


    /* @Method: delete
    // @Description: leadership delete
    */
    async delete(req, res) {
        try {


            let leadershipValue = await aboutRepo.getByIdLeadership(req.params.id);

            if (leadershipValue.image) {

                if (fs.existsSync('./public/uploads/cms/' + leadershipValue.image) && leadershipValue.image) {
                    fs.unlinkSync('./public/uploads/cms/' + leadershipValue.image);
                }

            }

            let leadershipDelete = await aboutRepo.updateByIdLeadership({
                "isDeleted": true
            }, req.params.id);
            req.flash('success', 'Leadership removed successfully');
            res.redirect(namedRouter.urlFor('admin.about.leadership.list'));

        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /*
    // @Method: statusChange
    // @Description: leadership status change action
    */
    async statusChange(req, res) {
        try {

            let leadership = await aboutRepo.getByIdLeadership(req.params.id);
            if (!_.isEmpty(leadership)) {
                let leadershipStatus = (leadership.status == 'Active') ? 'Inactive' : 'Active';
                let leadershipUpdate = aboutRepo.updateByIdLeadership({
                    'status': leadershipStatus
                }, req.params.id);

                req.flash('success', "Leadership status has changed successfully");
                res.redirect(namedRouter.urlFor('admin.about.leadership.list'));
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