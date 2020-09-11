const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');
const multer = require('multer');
const userController = require('user/controllers/user.controller');

const Storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "./public/uploads/user");

	},
	filename: (req, file, callback) => {
		callback(null, Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
	}
});

const uploadFile = multer({ storage: Storage });
const request_param = multer();


// login render route
namedRouter.get('user.login', '/', userController.login);

// login process route
namedRouter.post("user.login.process", '/login', userController.signin);

/*
// @Route: Users Forgotpassowrd [Admin]
*/
namedRouter.post('admin.user.forgotPassword', '/user/forgotpassword', request_param.any(), userController.forgotPassword);

namedRouter.get('user.logout', "/logout", userController.logout);

namedRouter.all('/*', auth.authenticate);

/*
// @Route: Users Dashboard [Admin]
*/
// dashboard route
namedRouter.get("user.dashboard", '/dashboard', userController.dashboard);

namedRouter.get("admin.profile", '/profile/:id', request_param.any(), userController.viewmyprofile);

// admin update profile
namedRouter.post("admin.updateProfile", '/update/profile', uploadFile.any(), userController.updateprofile);

// admin change Password
namedRouter.get("admin.changepassword", '/change/password', userController.adminChangePassword);

/*
// @Route: Chnage password [Admin] action
*/
namedRouter.post("admin.updateAdminPassword", '/update/admin-password', request_param.any(), userController.adminUpdatePassword);

// User List
namedRouter.get("user.listing", '/user/listing', userController.list);

// Get All Users
namedRouter.post("user.getall", '/user/getall', async (req, res) => {
	try {
		const success = await userController.getAllUser(req, res);
		res.send({
			"meta": success.meta,
			"data": success.data
		});
	} catch (error) {
		res.status(error.status).send(error);
	}
});



namedRouter.get("user.create", '/user/create', userController.create);

namedRouter.post("user.insert", '/user/insert', request_param.any(), userController.insert);


// User Edit Route
namedRouter.get("user.edit", "/user/edit/:id", userController.edit);

// User Update Route
namedRouter.post("user.update", '/user/update', request_param.any(), userController.update);

// User Delete Route
namedRouter.get("user.delete", "/user/delete/:id", userController.delete);

namedRouter.get("user.statusChange", '/user/status-change/:id', request_param.any(), userController.statusChange);

// Export the express.Router() instance
module.exports = router;