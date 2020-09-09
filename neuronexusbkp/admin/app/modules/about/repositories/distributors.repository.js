const mongoose = require('mongoose');
const Distributors = require('about/models/distributors.model');
const Partners = require('about/models/distributors-partners.model');
const perPage = config.PAGINATION_PERPAGE;

const AboutRepository = {



    distributorsGetByField: async (params) => {
        let distributors = await Distributors.findOne(params).exec();

        try {
            if (!distributors) {
                return null;
            }
            return distributors;

        } catch (e) {
            return e;
        }
    },
    distributorsUpdateById: async (data, id) => {
        try {
            let cms = await Distributors.findByIdAndUpdate(id, data, {
                new: true,
                upsert: true
            }).exec();
            if (!cms) {
                return null;
            }
            return cms;
        } catch (e) {
            return e;
        }
    },

    //partners
    getAll: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({
                "isDeleted": false
            });

            if (_.isObject(req.body.query) && _.has(req.body.query, 'generalSearch')) {
                //and_clauses.push({"status": /req.body.query.generalSearch/i});
                and_clauses.push({
                    $or: [{
                        'name': {
                            $regex: req.body.query.generalSearch,
                            $options: 'i'
                        }
                    }]
                });
            }
            if (_.isObject(req.body.query) && _.has(req.body.query, 'Status')) {
                and_clauses.push({
                    "status": req.body.query.Status
                });
            }
            conditions['$and'] = and_clauses;

            var sortOperator = {
                "$sort": {}
            };
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

            var aggregate = Partners.aggregate([{
                $match: conditions
            },
                sortOperator
            ]);

            var options = {
                page: req.body.pagination.page,
                limit: req.body.pagination.perpage
            };
            let allPartners = await Partners.aggregatePaginate(aggregate, options);
            return allPartners;
        } catch (e) {
            throw (e);
        }
    },

    getCount: async (params) => {
        try {

            let partners = await Partners.countDocuments(params);
            return partners;
        } catch (e) {
            throw (e);
        }
    },

    getById: async (id) => {
        try {
            let partners = await Partners.findById(id).exec();
            return partners;
        } catch (e) {
            throw (e);
        }
    },

    getByField: async (params) => {
        try {
            let partners = await Partners.findOne(params).exec();
            return partners;
        } catch (e) {
            throw (e);
        }
    },

    getAllByField: async (params) => {
        try {
            let partners = await Partners.find(params).exec();
            return partners;
        } catch (e) {
            throw (e);
        }
    },



    delete: async (id) => {
        try {
            let partners = await Partners.findById(id);
            if (partners) {
                let partnersDelete = await Partners.remove({
                    _id: id
                }).exec();
                return partnersDelete;
            } else {
                return null;
            }
        } catch (e) {
            throw (e);
        }
    },


    updateById: async (data, id) => {
        try {
            let partners = await Partners.findByIdAndUpdate(id, data, {
                new: true,
                upsert: true
            }).exec();
            return partners;
        } catch (e) {
            throw (e);
        }
    },


    save: async (data) => {


        try {
            let partners = await Partners.create(data);
            if (!partners) {
                return null;
            }
            return partners;
        } catch (e) {
            throw e;
        }
    },

    //partners



};

module.exports = AboutRepository;