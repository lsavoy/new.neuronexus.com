const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const channelsController = require('channels/controllers/channels.controller');
const multer = require('multer');
const Storage = multer.diskStorage({
	destination: (req, file, callback) => {
		if (file.fieldname === 'image') {
			callback(null, "./public/uploads/channels")
		}		
	},
	filename: (req, file, callback) => {
		callback(null, Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
	}
});

const uploadFile = multer({storage: Storage});


const request_param = multer();

namedRouter.all('/channels*', auth.authenticate);




namedRouter.post("admin.channels.getall", '/channels/getall', async (req, res) => {
    try {
        const success = await channelsController.getAll(req, res);
        res.send({
            "meta": success.meta,
            "data": success.data
        });
    } catch (error) {
        res.status(error.status).send(error);
    }
});

namedRouter.get("admin.channels.list", '/channels/list', channelsController.list);
namedRouter.get("admin.channels.create", '/channels/create',channelsController.create);
namedRouter.post("admin.channels.store", '/channels/store', uploadFile.any(),channelsController.store);
namedRouter.get("admin.channels.edit", "/channels/edit/:id", channelsController.edit);
namedRouter.post("admin.channels.update", '/channels/update',  uploadFile.any(),channelsController.update);
namedRouter.get("admin.channels.delete", "/channels/delete/:id", channelsController.delete);
namedRouter.get("admin.channels.statusChange", '/channels/status-change/:id',request_param.any(), channelsController.statusChange);




module.exports = router;