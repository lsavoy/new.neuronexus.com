const mongoose = require('mongoose');
const trainingvideosRepo = require('trainingvideos/repositories/trainingvideos.repository');


/* 
// @Method: getAlltrainingvideosRepo
// @Description: Leadership
*/


exports.getAlltrainingvideos = async req => {
    try {
        var searchQuery = {
            "isDeleted": false,
            "status": "Active"
        };

        if (req.query.title) {
            Object.assign(searchQuery, { "title": { $regex: req.query.title, $options: 'i' } });
        }
        var trainingvideos = await trainingvideosRepo.getAllByField(searchQuery);
        return { status: 200, data: trainingvideos, message: 'Record fetched Successfully' };
    } catch (error) {
        return { "status": 500, data: {}, "message": error.message }
    }
};


exports.getDetailstrainingvideos = async req => {
    try {
        var searchQuery = {
            "slug": req.params.slug,
            "isDeleted": false,
            "status": "Active"
        };

        if (req.query.title) {
            Object.assign(searchQuery, { "title": { $regex: req.query.title, $options: 'i' } });
        }

        var trainingvideos = await trainingvideosRepo.getAllByField(searchQuery);
        if (trainingvideos) {
            return { status: 200, data: trainingvideos[0], message: 'Record fetched Successfully' };
        } else {
            return { status: 200, data: [], message: 'Record not fetched' };
        }

    } catch (error) {
        return { "status": 500, data: {}, "message": error.message }
    }
};








