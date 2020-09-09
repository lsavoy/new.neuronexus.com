const mongoose = require('mongoose');
const SiteLayout = require('site_layout/models/site_layout.model');
const perPage = config.PAGINATION_PERPAGE;

const siteLayoutRepository = {

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

            var aggregate =  SiteLayout.aggregate([
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
            let allSiteLayout = await SiteLayout.aggregatePaginate(aggregate, options);
            
            return allSiteLayout;
        } catch (e) {
            throw (e);
        }
    },
    
	

    getById: async (id) => {
        let siteLayout = await SiteLayout.findById(id).lean().exec();
        try {
            if (!siteLayout) {
                return null;
            }
            return siteLayout;

        } catch (e) {
            return e;
        }
    },

    getByField: async (params) => {
        let siteLayout = await SiteLayout.findOne(params).exec();
        try {
            if (!siteLayout) {
                return null;
            }
            return siteLayout;

        } catch (e) {
            return e;
        }
    },

    getAllByField: async (params,sort) => {
        let siteLayout = await SiteLayout.find(params).sort(sort).exec();
        try {
            if (!siteLayout) {
                return null;
            }
            return siteLayout;

        } catch (e) {
            return e;
        }
    },

    

    save: async (data)=>{
        try{
            let save = await SiteLayout.create(data);
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
            let siteLayout = await SiteLayout.findById(id);
            if (siteLayout) {
                let siteLayoutDelete = await SiteLayout.findByIdAndUpdate(id, {isDeleted: true}, { new: true });
                if (!siteLayoutDelete) {
                    return null;
                }
                return siteLayoutDelete;
            }
        } catch (e) {
            throw e;
        }
    },

    updateById: async (id, data) => {
        try {
            let siteLayout = await SiteLayout.findByIdAndUpdate(id, data, { new: true });
            if (!siteLayout) {
                return null;
            }
            return siteLayout;
        } catch (e) {
            return e;
        }
    },

    updateByField: async (field, fieldValue, data) => {
        //todo: update by field
    }
};

module.exports = siteLayoutRepository;