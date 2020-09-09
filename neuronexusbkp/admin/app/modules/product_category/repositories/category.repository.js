const mongoose = require('mongoose');
const Category = require('product_category/models/products.model');
const MasterCategory = require('category/models/category.model');
const Product_static = require('product_category/models/product_static.model');
const CatalogAndBrochures = require('product_category/models/catalogs.model');
const perPage = config.PAGINATION_PERPAGE;

const categoryRepository = {


    product_static_contentsGetByField: async (params) => {
        try {
            let product = await Product_static.findOne(params).exec();
            if (!product) {
                return null;
            }
            return product;

        } catch (e) {
            return e;
        }
    },
    product_static_contentsUpdateById: async (data, id) => {
        try {
            let cms = await Product_static.findByIdAndUpdate(id, data, {
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
        try {
            let cuisine = await Category.find(params).sort({'createdAt': 1}).limit(6).exec();
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
    },


    getAllByFieldApi: async (params) => {

        try {
            let conditions = {};
            let and_clauses = [];
            and_clauses.push(params);
            conditions['$and'] = and_clauses;

            let products = await MasterCategory.aggregate([
                {
                    $lookup:
                      {
                        from:'products',
                        localField:'_id',
                        foreignField:'category_id',
                        as:'productsList'
                      }
                },
                {
                    $match: conditions
                }
            ]);
            if (!products) {
                return null;
            }
            return products;

        } catch (e) {
            return e;
        }
    },

    //catalog repo method

    getByIdCatalog: async (id) => {
        let catalog = await CatalogAndBrochures.findById(id).lean().exec();
        try {
            if (!catalog) {
                return null;
            }
            return catalog;

        } catch (e) {
            return e;
        }
    },

    getByFieldCatalog: async (params) => {
        try {
            let catalog = await CatalogAndBrochures.findOne(params).exec();
            if (!catalog) {
                return null;
            }
            return catalog;
        } catch (e) {
            return e;
        }
    },

    getAllByFieldCatalog: async (params) => {
        try {
            let catalog = await CatalogAndBrochures.find(params).exec();
            if (!catalog) {
                return null;
            }
            return catalog;

        } catch (e) {
            return e;
        }
    },

    updateByIdCatalog: async (id, data) => {
        try {
            let catalog = await CatalogAndBrochures.findByIdAndUpdate(id, data, {
                new: true
            });
            if (!catalog) {
                return null;
            }
            return catalog;
        } catch (e) {
            return e;
        }
    },

    saveCatalog: async (data) => {
        try {
            let save = await CatalogAndBrochures.create(data);
            if (!save) {
                return null;
            }
            return save;
        } catch (e) {
            return e;
        }
    },
};

module.exports = categoryRepository;
