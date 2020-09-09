const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const knowledgeCenterController = require('knowledge_center/controllers/knowledgecenter.controller');
// const auth = require("../../middlewares/auth")();

const multer = require('multer');
const request_param = multer();

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./public/uploads/knowledge_center/");
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({
    storage: Storage
});

namedRouter.all('/knowledge-center*', auth.authenticate);

//Listing
namedRouter.get("admin.knowledgecenter.list", '/knowledge-center/list', knowledgeCenterController.list);

// Knowledge Center Get All Route
namedRouter.post("admin.knowledgecenter.getall", '/knowledge-center/getall', async (req, res) => {
  try {
      const success = await knowledgeCenterController.getAll(req, res);
      res.send({
          "meta": success.meta,
          "data": success.data
      });
  } catch (error) {
      res.status(error.status).send(error);
  }
});

namedRouter.get("admin.knowledgecenter.create", '/knowledge-center/create', knowledgeCenterController.create);
namedRouter.post("admin.knowledgecenter.insert", '/knowledge-center/insert', uploadFile.any(), knowledgeCenterController.insert);
namedRouter.get("admin.knowledgecenter.edit", "/knowledge-center/edit/:id", knowledgeCenterController.edit);
namedRouter.post("admin.knowledgecenter.update", '/knowledge-center/update', uploadFile.any(), knowledgeCenterController.update);
namedRouter.get("admin.knowledgecenter.delete", "/knowledge-center/delete/:id", knowledgeCenterController.delete);
namedRouter.get("admin.knowledgecenter.statusChange", '/knowledge-center/status-change/:id', request_param.any(), knowledgeCenterController.statusChange);

module.exports = router;