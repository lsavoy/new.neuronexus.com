const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const request_param = multer();
const knowledge_centerController = require('webservice/knowledge_center.controller');




/**
 * @api {get} /knowledgecenter/list?title=searchvalue Knowledge Center List
 * @apiVersion 1.0.0
 * @apiGroup KnowledgeCenter
 * @apiparam title   For search query
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "_id": "5ece36e35b74191d706ef164",
            "title": "Example Title One updated",
            "description": "<p>Example Sentance one update</p>\r\n",
            "sub_category_id": "5ece258001c0531fb8413a48",
            "status": "Active",
            "isDeleted": false,
            "createdAt": "2020-05-27T09:43:03.435Z",
            "sub_category_name": "testc",
            "category_id": "5ece233157a3391bbcceaebb",
            "category_name": "testp"
        },
        {
            "_id": "5ece37135b74191d706ef165",
            "title": "Sample Question One",
            "description": "<p>Sample Sentance One</p>\r\n",
            "sub_category_id": "5ece3105565b7b1d381e53f1",
            "status": "Active",
            "isDeleted": false,
            "createdAt": "2020-05-27T09:43:03.435Z",
            "sub_category_name": "test2c",
            "category_id": "5ece233157a3391bbcceaebb",
            "category_name": "testp"
        }
       
    ],
    "message": "Record fetched Successfully"
}
*/
namedRouter.get("api.knowledgecenter.list", '/knowledgecenter/list', async (req, res) => {
  try {
    const success = await knowledge_centerController.getAllknowledgeCenter(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});


/**
 * @api {get} /knowledgecenter/topfive Knowledge Center Topfive
 * @apiVersion 1.0.0
 * @apiGroup KnowledgeCenter
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "_id": "5ece36e35b74191d706ef164",
            "title": "Example Title One updated",
            "description": "<p>Example Sentance one update</p>\r\n",
            "sub_category_id": "5ece258001c0531fb8413a48",
            "status": "Active",
            "isDeleted": false,
            "createdAt": "2020-05-27T09:43:03.435Z",
            "sub_category_name": "testc",
            "category_id": "5ece233157a3391bbcceaebb",
            "category_name": "testp"
        },
        {
            "_id": "5ece37135b74191d706ef165",
            "title": "Sample Question One",
            "description": "<p>Sample Sentance One</p>\r\n",
            "sub_category_id": "5ece3105565b7b1d381e53f1",
            "status": "Active",
            "isDeleted": false,
            "createdAt": "2020-05-27T09:43:03.435Z",
            "sub_category_name": "test2c",
            "category_id": "5ece233157a3391bbcceaebb",
            "category_name": "testp"
        }
       
    ],
    "message": "Record fetched Successfully"
}
*/
namedRouter.get("api.knowledgecenter.topfive", '/knowledgecenter/topfive', async (req, res) => {
  try {
    const success = await knowledge_centerController.getTopFiveknowledgeCenter(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});

/**
 * @api {get} /knowledgecenter/category/:category_slug Knowledge Center List by category_slug
 * @apiVersion 1.0.0
 * @apiGroup KnowledgeCenter
 * @apiparam category_slug Category Slug
 * @apiparam title   For search query
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "_id": "5ece37135b74191d706ef165",
            "title": "Sample Question One",
            "description": "<p>Sample Sentance One</p>\r\n",
            "sub_category_id": "5ece3105565b7b1d381e53f1",
            "status": "Active",
            "isDeleted": false,
            "createdAt": "2020-05-27T09:43:03.435Z",
            "sub_category_name": "test2c",
            "category_id": "5ece233157a3391bbcceaebb",
            "category_name": "testp"
        }
    ],
    "message": "Record fetched Successfully"
}
*/
namedRouter.get("api.knowledgecenter.category", '/knowledgecenter/category/:category_slug', async (req, res) => {
  try {
    const success = await knowledge_centerController.getAllknowledgeCenter(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});

/**
 * @api {get} /knowledgecenter/subcategory/:sub_category_slug Knowledge Center List by sub_category_slug
 * @apiVersion 1.0.0
 * @apiGroup KnowledgeCenter
 * @apiparam sub_category_slug Sub Category Slug
 * @apiparam title   For search query
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "_id": "5ece37135b74191d706ef165",
            "title": "Sample Question One",
            "description": "<p>Sample Sentance One</p>\r\n",
            "sub_category_id": "5ece3105565b7b1d381e53f1",
            "status": "Active",
            "isDeleted": false,
            "createdAt": "2020-05-27T09:43:03.435Z",
            "sub_category_name": "test2c",
            "category_id": "5ece233157a3391bbcceaebb",
            "category_name": "testp"
        }
    ],
    "message": "Record fetched Successfully"
}
*/
namedRouter.get("api.knowledgecenter.subcategory", '/knowledgecenter/subcategory/:sub_category_slug', async (req, res) => {
  try {
    const success = await knowledge_centerController.getAllknowledgeCenter(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});







module.exports = router;