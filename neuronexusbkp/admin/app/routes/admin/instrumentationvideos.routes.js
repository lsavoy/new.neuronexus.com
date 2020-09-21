const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const instrumentationvideosController = require('instrumentationvideos/controllers/instrumentationvideos.controller');
const multer = require('multer');


const request_param = multer();

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./public/uploads/instrumentationvideos");
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({
    storage: Storage
});


namedRouter.all('/instrumentationvideos*', auth.authenticate);




namedRouter.post("admin.instrumentationvideos.getall", '/instrumentationvideos/getall', async (req, res) => {
    try {
        const success = await instrumentationvideosController.getAll(req, res);
        res.send({
            "meta": success.meta,
            "data": success.data
        });
    } catch (error) {
        res.status(error.status).send(error);
    }
});

namedRouter.get("admin.instrumentationvideos.list", '/instrumentationvideos/list', instrumentationvideosController.list);
namedRouter.get("admin.instrumentationvideos.create", '/instrumentationvideos/create', instrumentationvideosController.create);
namedRouter.post("admin.instrumentationvideos.insert", '/instrumentationvideos/insert', uploadFile.any(), instrumentationvideosController.insert);
namedRouter.get("admin.instrumentationvideos.edit", "/instrumentationvideos/edit/:id", instrumentationvideosController.edit);
namedRouter.post("admin.instrumentationvideos.update", '/instrumentationvideos/update', uploadFile.any(), instrumentationvideosController.update);
namedRouter.get("admin.instrumentationvideos.delete", "/instrumentationvideos/delete/:id", instrumentationvideosController.delete);
namedRouter.get("admin.instrumentationvideos.statusChange", '/instrumentationvideos/status-change/:id', request_param.any(), instrumentationvideosController.statusChange);



module.exports = router;