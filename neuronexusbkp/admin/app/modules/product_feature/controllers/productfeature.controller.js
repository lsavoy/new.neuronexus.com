const productFeatureRepo = require('product_feature/repositories/productfeature.repository');
const slug = require('slug');
const express = require('express');
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


class ProductFeatureController {

    async edit(req, res) {
        try {
            let productFeature = await productFeatureRepo.getById(req.params.id);
            if (!_.isEmpty(productFeature)) {
                res.render('product_feature/views/edit.ejs', {
                    page_name: 'feature-management',
                    page_title: 'Product Feature Edit',
                    user: req.user,
                    permission: req.permission,
                    response: productFeature
                });
            } else {
                req.flash('error', "Sorry setting not found!");
                res.redirect(namedRouter.urlFor('product_feature.list'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    async update(req, res) {
        try {
            const featureId = req.body.id;

            let productFeature = await productFeatureRepo.getById(featureId);
            if (!_.isEmpty(productFeature)) {
                if (req.files.length > 0) {
                    if (productFeature.feature_img != '') {
                        for (var y = 0; y < req.files.length; y++) {
                            if (req.files[y].fieldname == 'feature_img') {
                                req.body.feature_img = req.files[y].filename;
                                if (fs.existsSync('./public/uploads/feature/' + productFeature.feature_img)) {
                                    fs.unlinkSync('./public/uploads/feature/' + productFeature.feature_img);
                                }
                            }
                        }
                    }
                }
            }

            let featureUpdate = await productFeatureRepo.updateById(req.body, featureId);
            if (featureUpdate) {
                req.flash('success', "Setting Updated Successfully");
                res.redirect(namedRouter.urlFor('product_feature.list'));
            } else {
                res.redirect(namedRouter.urlFor('product_feature.edit', {
                    id: featureId
                }));
            }
        } catch (e) {
            const error = errorHandler(e);
            req.flash('error', error.message);
            res.redirect(namedRouter.urlFor('product_feature.edit', {
                id: req.body.mid
            }));
        }

    };

    async list(req, res) {
        try {
            res.render('product_feature/views/list.ejs', {
                page_name: 'feature-management',
                page_title: 'Product Feature List',
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
            let featureList = await productFeatureRepo.getAll(req);

            let meta = {
                "page": req.body.pagination.page,
                "pages": featureList.pageCount,
                "perpage": req.body.pagination.perpage,
                "total": featureList.totalCount,
                "sort": -1,
                "field": 'feature_index'
            };

            return {
                status: 200,
                meta: meta,
                data: featureList.data,
                message: `Data fetched succesfully.`
            };
        } catch (e) {
            throw e;
        }
    }
}

module.exports = new ProductFeatureController();
