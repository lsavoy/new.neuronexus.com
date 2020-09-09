const sliderRepo = require('home_slider/repositories/slider.repository');

const productController = {
    /* 
    // @Method: getSliders
    // @Description: Sliders
    */
    getAllSliders: async req => {
        try {
            var searchQuery = {
                "isDeleted": false,
                "status": "Active"
            };
            var sliders = await sliderRepo.getAllByField(searchQuery);
            return { status: 200, data: sliders, message: 'Sliders fetched Successfully' };
        } catch (error) {
            return { "status": 500, data: {}, "message": error.message }
        }
    },


    getslidervideo: async req => {
        try {
            var searchQuery = {
                "isDeleted": false,
                "status": "Active"
            };

            var sliders = await sliderRepo.slidervideoGetByField(searchQuery);
            return { status: 200, data: sliders, message: 'Sliders fetched Successfully' };
        } catch (error) {
            return { "status": 500, data: {}, "message": error.message }
        }
    },

}
module.exports = productController;
