const mongoose = require('mongoose');
const knowledgeCenterRepo = require('knowledge_center/repositories/knowledgecenter.repository');


/* 
// @Method: getAllknowledgeCenterRepo
// @Description: Leadership
*/


exports.getAllknowledgeCenter = async req => {
    try {



        var searchQuery = {
            "isDeleted": false,
            "status": "Active",
            "sub_category_delete": false,
            "category_delete": false
        };

        if (req.query.title) {
            Object.assign(searchQuery, { "title": { $regex: req.query.title, $options: 'i' } });
        }

        if (req.params.sub_category_slug) {
            Object.assign(searchQuery, { "sub_category_slug": req.params.sub_category_slug });
        }
        if (req.params.category_slug) {
            Object.assign(searchQuery, { "category_slug": req.params.category_slug });
        }
        console.log(searchQuery);
        var knowledgeCenter = await knowledgeCenterRepo.getAllByField(searchQuery);
        return { status: 200, data: knowledgeCenter, message: 'Record fetched Successfully' };
    } catch (error) {
        return { "status": 500, data: {}, "message": error.message }
    }
};



exports.getTopFiveknowledgeCenter = async req => {
    try {

        var searchQuery = {
            "isDeleted": false,
            "status": "Active"
        };
        if (req.params.sub_category_id) {

            Object.assign(searchQuery, { "sub_category_id": mongoose.Types.ObjectId(req.params.sub_category_id) });
        }
        if (req.params.category_id) {
            Object.assign(searchQuery, { "category_id": mongoose.Types.ObjectId(req.params.category_id) });
        }

        var knowledgeCenter = await knowledgeCenterRepo.getAllByFieldTopFive(searchQuery);
        return { status: 200, data: knowledgeCenter, message: 'Record fetched Successfully' };
    } catch (error) {
        return { "status": 500, data: {}, "message": error.message }
    }
};






