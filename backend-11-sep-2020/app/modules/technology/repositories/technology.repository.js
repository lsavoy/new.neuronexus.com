const mongoose = require('mongoose');
const Technologystatic = require('technology/models/technology_static.model');
const Technologycategory = require('technology/models/technology_category.model');
const perPage = config.PAGINATION_PERPAGE;

const categoryRepository = {

    technology_staticGetByField: async (params) => {
        let technologystatic = await Technologystatic.findOne(params).exec();

        try {
            if (!technologystatic) {
                return null;
            }
            return technologystatic;

        } catch (e) {
            return e;
        }
    },
    technology_staticUpdateById: async (data, id) => {
        try {
            let cms = await Technologystatic.findByIdAndUpdate(id, data, {
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

            var aggregate = Technologycategory.aggregate([
                {
                    $match: conditions
                },
                {
                    $lookup: {
                        "from": "technology_categories",
                        "localField": "parent_id",
                        "foreignField": "_id",
                        "as": "category_details"
                    }
                },
                // {
                //     "$unwind": "$category_details"
                // },

                {
                    $group: {
                        "_id": "$_id",
                        "title": {
                            $first: "$title"
                        },
                        "content": {
                            $first: "$content"
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
                        "patent_title": {
                            $first: "$category_details.title"
                        },
                    }
                },




                sortOperator
            ]);

            var options = {
                page: req.body.pagination.page,
                limit: req.body.pagination.perpage
            };
            let allcategory = await Technologycategory.aggregatePaginate(aggregate, options);

            return allcategory;
        } catch (e) {
            throw (e);
        }
    },


    getById: async (id) => {
        let cuisine = await Technologycategory.findById(id).lean().exec();
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
        let cuisine = await Technologycategory.findOne(params).exec();
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
        let cuisine = await Technologycategory.find(params).sort({
            'title': 1
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
        let category = await Technologycategory.find(params).sort(sort).exec();
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
            let save = await Technologycategory.create(data);
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
            let cuisineCount = await Technologycategory.countDocuments(params);
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
            let cuisine = await Technologycategory.findById(id);
            if (cuisine) {
                //let cuisineDelete = await Technologycategory.deleteOne({ _id: id }).exec();
                let cuisineDelete = await Technologycategory.findByIdAndUpdate(id, {
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
            let cuisine = await Technologycategory.findByIdAndUpdate(id, data, {
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