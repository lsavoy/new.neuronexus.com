const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const electrode_arraysController = require('technology/controllers/electrode_arrays.controller');
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

namedRouter.all('/technology_electrode_arrays*', auth.authenticate);




namedRouter.post("admin.technology_electrode_arrays.getall", '/technology_electrode_arrays/getall', async (req, res) => {
    try {
        const success = await electrode_arraysController.getAll(req, res);
        res.send({
            "meta": success.meta,
            "data": success.data
        });
    } catch (error) {
        res.status(error.status).send(error);
    }
});

namedRouter.get("admin.technology_electrode_arrays.list", '/technology_electrode_arrays/list', electrode_arraysController.list);
namedRouter.get("admin.technology_electrode_arrays.create", '/technology_electrode_arrays/create', electrode_arraysController.create);
namedRouter.post("admin.technology_electrode_arrays.insert", '/technology_electrode_arrays/insert', uploadFile.any(), electrode_arraysController.insert);
namedRouter.get("admin.technology_electrode_arrays.edit", "/technology_electrode_arrays/edit/:id", electrode_arraysController.edit);
namedRouter.post("admin.technology_electrode_arrays.update", '/technology_electrode_arrays/update', uploadFile.any(), electrode_arraysController.update);
namedRouter.get("admin.technology_electrode_arrays.delete", "/technology_electrode_arrays/delete/:id", electrode_arraysController.delete);
namedRouter.get("admin.technology_electrode_arrays.statusChange", '/technology_electrode_arrays/status-change/:id', request_param.any(), electrode_arraysController.statusChange);



module.exports = router;