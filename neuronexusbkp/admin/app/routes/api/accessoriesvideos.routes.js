const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const request_param = multer();
const AccessoriesvideosController = require('webservice/accessoriesvideos.controller');





/**
 * @api {get} /accessoriesvideos/list?title=searchvalue Accessoriesvideos List
 * @apiVersion 1.0.0
 * @apiGroup Accessoriesvideos
 * @apiparam title   For search query
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "title": "Test",
            "content": "<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
            "type": "image",
            "media": "media_1600261049059_1598025405936_profileimage_1580380248488_0i1xbvjul86e_csyf.jpg.jpg",
            "slug": "test-78e2a",
            "isDeleted": false,
            "status": "Active",
            "_id": "5f620bb918458d259c478e2a",
            "createdAt": "2020-09-16T12:57:29.067Z",
            "updatedAt": "2020-09-16T12:57:29.367Z",
            "__v": 0
        }
    ],
    "message": "Record fetched Successfully"
}
*/
namedRouter.get("api.accessoriesvideos.list", '/accessoriesvideos/list', async (req, res) => {
  try {
    const success = await AccessoriesvideosController.getAllaccessoriesvideos(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});





/**
 * @api {get} /accessoriesvideos/:slug Accessoriesvideos Detail
 * @apiVersion 1.0.0
 * @apiGroup Accessoriesvideos
 * @apiparam id   Accessoriesvideos Id
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": {
        "title": "Test",
        "content": "<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
        "type": "image",
        "media": "media_1600261049059_1598025405936_profileimage_1580380248488_0i1xbvjul86e_csyf.jpg.jpg",
        "slug": "test-78e2a",
        "isDeleted": false,
        "status": "Active",
        "_id": "5f620bb918458d259c478e2a",
        "createdAt": "2020-09-16T12:57:29.067Z",
        "updatedAt": "2020-09-16T12:57:29.367Z",
        "__v": 0
    },
    "message": "Record fetched Successfully"
}
*/
namedRouter.get("api.accessoriesvideos", '/accessoriesvideos/:slug', async (req, res) => {
  try {
    const success = await AccessoriesvideosController.getDetailsaccessoriesvideos(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});




module.exports = router;