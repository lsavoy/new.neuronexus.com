const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const siteLayoutcontroller = require('site_layout/controllers/site_layout.controller');
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

namedRouter.all('/site-layout*', auth.authenticate);




namedRouter.post("admin.site-layout.getall", '/site-layout/getall', async (req, res) => {
    try {
        const success = await siteLayoutcontroller.getAll(req, res);
        res.send({
            "meta": success.meta,
            "data": success.data
        });
    } catch (error) {
        res.status(error.status).send(error);
    }
});

namedRouter.get("admin.site-layout.list", '/site-layout/list', siteLayoutcontroller.list);
namedRouter.get("admin.site-layout.create", '/site-layout/create',siteLayoutcontroller.create);
namedRouter.post("admin.site-layout.store", '/site-layout/store', uploadFile.any(),siteLayoutcontroller.store);
namedRouter.get("admin.site-layout.edit", "/site-layout/edit/:id", siteLayoutcontroller.edit);
namedRouter.post("admin.site-layout.update", '/site-layout/update',  uploadFile.any(),siteLayoutcontroller.update);
namedRouter.get("admin.site-layout.delete", "/site-layout/delete/:id", siteLayoutcontroller.delete);
namedRouter.get("admin.site-layout.statusChange", '/site-layout/status-change/:id',request_param.any(), siteLayoutcontroller.statusChange);




module.exports = router;