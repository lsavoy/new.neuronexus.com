const productFeatureRepo = require('product_feature/repositories/productfeature.repository');

/*
// @Method: getSettingBySlug
// @Description: Get Setting data By Slug
*/
exports.getAllProductFeature = async req => {
    try {
        const productFeatureData = await productFeatureRepo.getAllByField({status: 'Active', isDeleted: false });
        if(productFeatureData){
            return { status: 200, data: productFeatureData, message: 'Setting Data fetched Successfully' };
        } else{
            return { status: 201, data: [], message: 'No Data Found' };
        }
    } catch (error) {
        return { "status": 500, data:{}, "message": error.message }
    }
};
