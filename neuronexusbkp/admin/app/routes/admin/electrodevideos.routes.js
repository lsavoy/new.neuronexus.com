const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const electrodevideosController = require('electrodevideos/controllers/electrodevideos.controller');
const multer = require('multer');


const request_param = multer();

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./public/uploads/electrodevideos");
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({
    storage: Storage
});


namedRouter.all('/electrodevideos*', auth.authenticate);




namedRouter.post("admin.electrodevideos.getall", '/electrodevideos/getall', async (req, res) => {
    try {
        const success = await electrodevideosController.getAll(req, res);
        res.send({
            "meta": success.meta,
            "data": success.data
        });
    } catch (error) {
        res.status(error.status).send(error);
    }
});

namedRouter.get("admin.electrodevideos.list", '/electrodevideos/list', electrodevideosController.list);
namedRouter.get("admin.electrodevideos.create", '/electrodevideos/create', electrodevideosController.create);
namedRouter.post("admin.electrodevideos.insert", '/electrodevideos/insert', uploadFile.any(), electrodevideosController.insert);
namedRouter.get("admin.electrodevideos.edit", "/electrodevideos/edit/:id", electrodevideosController.edit);
namedRouter.post("admin.electrodevideos.update", '/electrodevideos/update', uploadFile.any(), electrodevideosController.update);
namedRouter.get("admin.electrodevideos.delete", "/electrodevideos/delete/:id", electrodevideosController.delete);
namedRouter.get("admin.electrodevideos.statusChange", '/electrodevideos/status-change/:id', request_param.any(), electrodevideosController.statusChange);



module.exports = router;