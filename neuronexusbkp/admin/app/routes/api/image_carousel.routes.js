const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const request_param = multer();
const imageCarouselController = require('webservice/image_carousel.controller');

namedRouter.get("api.image-carousel.all", '/image-carousel/all', async (req, res) => {
    try {
        const success = await imageCarouselController.getAllValidData(req);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error.message);
    }
});


module.exports = router;
