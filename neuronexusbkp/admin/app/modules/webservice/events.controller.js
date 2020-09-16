const mongoose = require('mongoose');
const eventsRepo = require('events/repositories/events.repository');


/* 
// @Method: getAlleventsRepo
// @Description: Leadership
*/


exports.getAllevents = async req => {
    try {
        var searchQuery = {
            "isDeleted": false,
            "status": "Active"
        };

        if (req.query.title) {
            Object.assign(searchQuery, { "title": { $regex: req.query.title, $options: 'i' } });
        }
        var events = await eventsRepo.getAllByField(searchQuery);
        return { status: 200, data: events, message: 'Record fetched Successfully' };
    } catch (error) {
        return { "status": 500, data: {}, "message": error.message }
    }
};


exports.getDetailsevents = async req => {
    try {
        var searchQuery = {
            "slug": req.params.slug,
            "isDeleted": false,
            "status": "Active"
        };

        if (req.query.title) {
            Object.assign(searchQuery, { "title": { $regex: req.query.title, $options: 'i' } });
        }

        var events = await eventsRepo.getAllByField(searchQuery);
        if (events) {
            return { status: 200, data: events[0], message: 'Record fetched Successfully' };
        } else {
            return { status: 200, data: [], message: 'Record not fetched' };
        }

    } catch (error) {
        return { "status": 500, data: {}, "message": error.message }
    }
};




/* 
// @Method: getProductStaticContents
// @Description: Products
*/
exports.getEventsStaticContents = async req => {
    try {
        var searchQuery = {
            "isDeleted": false,
            "status": "Active"
        };

        var events = await eventsRepo.events_static_contentsGetByField(searchQuery);
        return { status: 200, data: events, message: 'Record fetched Successfully' };
    } catch (error) {
        return { "status": 500, data: {}, "message": error.message }
    }
};





