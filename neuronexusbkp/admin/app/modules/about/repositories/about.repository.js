const mongoose = require('mongoose');
const About = require('about/models/meet_the_team.model');
const AboutUs = require('about/models/aboutus.model');
const Leadership = require('about/models/leadership.model');
const perPage = config.PAGINATION_PERPAGE;

const AboutRepository = {


    aboutusGetByField: async (params) => {
        let about = await AboutUs.findOne(params).exec();

        try {
            if (!about) {
                return null;
            }
            return about;

        } catch (e) {
            return e;
        }
    },
    aboutusUpdateById: async (data, id) => {
        try {
            let cms = await AboutUs.findByIdAndUpdate(id, data, {
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

    meet_the_teamGetByField: async (params) => {
        let about = await About.findOne(params).exec();

        try {
            if (!about) {
                return null;
            }
            return about;

        } catch (e) {
            return e;
        }
    },
    meet_the_teamUpdateById: async (data, id) => {
        try {
            let cms = await About.findByIdAndUpdate(id, data, {
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

    //leadership
    getAllLeadership: async (req) => {
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

            var aggregate = Leadership.aggregate([{
                $match: conditions
            },
                sortOperator
            ]);

            var options = {
                page: req.body.pagination.page,
                limit: req.body.pagination.perpage
            };
            let allLeadership = await Leadership.aggregatePaginate(aggregate, options);
            return allLeadership;
        } catch (e) {
            throw (e);
        }
    },

    getLeadershipCount: async (params) => {
        try {

            let leadership = await Leadership.countDocuments(params);
            return leadership;
        } catch (e) {
            throw (e);
        }
    },

    getByIdLeadership: async (id) => {
        try {
            let leadership = await Leadership.findById(id).exec();
            return leadership;
        } catch (e) {
            throw (e);
        }
    },

    getByFieldLeadership: async (params) => {
        try {
            let leadership = await Leadership.findOne(params).exec();
            return leadership;
        } catch (e) {
            throw (e);
        }
    },

    getAllByFieldLeadership: async (params) => {
        try {
            let leadership = await Leadership.find(params).exec();
            return leadership;
        } catch (e) {
            throw (e);
        }
    },



    deleteLeadership: async (id) => {
        try {
            let leadership = await Leadership.findById(id);
            if (leadership) {
                let leadershipDelete = await Leadership.remove({
                    _id: id
                }).exec();
                return leadershipDelete;
            } else {
                return null;
            }
        } catch (e) {
            throw (e);
        }
    },


    updateByIdLeadership: async (data, id) => {
        try {
            let leadership = await Leadership.findByIdAndUpdate(id, data, {
                new: true,
                upsert: true
            }).exec();
            return leadership;
        } catch (e) {
            throw (e);
        }
    },


    saveLeadership: async (data) => {


        try {
            let leadership = await Leadership.create(data);
            if (!leadership) {
                return null;
            }
            return leadership;
        } catch (e) {
            throw e;
        }
    },

    //leadership



};

module.exports = AboutRepository;