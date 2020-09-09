const mongoose = require('mongoose');
const Brain = require('about/models/brain-initiative.model');
const Brain_tab = require('about/models/brain-initiative-tabs.model');
const perPage = config.PAGINATION_PERPAGE;

const AboutRepository = {



    brainGetByField: async (params) => {
        let brain = await Brain.findOne(params).exec();

        try {
            if (!brain) {
                return null;
            }
            return brain;

        } catch (e) {
            return e;
        }
    },
    brainUpdateById: async (data, id) => {
        try {
            let cms = await Brain.findByIdAndUpdate(id, data, {
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

    //brain_tab
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

            var aggregate = Brain_tab.aggregate([{
                $match: conditions
            },
                sortOperator
            ]);

            var options = {
                page: req.body.pagination.page,
                limit: req.body.pagination.perpage
            };
            let allBrain_tab = await Brain_tab.aggregatePaginate(aggregate, options);
            return allBrain_tab;
        } catch (e) {
            throw (e);
        }
    },

    getCount: async (params) => {
        try {

            let brain_tab = await Brain_tab.countDocuments(params);
            return brain_tab;
        } catch (e) {
            throw (e);
        }
    },

    getById: async (id) => {
        try {
            let brain_tab = await Brain_tab.findById(id).exec();
            return brain_tab;
        } catch (e) {
            throw (e);
        }
    },

    getByField: async (params) => {
        try {
            let brain_tab = await Brain_tab.findOne(params).exec();
            return brain_tab;
        } catch (e) {
            throw (e);
        }
    },

    getAllByField: async (params) => {
        try {
            let brain_tab = await Brain_tab.find(params).exec();
            return brain_tab;
        } catch (e) {
            throw (e);
        }
    },



    delete: async (id) => {
        try {
            let brain_tab = await Brain_tab.findById(id);
            if (brain_tab) {
                let brain_tabDelete = await Brain_tab.remove({
                    _id: id
                }).exec();
                return brain_tabDelete;
            } else {
                return null;
            }
        } catch (e) {
            throw (e);
        }
    },


    updateById: async (data, id) => {
        try {
            let brain_tab = await Brain_tab.findByIdAndUpdate(id, data, {
                new: true,
                upsert: true
            }).exec();
            return brain_tab;
        } catch (e) {
            throw (e);
        }
    },


    save: async (data) => {


        try {
            let brain_tab = await Brain_tab.create(data);
            if (!brain_tab) {
                return null;
            }
            return brain_tab;
        } catch (e) {
            throw e;
        }
    },

    //brain_tab



};

module.exports = AboutRepository;