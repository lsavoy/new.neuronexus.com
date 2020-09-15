const mongoose = require('mongoose');
const scienceRepo = require('science/repositories/science.repository');


/* 
// @Method: getAllsciencecategory
// @Description: Support
*/


exports.getAllsciencecategory = async req => {
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
        var science = await scienceRepo.getAllByField(searchQuery);
        return { status: 200, data: science, message: 'Record fetched Successfully' };
    } catch (error) {
        return { "status": 500, data: {}, "message": error.message }
    }
};


/* 
// @Method: getsciencestatic
// @Description: Support
*/


exports.getsciencestatic = async req => {
    try {



        var searchQuery = {
            "isDeleted": false,
            "status": "Active",
        };

        console.log(searchQuery);
        var science = await scienceRepo.science_staticGetByField(searchQuery);
        return { status: 200, data: science, message: 'Record fetched Successfully' };
    } catch (error) {
        return { "status": 500, data: {}, "message": error.message }
    }
};






