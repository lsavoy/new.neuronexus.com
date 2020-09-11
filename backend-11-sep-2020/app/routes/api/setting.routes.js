const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const request_param = multer();
const settingController = require('webservice/setting.controller');


/**
 * @api {get} /setting/all All Setting
 * @apiVersion 1.0.0
 * @apiGroup Setting
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "setting_name": "Site Email",
            "setting_slug": "site-email",
            "setting_value": "pranab.roy@webskitters.com",
            "status": "Active",
            "isDeleted": false,
            "_id": "5e32df67506ae6a1977cdec9"
        },
        {
            "setting_name": "Phone",
            "setting_slug": "phone",
            "setting_value": "9876543210",
            "status": "Active",
            "isDeleted": false,
            "_id": "5e32df74506ae6a1977cdf0e"
        },
        {
            "setting_name": "Contactus Email",
            "setting_slug": "contactus-email",
            "setting_value": "contactus@yopmail.com",
            "status": "Active",
            "isDeleted": false,
            "_id": "5e4fa95b8c7cf06b5266c891"
        }
    ],
    "message": "Setting Data fetched Successfully"
}
*/
namedRouter.get("api.setting.all", '/setting/all', async (req, res) => {
    try {
        const success = await settingController.getAllSetting(req);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error.message);
    }
});


module.exports = router;