const mongoose = require('mongoose');
const productRepo = require('product_category/repositories/category.repository');
const User = require('user/models/user.model');
const userRepo = require('user/repositories/user.repository');
const roleRepo = require('role/repositories/role.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');
const gm = require('gm').subClass({ imageMagick: true });
const fs = require('fs');
const jwt = require('jsonwebtoken');
const ejs = require('ejs');





class UserController {
    constructor() {
        this.users = [];

    }

    /* @Method: login
    // @Description: user Login Render
    */
    async login(req, res) {
        res.render('user/views/login.ejs');
    };

    /* @Method: signin
    // @Description: user Login
    */
    async signin(req, res) {
        try {
            let userData = await userRepo.fineOneWithRole(req.body);

            if (userData.status == 500) {
                req.flash('error', userData.message);
                return res.redirect(namedRouter.urlFor('user.login'));
            }
            let user = userData.data;
            if (!_.isEmpty(user.role) && (user.role.role == 'admin' || user.role.role == 'user')) {
                const payload = { id: user._id, role: user.role.role };

                let token = jwt.sign(payload, config.jwtSecret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                req.session.token = token;
                req.user = user;
                if (user.role.role == 'user') {
                    let permissionData = await userRepo.getPermissionByField({ user_id: user._id });
                    req.permission = permissionData;
                }
                let user_details = {};
                user_details.id = user._id;
                user_details.name = user.first_name + ' ' + user.last_name;
                user_details.email = user.email;

                // return the information including token as JSON
                req.flash('success', "You have successfully logged in");
                res.redirect(namedRouter.urlFor('user.dashboard'));
            } else {
                req.flash('error', 'Authentication failed. You are not a valid user.');
                res.redirect(namedRouter.urlFor('user.login'));
            }
        } catch (e) {
            throw e;
        }
    };

    /* @Method: create
    // @Description: user create view render
    */
    async create(req, res) {
        try {
            let success = {};
            let role = await roleRepo.getAll({});
            success.data = role;

            res.render('user/views/add.ejs', {
                page_name: 'user-management',
                page_title: 'User Create',
                user: req.user,
                response: success
            });
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /* @Method: insert
   // @Description: save User
   */
    async insert(req, res) {
        try {

            //
            let validate = 0;
            if (req.body.about) {
                req.body.about = true;
                validate = 1;
            }
            else {
                req.body.about = false;
            }
            if (req.body.contact) {
                req.body.contact = true;
                validate = 1;
            }
            else {
                req.body.contact = false;
            }
            if (req.body.knowledge_center) {
                req.body.knowledge_center = true;
                validate = 1;
            }
            else {
                req.body.knowledge_center = false;
            }
            if (req.body.science_update) {
                req.body.science_update = true;
                validate = 1;
            }
            else {
                req.body.science_update = false;
            }
            if (req.body.product) {
                req.body.product = true;
                validate = 1;
            }
            else {
                req.body.product = false;
            }
            if (req.body.support) {
                req.body.support = true;
                validate = 1;
            }
            else {
                req.body.support = false;
            }
            if (req.body.home_slider) {
                req.body.home_slider = true;
                validate = 1;
            }
            else {
                req.body.home_slider = false;
            }
            if (req.body.setting) {
                req.body.setting = true;
                validate = 1;
            }
            else {
                req.body.setting = false;
            }
            if (req.body.probe_finder) {
                req.body.probe_finder = true;
                validate = 1;
            }
            else {
                req.body.probe_finder = false;
            }


            if (validate == 0) {
                req.flash('error', "Please give permission minimum one section.");
                res.redirect(namedRouter.urlFor('user.create'));
                return false;
            }
            //
            let roleDetails = await roleRepo.getByField({ role: "user" });
            if (!_.isEmpty(roleDetails)) {
                req.body.role = roleDetails._id;
            }
            const newUser = new User();

            req.body.password = newUser.generateHash(req.body.password);

            var chk = { isDeleted: false, email: req.body.email };
            let checkEmail = await userRepo.getByField(chk);
            if (!_.isEmpty(checkEmail)) {
                req.flash('error', "Sorry, User already exist with this email.");
                res.redirect(namedRouter.urlFor('user.create'));
            }
            else {
                let SaveUser = await userRepo.save(req.body);
                req.body.user_id = SaveUser._id;

                let permissions = await userRepo.savePermission(req.body);
                req.flash('success', 'User created successfully.');
                res.redirect(namedRouter.urlFor('user.listing'));
            }


        } catch (e) {
            req.flash('error', e.message);
            res.redirect(namedRouter.urlFor('user.create'));
        }
    };


    /* @Method: list
    // @Description: To get all the user from DB
    */
    async list(req, res) {
        try {
            res.render('user/views/list.ejs', {
                page_name: 'user-management',
                page_title: 'User List',
                user: req.user
            });
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };


    /* @Method: getAllUser
    // @Description: To get all the user from DB
    */
    async getAllUser(req, res) {
        try {
            req.body.role = 'user';

            if (_.has(req.body, 'sort')) {
                var sortOrder = req.body.sort.sort;
                var sortField = req.body.sort.field;
            } else {
                var sortOrder = -1;
                var sortField = '_id';
            }

            if (!_.has(req.body, 'pagination')) {
                req.body.pagination.page = 1;
                eq.body.pagination.perpage = config.PAGINATION_PERPAGE
            }
            let user = await userRepo.getAllUsers(req);

            let meta = {
                "page": req.body.pagination.page,
                "pages": user.pageCount,
                "perpage": req.body.pagination.perpage,
                "total": user.totalCount,
                "sort": sortOrder,
                "field": sortField
            };

            return {
                status: 200,
                meta: meta,
                data: user.data,
                message: `Data fetched successfully.`
            };
        } catch (e) {
            return {
                status: 500,
                data: [],
                message: e.message
            };
        }
    }

    /**
     * @Method: edit
     * @Description: To edit user information
     */
    async edit(req, res) {
        try {
            let result = {};
            let userData = await userRepo.getById(req.params.id);
            let permissionData = await userRepo.getPermissionByField({ user_id: req.params.id });

            if (!_.isEmpty(userData)) {
                result.user_data = userData;
                res.render('user/views/edit.ejs', {
                    page_name: 'user-management',
                    page_title: 'User Edit',
                    user: req.user,
                    response: result,
                    permission: permissionData
                });
            } else {
                req.flash('error', "Sorry user not found!");
                res.redirect(namedRouter.urlFor('user.listing'));
            }
        } catch (e) {
            throw e;
        }
    };


    async update(req, res) {
        try {

            var chkEmail = {
                isDeleted: false,
                email: req.body.email,
                _id: { $ne: mongoose.Types.ObjectId(req.body.uid) }
            };
            let checkEmail = await userRepo.getByField(chkEmail);
            if (!_.isEmpty(checkEmail)) {
                req.flash('error', "Email already exist.");
                res.redirect(namedRouter.urlFor('user.edit', {
                    id: req.body.uid
                }));
            } else {

                //
                let validate = 0;
                if (req.body.about) {
                    req.body.about = true;
                    validate = 1;
                }
                else {
                    req.body.about = false;
                }
                if (req.body.contact) {
                    req.body.contact = true;
                    validate = 1;
                }
                else {
                    req.body.contact = false;
                }
                if (req.body.knowledge_center) {
                    req.body.knowledge_center = true;
                    validate = 1;
                }
                else {
                    req.body.knowledge_center = false;
                }
                if (req.body.science_update) {
                    req.body.science_update = true;
                    validate = 1;
                }
                else {
                    req.body.science_update = false;
                }
                if (req.body.product) {
                    req.body.product = true;
                    validate = 1;
                }
                else {
                    req.body.product = false;
                }
                if (req.body.support) {
                    req.body.support = true;
                    validate = 1;
                }
                else {
                    req.body.support = false;
                }
                if (req.body.home_slider) {
                    req.body.home_slider = true;
                    validate = 1;
                }
                else {
                    req.body.home_slider = false;
                }
                if (req.body.setting) {
                    req.body.setting = true;
                    validate = 1;
                }
                else {
                    req.body.setting = false;
                }
                if (req.body.probe_finder) {
                    req.body.probe_finder = true;
                    validate = 1;
                }
                else {
                    req.body.probe_finder = false;
                }
                if (validate == 0) {
                    req.flash('error', "Please give permission minimum one section.");
                    res.redirect(namedRouter.urlFor('user.edit', {
                        id: req.body.uid
                    }));
                    return false;
                }
                //

                let userUpdate = userRepo.updateById(req.body, req.body.uid);
                if (userUpdate) {
                    let permissionData = await userRepo.getPermissionByField({ user_id: req.body.uid });



                    let userpermission = userRepo.updatePermissionById(req.body, permissionData._id);
                    req.flash('success', 'User updated successfully.');
                    res.redirect(namedRouter.urlFor('user.listing'));
                } else {
                    res.redirect(namedRouter.urlFor('user.edit', {
                        id: req.body.uid
                    }));
                }
            }

        } catch (e) {
            throw e;
        }
    };

    /* @Method: delete
    // @Description: user Delete
    */
    async delete(req, res) {
        try {
            let userDelete = await userRepo.updateById({
                "isDeleted": true
            }, req.params.id)
            if (!_.isEmpty(userDelete)) {

                let permissionData = await userRepo.getPermissionByField({ user_id: req.params.id });
                let userpermission = userRepo.updatePermissionById({
                    "isDeleted": true
                }, permissionData._id);

                req.flash('success', 'User Removed Successfully');
                res.redirect(namedRouter.urlFor('user.listing'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /* @Method: Dashboard
    // @Description: User Dashboard
    */
    async dashboard(req, res) {

        try {

            let productcount = await productRepo.getDocumentCount({ 'isDeleted': false, "status": "Active" });


            let resultAll = { 'totalProductCount': productcount }
            /* Html render here */

            res.render('user/views/dashboard.ejs', {
                page_name: 'user-dashboard',
                page_title: 'Dashboard',
                user: req.user,
                permission: req.permission,
                response: resultAll
            });

        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };

    /* @Method: Logout
    // @Description: User Logout
    */
    async logout(req, res) {
        req.session.destroy(function (err) {
            res.redirect('/' + process.env.ADMIN_FOLDER_NAME);
        });
    };

    /* @Method: viewmyprofile
    // @Description: To get Profile Info from db
    */
    async viewmyprofile(req, res) {
        try {
            const id = req.params.id;
            let user = await userRepo.getById(id)

            if (!_.isEmpty(user)) {
                res.render('user/views/myprofile.ejs', {
                    page_name: 'user-profile',
                    page_title: 'My Profile',
                    user: req.user,
                    permission: req.permission,
                    response: user
                });

            }
        } catch (e) {

            return res.status(500).send({
                message: e.message
            });
        }
    }

    /* @Method: updateprofile
    // @Description: Update My Profile 
    */
    async updateprofile(req, res) {
        try {
            const id = req.body.id;
            let userValue = await userRepo.getById(id);

            console.log(req.files);
            if (req.files.length > 0) {
                if (fs.existsSync('./public/uploads/user/' + userValue.profile_image) && userValue.profile_image) {
                    fs.unlinkSync('./public/uploads/user/' + userValue.profile_image);
                }
                for (let i = 0; i < req.files.length; i++) {
                    req.body.profile_image = req.files[i].filename;
                }
            }

            let userUpdate = await userRepo.updateById(req.body, id)
            if (!_.isEmpty(userUpdate)) {
                req.flash('success', "Profile updated successfully.");
                res.redirect(namedRouter.urlFor('admin.profile', {
                    id: id
                }));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /*
    // @Method: status_change
    // @Description: User status change action
    */
    async statusChange(req, res) {
        try {
            let user = await userRepo.getById(req.params.id);
            if (!_.isEmpty(user)) {
                let userStatus = (user.isActive == true) ? false : true;
                let userUpdate = userRepo.updateById({
                    'isActive': userStatus
                }, req.params.id);
                req.flash('success', "User status has changed successfully.");
                res.redirect(namedRouter.urlFor('user.listing'));
            } else {
                req.flash('error', "Sorry user not found");
                res.redirect(namedRouter.urlFor('user.listing'));
            }
        } catch (e) {

            return res.status(500).send({
                message: e.message
            });
        }
    };


    /* @Method: changepassword
    // @Description: user changepassword Render
    */
    async adminChangePassword(req, res) {
        var vehicleOwner = await userRepo.getById(req.user._id);
        if (vehicleOwner) {
            res.render('user/views/change_password.ejs', {
                page_name: 'user-changepassword',
                page_title: 'Change Password',
                response: vehicleOwner,
                permission: req.permission,
                user: req.user
            });
        } else {
            req.flash('error', "sorry vehicle owner not found.");
            res.redirect(namedRouter.urlFor('user.dashboard'));
        }

    };

    /*
    // @Method: updatepassword
    // @Description: User password change
    */

    async adminUpdatePassword(req, res) {
        try {
            let user = await userRepo.getById(req.user._id);
            if (!_.isEmpty(user)) {
                // check if password matches
                if (!user.validPassword(req.body.old_password, user.password)) {
                    req.flash('error', "Sorry old password mismatch!");
                    res.redirect(namedRouter.urlFor('admin.changepassword'));
                } else {
                    if (req.body.password == req.body.password_confirm) {
                        // if user is found and password is right, check if he is an admin
                        let new_password = req.user.generateHash(req.body.password);
                        let userUpdate = await userRepo.updateById({
                            "password": new_password
                        }, req.body.id);

                        if (userUpdate) {
                            req.flash('success', "Your password has been changed successfully.");
                            res.redirect(namedRouter.urlFor('user.dashboard'));
                        }
                    } else {
                        req.flash('error', "Your New Password And Confirm Password does not match.");
                        res.redirect(namedRouter.urlFor('admin.changepassword'));
                    }

                }
            } else {
                req.flash('error', "Authentication failed. Wrong credentials.");
                res.redirect(namedRouter.urlFor('admin.changepassword'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /*
    // @Method: forgotPassword
    // @Description: User forgotPassword
    */

    async forgotPassword(req, res) {

        try {
            //{ role: "admin" }
            let roleDetails = await roleRepo.getByField();
            let result = {};
            //role: mongoose.Types.ObjectId(roleDetails._id)
            let user = await User.findOne({ email: req.body.email }).exec();
            if (!user) {
                result.status = 500;
                return res.status(201).send({ "result": result, "message": "User not found", "status": false });
            }
            else {
                let random_pass = Math.random().toString(36).substr(2, 9);
                let readable_pass = random_pass;
                random_pass = user.generateHash(random_pass);
                let user_details = await User.findByIdAndUpdate(user._id, { password: random_pass }).exec();
                if (!user_details) {
                    result.status = 500;
                    return res.status(201).send({ "result": result, "message": "User not found", "status": false });
                }
                else {
                    var mailOptions = {
                        from: `NeuroNexus<${process.env.MAIL_USERNAME}>`,
                        to: req.body.email,
                        subject: "Forget Password",
                        html: 'Hello ' + '<b>' + user.first_name + ' ' + user.last_name + '</b>' + ',<br><br>We have received a request to reset your password.<br><br>Here is your new password: <span><b>' + readable_pass + '</b></span><br><br>Thank You'
                    };
                    let sendMail = await transporter.sendMail(mailOptions);
                    if (sendMail) {
                        result.status = 200;
                        return res.status(200).send({ "result": result, "message": "Mail is sending to your mail id with new password", "status": false });
                    }
                }
            }
        }
        catch (e) {

            return res.status(500).send({ message: e.message });
        }
    };


    async getAllUserCount(req, res) {
        try {
            let userCount = await userRepo.getUsersCount(req);
            return userCount;
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    async getPermission(param) {
        try {
            let permissionData = await userRepo.getPermissionByField({ user_id: param });
            return permissionData;
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };


}



module.exports = new UserController();