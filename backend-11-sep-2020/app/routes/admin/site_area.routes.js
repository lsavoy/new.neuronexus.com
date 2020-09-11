const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const siteAreacontroller = require('site_area/controllers/site_area.controller');
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

namedRouter.all('/site-area*', auth.authenticate);




namedRouter.post("admin.site-area.getall", '/site-area/getall', async (req, res) => {
    try {
        const success = await siteAreacontroller.getAll(req, res);
        res.send({
            "meta": success.meta,
            "data": success.data
        });
    } catch (error) {
        res.status(error.status).send(error);
    }
});

namedRouter.get("admin.site-area.list", '/site-area/list', siteAreacontroller.list);
namedRouter.get("admin.site-area.create", '/site-area/create',siteAreacontroller.create);
namedRouter.post("admin.site-area.store", '/site-area/store', uploadFile.any(),siteAreacontroller.store);
namedRouter.get("admin.site-area.edit", "/site-area/edit/:id", siteAreacontroller.edit);
namedRouter.post("admin.site-area.update", '/site-area/update',  uploadFile.any(),siteAreacontroller.update);
namedRouter.get("admin.site-area.delete", "/site-area/delete/:id", siteAreacontroller.delete);
namedRouter.get("admin.site-area.statusChange", '/site-area/status-change/:id',request_param.any(), siteAreacontroller.statusChange);




module.exports = router;