const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const request_param = multer();
const topBlogController = require('webservice/top_blog.controller');

namedRouter.get("api.top-blog.all", '/top-blog/all', async (req, res) => {
    try {
        const success = await topBlogController.getAllValidData(req);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error.message);
    }
});


module.exports = router;
