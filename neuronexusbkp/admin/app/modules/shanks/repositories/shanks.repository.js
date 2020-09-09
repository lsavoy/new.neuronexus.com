const mongoose = require('mongoose');
const Shanks = require('shanks/models/shanks.model');
const perPage = config.PAGINATION_PERPAGE;

const shanksRepository = {

    getAll: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];
            and_clauses.push({ "isDeleted": false, "parent_id": null });

            if (_.isObject(req.body.query) && _.has(req.body.query, 'generalSearch')) {
                and_clauses.push({
                    $or: [
                        { 'title': { $regex: req.body.query.generalSearch, $options: 'i' } }
                    ]
                });
            }
            if (_.isObject(req.body.query) && _.has(req.body.query, 'Status')) {
                and_clauses.push({ "status": req.body.query.Status });
            }
            conditions['$and'] = and_clauses;

            var sortOperator = { "$sort": {} };
            if (_.has(req.body, 'sort')) {
                var sortField = req.body.sort.field;
                if (req.body.sort.sort == 'desc') {
                    var sortOrder = -1;
                } else if (req.body.sort.sort == 'asc') {
                    var sortOrder = 1;
                }

                sortOperator["$sort"][sortField] = sortOrder;
            } else {
                sortOperator["$sort"]['_id'] = -1;
            }

            var aggregate =  Shanks.aggregate([
                { $match: conditions },
                
                
                {
                     $group : {
                        "_id": "$_id",
                        "title": {$first: "$title"},
                        "isDeleted": {$first: "$isDeleted"},
                        "status": {$first: "$status"},
                    }
                },
                
                sortOperator
            ]);  
                   
            var options = { page: req.body.pagination.page, limit: req.body.pagination.perpage };
            let allshanks = await Shanks.aggregatePaginate(aggregate, options);
            
            return allshanks;
        } catch (e) {
            throw (e);
        }
    },
    
	

    getById: async (id) => {
        let shanks = await Shanks.findById(id).lean().exec();
        try {
            if (!shanks) {
                return null;
            }
            return shanks;

        } catch (e) {
            return e;
        }
    },

    getByField: async (params) => {
        let shanks = await Shanks.findOne(params).exec();
        try {
            if (!shanks) {
                return null;
            }
            return shanks;

        } catch (e) {
            return e;
        }
    },

    getAllByField: async (params,sort) => {
        let shanks = await Shanks.find(params).sort(sort).exec();
        try {
            if (!shanks) {
                return null;
            }
            return shanks;

        } catch (e) {
            return e;
        }
    },

    

    save: async (data)=>{
        try{
            let save = await Shanks.create(data);
            if(!save){
                return null;
            }
            return save;
        }catch(e){
            return e;
        }
    },

    
    delete: async (id) => {
        try {
            let shanks = await Shanks.findById(id);
            if (shanks) {
                let shanksDelete = await Shanks.findByIdAndUpdate(id, {isDeleted: true}, { new: true });
                if (!shanksDelete) {
                    return null;
                }
                return shanksDelete;
            }
        } catch (e) {
            throw e;
        }
    },

    updateById: async (id, data) => {
        try {
            let shanks = await Shanks.findByIdAndUpdate(id, data, { new: true });
            if (!shanks) {
                return null;
            }
            return shanks;
        } catch (e) {
            return e;
        }
    },

    updateByField: async (field, fieldValue, data) => {
        //todo: update by field
    }
};

module.exports = shanksRepository;