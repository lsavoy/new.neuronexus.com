const Library = require('library/models/library.model');
const perPage = config.PAGINATION_PERPAGE;

const LibraryRepository = {
    getAll: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];
            if (_.isObject(req.body.query) && _.has(req.body.query, 'generalSearch')) {
                and_clauses.push({
                    $or: [
                        { 'file_name': { $regex: req.body.query.generalSearch, $options: 'i' } },
                        { 'description': { $regex: req.body.query.generalSearch, $options: 'i' } }
                    ]
                });
            } else {
                and_clauses.push({});
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

            var aggregate =  Library.aggregate([
                { $match: conditions },
                sortOperator
            ]);

            var options = {
                page: req.body.pagination.page,
                limit: req.body.pagination.perpage
            };
            let resultData = await Library.aggregatePaginate(aggregate, options);
            return resultData;

        } catch (e) {
            throw (e);
        }
    },

    getAllByField: async (params) => {
        try {
            let item = await Library.find(params).exec();
            return item;
        } catch (e) {
            throw (e);
        }
    },

    getById: async (id) => {
        try {
            let item = await Library.findById(id).exec();
            return item;
        } catch (e) {
            throw (e);
        }
    },

    getByField: async (params) => {
        let item = await Library.findOne(params).exec();
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
            let item = await Library.findByIdAndUpdate(id, data, {
                new: true,
                upsert: true
            }).exec();
            return item;
        } catch (e) {
            throw (e);
        }
    },

    deleteById: async (id) => {
        try {
            let item = await Library.findByIdAndDelete(id).exec();
            return item;
        } catch (e) {
            throw (e);
        }
    },

    save: async (data)=>{
        try{
            let save = await Library.create(data);
            if(!save){
                return null;
            }
            return save;
        }catch(e){
            return e;
        }
    }
};

module.exports = LibraryRepository;
