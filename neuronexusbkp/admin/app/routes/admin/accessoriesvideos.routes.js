const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const accessoriesvideosController = require('accessoriesvideos/controllers/accessoriesvideos.controller');
const multer = require('multer');


const request_param = multer();

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./public/uploads/accessoriesvideos");
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({
    storage: Storage
});


namedRouter.all('/accessoriesvideos*', auth.authenticate);




namedRouter.post("admin.accessoriesvideos.getall", '/accessoriesvideos/getall', async (req, res) => {
    try {
        const success = await accessoriesvideosController.getAll(req, res);
        res.send({
            "meta": success.meta,
            "data": success.data
        });
    } catch (error) {
        res.status(error.status).send(error);
    }
});

namedRouter.get("admin.accessoriesvideos.list", '/accessoriesvideos/list', accessoriesvideosController.list);
namedRouter.get("admin.accessoriesvideos.create", '/accessoriesvideos/create', accessoriesvideosController.create);
namedRouter.post("admin.accessoriesvideos.insert", '/accessoriesvideos/insert', uploadFile.any(), accessoriesvideosController.insert);
namedRouter.get("admin.accessoriesvideos.edit", "/accessoriesvideos/edit/:id", accessoriesvideosController.edit);
namedRouter.post("admin.accessoriesvideos.update", '/accessoriesvideos/update', uploadFile.any(), accessoriesvideosController.update);
namedRouter.get("admin.accessoriesvideos.delete", "/accessoriesvideos/delete/:id", accessoriesvideosController.delete);
namedRouter.get("admin.accessoriesvideos.statusChange", '/accessoriesvideos/status-change/:id', request_param.any(), accessoriesvideosController.statusChange);



module.exports = router;