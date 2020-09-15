const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');

const multer = require('multer');
const videoCarouselController = require('video_carousel/controllers/videocarousel.controller');

const Storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "./public/uploads/videoCarousel");
	},
	filename: (req, file, callback) => {
		callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
	}
});

const uploadFile = multer({
	storage: Storage
});
const request_param = multer();

namedRouter.all('/video_carousel*', auth.authenticate);

/*
// @Route: setting List
*/
namedRouter.get("video_carousel.list", '/video_carousel/list', videoCarouselController.list);


namedRouter.post("video_carousel.getall", '/video_carousel/getall', async (req, res) => {
	try {
		const success = await videoCarouselController.getAllData(req, res);
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

namedRouter.get("video_carousel.edit", "/video_carousel/edit/:id", videoCarouselController.edit);

/*
// @Route: Update setting Action
*/
namedRouter.post("video_carousel.update", '/video_carousel/update', uploadFile.any(), videoCarouselController.update);

namedRouter.get("video_carousel.create", '/video_carousel/create',videoCarouselController.create);
namedRouter.post("video_carousel.store", '/video_carousel/store', uploadFile.any(), videoCarouselController.store);
namedRouter.get("video_carousel.delete", "/video_carousel/delete/:id", videoCarouselController.delete);
namedRouter.get("video_carousel.statusChange", '/video_carousel/status-change/:id',request_param.any(), videoCarouselController.statusChange);

// Export the express.Router() instance
module.exports = router;
