const productRepo = require('product_category/repositories/category.repository');
const probeFinderRepo = require("probe_finder/repositories/probe_finder.repository");

const productController = {
    /* 
    // @Method: getProducts
    // @Description: Products
    */
    getAllProducts: async req => {
        try {
            var searchQuery = {
                "isDeleted": false,
                "status": "Active"
            };
            var products = await productRepo.getAllByField(searchQuery);
            return { status: 200, data: products, message: 'Products fetched Successfully' };
        } catch (error) {
            return { "status": 500, data: {}, "message": error.message }
        }
    },




    /* 
    // @Method: getProducts
    // @Description: Products
    */
    getProductsById: async req => {
        try {

            var products = await productRepo.getByField({ 'slug': req.params.slug });
            if (products) {
                return { status: 200, data: products, message: 'Product fetched Successfully' };
            } else {
                return { status: 201, data: [], message: 'Product not found' };
            }

        } catch (error) {
            return { "status": 500, data: {}, "message": error.message }
        }
    },

    /* 
    // @Method: getProductStaticContents
    // @Description: Products
    */
    getProductStaticContents: async req => {
        try {
            var searchQuery = {
                "isDeleted": false,
                "status": "Active"
            };

            var products = await productRepo.product_static_contentsGetByField(searchQuery);
            return { status: 200, data: products, message: 'Products fetched Successfully' };
        } catch (error) {
            return { "status": 500, data: {}, "message": error.message }
        }
    },

    /* 
   // @Method: getAllProductsWithCategory
   // @Description: Products+
   */
    getAllProductsWithCategory: async req => {
        try {
            var searchQuery = {
                "isDeleted": false,
                "status": "Active"
            };
            var products = await productRepo.getAllByFieldApi(searchQuery);

            let selectedcategory = await probeFinderRepo.getCategoryNameByField({ 'status': 'Active', 'isDeleted': false });


            for (var i = 0; i < products.length; i++) {

                if (products[i]._id.toString() == selectedcategory.menu_id.toString()) {
                    products[i].productsList.push({ "name": "Probe Finder", "static": true });
                }
            }
            products.push({ "name": "Catalog", "static": true })
            return { status: 200, data: products, message: 'Products fetched Successfully' };
        } catch (error) {
            return { "status": 500, data: {}, "message": error.message }
        }
    },



    getcatalogs: async req => {
        try {
            var searchQuery = {
                "isDeleted": false,
                "status": "Active"
            };
            var catalogs = await productRepo.getByFieldCatalog(searchQuery);

            if (catalogs) {
                return { status: 200, data: catalogs, message: 'Catalogs fetched Successfully' };
            } else {
                return { status: 201, data: [], message: 'Catalogs Not Found' };
            }
        } catch (error) {
            return { "status": 500, data: {}, "message": error.message }
        }
    },

}
module.exports = productController;
