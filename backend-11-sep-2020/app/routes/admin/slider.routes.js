const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const sliderController = require('home_slider/controllers/slider.controller');
const multer = require('multer');


const request_param = multer();

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./public/uploads/slider");
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({
    storage: Storage
});

namedRouter.all('/slider*', auth.authenticate);


namedRouter.get("admin.slider.editslidervideo", '/slider/editslidervideo/', sliderController.editslidervideo);
namedRouter.post("admin.slider.updateslidervideo", '/slider/updateslidervideo', uploadFile.any(), sliderController.updateslidervideo);


namedRouter.post("admin.slider.getall", '/slider/getall', async (req, res) => {
    try {
        const success = await sliderController.getAll(req, res);
        res.send({
            "meta": success.meta,
            "data": success.data
        });
    } catch (error) {
        res.status(error.status).send(error);
    }
});

namedRouter.get("admin.slider.list", '/slider/list', sliderController.list);
namedRouter.get("admin.slider.create", '/slider/create', sliderController.create);
namedRouter.post("admin.slider.insert", '/slider/insert', uploadFile.any(), sliderController.insert);
namedRouter.get("admin.slider.edit", "/slider/edit/:id", sliderController.edit);
namedRouter.post("admin.slider.update", '/slider/update', uploadFile.any(), sliderController.update);
namedRouter.get("admin.slider.delete", "/slider/delete/:id", sliderController.delete);
namedRouter.get("admin.slider.statusChange", '/slider/status-change/:id', request_param.any(), sliderController.statusChange);



module.exports = router;