const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');
const multer = require('multer');
const ContactController = require('contact/controllers/contact.controller');

const request_param = multer();

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./public/uploads/cms/");
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({
    storage: Storage
});


namedRouter.all('/contact*', auth.authenticate);

namedRouter.get("contact.editcontactstatic", '/contact/editcontactstatic/', ContactController.editcontactstatic);
namedRouter.post("contact.updatecontactstatic", '/contact/updatecontactstatic/', uploadFile.any(), ContactController.updatecontactstatic);


// contact Listing Route
namedRouter.get("contact.list", '/contact/list', ContactController.list);

// contact Get All Route
namedRouter.post("contact.getall", '/contact/getall', async (req, res) => {
    try {
        const success = await ContactController.getAll(req, res);
        res.send({
            "meta": success.meta,
            "data": success.data
        });
    } catch (error) {
        res.status(error.status).send(error);
    }
});

// contact Edit Route
namedRouter.get("contact.view", "/contact/view/:id", ContactController.view);


// Export the express.Router() instance
module.exports = router;