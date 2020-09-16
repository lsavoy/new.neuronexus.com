const mongoose = require('mongoose');
const Events = require('events/models/events.model');
const Events_static = require('events/models/events_static.model');
const perPage = config.PAGINATION_PERPAGE;

const eventsRepository = {
    events_static_contentsGetByField: async (params) => {
        let events = await Events_static.findOne(params).exec();

        try {
            if (!events) {
                return null;
            }
            return events;

        } catch (e) {
            return e;
        }
    },
    events_static_contentsUpdateById: async (data, id) => {
        try {
            let cms = await Events_static.findByIdAndUpdate(id, data, {
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

    getAll: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];
            and_clauses.push({
                "isDeleted": false,
            });

            if (_.isObject(req.body.query) && _.has(req.body.query, 'generalSearch')) {
                and_clauses.push({
                    $or: [{
                        'title': {
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

            var aggregate = Events.aggregate([{
                $match: conditions
            },


            {
                $group: {
                    "_id": "$_id",
                    "title": {
                        $first: "$title"
                    },
                    "isDeleted": {
                        $first: "$isDeleted"
                    },
                    "status": {
                        $first: "$status"
                    },
                }
            },


                sortOperator
            ]);

            var options = {
                page: req.body.pagination.page,
                limit: req.body.pagination.perpage
            };
            let allevents = await Events.aggregatePaginate(aggregate, options);

            return allevents;
        } catch (e) {
            throw (e);
        }
    },




    getById: async (id) => {
        let cuisine = await Events.findById(id).lean().exec();
        try {
            if (!cuisine) {
                return null;
            }
            return cuisine;

        } catch (e) {
            return e;
        }
    },

    getByField: async (params) => {
        let cuisine = await Events.findOne(params).exec();
        try {
            if (!cuisine) {
                return null;
            }
            return cuisine;

        } catch (e) {
            return e;
        }
    },

    getAllByField: async (params) => {
        let cuisine = await Events.find(params).sort({
            'name': 1
        }).exec();
        try {
            if (!cuisine) {
                return null;
            }
            return cuisine;

        } catch (e) {
            return e;
        }
    },

    getAllByFieldWithSort: async (params, sort) => {
        let events = await Events.find(params).sort(sort).exec();
        try {
            if (!events) {
                return null;
            }
            return events;

        } catch (e) {
            return e;
        }
    },

    save: async (data) => {
        try {
            let save = await Events.create(data);
            if (!save) {
                return null;
            }
            return save;
        } catch (e) {
            return e;
        }
    },

    getDocumentCount: async (params) => {
        try {
            let cuisineCount = await Events.countDocuments(params);
            if (!cuisineCount) {
                return null;
            }
            return cuisineCount;
        } catch (e) {
            return e;
        }
    },

    delete: async (id) => {
        try {
            let cuisine = await Events.findById(id);
            if (cuisine) {
                //let cuisineDelete = await Events.deleteOne({ _id: id }).exec();
                let cuisineDelete = await Events.findByIdAndUpdate(id, {
                    isDeleted: true
                }, {
                    new: true
                });
                if (!cuisineDelete) {
                    return null;
                }
                return cuisineDelete;
            }
        } catch (e) {
            throw e;
        }
    },

    updateById: async (id, data) => {
        try {
            let cuisine = await Events.findByIdAndUpdate(id, data, {
                new: true
            });
            if (!cuisine) {
                return null;
            }
            return cuisine;
        } catch (e) {
            return e;
        }
    },

    updateByField: async (field, fieldValue, data) => {
        //todo: update by field
    }
};

module.exports = eventsRepository;