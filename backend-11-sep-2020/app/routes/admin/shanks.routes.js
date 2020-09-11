const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const shanksController = require('shanks/controllers/shanks.controller');
const multer = require('multer');
const Storage = multer.diskStorage({
	destination: (req, file, callback) => {
		if (file.fieldname === 'image') {
			callback(null, "./public/uploads/shanks")
		}		
	},
	filename: (req, file, callback) => {
		callback(null, Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
	}
});

const uploadFile = multer({storage: Storage});


const request_param = multer();

namedRouter.all('/shanks*', auth.authenticate);




namedRouter.post("admin.shanks.getall", '/shanks/getall', async (req, res) => {
    try {
        const success = await shanksController.getAll(req, res);
        res.send({
            "meta": success.meta,
            "data": success.data
        });
    } catch (error) {
        res.status(error.status).send(error);
    }
});

namedRouter.get("admin.shanks.list", '/shanks/list', shanksController.list);
namedRouter.get("admin.shanks.create", '/shanks/create',shanksController.create);
namedRouter.post("admin.shanks.store", '/shanks/store', uploadFile.any(),shanksController.store);
namedRouter.get("admin.shanks.edit", "/shanks/edit/:id", shanksController.edit);
namedRouter.post("admin.shanks.update", '/shanks/update',  uploadFile.any(),shanksController.update);
namedRouter.get("admin.shanks.delete", "/shanks/delete/:id", shanksController.delete);
namedRouter.get("admin.shanks.statusChange", '/shanks/status-change/:id',request_param.any(), shanksController.statusChange);




module.exports = router;