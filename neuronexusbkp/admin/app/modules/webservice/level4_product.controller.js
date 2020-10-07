const level4ProductRepo = require('product_level4/repositories/productlevel4.repository');

const level4ProductController = {

    getProductsById: async req => {
        try {
            var products = await level4ProductRepo.getByField({ 'slug': req.params.slug, 'status': 'Active', 'isDeleted': false });
            if (products) {
                return { status: 200, data: products, message: 'Product fetched Successfully' };
            } else {
                return { status: 201, data: [], message: 'Product not found' };
            }
        } catch (error) {
            return { "status": 500, data: {}, "message": error.message }
        }
    },

    getProductsByParentId: async req => {
        try {
            var products = await level4ProductRepo.getAllByField({ 'product_id': req.params.productId, 'status': 'Active', 'isDeleted': false });
            if (products) {
                return { status: 200, data: products, message: 'Product fetched Successfully' };
            } else {
                return { status: 201, data: [], message: 'Product not found' };
            }
        } catch (error) {
            return { "status": 500, data: {}, "message": error.message }
        }
    }
}
module.exports = level4ProductController;
