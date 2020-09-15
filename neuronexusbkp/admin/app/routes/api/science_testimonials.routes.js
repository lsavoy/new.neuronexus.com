const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const request_param = multer();
const knowledge_centerController = require('webservice/science_testimonials.controller');




/**
 * @api {get} /science_testimonials/list?title=searchvalue Science Update List
 * @apiVersion 1.0.0
 * @apiGroup ScienceUpdate
 * @apiparam title   For search query
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "title": "test",
            "content": "<p>test test</p>\r\n",
            "video": "",
            "slug": "test-c9b52",
            "isDeleted": false,
            "status": "Active",
            "_id": "5f5b6457ec1d3927f85c9b52",
            "createdAt": "2020-09-11T11:49:43.524Z",
            "updatedAt": "2020-09-14T09:20:37.722Z",
            "__v": 0
        }
    ],
    "message": "Record fetched Successfully"
}
*/
namedRouter.get("api.science_testimonials.list", '/science_testimonials/list', async (req, res) => {
  try {
    const success = await knowledge_centerController.getAllscience_testimonials(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});





/**
 * @api {get} /science_testimonials/:id Science Update Detail
 * @apiVersion 1.0.0
 * @apiGroup ScienceUpdate
 * @apiparam id   Science Update Id
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": {
        "title": "       Small Animal Matrix Array",
        "image": "image_1590675043151_testimonials_img.jpg",
        "content": "<p>The new <a href=\"/products/neural-probes/matrix-small-animal/\">Small Animal Matrix Array</a> can be configured for acute or chronic experiments, interfacing with large populations of neurons in 3D space up to 10 mm deep.</p>\r\n\r\n<p><a href=\"/contact/\">Contact us</a> for more information, or to place an order.</p>\r\n",
        "slug": "small-animal-matrix-array-040b1",
        "admin_id": "5ecfc4055139bb07ecec9d3f",
        "category_id": "5ecf871a0b33232a88c934ab",
        "isDeleted": false,
        "status": "Active",
        "_id": "5ecfc6630168e6a7c21040b1",
        "createdAt": "2020-05-28T14:10:43.400Z",
        "testimonialsdAt": "2020-07-20T14:12:01.806Z",
        "__v": 0
    },
    "message": "Record fetched Successfully"
}
*/
namedRouter.get("api.science_testimonials", '/science_testimonials/:slug', async (req, res) => {
  try {
    const success = await knowledge_centerController.getDetailsscience_testimonials(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});




module.exports = router;