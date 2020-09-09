const mongoose = require('mongoose');
const ProbeFinder = require('probe_finder/models/probe_finder.model');
const perPage = config.PAGINATION_PERPAGE;

const probeFinderRepository = {

    getAll: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];
            and_clauses.push({ "isDeleted": false, "parent_id": null });

            if (_.isObject(req.body.query) && _.has(req.body.query, 'generalSearch')) {
                and_clauses.push({
                    $or: [
                        { 'name': { $regex: req.body.query.generalSearch, $options: 'i' } }
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

            var aggregate =  ProbeFinder.aggregate([
                { $match: conditions },
                {
                     $group : {
                        "_id": "$_id",
                        "image": {$first: "$image"},
                        "name": {$first: "$name"},
                        "isDeleted": {$first: "$isDeleted"},
                        "status": {$first: "$status"},
                    }
                },
                sortOperator
            ]);  
                   
            var options = { page: req.body.pagination.page, limit: req.body.pagination.perpage };
            let allProbeFinder = await ProbeFinder.aggregatePaginate(aggregate, options);
            
            return allProbeFinder;
        } catch (e) {
            throw (e);
        }
    },
    
	

    getById: async (id) => {
        try {
            let probeFinder = await ProbeFinder.findById(id).lean().exec();
            if (!probeFinder) {
                return null;
            }
            return probeFinder;

        } catch (e) {
            return e;
        }
    },

    getByField: async (params) => {
        try {
            let probeFinder = await ProbeFinder.findOne(params).exec();
            if (!probeFinder) {
                return null;
            }
            return probeFinder;

        } catch (e) {
            return e;
        }
    },

    getAllByField: async (params) => {
        try {
            let probeFinder = await ProbeFinder.find(params).sort({'createdAt':-1}).exec();
            if (!probeFinder) {
                return null;
            }
            return probeFinder;

        } catch (e) {
            return e;
        }
    },

    

    save: async (data)=>{
        try{
            let save = await ProbeFinder.create(data);
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
            let probeFinder = await ProbeFinder.findById(id);
            if (probeFinder) {
                //let ProbeFinderDelete = await Service.deleteOne({ _id: id }).exec();
                let probeFinderDelete = await ProbeFinder.findByIdAndUpdate(id, {isDeleted: true}, { new: true });
                if (!probeFinderDelete) {
                    return null;
                }
                return probeFinderDelete;
            }
        } catch (e) {
            throw e;
        }
    },

    updateById: async (id, data) => {
        try {
            let probeFinder = await ProbeFinder.findByIdAndUpdate(id, data, { new: true });
            if (!probeFinder) {
                return null;
            }
            return probeFinder;
        } catch (e) {
            return e;
        }
    },

    updateByField: async (field, fieldValue, data) => {
        //todo: update by field
    }
};

module.exports = probeFinderRepository;