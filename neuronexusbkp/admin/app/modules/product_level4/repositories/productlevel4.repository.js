const mongoose = require('mongoose');
const ProductLevel4 = require('product_level4/models/productlevel4.model');
const Product = require('product_category/models/products.model');
const perPage = config.PAGINATION_PERPAGE;

const ProductLevel4Repository = {

    // use
    getAll: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];
            and_clauses.push({
                "isDeleted": false
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
            var aggregate = ProductLevel4.aggregate([{
                $match: conditions
            },
            {
                $group: {
                    "_id": "$_id",
                    "name": {
                        $first: "$name"
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
            let allProduct = await ProductLevel4.aggregatePaginate(aggregate, options);
            return allProduct;
        } catch (e) {
            throw (e);
        }
    },

    getAllValidProduct: async (req) => {
        try {
            let allProduct = await Product.find({"isDeleted" : false, "status" : 'Active'});
            return allProduct;
        } catch (e) {
            throw (e);
        }
    },

    // use
    getById: async (id) => {
        let cuisine = await ProductLevel4.findById(id).lean().exec();
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
        let cuisine = await ProductLevel4.findOne(params).exec();
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
        try {
            let cuisine = await ProductLevel4.find(params).sort({ 'order_sort': 1 }).exec();
            if (!cuisine) {
                return null;
            }
            return cuisine;

        } catch (e) {
            return e;
        }
    },
    //
    // getAllByFieldWithSort: async (params, sort) => {
    //     let category = await Category.find(params).sort(sort).exec();
    //     try {
    //         if (!category) {
    //             return null;
    //         }
    //         return category;
    //
    //     } catch (e) {
    //         return e;
    //     }
    // },

    // use
    save: async (data) => {
        try {
            let save = await ProductLevel4.create(data);
            if (!save) {
                return null;
            }
            return save;
        } catch (e) {
            return e;
        }
    },

    delete: async (id) => {
        try {
            let cuisine = await ProductLevel4.findById(id);
            if (cuisine) {
                //let cuisineDelete = await Category.deleteOne({ _id: id }).exec();
                let cuisineDelete = await ProductLevel4.findByIdAndUpdate(id, {
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

    // use
    updateById: async (id, data) => {
        try {
            let cuisine = await ProductLevel4.findByIdAndUpdate(id, data, {
                new: true
            });
            if (!cuisine) {
                return null;
            }
            return cuisine;
        } catch (e) {
            return e;
        }
    }
};

module.exports = ProductLevel4Repository;
