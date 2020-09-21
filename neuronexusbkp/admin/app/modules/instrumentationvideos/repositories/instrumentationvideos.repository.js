const mongoose = require('mongoose');
const Instrumentationvideos = require('instrumentationvideos/models/instrumentationvideos.model');
const perPage = config.PAGINATION_PERPAGE;

const instrumentationvideosRepository = {


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

            var aggregate = Instrumentationvideos.aggregate([{
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
            let allinstrumentationvideos = await Instrumentationvideos.aggregatePaginate(aggregate, options);

            return allinstrumentationvideos;
        } catch (e) {
            throw (e);
        }
    },




    getById: async (id) => {
        let cuisine = await Instrumentationvideos.findById(id).lean().exec();
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
        let cuisine = await Instrumentationvideos.findOne(params).exec();
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
        let cuisine = await Instrumentationvideos.find(params).sort({
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
        let instrumentationvideos = await Instrumentationvideos.find(params).sort(sort).exec();
        try {
            if (!instrumentationvideos) {
                return null;
            }
            return instrumentationvideos;

        } catch (e) {
            return e;
        }
    },

    save: async (data) => {
        try {
            let save = await Instrumentationvideos.create(data);
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
            let cuisineCount = await Instrumentationvideos.countDocuments(params);
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
            let cuisine = await Instrumentationvideos.findById(id);
            if (cuisine) {
                //let cuisineDelete = await Instrumentationvideos.deleteOne({ _id: id }).exec();
                let cuisineDelete = await Instrumentationvideos.findByIdAndUpdate(id, {
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
            let cuisine = await Instrumentationvideos.findByIdAndUpdate(id, data, {
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

module.exports = instrumentationvideosRepository;