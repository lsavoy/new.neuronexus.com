const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const scienceController = require('science/controllers/science.controller');
const multer = require('multer');


const request_param = multer();

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./public/uploads/science");
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({
    storage: Storage
});



namedRouter.all('/science_menu*', auth.authenticate);




namedRouter.post("admin.science_menu.getall", '/science_menu/getall', async (req, res) => {
    try {
        const success = await scienceController.getAll(req, res);
        res.send({
            "meta": success.meta,
            "data": success.data
        });
    } catch (error) {
        res.status(error.status).send(error);
    }
});

namedRouter.get("admin.science_menu.list", '/science_menu/list', scienceController.list);
namedRouter.get("admin.science_menu.create", '/science_menu/create', scienceController.create);
namedRouter.post("admin.science_menu.insert", '/science_menu/insert', uploadFile.any(), scienceController.insert);
namedRouter.get("admin.science_menu.edit", "/science_menu/edit/:id", scienceController.edit);
namedRouter.post("admin.science_menu.update", '/science_menu/update', uploadFile.any(), scienceController.update);
namedRouter.get("admin.science_menu.delete", "/science_menu/delete/:id", scienceController.delete);
namedRouter.get("admin.science_menu.statusChange", '/science_menu/status-change/:id', request_param.any(), scienceController.statusChange);



module.exports = router;