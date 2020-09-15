const ProductFeature = require('product_feature/models/productfeature.model');
const perPage = config.PAGINATION_PERPAGE;


const ProductFeatureRepository = {
    getAll: async (req) => {
        try {
            var sortOperator = {
                "$sort": {
                    "feature_index": 1
                }
            };

            var aggregate = ProductFeature.aggregate([
                sortOperator
            ]);

            var options = {
                page: req.body.pagination.page,
                limit: req.body.pagination.perpage
            };
            let allProductFeature = await ProductFeature.aggregatePaginate(aggregate, options);
            return allProductFeature;

        } catch (e) {
            throw (e);
        }
    },

    getAllByField: async (params) => {
        try {
            let productFeatureList = await ProductFeature.find(params).exec();
            return productFeatureList;
        } catch (e) {
            throw (e);
        }
    },

    getById: async (id) => {
        try {
            let productFeature = await ProductFeature.findById(id).exec();
            return productFeature;
        } catch (e) {
            throw (e);
        }
    },

    updateById: async (data, id) => {
        try {
            let productFeature = await ProductFeature.findByIdAndUpdate(id, data, {
                new: true,
                upsert: true
            }).exec();
            return productFeature;
        } catch (e) {
            throw (e);
        }
    }
};

module.exports = ProductFeatureRepository;
