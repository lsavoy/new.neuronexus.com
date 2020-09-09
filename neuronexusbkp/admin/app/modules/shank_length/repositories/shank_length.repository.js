const mongoose = require('mongoose');
const ShankLength = require('shank_length/models/shank_length.model');
const perPage = config.PAGINATION_PERPAGE;

const shankLengthRepository = {

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

            var aggregate =  ShankLength.aggregate([
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
            let allShankLength = await ShankLength.aggregatePaginate(aggregate, options);
            
            return allShankLength;
        } catch (e) {
            throw (e);
        }
    },
    
	

    getById: async (id) => {
        let shankLength = await ShankLength.findById(id).lean().exec();
        try {
            if (!shankLength) {
                return null;
            }
            return shankLength;

        } catch (e) {
            return e;
        }
    },

    getByField: async (params) => {
        let shankLength = await ShankLength.findOne(params).exec();
        try {
            if (!shankLength) {
                return null;
            }
            return shankLength;

        } catch (e) {
            return e;
        }
    },

    getAllByField: async (params,sort) => {
        let shankLength = await ShankLength.find(params).sort(sort).exec();
        try {
            if (!shankLength) {
                return null;
            }
            return shankLength;

        } catch (e) {
            return e;
        }
    },

    

    save: async (data)=>{
        try{
            let save = await ShankLength.create(data);
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
            let shankLength = await ShankLength.findById(id);
            if (shankLength) {
                let shankLengthDelete = await ShankLength.findByIdAndUpdate(id, {isDeleted: true}, { new: true });
                if (!shankLengthDelete) {
                    return null;
                }
                return shankLengthDelete;
            }
        } catch (e) {
            throw e;
        }
    },

    updateById: async (id, data) => {
        try {
            let shankLength = await ShankLength.findByIdAndUpdate(id, data, { new: true });
            if (!shankLength) {
                return null;
            }
            return shankLength;
        } catch (e) {
            return e;
        }
    },

    updateByField: async (field, fieldValue, data) => {
        //todo: update by field
    }
};

module.exports = shankLengthRepository;