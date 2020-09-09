const mongoose = require('mongoose');
const Category = require('knowledge_center/models/category.model');
const perPage = config.PAGINATION_PERPAGE;

const categoryRepository = {

    getAll: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];
            and_clauses.push({
                "isDeleted": false,
                "parent_id": null
            });

            if (_.isObject(req.body.query) && _.has(req.body.query, 'generalSearch')) {
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

            var aggregate = Category.aggregate([{
                $match: conditions
            },


            {
                $group: {
                    "_id": "$_id",
                    "name": {
                        $first: "$name"
                    },
                    "parent_id": {
                        $first: "$parent_id"
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
            let allcategory = await Category.aggregatePaginate(aggregate, options);

            return allcategory;
        } catch (e) {
            throw (e);
        }
    },

    getAllsubcategory: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];
            and_clauses.push({
                "isDeleted": false,
                "parent_id": {
                    $ne: null
                }
            });

            if (_.isObject(req.body.query) && _.has(req.body.query, 'generalSearch')) {
                and_clauses.push({
                    $or: [{
                        'name': {
                            $regex: req.body.query.generalSearch,
                            $options: 'i'
                        }
                    },
                    { 'category_name': { $regex: req.body.query.generalSearch, $options: 'i' } }
                    ]
                });
            }
            if (_.isObject(req.body.query) && _.has(req.body.query, 'Status')) {
                and_clauses.push({
                    "status": req.body.query.Status
                });
            }

            // if (_.isObject(req.body.query) && _.has(req.body.query, 'Category')) {
            //     and_clauses.push({
            //         "parent_id": mongoose.Types.ObjectId(req.body.query.Category)
            //     });
            // }
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

            var aggregate = Category.aggregate([
                {
                    $lookup: {
                        "from": "category_knowledges",
                        "localField": "parent_id",
                        "foreignField": "_id",
                        "as": "categorys_details"
                    }
                },
                {
                    "$unwind": "$categorys_details"
                },
                {
                    $project: {
                        _id: "$_id",
                        name: "$name",
                        parent_id: "$parent_id",
                        status: "$status",
                        isDeleted: "$isDeleted",
                        createdAt: "$createdAt",
                        category_name: "$categorys_details.name"
                    }
                },
                {
                    $match: conditions
                },
                sortOperator
            ]);


            var options = {
                page: req.body.pagination.page,
                limit: req.body.pagination.perpage
            };
            let allSubCategroy = await Category.aggregatePaginate(aggregate, options);

            return allSubCategroy;
        } catch (e) {
            throw (e);
        }
    },


    getAllsubcategorywithoutfilter: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];
            and_clauses.push({
                "isDeleted": false,
                "parent_id": {
                    $ne: null
                }
            });

            conditions['$and'] = and_clauses;

            var aggregate = Category.aggregate([
                {
                    $lookup: {
                        "from": "category_knowledges",
                        "localField": "parent_id",
                        "foreignField": "_id",
                        "as": "categorys_details"
                    }
                },
                {
                    "$unwind": "$categorys_details"
                },
                {
                    $project: {
                        _id: "$_id",
                        name: "$name",
                        parent_id: "$parent_id",
                        status: "$status",
                        isDeleted: "$isDeleted",
                        createdAt: "$createdAt",
                        category_name: "$categorys_details.name"
                    }
                },
                {
                    $match: conditions
                },

            ]);


            let allSubCategroy = aggregate;

            return allSubCategroy;
        } catch (e) {
            throw (e);
        }
    },

    getById: async (id) => {
        let cuisine = await Category.findById(id).lean().exec();
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
        let cuisine = await Category.findOne(params).exec();
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
        let cuisine = await Category.find(params).sort({
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

    save: async (data) => {
        try {
            let save = await Category.create(data);
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
            let cuisineCount = await Category.countDocuments(params);
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
            let cuisine = await Category.findById(id);
            if (cuisine) {
                //let cuisineDelete = await Category.deleteOne({ _id: id }).exec();
                let cuisineDelete = await Category.findByIdAndUpdate(id, {
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
            let cuisine = await Category.findByIdAndUpdate(id, data, {
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

module.exports = categoryRepository;