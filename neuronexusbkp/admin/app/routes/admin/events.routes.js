const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const eventsController = require('events/controllers/events.controller');
const multer = require('multer');


const request_param = multer();

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./public/uploads/events");
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({
    storage: Storage
});

namedRouter.all('/events_update*', auth.authenticate);
namedRouter.get("admin.events_update.editstatic", '/events_update/editstatic/', eventsController.editevents_static_contents);
namedRouter.post("admin.events_update.updatestatic", '/events_update/updatestatic', uploadFile.any(), eventsController.updateevents_static_contents);


namedRouter.all('/events*', auth.authenticate);




namedRouter.post("admin.events.getall", '/events/getall', async (req, res) => {
    try {
        const success = await eventsController.getAll(req, res);
        res.send({
            "meta": success.meta,
            "data": success.data
        });
    } catch (error) {
        res.status(error.status).send(error);
    }
});

namedRouter.get("admin.events.list", '/events/list', eventsController.list);
namedRouter.get("admin.events.create", '/events/create', eventsController.create);
namedRouter.post("admin.events.insert", '/events/insert', request_param.any(), eventsController.insert);
namedRouter.get("admin.events.edit", "/events/edit/:id", eventsController.edit);
namedRouter.post("admin.events.update", '/events/update', request_param.any(), eventsController.update);
namedRouter.get("admin.events.delete", "/events/delete/:id", eventsController.delete);
namedRouter.get("admin.events.statusChange", '/events/status-change/:id', request_param.any(), eventsController.statusChange);



module.exports = router;