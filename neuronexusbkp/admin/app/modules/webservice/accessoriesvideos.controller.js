const mongoose = require('mongoose');
const accessoriesvideosRepo = require('accessoriesvideos/repositories/accessoriesvideos.repository');


/* 
// @Method: getAllaccessoriesvideosRepo
// @Description: Leadership
*/


exports.getAllaccessoriesvideos = async req => {
    try {
        var searchQuery = {
            "isDeleted": false,
            "status": "Active"
        };

        if (req.query.title) {
            Object.assign(searchQuery, { "title": { $regex: req.query.title, $options: 'i' } });
        }
        var accessoriesvideos = await accessoriesvideosRepo.getAllByField(searchQuery);
        return { status: 200, data: accessoriesvideos, message: 'Record fetched Successfully' };
    } catch (error) {
        return { "status": 500, data: {}, "message": error.message }
    }
};


exports.getDetailsaccessoriesvideos = async req => {
    try {
        var searchQuery = {
            "slug": req.params.slug,
            "isDeleted": false,
            "status": "Active"
        };

        if (req.query.title) {
            Object.assign(searchQuery, { "title": { $regex: req.query.title, $options: 'i' } });
        }

        var accessoriesvideos = await accessoriesvideosRepo.getAllByField(searchQuery);
        if (accessoriesvideos) {
            return { status: 200, data: accessoriesvideos[0], message: 'Record fetched Successfully' };
        } else {
            return { status: 200, data: [], message: 'Record not fetched' };
        }

    } catch (error) {
        return { "status": 500, data: {}, "message": error.message }
    }
};








