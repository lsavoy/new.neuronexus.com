const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const request_param = multer();
const level4ProductController = require('webservice/level4_product.controller');

namedRouter.get("api.level4.product.detail", '/product-level4/:slug', async (req, res) => {
    try {
        const success = await level4ProductController.getProductsById(req);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error.message);
    }
});

namedRouter.get("api.level4.product.child", '/product-level4/children/:productId', async (req, res) => {
    try {
        const success = await level4ProductController.getProductsByParentId(req);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error.message);
    }
});


module.exports = router;
