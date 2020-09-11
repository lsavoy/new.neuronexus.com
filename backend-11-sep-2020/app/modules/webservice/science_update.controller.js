const mongoose = require('mongoose');
const scienceRepo = require('science_update/repositories/science.repository');


/* 
// @Method: getAllscienceRepo
// @Description: Leadership
*/


exports.getAllscience_update = async req => {
    try {
        var searchQuery = {
            "isDeleted": false,
            "status": "Active"
        };

        if (req.query.title) {
            Object.assign(searchQuery, { "title": { $regex: req.query.title, $options: 'i' } });
        }
        if (req.params.category_id) {
            Object.assign(searchQuery, { "category_id": mongoose.Types.ObjectId(req.params.category_id) });
        }
        var science_update = await scienceRepo.getAllByField(searchQuery);
        return { status: 200, data: science_update, message: 'Record fetched Successfully' };
    } catch (error) {
        return { "status": 500, data: {}, "message": error.message }
    }
};


exports.getDetailsscience_update = async req => {
    try {
        var searchQuery = {
            "slug": req.params.slug,
            "isDeleted": false,
            "status": "Active"
        };

        if (req.query.title) {
            Object.assign(searchQuery, { "title": { $regex: req.query.title, $options: 'i' } });
        }
        if (req.params.category_id) {
            Object.assign(searchQuery, { "category_id": mongoose.Types.ObjectId(req.params.category_id) });
        }
        var science_update = await scienceRepo.getByFieldDetails(searchQuery);
        if (science_update) {
            return { status: 200, data: science_update[0], message: 'Record fetched Successfully' };
        } else {
            return { status: 200, data: [], message: 'Record not fetched' };
        }

    } catch (error) {
        return { "status": 500, data: {}, "message": error.message }
    }
};


exports.getTopThreescience_update = async req => {
    try {

        var searchQuery = {
            "isDeleted": false,
            "status": "Active"
        };

        var science_update = await scienceRepo.getAllByFieldTopThree(searchQuery);
        return { status: 200, data: science_update, message: 'Record fetched Successfully' };
    } catch (error) {
        return { "status": 500, data: {}, "message": error.message }
    }
};


/* 
// @Method: getProductStaticContents
// @Description: Products
*/
exports.getProductStaticContents = async req => {
    try {
        var searchQuery = {
            "isDeleted": false,
            "status": "Active"
        };

        var science = await scienceRepo.science_static_contentsGetByField(searchQuery);
        return { status: 200, data: science, message: 'Record fetched Successfully' };
    } catch (error) {
        return { "status": 500, data: {}, "message": error.message }
    }
};





