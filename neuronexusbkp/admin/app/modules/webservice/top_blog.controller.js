const topBlogRepo = require('top_blog/repositories/topblog.repository');

/*
// @Method: getSettingBySlug
// @Description: Get Setting data By Slug
*/
exports.getAllValidData = async req => {
    try {
        const resultData = await topBlogRepo.getAllByField({status: 'Active', isDeleted: false });
        if(resultData){
            return { status: 200, data: resultData, message: 'Result Data fetched Successfully' };
        } else{
            return { status: 201, data: [], message: 'No Data Found' };
        }
    } catch (error) {
        return { "status": 500, data:{}, "message": error.message }
    }
};
