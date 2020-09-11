const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const scienceController = require('science_update/controllers/science.controller');
const multer = require('multer');


const request_param = multer();

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./public/uploads/science_update");
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({
    storage: Storage
});

namedRouter.all('/science_update*', auth.authenticate);

namedRouter.get("admin.science_update.editstatic", '/science_update/editstatic/', scienceController.editscience_static_contents);
namedRouter.post("admin.science_update.updatestatic", '/science_update/updatestatic', uploadFile.any(), scienceController.updatescience_static_contents);




namedRouter.post("admin.science_update.getall", '/science_update/getall', async (req, res) => {
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

namedRouter.get("admin.science_update.list", '/science_update/list', scienceController.list);
namedRouter.get("admin.science_update.create", '/science_update/create', scienceController.create);
namedRouter.post("admin.science_update.insert", '/science_update/insert', uploadFile.any(), scienceController.insert);
namedRouter.get("admin.science_update.edit", "/science_update/edit/:id", scienceController.edit);
namedRouter.post("admin.science_update.update", '/science_update/update', uploadFile.any(), scienceController.update);
namedRouter.get("admin.science_update.delete", "/science_update/delete/:id", scienceController.delete);
namedRouter.get("admin.science_update.statusChange", '/science_update/status-change/:id', request_param.any(), scienceController.statusChange);



module.exports = router;