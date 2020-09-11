const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const supportController = require('support/controllers/support.controller');
const multer = require('multer');


const request_param = multer();

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./public/uploads/support");
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({
    storage: Storage
});

namedRouter.all('/support_static*', auth.authenticate);

namedRouter.get("admin.support_static.edit", '/support_static/edit/', supportController.editsupport_static);
namedRouter.post("admin.support_static.update", '/support_static/update', uploadFile.any(), supportController.updatesupport_static);


namedRouter.all('/support_category*', auth.authenticate);




namedRouter.post("admin.support_category.getall", '/support_category/getall', async (req, res) => {
    try {
        const success = await supportController.getAll(req, res);
        res.send({
            "meta": success.meta,
            "data": success.data
        });
    } catch (error) {
        res.status(error.status).send(error);
    }
});

namedRouter.get("admin.support_category.list", '/support_category/list', supportController.list);
namedRouter.get("admin.support_category.create", '/support_category/create', supportController.create);
namedRouter.post("admin.support_category.insert", '/support_category/insert', uploadFile.any(), supportController.insert);
namedRouter.get("admin.support_category.edit", "/support_category/edit/:id", supportController.edit);
namedRouter.post("admin.support_category.update", '/support_category/update', uploadFile.any(), supportController.update);
namedRouter.get("admin.support_category.delete", "/support_category/delete/:id", supportController.delete);
namedRouter.get("admin.support_category.statusChange", '/support_category/status-change/:id', request_param.any(), supportController.statusChange);



module.exports = router;