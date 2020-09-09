const mongoose = require('mongoose');
const KnowledgeCenter = require('knowledge_center/models/knowledgecenter.model');
const CS = require('contact/models/comingsoon.model');
const perPage = config.PAGINATION_PERPAGE;

const KnowledgeCenterRepository = {
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
                        'title': {
                            $regex: req.body.query.generalSearch,
                            $options: 'i'
                        }
                    },
                    {
                        'description': {
                            $regex: req.body.query.generalSearch,
                            $options: 'i'
                        }
                    }
                    ]
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

            var aggregate = KnowledgeCenter.aggregate([{
                $lookup: {
                    "from": "category_knowledges",
                    "localField": "sub_category_id",
                    "foreignField": "_id",
                    "as": "category_details"
                }
            },
            {
                "$unwind": "$category_details"
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
            let allKnowledgeCenter = await KnowledgeCenter.aggregatePaginate(aggregate, options);
            return allKnowledgeCenter;
        } catch (e) {
            throw (e);
        }
    },


    getById: async (id) => {
        try {
            let knowledgeCenter = await KnowledgeCenter.findById(id).exec();
            return knowledgeCenter;
        } catch (e) {
            throw (e);
        }
    },

    getByField: async (params) => {
        try {
            let knowledgeCenter = await KnowledgeCenter.findOne(params).exec();
            return knowledgeCenter;
        } catch (e) {
            throw (e);
        }
    },



    getAllByField: async (params) => {
        try {
            console.log("getAllByField", params);
            var conditions = {};
            var and_clauses = [];
            and_clauses.push(params);

            conditions['$and'] = and_clauses;

            var aggregate = KnowledgeCenter.aggregate([
                {
                    $lookup: {
                        "from": "category_knowledges",
                        "localField": "sub_category_id",
                        "foreignField": "_id",
                        "as": "knowledgecenter_details"
                    }
                },
                {
                    "$unwind": "$knowledgecenter_details"
                },

                {
                    $lookup: {
                        "from": "category_knowledges",
                        "localField": "knowledgecenter_details.parent_id",
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
                        title: "$title",
                        slug: "$slug",
                        description: "$description",
                        sub_category_id: "$sub_category_id",
                        status: "$status",
                        isDeleted: "$isDeleted",
                        createdAt: "$createdAt",
                        sub_category_name: "$knowledgecenter_details.name",
                        sub_category_slug: "$knowledgecenter_details.slug",
                        sub_category_delete: "$knowledgecenter_details.isDeleted",
                        slug: "$knowledgecenter_details.slug",
                        category_id: "$knowledgecenter_details.parent_id",
                        category_name: "$categorys_details.name",
                        category_slug: "$categorys_details.slug",
                        category_delete: "$categorys_details.isDeleted",
                    }
                },
                {
                    $match: conditions
                },

            ]);

            let knowledgeCenter = aggregate;
            return knowledgeCenter;

        } catch (e) {
            throw (e);
        }
    },


    getAllSearchByField: async (key) => {
        try {

            var conditions = {};
            var and_clauses = [];
            and_clauses.push(
                {
                    $or: [{
                        'title': {
                            $regex: key,
                            $options: 'i'
                        }
                    },
                    {
                        'description': {
                            $regex: key,
                            $options: 'i'
                        }
                    },
                    {
                        'category_name': {
                            $regex: key,
                            $options: 'i'
                        }
                    },
                    {
                        'sub_category_name': {
                            $regex: key,
                            $options: 'i'
                        }
                    }

                    ]
                });

            and_clauses.push({ "isDeleted": false });
            and_clauses.push({ "status": "Active" });


            conditions['$and'] = and_clauses;

            var aggregate = KnowledgeCenter.aggregate([
                {
                    $lookup: {
                        "from": "category_knowledges",
                        "localField": "sub_category_id",
                        "foreignField": "_id",
                        "as": "knowledgecenter_details"
                    }
                },
                {
                    "$unwind": "$knowledgecenter_details"
                },
                {
                    $lookup: {
                        "from": "category_knowledges",
                        "localField": "knowledgecenter_details.parent_id",
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
                        title: "$title",
                        description: "$description",
                        sub_category_id: "$sub_category_id",
                        status: "$status",
                        isDeleted: "$isDeleted",
                        createdAt: "$createdAt",
                        sub_category_name: "$knowledgecenter_details.name",
                        category_id: "$knowledgecenter_details.parent_id",
                        category_name: "$categorys_details.name"
                    }
                },
                {
                    $match: conditions
                },

            ]);

            let knowledgeCenter = aggregate;
            return knowledgeCenter;

        } catch (e) {
            throw (e);
        }
    },

    getAllByFieldTopFive: async (params) => {
        try {

            var conditions = {};
            var and_clauses = [];
            and_clauses.push(params);

            conditions['$and'] = and_clauses;

            var aggregate = KnowledgeCenter.aggregate([
                {
                    $lookup: {
                        "from": "category_knowledges",
                        "localField": "sub_category_id",
                        "foreignField": "_id",
                        "as": "knowledgecenter_details"
                    }
                },
                {
                    "$unwind": "$knowledgecenter_details"
                },
                {
                    $lookup: {
                        "from": "category_knowledges",
                        "localField": "knowledgecenter_details.parent_id",
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
                        title: "$title",
                        description: "$description",
                        sub_category_id: "$sub_category_id",
                        status: "$status",
                        isDeleted: "$isDeleted",
                        createdAt: "$createdAt",
                        sub_category_name: "$knowledgecenter_details.name",
                        category_id: "$knowledgecenter_details.parent_id",
                        category_name: "$categorys_details.name"
                    }
                },
                {
                    $match: conditions
                },
                { $sort: { createdAt: -1 } },
                {
                    $limit: 5
                }


            ]);

            let knowledgeCenter = aggregate;
            return knowledgeCenter;

        } catch (e) {
            throw (e);
        }
    },

    delete: async (id) => {
        try {
            let knowledgeCenter = await KnowledgeCenter.findById(id);

            if (knowledgeCenter) {
                let knowledgeCenterDelete = await KnowledgeCenter.remove({
                    _id: id
                }).exec();
                return knowledgeCenterDelete;
            } else {
                return null;
            }
        } catch (e) {
            throw (e);
        }
    },

    deleteByField: async (field, fieldValue) => {
        //todo: Implement delete by field
    },


    updateById: async (data, id) => {
        try {
            let knowledgeCenter = await KnowledgeCenter.findByIdAndUpdate(id, data, {
                new: true,
                upsert: true
            }).exec();
            return knowledgeCenter;
        } catch (e) {
            throw (e);
        }
    },

    updateByField: async (field, fieldValue, data) => {
        //todo: update by field
    },

    save: async (data) => {
        try {
            let knowledgeCenter = await KnowledgeCenter.create(data);
            if (!knowledgeCenter) {
                return null;
            }
            return knowledgeCenter;
        } catch (e) {
            throw e;
        }
    },
};

module.exports = KnowledgeCenterRepository;