const mongoose = require('mongoose');
const instrumentationvideosRepo = require('instrumentationvideos/repositories/instrumentationvideos.repository');
const productRepo = require('product_category/repositories/category.repository');

/* 
// @Method: getAllinstrumentationvideosRepo
// @Description: Leadership
*/


exports.getAllinstrumentationvideos = async req => {
    try {
        var searchQuery = {
            "isDeleted": false,
            "status": "Active"
        };

        if (req.query.title) {
            Object.assign(searchQuery, { "title": { $regex: req.query.title, $options: 'i' } });
        }
        var instrumentationvideos = await instrumentationvideosRepo.getAllByField(searchQuery);

        var searchQuerystatic = {
            "isDeleted": false,
            "status": "Active"
        };

        var productstatic = await productRepo.product_static_contentsGetByField(searchQuerystatic);


        return { status: 200, data: instrumentationvideos, page_title: productstatic.instrumentation_product_video_page_title, message: 'Record fetched Successfully' };
    } catch (error) {
        return { "status": 500, data: {}, "message": error.message }
    }
};


exports.getDetailsinstrumentationvideos = async req => {
    try {
        var searchQuery = {
            "slug": req.params.slug,
            "isDeleted": false,
            "status": "Active"
        };

        if (req.query.title) {
            Object.assign(searchQuery, { "title": { $regex: req.query.title, $options: 'i' } });
        }

        var instrumentationvideos = await instrumentationvideosRepo.getAllByField(searchQuery);
        if (instrumentationvideos) {
            return { status: 200, data: instrumentationvideos[0], message: 'Record fetched Successfully' };
        } else {
            return { status: 200, data: [], message: 'Record not fetched' };
        }

    } catch (error) {
        return { "status": 500, data: {}, "message": error.message }
    }
};








