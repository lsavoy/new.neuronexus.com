const mongoose = require('mongoose');
const Careers = require('about/models/careers.model');
const Careers_opening = require('about/models/careers-opening.model');
const perPage = config.PAGINATION_PERPAGE;

const AboutRepository = {



    careersGetByField: async (params) => {
        let careers = await Careers.findOne(params).exec();

        try {
            if (!careers) {
                return null;
            }
            return careers;

        } catch (e) {
            return e;
        }
    },
    careersUpdateById: async (data, id) => {
        try {
            let cms = await Careers.findByIdAndUpdate(id, data, {
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

    //careers_tab
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
                        'name': {
                            $regex: req.body.query.generalSearch,
                            $options: 'i'
                        }
                    }]
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

            var aggregate = Careers_opening.aggregate([{
                $match: conditions
            },
                sortOperator
            ]);

            var options = {
                page: req.body.pagination.page,
                limit: req.body.pagination.perpage
            };
            let allCareers_opening = await Careers_opening.aggregatePaginate(aggregate, options);
            return allCareers_opening;
        } catch (e) {
            throw (e);
        }
    },

    getCount: async (params) => {
        try {

            let careers_tab = await Careers_opening.countDocuments(params);
            return careers_tab;
        } catch (e) {
            throw (e);
        }
    },

    getById: async (id) => {
        try {
            let careers_tab = await Careers_opening.findById(id).exec();
            return careers_tab;
        } catch (e) {
            throw (e);
        }
    },

    getByField: async (params) => {
        try {
            let careers_tab = await Careers_opening.findOne(params).exec();
            return careers_tab;
        } catch (e) {
            throw (e);
        }
    },

    getAllByField: async (params) => {
        try {
            let careers_tab = await Careers_opening.find(params).exec();
            return careers_tab;
        } catch (e) {
            throw (e);
        }
    },



    delete: async (id) => {
        try {
            let careers_tab = await Careers_opening.findById(id);
            if (careers_tab) {
                let careers_tabDelete = await Careers_opening.remove({
                    _id: id
                }).exec();
                return careers_tabDelete;
            } else {
                return null;
            }
        } catch (e) {
            throw (e);
        }
    },


    updateById: async (data, id) => {
        try {
            let careers_tab = await Careers_opening.findByIdAndUpdate(id, data, {
                new: true,
                upsert: true
            }).exec();
            return careers_tab;
        } catch (e) {
            throw (e);
        }
    },


    save: async (data) => {


        try {
            let careers_tab = await Careers_opening.create(data);
            if (!careers_tab) {
                return null;
            }
            return careers_tab;
        } catch (e) {
            throw e;
        }
    },

    //careers_tab



};

module.exports = AboutRepository;