const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const probeFinderController = require('probe_finder/controllers/probe_finder.controller');
const multer = require('multer');
const Storage = multer.diskStorage({
	destination: (req, file, callback) => {
		if (file.fieldname === 'image') {
			callback(null, "./public/uploads/probeFinder")
		}		
	},
	filename: (req, file, callback) => {
		callback(null, Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
	}
});

const uploadFile = multer({storage: Storage});


const request_param = multer();

namedRouter.all('/probe-finder*', auth.authenticate);




namedRouter.post("admin.probe-finder.getall", '/probe-finder/getall', async (req, res) => {
    try {
        const success = await probeFinderController.getAll(req, res);
        res.send({
            "meta": success.meta,
            "data": success.data
        });
    } catch (error) {
        res.status(error.status).send(error);
    }
});

namedRouter.get("admin.probe-finder.list", '/probe-finder/list', probeFinderController.list);
namedRouter.get("admin.probe-finder.create", '/probe-finder/create',probeFinderController.create);
namedRouter.post("admin.probe-finder.store", '/probe-finder/store', uploadFile.any(),probeFinderController.store);
namedRouter.get("admin.probe-finder.edit", "/probe-finder/edit/:id", probeFinderController.edit);
namedRouter.post("admin.probe-finder.update", '/probe-finder/update',  uploadFile.any(),probeFinderController.update);
namedRouter.get("admin.probe-finder.delete", "/probe-finder/delete/:id", probeFinderController.delete);
namedRouter.get("admin.probe-finder.statusChange", '/probe-finder/status-change/:id',request_param.any(), probeFinderController.statusChange);




module.exports = router;