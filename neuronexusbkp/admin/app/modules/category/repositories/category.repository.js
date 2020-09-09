const mongoose = require('mongoose');
const Category = require('category/models/category.model');
const perPage = config.PAGINATION_PERPAGE;

const categoryRepository = {

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

            var aggregate =  Category.aggregate([
                { $match: conditions },
                
                
                {
                     $group : {
                        "_id": "$_id",
                        "name": {$first: "$name"},
                        "description": {$first: "$description"},
                        "isDeleted": {$first: "$isDeleted"},
                        "status": {$first: "$status"},
                    }
                },
                
                sortOperator
            ]);  
                   
            var options = { page: req.body.pagination.page, limit: req.body.pagination.perpage };
            let allcategory = await Category.aggregatePaginate(aggregate, options);
            
            return allcategory;
        } catch (e) {
            throw (e);
        }
    },
    
	

    getById: async (id) => {
        let category = await Category.findById(id).lean().exec();
        try {
            if (!category) {
                return null;
            }
            return category;

        } catch (e) {
            return e;
        }
    },

    getByField: async (params) => {
        let category = await Category.findOne(params).exec();
        try {
            if (!category) {
                return null;
            }
            return category;

        } catch (e) {
            return e;
        }
    },

    getAllByField: async (params,sort) => {
        let category = await Category.find(params).sort(sort).exec();
        try {
            if (!category) {
                return null;
            }
            return category;

        } catch (e) {
            return e;
        }
    },

    

    save: async (data)=>{
        try{
            let save = await Category.create(data);
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
            let category = await Service.findById(id);
            if (category) {
                //let categoryDelete = await Service.deleteOne({ _id: id }).exec();
                let categoryDelete = await Service.findByIdAndUpdate(id, {isDeleted: true}, { new: true });
                if (!categoryDelete) {
                    return null;
                }
                return categoryDelete;
            }
        } catch (e) {
            throw e;
        }
    },

    updateById: async (id, data) => {
        try {
            let category = await Category.findByIdAndUpdate(id, data, { new: true });
            if (!category) {
                return null;
            }
            return category;
        } catch (e) {
            return e;
        }
    },

    updateByField: async (field, fieldValue, data) => {
        //todo: update by field
    }
};

module.exports = categoryRepository;