const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const request_param = multer();
const productFeatureController = require('webservice/product_feature.controller');

namedRouter.get("api.product-feature.all", '/product-feature/all', async (req, res) => {
    try {
        const success = await productFeatureController.getAllProductFeature(req);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error.message);
    }
});


module.exports = router;
