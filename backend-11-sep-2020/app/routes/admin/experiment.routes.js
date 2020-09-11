const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const experimentController = require('experiment/controllers/experiment.controller');
const multer = require('multer');
const Storage = multer.diskStorage({
	destination: (req, file, callback) => {
		if (file.fieldname === 'image') {
			callback(null, "./public/uploads/experiment")
		}		
	},
	filename: (req, file, callback) => {
		callback(null, Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
	}
});

const uploadFile = multer({storage: Storage});


const request_param = multer();

namedRouter.all('/experiment*', auth.authenticate);




namedRouter.post("admin.experiment.getall", '/experiment/getall', async (req, res) => {
    try {
        const success = await experimentController.getAll(req, res);
        res.send({
            "meta": success.meta,
            "data": success.data
        });
    } catch (error) {
        res.status(error.status).send(error);
    }
});

namedRouter.get("admin.experiment.list", '/experiment/list', experimentController.list);
namedRouter.get("admin.experiment.create", '/experiment/create',experimentController.create);
namedRouter.post("admin.experiment.store", '/experiment/store', uploadFile.any(),experimentController.store);
namedRouter.get("admin.experiment.edit", "/experiment/edit/:id", experimentController.edit);
namedRouter.post("admin.experiment.update", '/experiment/update',  uploadFile.any(),experimentController.update);
namedRouter.get("admin.experiment.delete", "/experiment/delete/:id", experimentController.delete);
namedRouter.get("admin.experiment.statusChange", '/experiment/status-change/:id',request_param.any(), experimentController.statusChange);




module.exports = router;