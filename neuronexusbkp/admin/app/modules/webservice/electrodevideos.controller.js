const mongoose = require('mongoose');
const electrodevideosRepo = require('electrodevideos/repositories/electrodevideos.repository');


/* 
// @Method: getAllelectrodevideosRepo
// @Description: Leadership
*/


exports.getAllelectrodevideos = async req => {
    try {
        var searchQuery = {
            "isDeleted": false,
            "status": "Active"
        };

        if (req.query.title) {
            Object.assign(searchQuery, { "title": { $regex: req.query.title, $options: 'i' } });
        }
        var electrodevideos = await electrodevideosRepo.getAllByField(searchQuery);
        return { status: 200, data: electrodevideos, message: 'Record fetched Successfully' };
    } catch (error) {
        return { "status": 500, data: {}, "message": error.message }
    }
};


exports.getDetailselectrodevideos = async req => {
    try {
        var searchQuery = {
            "slug": req.params.slug,
            "isDeleted": false,
            "status": "Active"
        };

        if (req.query.title) {
            Object.assign(searchQuery, { "title": { $regex: req.query.title, $options: 'i' } });
        }

        var electrodevideos = await electrodevideosRepo.getAllByField(searchQuery);
        if (electrodevideos) {
            return { status: 200, data: electrodevideos[0], message: 'Record fetched Successfully' };
        } else {
            return { status: 200, data: [], message: 'Record not fetched' };
        }

    } catch (error) {
        return { "status": 500, data: {}, "message": error.message }
    }
};









