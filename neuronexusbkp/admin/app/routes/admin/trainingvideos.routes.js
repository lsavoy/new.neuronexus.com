const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const trainingvideosController = require('trainingvideos/controllers/trainingvideos.controller');
const multer = require('multer');


const request_param = multer();

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./public/uploads/trainingvideos");
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({
    storage: Storage
});


namedRouter.all('/trainingvideos*', auth.authenticate);




namedRouter.post("admin.trainingvideos.getall", '/trainingvideos/getall', async (req, res) => {
    try {
        const success = await trainingvideosController.getAll(req, res);
        res.send({
            "meta": success.meta,
            "data": success.data
        });
    } catch (error) {
        res.status(error.status).send(error);
    }
});

namedRouter.get("admin.trainingvideos.list", '/trainingvideos/list', trainingvideosController.list);
namedRouter.get("admin.trainingvideos.create", '/trainingvideos/create', trainingvideosController.create);
namedRouter.post("admin.trainingvideos.insert", '/trainingvideos/insert', uploadFile.any(), trainingvideosController.insert);
namedRouter.get("admin.trainingvideos.edit", "/trainingvideos/edit/:id", trainingvideosController.edit);
namedRouter.post("admin.trainingvideos.update", '/trainingvideos/update', uploadFile.any(), trainingvideosController.update);
namedRouter.get("admin.trainingvideos.delete", "/trainingvideos/delete/:id", trainingvideosController.delete);
namedRouter.get("admin.trainingvideos.statusChange", '/trainingvideos/status-change/:id', request_param.any(), trainingvideosController.statusChange);



module.exports = router;