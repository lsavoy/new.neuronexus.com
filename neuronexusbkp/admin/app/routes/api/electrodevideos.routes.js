const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const request_param = multer();
const ElectrodevideosController = require('webservice/electrodevideos.controller');





/**
 * @api {get} /electrodevideos/list?title=searchvalue Electrodevideos List
 * @apiVersion 1.0.0
 * @apiGroup Electrodevideos
 * @apiparam title   For search query
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "title": "test",
            "content": "<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
            "type": "image",
            "media": "media_1600257783814_1598025405936_profileimage_1580380248488_0i1xbvjul86e_csyf.jpg.jpg",
            "slug": "test-e9328",
            "isDeleted": false,
            "status": "Active",
            "_id": "5f61fef78e53e114343e9328",
            "createdAt": "2020-09-16T12:03:03.867Z",
            "updatedAt": "2020-09-16T12:03:04.438Z",
            "__v": 0
        },
        {
            "title": "test 2",
            "content": "<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
            "type": "video",
            "media": "media_1600258026190_file_example_MP4_480_1_5MG.mp4",
            "slug": "test-2-e9329",
            "isDeleted": false,
            "status": "Active",
            "_id": "5f61ffea8e53e114343e9329",
            "createdAt": "2020-09-16T12:07:06.289Z",
            "updatedAt": "2020-09-16T12:08:08.405Z",
            "__v": 0
        }
    ],
    "message": "Record fetched Successfully"
}
*/
namedRouter.get("api.electrodevideos.list", '/electrodevideos/list', async (req, res) => {
  try {
    const success = await ElectrodevideosController.getAllelectrodevideos(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});





/**
 * @api {get} /electrodevideos/:slug Electrodevideos Detail
 * @apiVersion 1.0.0
 * @apiGroup Electrodevideos
 * @apiparam id   Electrodevideos Id
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": {
        "title": "test 2",
        "content": "<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
        "type": "video",
        "media": "media_1600258026190_file_example_MP4_480_1_5MG.mp4",
        "slug": "test-2-e9329",
        "isDeleted": false,
        "status": "Active",
        "_id": "5f61ffea8e53e114343e9329",
        "createdAt": "2020-09-16T12:07:06.289Z",
        "updatedAt": "2020-09-16T12:08:08.405Z",
        "__v": 0
    },
    "message": "Record fetched Successfully"
}
*/
namedRouter.get("api.electrodevideos", '/electrodevideos/:slug', async (req, res) => {
  try {
    const success = await ElectrodevideosController.getDetailselectrodevideos(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});




module.exports = router;