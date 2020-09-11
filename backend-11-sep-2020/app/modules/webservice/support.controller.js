const mongoose = require('mongoose');
const supportRepo = require('support/repositories/support.repository');


/* 
// @Method: getAllsupportcategory
// @Description: Support
*/


exports.getAllsupportcategory = async req => {
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
        var support = await supportRepo.getAllByField(searchQuery);
        return { status: 200, data: support, message: 'Record fetched Successfully' };
    } catch (error) {
        return { "status": 500, data: {}, "message": error.message }
    }
};


/* 
// @Method: getsupportstatic
// @Description: Support
*/


exports.getsupportstatic = async req => {
    try {



        var searchQuery = {
            "isDeleted": false,
            "status": "Active",
        };

        console.log(searchQuery);
        var support = await supportRepo.support_staticGetByField(searchQuery);
        return { status: 200, data: support, message: 'Record fetched Successfully' };
    } catch (error) {
        return { "status": 500, data: {}, "message": error.message }
    }
};






