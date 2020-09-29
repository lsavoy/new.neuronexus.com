const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const productController = require('product_category/controllers/category.controller');
const multer = require('multer');


const request_param = multer();

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if (file.fieldname == 'image' || file.fieldname == 'header_banner_image' || file.fieldname == 'catalog_image') {
            callback(null, "./public/uploads/product");
        } else if (file.fieldname == 'brochures_file' || file.fieldname == 'catalog_file') {
            callback(null, "./public/uploads/catalogs");
        }
        else {
            callback(null, "./public/uploads/product/dDrive");
        }
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({
    storage: Storage
});

namedRouter.all('/product*', auth.authenticate);


namedRouter.get("admin.product.editstatic", '/product/editstatic/', productController.editproduct_static_contents);
namedRouter.post("admin.product.updatestatic", '/product/updatestatic', uploadFile.any(), productController.updateproduct_static_contents);


namedRouter.post("admin.product.getall", '/product/getall', async (req, res) => {
    try {
        const success = await productController.getAll(req, res);
        res.send({
            "meta": success.meta,
            "data": success.data
        });
    } catch (error) {
        res.status(error.status).send(error);
    }
});

namedRouter.get("admin.product.list", '/product/list', productController.list);
namedRouter.get("admin.product.create", '/product/create', productController.create);
namedRouter.post("admin.product.insert", '/product/insert', uploadFile.any(), productController.insert);
namedRouter.get("admin.product.edit", "/product/edit/:id", productController.edit);
namedRouter.post("admin.product.update", '/product/update', uploadFile.any(), productController.update);
namedRouter.get("admin.product.delete", "/product/delete/:id", productController.delete);
namedRouter.get("admin.product.statusChange", '/product/status-change/:id', request_param.any(), productController.statusChange);
namedRouter.get("admin.product.catelog", "/product/catelog", productController.catalogCreate);
namedRouter.post("admin.product.catelog-update", '/product/catelog/update', uploadFile.any(), productController.catalogupdate);



module.exports = router;
