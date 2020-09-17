const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const request_param = multer();
const technologyController = require('webservice/technology.controller');




/**
 * @api {get} /technology/list Technology List
 * @apiVersion 1.0.0
 * @apiGroup Technology
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "title": "Analytics",
            "slug": "analytics-350aa",
            "content": "<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
            "parent_id": null,
            "isDeleted": false,
            "isHome": false,
            "order_sort": "",
            "image": "",
            "status": "Active",
            "_id": "5f57a26805b3eb18189350aa",
            "createdAt": "2020-09-08T15:25:28.324Z",
            "updatedAt": "2020-09-08T15:25:28.451Z",
            "__v": 0
        },
        {
            "title": "Systems",
            "slug": "systems-350a9",
            "content": "<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
            "parent_id": null,
            "isDeleted": false,
            "isHome": false,
            "order_sort": "",
            "image": "",
            "status": "Active",
            "_id": "5f57a24f05b3eb18189350a9",
            "createdAt": "2020-09-08T15:25:03.295Z",
            "updatedAt": "2020-09-08T15:25:03.420Z",
            "__v": 0
        }
    ],
    "message": "Record fetched Successfully"
}
*/
namedRouter.get("api.technology.list", '/technology/list', async (req, res) => {
  try {
    const success = await technologyController.getAlltechnologycategory(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});


/**
 * @api {get} /technology/static Technology Static Contents
 * @apiVersion 1.0.0
 * @apiGroup Technology
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": {
        "title": "Technology",
        "content": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
        "header_banner_image": "",
        "isDeleted": false,
        "status": "Active",
        "_id": "5f57a1bad29cd33b676e3b7b",
        "updatedAt": "2020-05-30T10:22:15.357Z"
    },
    "message": "Record fetched Successfully"
}
*/
namedRouter.get("api.technology.static", '/technology/static', async (req, res) => {
  try {
    const success = await technologyController.gettechnologystatic(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});

/**
 * @api {get} /technology/details/:slug Technology Detail by Id
 * @apiVersion 1.0.0
 * @apiGroup Technology
 * @apiparam id Technology Id
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "title": "Systems",
            "slug": "systems-350a9",
            "content": "<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
            "parent_id": null,
            "isDeleted": false,
            "isHome": false,
            "order_sort": "",
            "image": "",
            "status": "Active",
            "_id": "5f57a24f05b3eb18189350a9",
            "createdAt": "2020-09-08T15:25:03.295Z",
            "updatedAt": "2020-09-08T15:25:03.420Z",
            "__v": 0
        }
    ],
    "message": "Record fetched Successfully"
}
*/
namedRouter.get("api.technology.detail", '/technology/details/:slug', async (req, res) => {
  try {
    const success = await technologyController.getAlltechnologycategory(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});


/**
 * @api {get} /technology/:category_id Technology Detail by Category Id
 * @apiVersion 1.0.0
 * @apiGroup Technology
 * @apiparam category_id Technology Category Id
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "title": "Systems",
            "slug": "systems-350a9",
            "content": "<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
            "parent_id": null,
            "isDeleted": false,
            "isHome": false,
            "order_sort": "",
            "image": "",
            "status": "Active",
            "_id": "5f57a24f05b3eb18189350a9",
            "createdAt": "2020-09-08T15:25:03.295Z",
            "updatedAt": "2020-09-08T15:25:03.420Z",
            "__v": 0
        }
    ],
    "message": "Record fetched Successfully"
}
*/
namedRouter.get("api.technology", '/technology/:category_id', async (req, res) => {
  try {
    const success = await technologyController.getAlltechnologycategory(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});


////////////////

/**
 * @api {get} /technology_electrode_arrays/list Technology Product List
 * @apiVersion 1.0.0
 * @apiGroup Technology
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "title": "test",
            "content": "<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
            "image": "",
            "slug": "test-27697",
            "isDeleted": false,
            "status": "Active",
            "_id": "5f60a875e789ef02fcc27697",
            "createdAt": "2020-09-15T11:41:41.638Z",
            "updatedAt": "2020-09-15T11:41:43.159Z",
            "__v": 0
        },
        {
            "title": "test2",
            "content": "<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
            "image": "",
            "slug": "test2-27698",
            "isDeleted": false,
            "status": "Active",
            "_id": "5f60a8b3e789ef02fcc27698",
            "createdAt": "2020-09-15T11:42:43.995Z",
            "updatedAt": "2020-09-15T11:42:44.361Z",
            "__v": 0
        }
    ],
    "message": "Record fetched Successfully"
}
*/
namedRouter.get("api.technology_electrode_arrays.list", '/technology_electrode_arrays/list', async (req, res) => {
  try {
    const success = await technologyController.getAlltechnology_electrode_arrays(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});

/**
 * @api {get} /technology_electrode_arrays/details/:slug Technology Product Detail by slug
 * @apiVersion 1.0.0
 * @apiGroup Technology
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "title": "test2",
            "content": "<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
            "image": "",
            "slug": "test2-27698",
            "isDeleted": false,
            "status": "Active",
            "_id": "5f60a8b3e789ef02fcc27698",
            "createdAt": "2020-09-15T11:42:43.995Z",
            "updatedAt": "2020-09-15T11:42:44.361Z",
            "__v": 0
        }
    ],
    "message": "Record fetched Successfully"
}
*/
namedRouter.get("api.technology_electrode_arrays.detail", '/technology_electrode_arrays/details/:slug', async (req, res) => {
  try {
    const success = await technologyController.gettechnology_electrode_arrays(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});







module.exports = router;