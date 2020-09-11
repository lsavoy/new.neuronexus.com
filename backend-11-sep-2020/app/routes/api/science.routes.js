const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const request_param = multer();
const scienceController = require('webservice/science.controller');




/**
 * @api {get} /science/list Science List
 * @apiVersion 1.0.0
 * @apiGroup Science
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "title": "NeuroNexus in Action",
            "slug": "neuronexus-in-action-3150d",
            "content": "<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
            "parent_id": null,
            "isDeleted": false,
            "isHome": false,
            "order_sort": "",
            "image": "",
            "status": "Active",
            "_id": "5f579d03c72fcb241053150d",
            "createdAt": "2020-09-08T15:02:27.020Z",
            "updatedAt": "2020-09-08T15:02:27.121Z",
            "__v": 0
        },
        {
            "title": "Newsfeed",
            "slug": "newsfeed-31511",
            "content": "<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
            "parent_id": null,
            "isDeleted": false,
            "isHome": false,
            "order_sort": "",
            "image": "",
            "status": "Active",
            "_id": "5f579d8cc72fcb2410531511",
            "createdAt": "2020-09-08T15:04:44.781Z",
            "updatedAt": "2020-09-08T15:04:44.894Z",
            "__v": 0
        }
    ],
    "message": "Record fetched Successfully"
}
*/
namedRouter.get("api.science.list", '/science/list', async (req, res) => {
  try {
    const success = await scienceController.getAllsciencecategory(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});




/**
 * @api {get} /science/details/:slug Science Detail by Id
 * @apiVersion 1.0.0
 * @apiGroup Science
 * @apiparam id Science Id
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "title": "NeuroNexus in Action",
            "slug": "neuronexus-in-action-3150d",
            "content": "<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
            "parent_id": null,
            "isDeleted": false,
            "isHome": false,
            "order_sort": "",
            "image": "",
            "status": "Active",
            "_id": "5f579d03c72fcb241053150d",
            "createdAt": "2020-09-08T15:02:27.020Z",
            "updatedAt": "2020-09-08T15:02:27.121Z",
            "__v": 0
        }
    ],
    "message": "Record fetched Successfully"
}
*/
namedRouter.get("api.science.detail", '/science/details/:slug', async (req, res) => {
  try {
    const success = await scienceController.getAllsciencecategory(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});


/**
 * @api {get} /science/:category_id Science Detail by Category Id
 * @apiVersion 1.0.0
 * @apiGroup Science
 * @apiparam category_id Science Category Id
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "title": "NeuroNexus in Action",
            "slug": "neuronexus-in-action-3150d",
            "content": "<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
            "parent_id": null,
            "isDeleted": false,
            "isHome": false,
            "order_sort": "",
            "image": "",
            "status": "Active",
            "_id": "5f579d03c72fcb241053150d",
            "createdAt": "2020-09-08T15:02:27.020Z",
            "updatedAt": "2020-09-08T15:02:27.121Z",
            "__v": 0
        }
    ],
    "message": "Record fetched Successfully"
}
*/
namedRouter.get("api.science", '/science/:category_id', async (req, res) => {
  try {
    const success = await scienceController.getAllsciencecategory(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});









module.exports = router;