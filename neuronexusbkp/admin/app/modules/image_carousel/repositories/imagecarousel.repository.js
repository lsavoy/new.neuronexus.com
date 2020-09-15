const ImageCarousel = require('image_carousel/models/imagecarousel.model');
const perPage = config.PAGINATION_PERPAGE;


const ImageCarouselRepository = {
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

            var aggregate =  ImageCarousel.aggregate([
                { $match: conditions },
                sortOperator
            ]);

            var options = {
                page: req.body.pagination.page,
                limit: req.body.pagination.perpage
            };
            let resultData = await ImageCarousel.aggregatePaginate(aggregate, options);
            return resultData;

        } catch (e) {
            throw (e);
        }
    },

    getAllByField: async (params) => {
        try {
            let item = await ImageCarousel.find(params).exec();
            return item;
        } catch (e) {
            throw (e);
        }
    },

    getById: async (id) => {
        try {
            let item = await ImageCarousel.findById(id).exec();
            return item;
        } catch (e) {
            throw (e);
        }
    },

    getByField: async (params) => {
        let item = await ImageCarousel.findOne(params).exec();
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
            let item = await ImageCarousel.findByIdAndUpdate(id, data, {
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
            let save = await ImageCarousel.create(data);
            if(!save){
                return null;
            }
            return save;
        }catch(e){
            return e;
        }
    }
};

module.exports = ImageCarouselRepository;
