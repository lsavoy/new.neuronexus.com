const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const categoryController = require('science_update/controllers/category.controller');
const multer = require('multer');


const request_param = multer();

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./public/uploads/science_category");
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({
    storage: Storage
});

namedRouter.all('/science_category*', auth.authenticate);




namedRouter.post("admin.science_category.getall", '/science_category/getall', async (req, res) => {
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

namedRouter.get("admin.science_category.list", '/science_category/list', categoryController.list);
namedRouter.get("admin.science_category.create", '/science_category/create', categoryController.create);
namedRouter.post("admin.science_category.insert", '/science_category/insert', uploadFile.any(), categoryController.insert);
namedRouter.get("admin.science_category.edit", "/science_category/edit/:id", categoryController.edit);
namedRouter.post("admin.science_category.update", '/science_category/update', uploadFile.any(), categoryController.update);
namedRouter.get("admin.science_category.delete", "/science_category/delete/:id", categoryController.delete);
namedRouter.get("admin.science_category.statusChange", '/science_category/status-change/:id', request_param.any(), categoryController.statusChange);



module.exports = router;