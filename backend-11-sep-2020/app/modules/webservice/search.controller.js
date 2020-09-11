const searchRepo = require('search/repositories/search.repository');

const searchController = {
    /* 
    // @Method: getSliders
    // @Description: Sliders
    */
    getAllsearch: async req => {
        try {
            console.log(req.body.searchkey);
            var sliders = await searchRepo.getAllByField(req);
            return { status: 200, data: sliders, message: 'Records fetched Successfully' };
        } catch (error) {
            return { "status": 500, data: {}, "message": error.message }
        }
    },




}
module.exports = searchController;
