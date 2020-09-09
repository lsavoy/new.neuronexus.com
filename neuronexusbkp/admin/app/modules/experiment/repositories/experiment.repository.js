const mongoose = require('mongoose');
const Experiment = require('experiment/models/experiment.model');
const perPage = config.PAGINATION_PERPAGE;

const experimentRepository = {

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

            var aggregate =  Experiment.aggregate([
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
            let allExperiment = await Experiment.aggregatePaginate(aggregate, options);
            
            return allExperiment;
        } catch (e) {
            throw (e);
        }
    },
    
	

    getById: async (id) => {
        let experiment = await Experiment.findById(id).lean().exec();
        try {
            if (!experiment) {
                return null;
            }
            return experiment;

        } catch (e) {
            return e;
        }
    },

    getByField: async (params) => {
        let experiment = await Experiment.findOne(params).exec();
        try {
            if (!experiment) {
                return null;
            }
            return experiment;

        } catch (e) {
            return e;
        }
    },

    getAllByField: async (params,sort) => {
        let experiment = await Experiment.find(params).sort(sort).exec();
        try {
            if (!experiment) {
                return null;
            }
            return experiment;

        } catch (e) {
            return e;
        }
    },

    

    save: async (data)=>{
        try{
            let save = await Experiment.create(data);
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
            let experiment = await Experiment.findById(id);
            if (experiment) {
                let experimentDelete = await Experiment.findByIdAndUpdate(id, {isDeleted: true}, { new: true });
                if (!experimentDelete) {
                    return null;
                }
                return experimentDelete;
            }
        } catch (e) {
            throw e;
        }
    },

    updateById: async (id, data) => {
        try {
            let experiment = await Experiment.findByIdAndUpdate(id, data, { new: true });
            if (!experiment) {
                return null;
            }
            return experiment;
        } catch (e) {
            return e;
        }
    },

    updateByField: async (field, fieldValue, data) => {
        //todo: update by field
    }
};

module.exports = experimentRepository;