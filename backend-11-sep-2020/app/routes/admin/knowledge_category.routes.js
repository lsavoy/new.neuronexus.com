const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const categoryController = require('knowledge_center/controllers/category.controller');
const multer = require('multer');


const request_param = multer();

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./public/uploads/category");
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({
    storage: Storage
});

namedRouter.all('/knowledge_category*', auth.authenticate);




namedRouter.post("admin.knowledge_category.getall", '/knowledge_category/getall', async (req, res) => {
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

namedRouter.get("admin.knowledge_category.list", '/knowledge_category/list', categoryController.list);
namedRouter.get("admin.knowledge_category.create", '/knowledge_category/create', categoryController.create);
namedRouter.post("admin.knowledge_category.insert", '/knowledge_category/insert', uploadFile.any(), categoryController.insert);
namedRouter.get("admin.knowledge_category.edit", "/knowledge_category/edit/:id", categoryController.edit);
namedRouter.post("admin.knowledge_category.update", '/knowledge_category/update', uploadFile.any(), categoryController.update);
namedRouter.get("admin.knowledge_category.delete", "/knowledge_category/delete/:id", categoryController.delete);
namedRouter.get("admin.knowledge_category.statusChange", '/knowledge_category/status-change/:id', request_param.any(), categoryController.statusChange);


/*  Sub Category */

namedRouter.all('/knowledge_subcategory*', auth.authenticate);

namedRouter.post("admin.knowledge_subcategory.getall", '/knowledge_subcategory/getall', async (req, res) => {
    try {
        const success = await categoryController.getAllsubcategory(req, res);
        res.send({
            "meta": success.meta,
            "data": success.data
        });
    } catch (error) {
        res.status(error.status).send(error);
    }
});

namedRouter.get("admin.knowledge_subcategory.list", '/knowledge_subcategory/list', categoryController.listsubcategory);
namedRouter.get("admin.knowledge_subcategory.list-id", '/knowledge_subcategory/list/:id', categoryController.listsubcategory);
namedRouter.get("admin.knowledge_subcategory.create", '/knowledge_subcategory/create', categoryController.createsubcategory);
namedRouter.post("admin.knowledge_subcategory.store", '/knowledge_subcategory/store', uploadFile.any(), categoryController.insertsubcategory);
namedRouter.get("admin.knowledge_subcategory.edit", "/knowledge_subcategory/edit/:id", categoryController.editsubcategory);
namedRouter.post("admin.knowledge_subcategory.update", '/knowledge_subcategory/update', uploadFile.any(), categoryController.updatesubcategory);
namedRouter.get("admin.knowledge_subcategory.delete", "/knowledge_subcategory/delete/:id", categoryController.deletesubcategory);
namedRouter.get("admin.knowledge_subcategory.statusChange", '/knowledge_subcategory/status-change/:id', request_param.any(), categoryController.statusChangesubcategory);

module.exports = router;