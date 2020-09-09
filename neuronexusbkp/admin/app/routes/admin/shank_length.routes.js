const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const shankLengthController = require('shank_length/controllers/shank_length.controller');
const multer = require('multer');
const Storage = multer.diskStorage({
	destination: (req, file, callback) => {
		if (file.fieldname === 'image') {
			callback(null, "./public/uploads/shank_length")
		}		
	},
	filename: (req, file, callback) => {
		callback(null, Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
	}
});

const uploadFile = multer({storage: Storage});


const request_param = multer();

namedRouter.all('/shank-length*', auth.authenticate);




namedRouter.post("admin.shank-length.getall", '/shank-length/getall', async (req, res) => {
    try {
        const success = await shankLengthController.getAll(req, res);
        res.send({
            "meta": success.meta,
            "data": success.data
        });
    } catch (error) {
        res.status(error.status).send(error);
    }
});

namedRouter.get("admin.shank-length.list", '/shank-length/list', shankLengthController.list);
namedRouter.get("admin.shank-length.create", '/shank-length/create',shankLengthController.create);
namedRouter.post("admin.shank-length.store", '/shank-length/store', uploadFile.any(),shankLengthController.store);
namedRouter.get("admin.shank-length.edit", "/shank-length/edit/:id", shankLengthController.edit);
namedRouter.post("admin.shank-length.update", '/shank-length/update',  uploadFile.any(),shankLengthController.update);
namedRouter.get("admin.shank-length.delete", "/shank-length/delete/:id", shankLengthController.delete);
namedRouter.get("admin.shank-length.statusChange", '/shank-length/status-change/:id',request_param.any(), shankLengthController.statusChange);




module.exports = router;