const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const softwarevideosController = require('softwarevideos/controllers/softwarevideos.controller');
const multer = require('multer');


const request_param = multer();

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./public/uploads/softwarevideos");
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({
    storage: Storage
});


namedRouter.all('/softwarevideos*', auth.authenticate);




namedRouter.post("admin.softwarevideos.getall", '/softwarevideos/getall', async (req, res) => {
    try {
        const success = await softwarevideosController.getAll(req, res);
        res.send({
            "meta": success.meta,
            "data": success.data
        });
    } catch (error) {
        res.status(error.status).send(error);
    }
});

namedRouter.get("admin.softwarevideos.list", '/softwarevideos/list', softwarevideosController.list);
namedRouter.get("admin.softwarevideos.create", '/softwarevideos/create', softwarevideosController.create);
namedRouter.post("admin.softwarevideos.insert", '/softwarevideos/insert', uploadFile.any(), softwarevideosController.insert);
namedRouter.get("admin.softwarevideos.edit", "/softwarevideos/edit/:id", softwarevideosController.edit);
namedRouter.post("admin.softwarevideos.update", '/softwarevideos/update', uploadFile.any(), softwarevideosController.update);
namedRouter.get("admin.softwarevideos.delete", "/softwarevideos/delete/:id", softwarevideosController.delete);
namedRouter.get("admin.softwarevideos.statusChange", '/softwarevideos/status-change/:id', request_param.any(), softwarevideosController.statusChange);



module.exports = router;