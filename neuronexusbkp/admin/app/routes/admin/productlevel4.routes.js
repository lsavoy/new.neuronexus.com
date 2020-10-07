const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const productLevel4Controller = require('product_level4/controllers/productlevel4.controller');
const multer = require('multer');


const request_param = multer();

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./public/uploads/product");
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({
    storage: Storage
});

namedRouter.all('/product-*', auth.authenticate);

namedRouter.post("admin.level4.product.getall", '/product-level4/getall', async (req, res) => {
    try {
        const success = await productLevel4Controller.getAll(req, res);
        res.send({
            "meta": success.meta,
            "data": success.data
        });
    } catch (error) {
        res.status(error.status).send(error);
    }
});

namedRouter.get("admin.level4.product.list", '/product-level4/list', productLevel4Controller.list);
namedRouter.get("admin.level4.product.create", '/product-level4/create', productLevel4Controller.create);
namedRouter.post("admin.level4.product.insert", '/product-level4/insert', uploadFile.any(), productLevel4Controller.insert);
namedRouter.get("admin.level4.product.edit", "/product-level4/edit/:id", productLevel4Controller.edit);
namedRouter.post("admin.level4.product.update", '/product-level4/update', uploadFile.any(), productLevel4Controller.update);
namedRouter.get("admin.level4.product.delete", "/product-level4/delete/:id", productLevel4Controller.delete);
namedRouter.get("admin.level4.product.statusChange", '/product-level4/status-change/:id', request_param.any(), productLevel4Controller.statusChange);


module.exports = router;
