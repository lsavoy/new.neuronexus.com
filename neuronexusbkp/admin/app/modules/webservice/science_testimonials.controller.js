const mongoose = require('mongoose');
const scienceRepo = require('science_update/repositories/testimonials.repository');
const scienceRepostatic = require('science_update/repositories/science.repository');


/* 
// @Method: getAllscienceRepo
// @Description: Leadership
*/


exports.getAllscience_testimonials = async req => {
    try {
        var searchQuery = {
            "isDeleted": false,
            "status": "Active"
        };

        if (req.query.title) {
            Object.assign(searchQuery, { "title": { $regex: req.query.title, $options: 'i' } });
        }

        var science_testimonials = await scienceRepo.getAllByField(searchQuery);

        var searchQuery = {
            "isDeleted": false,
            "status": "Active"
        };

        var scienceupdate = await scienceRepostatic.science_static_contentsGetByField(searchQuery);

        return { status: 200, data: science_testimonials, page_title: scienceupdate.testimonials_page_title, message: 'Record fetched Successfully' };
    } catch (error) {
        return { "status": 500, data: {}, "message": error.message }
    }
};


exports.getDetailsscience_testimonials = async req => {
    try {
        var searchQuery = {
            "slug": req.params.slug,
            "isDeleted": false,
            "status": "Active"
        };

        if (req.query.title) {
            Object.assign(searchQuery, { "title": { $regex: req.query.title, $options: 'i' } });
        }

        var science_testimonials = await scienceRepo.getAllByField(searchQuery);
        if (science_testimonials) {
            return { status: 200, data: science_testimonials[0], message: 'Record fetched Successfully' };
        } else {
            return { status: 200, data: [], message: 'Record not fetched' };
        }

    } catch (error) {
        return { "status": 500, data: {}, "message": error.message }
    }
};








