const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const request_param = multer();
const EventsController = require('webservice/events.controller');


/**
 * @api {get} /events/static Events Static Contents
 * @apiVersion 1.0.0
 * @apiGroup Events
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": {
        "header_banner_image": "header_banner_image_1600250059709_header_banner_image_1590834134912_about_bnr.jpg",
        "isDeleted": false,
        "status": "Active",
        "_id": "5f61da14f394c2500b904d3e",
        "updatedAt": "2020-09-16T09:54:20.236Z"
    },
    "message": "Record fetched Successfully"
}
*/
namedRouter.get("api.events.static", '/events/static', async (req, res) => {
  try {
    const success = await EventsController.getEventsStaticContents(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});


/**
 * @api {get} /events/list?title=searchvalue Events List
 * @apiVersion 1.0.0
 * @apiGroup Events
 * @apiparam title   For search query
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "title": "Event 1",
            "content": "<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
            "date": "2020-09-17 15:25",
            "slug": "event-1-18d35",
            "isDeleted": false,
            "status": "Active",
            "_id": "5f61df34a972ad0cccc18d35",
            "createdAt": "2020-09-16T09:47:32.251Z",
            "updatedAt": "2020-09-16T09:47:32.588Z",
            "__v": 0
        },
        {
            "title": "Event 2",
            "content": "<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
            "date": "2020-09-25 15:40",
            "slug": "event-2-18d36",
            "isDeleted": false,
            "status": "Active",
            "_id": "5f61df67a972ad0cccc18d36",
            "createdAt": "2020-09-16T09:48:23.243Z",
            "updatedAt": "2020-09-16T09:48:23.574Z",
            "__v": 0
        }
    ],
    "message": "Record fetched Successfully"
}
*/
namedRouter.get("api.events.list", '/events/list', async (req, res) => {
  try {
    const success = await EventsController.getAllevents(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});





/**
 * @api {get} /events/:slug Events Detail
 * @apiVersion 1.0.0
 * @apiGroup Events
 * @apiparam id   Events Id
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": {
        "title": "Event 1",
        "content": "<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
        "date": "2020-09-17 15:25",
        "slug": "event-1-18d35",
        "isDeleted": false,
        "status": "Active",
        "_id": "5f61df34a972ad0cccc18d35",
        "createdAt": "2020-09-16T09:47:32.251Z",
        "updatedAt": "2020-09-16T09:47:32.588Z",
        "__v": 0
    },
    "message": "Record fetched Successfully"
}
*/
namedRouter.get("api.events", '/events/:slug', async (req, res) => {
  try {
    const success = await EventsController.getDetailsevents(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});




module.exports = router;