const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const contactUsController = require('webservice/contactus.controller');
const request_param = multer();


/**
 * @api {post} /contactus/form/save Contact Us Form
 * @apiVersion 1.0.0
 * @apiGroup ContactUs
 * @apiParam {String} name Name
 * @apiParam {String} subject Subject
 * @apiParam {String} email_id Email
 * @apiParam {String} message Message
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": {
        "name": "test",
        "phone": "7665725",
        "email": "abc@gmail.com",
        "message": "hello",
        "isDeleted": false,
        "status": "Active",
        "_id": "5da6cd1203ef4f0b8c7da30d",
        "createdAt": "2019-10-16T07:56:02.869Z",
        "__v": 0
    },
    "message": "Contact Us form submitted successfully."
}
*/
namedRouter.post("api.contact.form.save", '/contactus/form/save', request_param.any(), async (req, res) => {
    try {
        const success = await contactUsController.contactusformSave(req);
        res.status(success.status).send(success);
    }
    catch (error) {
        res.status(error.status).send(error);
    }
});

/**
 * @api {get} /contact/staticinfo Contact Static Contents
 * @apiVersion 1.0.0
 * @apiGroup ContactUs
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": {
        "title_h2": "NeuroNexus",
        "title_h3": "Contact",
        "content": "<h3>IMPORTANT:</h3>\r\n\r\n<p>NeuroNexus uses Netsuite as our email ticket system. You should receive an automatic response from our system when you email us. If you do not receive an acknowledgement, please check your spam filter and and make sure that messages from netsuite.com are allowed.</p>\r\n\r\n<p>If you are located in China or Japan, please contact our distributors directly.</p>\r\n",
        "isDeleted": false,
        "status": "Active",
        "_id": "5ecd3a76c7d64cd82ba89c9e",
        "updatedAt": "2020-05-26T15:58:52.804Z"
    },
    "message": "Record fetched Successfully"
}
*/



namedRouter.get("api.contact.staticinfo", '/contact/staticinfo', async (req, res) => {
    try {
        const success = await contactUsController.getcontactStatic(req);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error.message);
    }
});

module.exports = router;