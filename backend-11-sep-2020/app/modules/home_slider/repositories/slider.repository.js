const mongoose = require('mongoose');
const Slider = require('home_slider/models/slider.model');
const Slidervideo = require('home_slider/models/slider_video.model');
const perPage = config.PAGINATION_PERPAGE;

const SliderRepository = {

    slidervideoGetByField: async (params) => {
        let sliderVideo = await Slidervideo.findOne(params).exec();

        try {
            if (!sliderVideo) {
                return null;
            }
            return sliderVideo;

        } catch (e) {
            return e;
        }
    },
    slidervideoUpdateById: async (data, id) => {
        try {
            let cms = await Slidervideo.findByIdAndUpdate(id, data, {
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
                "isDeleted": false
            });

            if (_.isObject(req.body.query) && _.has(req.body.query, 'generalSearch')) {
                //and_clauses.push({"status": /req.body.query.generalSearch/i});
                and_clauses.push({
                    $or: [{
                        'text_h1': {
                            $regex: req.body.query.generalSearch,
                            $options: 'i'
                        }
                    }
                    ]
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

            var aggregate = Slider.aggregate([{
                $match: conditions
            },
                sortOperator
            ]);

            var options = {
                page: req.body.pagination.page,
                limit: req.body.pagination.perpage
            };
            let allSlider = await Slider.aggregatePaginate(aggregate, options);
            return allSlider;
        } catch (e) {
            throw (e);
        }
    },


    getById: async (id) => {
        try {
            let slider = await Slider.findById(id).exec();
            return slider;
        } catch (e) {
            throw (e);
        }
    },

    getByField: async (params) => {
        try {
            let slider = await Slider.findOne(params).exec();
            return slider;
        } catch (e) {
            throw (e);
        }
    },

    getAllByField: async (params) => {
        try {
            let slider = await Slider.find(params).exec();
            return slider;
        } catch (e) {
            throw (e);
        }
    },

    delete: async (id) => {
        try {
            let slider = await Slider.findById(id);

            if (slider) {
                let sliderDelete = await Slider.remove({
                    _id: id
                }).exec();
                return sliderDelete;
            } else {
                return null;
            }
        } catch (e) {
            throw (e);
        }
    },

    deleteByField: async (field, fieldValue) => {
        //todo: Implement delete by field
    },


    updateById: async (data, id) => {
        try {
            let slider = await Slider.findByIdAndUpdate(id, data, {
                new: true,
                upsert: true
            }).exec();
            return slider;
        } catch (e) {
            throw (e);
        }
    },

    updateByField: async (field, fieldValue, data) => {
        //todo: update by field
    },

    save: async (data) => {
        try {
            let slider = await Slider.create(data);
            if (!slider) {
                return null;
            }
            return slider;
        } catch (e) {
            throw e;
        }
    },

    saveCS: async (data) => {
        try {
            let sliderCS = await CS.create(data);
            if (!sliderCS) {
                return null;
            }
            return sliderCS;
        } catch (e) {
            throw e;
        }
    },

};

module.exports = SliderRepository;