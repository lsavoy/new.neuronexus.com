const mongoose = require('mongoose');
const softwarevideosRepo = require('softwarevideos/repositories/softwarevideos.repository');
const productRepo = require('product_category/repositories/category.repository');

/* 
// @Method: getAllsoftwarevideosRepo
// @Description: Leadership
*/


exports.getAllsoftwarevideos = async req => {
    try {
        var searchQuery = {
            "isDeleted": false,
            "status": "Active"
        };

        if (req.query.title) {
            Object.assign(searchQuery, { "title": { $regex: req.query.title, $options: 'i' } });
        }
        var softwarevideos = await softwarevideosRepo.getAllByField(searchQuery);

        var searchQuerystatic = {
            "isDeleted": false,
            "status": "Active"
        };

        var productstatic = await productRepo.product_static_contentsGetByField(searchQuerystatic);


        return { status: 200, data: softwarevideos, page_title: productstatic.software_product_video_page_title, message: 'Record fetched Successfully' };
    } catch (error) {
        return { "status": 500, data: {}, "message": error.message }
    }
};


exports.getDetailssoftwarevideos = async req => {
    try {
        var searchQuery = {
            "slug": req.params.slug,
            "isDeleted": false,
            "status": "Active"
        };

        if (req.query.title) {
            Object.assign(searchQuery, { "title": { $regex: req.query.title, $options: 'i' } });
        }

        var softwarevideos = await softwarevideosRepo.getAllByField(searchQuery);
        if (softwarevideos) {
            return { status: 200, data: softwarevideos[0], message: 'Record fetched Successfully' };
        } else {
            return { status: 200, data: [], message: 'Record not fetched' };
        }

    } catch (error) {
        return { "status": 500, data: {}, "message": error.message }
    }
};








