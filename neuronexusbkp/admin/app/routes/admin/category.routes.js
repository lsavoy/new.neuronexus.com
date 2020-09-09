const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const categoryController = require('category/controllers/category.controller');
const multer = require('multer');
const Storage = multer.diskStorage({
	destination: (req, file, callback) => {
		if (file.fieldname === 'image') {
			callback(null, "./public/uploads/category")
		}		
	},
	filename: (req, file, callback) => {
		callback(null, Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
	}
});

const uploadFile = multer({storage: Storage});


const request_param = multer();

namedRouter.all('/category*', auth.authenticate);




namedRouter.post("admin.category.getall", '/category/getall', async (req, res) => {
    try {
        const success = await categoryController.getAll(req, res);
        res.send({
            "meta": success.meta,
            "data": success.data
        });
    } catch (error) {
        res.status(error.status).send(error);
    }
});

namedRouter.get("admin.category.list", '/category/list', categoryController.list);
namedRouter.get("admin.category.create", '/category/create',categoryController.create);
namedRouter.post("admin.category.store", '/category/store', uploadFile.any(),categoryController.store);
namedRouter.get("admin.category.edit", "/category/edit/:id", categoryController.edit);
namedRouter.post("admin.category.update", '/category/update',  uploadFile.any(),categoryController.update);
namedRouter.get("admin.category.delete", "/category/delete/:id", categoryController.delete);
namedRouter.get("admin.category.statusChange", '/category/status-change/:id',request_param.any(), categoryController.statusChange);




module.exports = router;