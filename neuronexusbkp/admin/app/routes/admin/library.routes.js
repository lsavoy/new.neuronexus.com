const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');

const multer = require('multer');
const libraryController = require('library/controllers/library.controller');

const Storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "./public/uploads/library");
	},
	filename: (req, file, callback) => {
		callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
	}
});

const uploadFile = multer({
	storage: Storage
});
const request_param = multer();

namedRouter.all('/library*', auth.authenticate);

/*
// @Route: setting List
*/
namedRouter.get("library.list", '/library/list', libraryController.list);


namedRouter.post("library.getall", '/library/getall', async (req, res) => {
	try {
		const success = await libraryController.getAllData(req, res);
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

namedRouter.get("library.edit", "/library/edit/:id", libraryController.edit);

/*
// @Route: Update setting Action
*/
namedRouter.post("library.update", '/library/update', uploadFile.any(), libraryController.update);

namedRouter.get("library.create", '/library/create',libraryController.create);
namedRouter.post("library.store", '/library/store', uploadFile.any(),libraryController.store);
namedRouter.get("library.delete", "/library/delete/:id", libraryController.delete);

// Export the express.Router() instance
module.exports = router;
