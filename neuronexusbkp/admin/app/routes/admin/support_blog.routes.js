const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const blogController = require('support/controllers/blog.controller');
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

namedRouter.all('/support_blog*', auth.authenticate);




namedRouter.post("admin.support_blog.getall", '/support_blog/getall', async (req, res) => {
    try {
        const success = await blogController.getAll(req, res);
        res.send({
            "meta": success.meta,
            "data": success.data
        });
    } catch (error) {
        res.status(error.status).send(error);
    }
});

namedRouter.get("admin.support_blog.list", '/support_blog/list', blogController.list);
namedRouter.get("admin.support_blog.create", '/support_blog/create', blogController.create);
namedRouter.post("admin.support_blog.insert", '/support_blog/insert', uploadFile.any(), blogController.insert);
namedRouter.get("admin.support_blog.edit", "/support_blog/edit/:id", blogController.edit);
namedRouter.post("admin.support_blog.update", '/support_blog/update', uploadFile.any(), blogController.update);
namedRouter.get("admin.support_blog.delete", "/support_blog/delete/:id", blogController.delete);
namedRouter.get("admin.support_blog.statusChange", '/support_blog/status-change/:id', request_param.any(), blogController.statusChange);



module.exports = router;