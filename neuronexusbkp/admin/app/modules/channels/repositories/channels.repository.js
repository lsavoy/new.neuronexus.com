const mongoose = require('mongoose');
const Channels = require('channels/models/channels.model');
const perPage = config.PAGINATION_PERPAGE;

const channelsRepository = {

    getAll: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];
            and_clauses.push({ "isDeleted": false, "parent_id": null });

            if (_.isObject(req.body.query) && _.has(req.body.query, 'generalSearch')) {
                and_clauses.push({
                    $or: [
                        { 'title': { $regex: req.body.query.generalSearch, $options: 'i' } }
                    ]
                });
            }
            if (_.isObject(req.body.query) && _.has(req.body.query, 'Status')) {
                and_clauses.push({ "status": req.body.query.Status });
            }
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

            var aggregate =  Channels.aggregate([
                { $match: conditions },
                {
                     $group : {
                        "_id": "$_id",
                        "title": {$first: "$title"},
                        "isDeleted": {$first: "$isDeleted"},
                        "status": {$first: "$status"},
                    }
                },
                
                sortOperator
            ]); 
            var options = { page: req.body.pagination.page, limit: req.body.pagination.perpage };
            let allChannels = await Channels.aggregatePaginate(aggregate, options);
            
            return allChannels;
        } catch (e) {
            throw (e);
        }
    },
    
	

    getById: async (id) => {
        let channels = await Channels.findById(id).lean().exec();
        try {
            if (!channels) {
                return null;
            }
            return channels;

        } catch (e) {
            return e;
        }
    },

    getByField: async (params) => {
        let channels = await Channels.findOne(params).exec();
        try {
            if (!channels) {
                return null;
            }
            return channels;

        } catch (e) {
            return e;
        }
    },

    getAllByField: async (params,sort) => {
        let channels = await Channels.find(params).sort(sort).exec();
        try {
            if (!channels) {
                return null;
            }
            return channels;

        } catch (e) {
            return e;
        }
    },

    

    save: async (data)=>{
        try{
            let save = await Channels.create(data);
            if(!save){
                return null;
            }
            return save;
        }catch(e){
            return e;
        }
    },

    
    delete: async (id) => {
        try {
            
            let channels = await Channels.findById(id);
            if (channels) {
                //let ChannelsDelete = await Service.deleteOne({ _id: id }).exec();
                let channelsDelete = await Channels.findByIdAndUpdate(id, {isDeleted: true}, { new: true });
                if (!channelsDelete) {
                    return null;
                }
                return channelsDelete;
            }
        } catch (e) {
            throw e;
        }
    },

    updateById: async (id, data) => {
        try {
            let channels = await Channels.findByIdAndUpdate(id, data, { new: true });
            if (!channels) {
                return null;
            }
            return channels;
        } catch (e) {
            return e;
        }
    },

    updateByField: async (field, fieldValue, data) => {
        //todo: update by field
    }
};

module.exports = channelsRepository;