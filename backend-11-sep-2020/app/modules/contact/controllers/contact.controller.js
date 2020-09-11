const contactRepo = require('contact/repositories/contact.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');
const fs = require('fs');
const errorHandler = require('../../../errorHandler');


class contactController {


    async editcontactstatic(req, res) {
        try {
            let result = {};
            let cms = await contactRepo.contactstaticGetByField({ "isDeleted": false });
            if (!_.isEmpty(cms)) {
                result.cms_data = cms;
                res.render('contact/views/edit_contactstatic.ejs', {
                    page_name: 'contactstatic-management',
                    page_title: 'Request A Quote Page',
                    permission: req.permission,
                    user: req.user,
                    response: result
                });
            } else {
                req.flash('error', "Sorry record not found!");

            }
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };


    async updatecontactstatic(req, res) {
        try {
            const aboutId = req.body.id;

            let about = await contactRepo.contactstaticGetByField({
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


            let cmsIdUpdate = contactRepo.contactstaticUpdateById(req.body, aboutId)
            if (cmsIdUpdate) {
                req.flash('success', "Request A Quote updated successfully");
                res.redirect(namedRouter.urlFor('contact.editcontactstatic'));
            }


        } catch (e) {
            return res.status(500).send({ message: e.message });
        }

    };


    /*
    // @Method: view
    // @Description:  contact view page
    */
    async view(req, res) {
        try {
            let result = {};
            let contactData = await contactRepo.getById(req.params.id);
            if (!_.isEmpty(contactData)) {
                result.contact_data = contactData;
                res.render('contact/views/view.ejs', {
                    page_name: 'contact-management',
                    page_title: 'Request A Quote Detail',
                    user: req.user,
                    response: result,
                    permission: req.permission,
                });
            } else {
                req.flash('error', "Sorry request a quote details not found!");
                res.redirect(namedRouter.urlFor('contact.list'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /* @Method: list
    // @Description: To list all the contact from DB
    */
    async list(req, res) {
        try {
            res.render('contact/views/list.ejs', {
                page_name: 'contact-management',
                page_title: 'Request A Quote List',
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
            let contactData = await contactRepo.getAll(req);
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

}

module.exports = new contactController();