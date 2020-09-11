const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const testimonialsController = require('science_update/controllers/testimonials.controller');
const multer = require('multer');


const request_param = multer();

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./public/uploads/testimonials");
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({
    storage: Storage
});

namedRouter.all('/science_testimonials*', auth.authenticate);




namedRouter.post("admin.science_testimonials.getall", '/science_testimonials/getall', async (req, res) => {
    try {
        const success = await testimonialsController.getAll(req, res);
        res.send({
            "meta": success.meta,
            "data": success.data
        });
    } catch (error) {
        res.status(error.status).send(error);
    }
});

namedRouter.get("admin.science_testimonials.list", '/science_testimonials/list', testimonialsController.list);
namedRouter.get("admin.science_testimonials.create", '/science_testimonials/create', testimonialsController.create);
namedRouter.post("admin.science_testimonials.insert", '/science_testimonials/insert', uploadFile.any(), testimonialsController.insert);
namedRouter.get("admin.science_testimonials.edit", "/science_testimonials/edit/:id", testimonialsController.edit);
namedRouter.post("admin.science_testimonials.update", '/science_testimonials/update', uploadFile.any(), testimonialsController.update);
namedRouter.get("admin.science_testimonials.delete", "/science_testimonials/delete/:id", testimonialsController.delete);
namedRouter.get("admin.science_testimonials.statusChange", '/science_testimonials/status-change/:id', request_param.any(), testimonialsController.statusChange);



module.exports = router;