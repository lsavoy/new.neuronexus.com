const mongoose = require('mongoose');
const Science_update_collaboration = require('about/models/science-update-collaboration.model');
const Science_update_collaboration_tab = require('about/models/science-update-collaboration-tabs.model');
const perPage = config.PAGINATION_PERPAGE;

const AboutRepository = {



    scienceGetByField: async (params) => {
        let science = await Science_update_collaboration.findOne(params).exec();

        try {
            if (!science) {
                return null;
            }
            return science;

        } catch (e) {
            return e;
        }
    },
    scienceUpdateById: async (data, id) => {
        try {
            let cms = await Science_update_collaboration.findByIdAndUpdate(id, data, {
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

    //science_tab
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

            var aggregate = Science_update_collaboration_tab.aggregate([{
                $match: conditions
            },
                sortOperator
            ]);

            var options = {
                page: req.body.pagination.page,
                limit: req.body.pagination.perpage
            };
            let allScience_update_collaboration_tab = await Science_update_collaboration_tab.aggregatePaginate(aggregate, options);
            return allScience_update_collaboration_tab;
        } catch (e) {
            throw (e);
        }
    },

    getCount: async (params) => {
        try {

            let science_tab = await Science_update_collaboration_tab.countDocuments(params);
            return science_tab;
        } catch (e) {
            throw (e);
        }
    },

    getById: async (id) => {
        try {
            let science_tab = await Science_update_collaboration_tab.findById(id).exec();
            return science_tab;
        } catch (e) {
            throw (e);
        }
    },

    getByField: async (params) => {
        try {
            let science_tab = await Science_update_collaboration_tab.findOne(params).exec();
            return science_tab;
        } catch (e) {
            throw (e);
        }
    },

    getAllByField: async (params) => {
        try {
            let science_tab = await Science_update_collaboration_tab.find(params).exec();
            return science_tab;
        } catch (e) {
            throw (e);
        }
    },



    delete: async (id) => {
        try {
            let science_tab = await Science_update_collaboration_tab.findById(id);
            if (science_tab) {
                let science_tabDelete = await Science_update_collaboration_tab.remove({
                    _id: id
                }).exec();
                return science_tabDelete;
            } else {
                return null;
            }
        } catch (e) {
            throw (e);
        }
    },


    updateById: async (data, id) => {
        try {
            let science_tab = await Science_update_collaboration_tab.findByIdAndUpdate(id, data, {
                new: true,
                upsert: true
            }).exec();
            return science_tab;
        } catch (e) {
            throw (e);
        }
    },


    save: async (data) => {


        try {
            let science_tab = await Science_update_collaboration_tab.create(data);
            if (!science_tab) {
                return null;
            }
            return science_tab;
        } catch (e) {
            throw e;
        }
    },

    //science_tab



};

module.exports = AboutRepository;