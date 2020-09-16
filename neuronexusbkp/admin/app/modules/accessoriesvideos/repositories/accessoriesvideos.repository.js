const mongoose = require('mongoose');
const Accessoriesvideos = require('accessoriesvideos/models/accessoriesvideos.model');
const perPage = config.PAGINATION_PERPAGE;

const accessoriesvideosRepository = {


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

            var aggregate = Accessoriesvideos.aggregate([{
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
            let allaccessoriesvideos = await Accessoriesvideos.aggregatePaginate(aggregate, options);

            return allaccessoriesvideos;
        } catch (e) {
            throw (e);
        }
    },




    getById: async (id) => {
        let cuisine = await Accessoriesvideos.findById(id).lean().exec();
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
        let cuisine = await Accessoriesvideos.findOne(params).exec();
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
        let cuisine = await Accessoriesvideos.find(params).sort({
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
        let accessoriesvideos = await Accessoriesvideos.find(params).sort(sort).exec();
        try {
            if (!accessoriesvideos) {
                return null;
            }
            return accessoriesvideos;

        } catch (e) {
            return e;
        }
    },

    save: async (data) => {
        try {
            let save = await Accessoriesvideos.create(data);
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
            let cuisineCount = await Accessoriesvideos.countDocuments(params);
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
            let cuisine = await Accessoriesvideos.findById(id);
            if (cuisine) {
                //let cuisineDelete = await Accessoriesvideos.deleteOne({ _id: id }).exec();
                let cuisineDelete = await Accessoriesvideos.findByIdAndUpdate(id, {
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
            let cuisine = await Accessoriesvideos.findByIdAndUpdate(id, data, {
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

module.exports = accessoriesvideosRepository;