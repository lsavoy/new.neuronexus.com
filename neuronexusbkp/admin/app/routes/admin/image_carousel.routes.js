const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');

const multer = require('multer');
const imageCarouselController = require('image_carousel/controllers/imagecarousel.controller');

const Storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "./public/uploads/imageCarousel");
	},
	filename: (req, file, callback) => {
		callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
	}
});

const uploadFile = multer({
	storage: Storage
});
const request_param = multer();

namedRouter.all('/image_carousel*', auth.authenticate);

/*
// @Route: setting List
*/
namedRouter.get("image_carousel.list", '/image_carousel/list', imageCarouselController.list);


namedRouter.post("image_carousel.getall", '/image_carousel/getall', async (req, res) => {
	try {
		const success = await imageCarouselController.getAllData(req, res);
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

namedRouter.get("image_carousel.edit", "/image_carousel/edit/:id", imageCarouselController.edit);

/*
// @Route: Update setting Action
*/
namedRouter.post("image_carousel.update", '/image_carousel/update', uploadFile.any(), imageCarouselController.update);

namedRouter.get("image_carousel.create", '/image_carousel/create',imageCarouselController.create);
namedRouter.post("image_carousel.store", '/image_carousel/store', uploadFile.any(),imageCarouselController.store);
namedRouter.get("image_carousel.delete", "/image_carousel/delete/:id", imageCarouselController.delete);
namedRouter.get("image_carousel.statusChange", '/image_carousel/status-change/:id',request_param.any(), imageCarouselController.statusChange);

// Export the express.Router() instance
module.exports = router;
