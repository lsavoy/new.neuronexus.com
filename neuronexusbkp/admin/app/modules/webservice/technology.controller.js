const mongoose = require('mongoose');
const technologyRepo = require('technology/repositories/technology.repository');
const technologyElectrodeRepo = require('technology/repositories/electrode_arrays.repository');

/* 
// @Method: getAlltechnologycategory
// @Description: Support
*/


exports.getAlltechnologycategory = async req => {
    try {
        var searchQuery = {
            "isDeleted": false,
            "status": "Active",
        };
        if (req.params.category_id) {
            Object.assign(searchQuery, { "parent_id": mongoose.Types.ObjectId(req.params.category_id) });
        }
        if (req.params.slug) {
            Object.assign(searchQuery, { "slug": req.params.slug });
        }
        var technology = await technologyRepo.getAllByField(searchQuery);
        return { status: 200, data: technology, message: 'Record fetched Successfully' };
    } catch (error) {
        return { "status": 500, data: {}, "message": error.message }
    }
};



exports.getAlltechnology_electrode_arrays = async req => {
    try {
        var searchQuery = {
            "isDeleted": false,
            "status": "Active",
        };

        if (req.params.slug) {
            Object.assign(searchQuery, { "slug": req.params.slug });
        }
        var technology = await technologyElectrodeRepo.getAllByField(searchQuery);
        return { status: 200, data: technology, message: 'Record fetched Successfully' };
    } catch (error) {
        return { "status": 500, data: {}, "message": error.message }
    }
};


/* 
// @Method: gettechnologystatic
// @Description: Support
*/


exports.gettechnologystatic = async req => {
    try {



        var searchQuery = {
            "isDeleted": false,
            "status": "Active",
        };

        console.log(searchQuery);
        var technology = await technologyRepo.technology_staticGetByField(searchQuery);
        return { status: 200, data: technology, message: 'Record fetched Successfully' };
    } catch (error) {
        return { "status": 500, data: {}, "message": error.message }
    }
};






