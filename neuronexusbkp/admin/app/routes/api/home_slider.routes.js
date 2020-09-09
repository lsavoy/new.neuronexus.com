const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const request_param = multer();
const sliderController = require('webservice/slider.controller');


/**
 * @api {get} /slider/video Slider Video
 * @apiVersion 1.0.0
 * @apiGroup Slider
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": {
        "slider_video": "slider_video_1590839436856_box_video.mp4",
        "isDeleted": false,
        "status": "Active",
        "_id": "5ed23937c7d64cd82bc2eab2",
        "updatedAt": "2020-05-30T11:50:37.220Z"
    },
    "message": "Sliders fetched Successfully"
}
*/



namedRouter.get("api.slider.video", '/slider/video', async (req, res) => {
  try {
    const success = await sliderController.getslidervideo(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});

/**
 * @api {get} /slider/list Slider list
 * @apiVersion 1.0.0
 * @apiGroup Slider
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "text_h1": "Smart Box Pro®",
            "text_h3": "A Paradigm Shift in Electrophysiology",
            "text_h4": "512-Channel Data Acquisition System Accelerating Neuroscience Research",
            "status": "Active",
            "isDeleted": false,
            "createdAt": "2020-05-30T11:49:57.496Z",
            "_id": "5ed24a9a759eb30ab00ecb30"
        },
        {
            "text_h1": "test h1",
            "text_h3": "test h3",
            "text_h4": "test h4",
            "status": "Active",
            "isDeleted": false,
            "createdAt": "2020-05-30T11:49:57.496Z",
            "_id": "5ed24b56759eb30ab00ecb31"
        }
    ],
    "message": "Sliders fetched Successfully"
}
*/



namedRouter.get("api.slider.list", '/slider/list', async (req, res) => {
  try {
    const success = await sliderController.getAllSliders(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});


module.exports = router;