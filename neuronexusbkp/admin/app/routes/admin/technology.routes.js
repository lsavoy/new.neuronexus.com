const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const technologyController = require('technology/controllers/technology.controller');
const multer = require('multer');


const request_param = multer();

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./public/uploads/technology");
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({
    storage: Storage
});

namedRouter.all('/technology_static*', auth.authenticate);

namedRouter.get("admin.technology_static.edit", '/technology_static/edit/', technologyController.edittechnology_static);
namedRouter.post("admin.technology_static.update", '/technology_static/update', uploadFile.any(), technologyController.updatetechnology_static);


namedRouter.all('/technology_category*', auth.authenticate);




namedRouter.post("admin.technology_category.getall", '/technology_category/getall', async (req, res) => {
    try {
        const success = await technologyController.getAll(req, res);
        res.send({
            "meta": success.meta,
            "data": success.data
        });
    } catch (error) {
        res.status(error.status).send(error);
    }
});

namedRouter.get("admin.technology_category.list", '/technology_category/list', technologyController.list);
namedRouter.get("admin.technology_category.create", '/technology_category/create', technologyController.create);
namedRouter.post("admin.technology_category.insert", '/technology_category/insert', uploadFile.any(), technologyController.insert);
namedRouter.get("admin.technology_category.edit", "/technology_category/edit/:id", technologyController.edit);
namedRouter.post("admin.technology_category.update", '/technology_category/update', uploadFile.any(), technologyController.update);
namedRouter.get("admin.technology_category.delete", "/technology_category/delete/:id", technologyController.delete);
namedRouter.get("admin.technology_category.statusChange", '/technology_category/status-change/:id', request_param.any(), technologyController.statusChange);



module.exports = router;