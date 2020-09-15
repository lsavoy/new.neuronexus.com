const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');

const multer = require('multer');
const topBlogController = require('top_blog/controllers/topblog.controller');

const Storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "./public/uploads/post");
	},
	filename: (req, file, callback) => {
		callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
	}
});

const uploadFile = multer({
	storage: Storage
});
const request_param = multer();

namedRouter.all('/top_blog*', auth.authenticate);

/*
// @Route: setting List
*/
namedRouter.get("top_blog.list", '/top_blog/list', topBlogController.list);


namedRouter.post("top_blog.getall", '/top_blog/getall', async (req, res) => {
	try {
		const success = await topBlogController.getAllData(req, res);
		res.send({
			"meta": success.meta,
			"data": success.data
		});
	} catch (error) {
		res.status(error.status).send(error);
	}
});

/*
// @Route: Render Edit setting
*/

namedRouter.get("top_blog.edit", "/top_blog/edit/:id", topBlogController.edit);

/*
// @Route: Update setting Action
*/
namedRouter.post("top_blog.update", '/top_blog/update', uploadFile.any(), topBlogController.update);

namedRouter.get("top_blog.create", '/top_blog/create',topBlogController.create);
namedRouter.post("top_blog.store", '/top_blog/store', uploadFile.any(),topBlogController.store);
namedRouter.get("top_blog.delete", "/top_blog/delete/:id", topBlogController.delete);
namedRouter.get("top_blog.statusChange", '/top_blog/status-change/:id',request_param.any(), topBlogController.statusChange);

// Export the express.Router() instance
module.exports = router;
