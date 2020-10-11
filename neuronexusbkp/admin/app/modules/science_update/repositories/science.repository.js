const mongoose = require('mongoose');
const Science = require('science_update/models/science.model');
const Science_static = require('science_update/models/science_static.model');
const perPage = config.PAGINATION_PERPAGE;

const scienceRepository = {


    science_static_contentsGetByField: async (params) => {
        let science = await Science_static.findOne(params).exec();

        try {
            if (!science) {
                return null;
            }
            return science;

        } catch (e) {
            return e;
        }
    },
    science_static_contentsUpdateById: async (data, id) => {
        try {
            let cms = await Science_static.findByIdAndUpdate(id, data, {
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
                "parent_id": null
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

            var aggregate = Science.aggregate([{
                $match: conditions
            },


            {
                $group: {
                    "_id": "$_id",
                    "title": {
                        $first: "$title"
                    },
                    "image": {
                        $first: "$image"
                    },
                    "description": {
                        $first: "$description"
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
            let allscience = await Science.aggregatePaginate(aggregate, options);

            return allscience;
        } catch (e) {
            throw (e);
        }
    },

    getById: async (id) => {
        let cuisine = await Science.findById(id).lean().exec();
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
        let cuisine = await Science.findOne(params).exec();
        try {
            if (!cuisine) {
                return null;
            }
            return cuisine;

        } catch (e) {
            return e;
        }
    },

    getByFieldDetails: async (params) => {

        try {
            var conditions = {};
            var and_clauses = [];
            and_clauses.push(params);

            conditions['$and'] = and_clauses;

            var aggregate = Science.aggregate([
                {
                    $lookup: {
                        "from": "users",
                        "localField": "admin_id",
                        "foreignField": "_id",
                        "as": "author_details"
                    }
                },
                {
                    "$unwind": "$author_details"
                },
                {
                    $lookup: {
                        "from": "category_science_updates",
                        "localField": "category_id",
                        "foreignField": "_id",
                        "as": "category_details"
                    }
                },
                {
                    "$unwind": "$category_details"
                },
                {
                    $project: {
                        _id: "$_id",
                        title: "$title",
                        image: "$image",
                        content: "$content",
                        author_id: "$admin_id",
                        author_frist_name: "$author_details.first_name",
                        author_last_name: "$author_details.last_name",
                        author_image: "$author_details.profile_image",
                        slug: "$slug",
                        category_id: "$category_id",
                        category_name: "$category_details.name",
                        status: "$status",
                        isDeleted: "$isDeleted",
                        createdAt: "$createdAt",
                        show_post_date: "$show_post_date",
                        show_author_name: "$show_author_name",
                        show_author_image: "$show_author_image",

                    }
                },
                {
                    $match: conditions
                },

            ]);

            return aggregate;
        } catch (e) {
            return e;
        }
    },




    getAllByField: async (params) => {

        try {

            var conditions = {};
            var and_clauses = [];
            and_clauses.push(params);

            conditions['$and'] = and_clauses;

            var aggregate = Science.aggregate([

                {
                    $lookup: {
                        "from": "category_science_updates",
                        "localField": "category_id",
                        "foreignField": "_id",
                        "as": "category_details"
                    }
                },
                {
                    "$unwind": "$category_details"
                },
                {
                    $lookup: {
                        "from": "users",
                        "localField": "admin_id",
                        "foreignField": "_id",
                        "as": "author_details"
                    }
                },
                {
                    "$unwind": "$author_details"
                },
                {
                    $project: {
                        _id: "$_id",
                        title: "$title",
                        slug: "$slug",
                        image: "$image",
                        content: "$content",
                        status: "$status",
                        isDeleted: "$isDeleted",
                        createdAt: "$createdAt",
                        category_id: "$category_id",
                        category_name: "$category_details.name",
                        author_id: "$admin_id",
                        author_frist_name: "$author_details.first_name",
                        author_last_name: "$author_details.last_name",
                        show_author_image: "$show_author_image",
                        show_post_date: "$show_post_date",
                        show_author_name: "$show_author_name",

                    }
                },
                {
                    $match: conditions
                },
                { $sort: { createdAt: -1 } }
            ]);

            return aggregate;

        } catch (e) {
            return e;
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
                        'author_frist_name': {
                            $regex: key,
                            $options: 'i'
                        }
                    },
                    {
                        'author_last_name': {
                            $regex: key,
                            $options: 'i'
                        }
                    }

                    ]
                }


            );

            and_clauses.push({ "isDeleted": false });
            and_clauses.push({ "status": "Active" });

            conditions['$and'] = and_clauses;

            var aggregate = Science.aggregate([

                {
                    $lookup: {
                        "from": "category_science_updates",
                        "localField": "category_id",
                        "foreignField": "_id",
                        "as": "category_details"
                    }
                },
                {
                    "$unwind": "$category_details"
                },
                {
                    $lookup: {
                        "from": "users",
                        "localField": "admin_id",
                        "foreignField": "_id",
                        "as": "author_details"
                    }
                },
                {
                    "$unwind": "$author_details"
                },
                {
                    $project: {
                        _id: "$_id",
                        title: "$title",
                        image: "$image",
                        content: "$content",
                        status: "$status",
                        isDeleted: "$isDeleted",
                        createdAt: "$createdAt",
                        category_id: "$category_id",
                        category_name: "$category_details.name",
                        author_id: "$admin_id",
                        author_frist_name: "$author_details.first_name",
                        author_last_name: "$author_details.last_name",
                        show_author_image: "$show_author_image",
                        show_post_date: "$show_post_date",
                        show_author_name: "$show_author_name",

                    }
                },
                {
                    $match: conditions
                },

            ]);

            return aggregate;

        } catch (e) {
            return e;
        }
    },

    getAllByFieldTopThree: async (params) => {

        try {

            var conditions = {};
            var and_clauses = [];
            and_clauses.push(params);

            conditions['$and'] = and_clauses;

            var aggregate = Science.aggregate([
                {
                    $lookup: {
                        "from": "category_science_updates",
                        "localField": "category_id",
                        "foreignField": "_id",
                        "as": "category_details"
                    }
                },
                {
                    "$unwind": "$category_details"
                },
                {
                    $lookup: {
                        "from": "users",
                        "localField": "admin_id",
                        "foreignField": "_id",
                        "as": "author_details"
                    }
                },
                {
                    "$unwind": "$author_details"
                },

                {
                    $project: {
                        _id: "$_id",
                        title: "$title",
                        image: "$image",
                        content: "$content",
                        status: "$status",
                        slug: "$slug",
                        isDeleted: "$isDeleted",
                        createdAt: "$createdAt",
                        category_id: "$category_id",
                        category_name: "$category_details.name",
                        author_id: "$admin_id",
                        author_frist_name: "$author_details.first_name",
                        author_last_name: "$author_details.last_name",
                        show_author_image: "$show_author_image",
                        show_post_date: "$show_post_date",
                        show_author_name: "$show_author_name",

                    }
                },
                {
                    $match: conditions
                },
                { $sort: { createdAt: -1 } },
                {
                    $limit: 3
                }

            ]);

            return aggregate;

        } catch (e) {
            return e;
        }
    },

    getAllByFieldWithSort: async (params, sort) => {
        let science = await Science.find(params).sort(sort).exec();
        try {
            if (!science) {
                return null;
            }
            return science;

        } catch (e) {
            return e;
        }
    },

    save: async (data) => {
        try {
            let save = await Science.create(data);
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
            let cuisineCount = await Science.countDocuments(params);
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
            let cuisine = await Science.findById(id);
            if (cuisine) {
                //let cuisineDelete = await Science.deleteOne({ _id: id }).exec();
                let cuisineDelete = await Science.findByIdAndUpdate(id, {
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
            let cuisine = await Science.findByIdAndUpdate(id, data, {
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

module.exports = scienceRepository;
