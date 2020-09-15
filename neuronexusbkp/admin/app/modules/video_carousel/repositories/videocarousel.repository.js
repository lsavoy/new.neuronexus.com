const VideoCarousel = require('video_carousel/models/videocarousel.model');
const perPage = config.PAGINATION_PERPAGE;


const VideoCarouselRepository = {
    getAll: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];
            and_clauses.push({ "isDeleted": false});

            conditions['$and'] = and_clauses;

            var sortOperator = { "$sort": {} };
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

            var aggregate =  VideoCarousel.aggregate([
                { $match: conditions },
                sortOperator
            ]);

            var options = {
                page: req.body.pagination.page,
                limit: req.body.pagination.perpage
            };
            let resultData = await VideoCarousel.aggregatePaginate(aggregate, options);
            return resultData;

        } catch (e) {
            throw (e);
        }
    },

    getAllByField: async (params) => {
        try {
            let item = await VideoCarousel.find(params).exec();
            return item;
        } catch (e) {
            throw (e);
        }
    },

    getById: async (id) => {
        try {
            let item = await VideoCarousel.findById(id).exec();
            return item;
        } catch (e) {
            throw (e);
        }
    },

    getByField: async (params) => {
        let item = await VideoCarousel.findOne(params).exec();
        try {
            if (!item) {
                return null;
            }
            return item;

        } catch (e) {
            return e;
        }
    },

    updateById: async (id, data) => {
        try {
            let item = await VideoCarousel.findByIdAndUpdate(id, data, {
                new: true,
                upsert: true
            }).exec();
            return item;
        } catch (e) {
            throw (e);
        }
    },

    save: async (data)=>{
        try{
            let save = await VideoCarousel.create(data);
            if(!save){
                return null;
            }
            return save;
        }catch(e){
            return e;
        }
    }
};

module.exports = VideoCarouselRepository;
