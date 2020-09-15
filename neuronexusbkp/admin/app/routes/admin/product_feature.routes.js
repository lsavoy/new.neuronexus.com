const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');

const multer = require('multer');
const productFeatureController = require('product_feature/controllers/productfeature.controller');

const Storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "./public/uploads/feature");
	},
	filename: (req, file, callback) => {
		callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
	}
});

const uploadFile = multer({
	storage: Storage
});
const request_param = multer();

namedRouter.all('/product_feature*', auth.authenticate);

/*
// @Route: setting List
*/
namedRouter.get("product_feature.list", '/product_feature/list', productFeatureController.list);


namedRouter.post("product_feature.getall", '/product_feature/getall', async (req, res) => {
	try {
		const success = await productFeatureController.getAllData(req, res);
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

namedRouter.get("product_feature.edit", "/product_feature/edit/:id", productFeatureController.edit);

/*
// @Route: Update setting Action
*/
namedRouter.post("product_feature.update", '/product_feature/update', uploadFile.any(), productFeatureController.update);


// Export the express.Router() instance
module.exports = router;
