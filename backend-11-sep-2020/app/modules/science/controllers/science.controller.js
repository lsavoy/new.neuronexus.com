const scienceRepo = require('science/repositories/science.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const mongoose = require('mongoose');
const errorHandler = require("../../../errorHandler");
const fs = require("fs");
const gm = require("gm").subClass({
    imageMagick: true,
});
const slug = require("slug");




class CategoryController {
    constructor() { }

    /*
    // @Method: editmeet_the_team
    // @Description:  Edit meet_the_team page Content
    */
    async editscience_static(req, res) {
        try {
            let result = {};
            let cms = await scienceRepo.science_staticGetByField({ "isDeleted": false });
            if (!_.isEmpty(cms)) {
                result.cms_data = cms;
                res.render('science/views/edit_science_static.ejs', {
                    page_name: 'science-static-management',
                    page_title: 'Science Page',
                    user: req.user,
                    permission: req.permission,
                    response: result
                });
            } else {
                req.flash('error', "Sorry record not found!");

            }
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };

    /* @Method: update
    // @Description: coupon update action
    */
    async updatescience_static(req, res) {
        try {
            const science_staticId = req.body.id;


            let about = await scienceRepo.science_staticGetByField({
                _id: req.body.id,
                'isDeleted': false
            });
            if (req.files.length > 0) {
                for (let i = 0; i < req.files.length; i++) {

                    if (req.files[i].fieldname == 'image') {
                        if (fs.existsSync('./public/uploads/science/' + about.image) && about.image) {
                            fs.unlinkSync('./public/uploads/science/' + about.image);
                        }
                        req.body.image = req.files[i].filename;
                    }
                    if (req.files[i].fieldname == 'header_banner_image') {
                        if (fs.existsSync('./public/uploads/science/' + about.header_banner_image) && about.header_banner_image) {
                            fs.unlinkSync('./public/uploads/science/' + about.header_banner_image);
                        }
                        req.body.header_banner_image = req.files[i].filename;
                    }

                }
            }

            let cmsIdUpdate = scienceRepo.science_staticUpdateById(req.body, science_staticId)
            if (cmsIdUpdate) {
                req.flash('success', "Content updated successfully");
                res.redirect(namedRouter.urlFor('admin.science_static.edit'));
            }


        } catch (e) {
            return res.status(500).send({ message: e.message });
        }

    };

    async list(req, res) {
        try {
            res.render("science/views/list_science_category.ejs", {
                page_name: "science-menu-management",
                page_title: "Science Category",
                user: req.user,
                permission: req.permission,
            });
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    }

    async create(req, res) {
        try {

            var parents = await scienceRepo.getAllByField({
                isDeleted: false,
                parent_id: null,
                status: 'Active'
            });

            res.render("science/views/add_science_category.ejs", {
                page_name: "science-menu-management",
                page_title: "Create New Category",
                parentcat: parents,
                user: req.user,
                permission: req.permission,
            });
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    }

    async insert(req, res) {
        try {
            let checkData = await scienceRepo.getByField({
                title: req.body.title,
                parent_id: null,
                isDeleted: false,
            });
            if (_.isEmpty(checkData)) {
                if (req.body.parent_id == "Parent") {
                    req.body.parent_id = null;
                }


                if (req.files.length > 0) {
                    for (let i = 0; i < req.files.length; i++) {
                        req.body.image = req.files[i].filename;
                    }
                }

                if (req.body.isHome == "true") {
                    let countData = await scienceRepo.getDocumentCount({
                        "isHome": true,
                        "status": "Active",
                        isDeleted: false,
                    });
                    if (countData >= 4) {
                        req.flash("error", "Category can not be selected as Home Screen move then 4 .");
                        res.redirect(namedRouter.urlFor("admin.science_menu.list"));
                        return false;
                    }

                }



                let newCategory = await scienceRepo.save(req.body);
                if (newCategory) {
                    let slugValue = slug(newCategory.title, { lower: true, replacement: "-" });
                    var insertedId = newCategory._id.toString();
                    var last5Digit = insertedId.substring(insertedId.length - 5, insertedId.length);
                    var updatedSlug = `${slugValue}-${last5Digit}`;

                    let newprobeFinderSlugUpdate = await scienceRepo.updateById(insertedId, { slug: updatedSlug });
                    if (newprobeFinderSlugUpdate) {
                        req.flash("success", "Category created succesfully.");
                        res.redirect(namedRouter.urlFor("admin.science_menu.list"));
                    }
                }

            } else {
                req.flash("error", "Category exist with same title");
                res.redirect(namedRouter.urlFor("admin.science_menu.create"));
            }
        } catch (e) {
            const error = errorHandler(e);
            req.flash("error", error.message);
            res.redirect(namedRouter.urlFor("admin.science_menu.create"));
        }
    }

    async update(req, res) {

        try {
            const categoryId = req.body.id;

            let checkData = await scienceRepo.getByField({
                title: req.body.title,
                isDeleted: false,
                _id: {
                    $ne: categoryId
                },
            });
            if (_.isEmpty(checkData)) {

                if (req.body.isHome == "true") {
                    let countData = await scienceRepo.getDocumentCount({
                        "isHome": true,
                        "status": "Active",
                        isDeleted: false,
                    });
                    if (countData >= 4) {
                        req.flash("error", "Category can not be selected as Home Screen move then 4 .");
                        res.redirect(namedRouter.urlFor("admin.science_menu.list"));
                        return false;
                    }

                }

                let categoryValue = await scienceRepo.getById(categoryId);

                if (req.files.length > 0) {

                    if (fs.existsSync('./public/uploads/science/' + categoryValue.image) && categoryValue.image) {
                        fs.unlinkSync('./public/uploads/science/' + categoryValue.image);
                    }

                    for (let i = 0; i < req.files.length; i++) {
                        req.body.image = req.files[i].filename;
                    }
                }

                if (req.body.title == 'Probe Mapping') {
                    req.body.content = escape(unescape(req.body.content));
                }


                let categoryUpdate = await scienceRepo.updateById(categoryId, req.body);
                if (categoryUpdate) {

                    let slugValue = slug(categoryUpdate.title, { lower: true, replacement: "-" });
                    var insertedId = categoryUpdate._id.toString();
                    var last5Digit = insertedId.substring(insertedId.length - 5, insertedId.length);
                    var updatedSlug = `${slugValue}-${last5Digit}`;

                    let newprobeFinderSlugUpdate = await scienceRepo.updateById(insertedId, { slug: updatedSlug });
                    console.log("newprobeFinderSlugUpdate", newprobeFinderSlugUpdate);
                    if (newprobeFinderSlugUpdate) {
                        req.flash("success", "Category Updated Successfully");
                        res.redirect(namedRouter.urlFor("admin.science_menu.list"));
                    }


                } else {
                    res.redirect(
                        namedRouter.urlFor("admin.science_menu.edit", {
                            id: categoryId
                        })
                    );
                }
            } else {
                req.flash("error", "Category already exist with same title");
                res.redirect(
                    namedRouter.urlFor("admin.science_menu.edit", {
                        id: categoryId
                    })
                );
            }
        } catch (e) {
            req.flash("error", e.message);
            res.redirect(namedRouter.urlFor("admin.science_menu.edit", {
                id: categoryId
            }));
        }
    }

    async getAll(req, res) {
        try {
            let categorys = await scienceRepo.getAll(req);

            if (_.has(req.body, "sort")) {
                var sortOrder = req.body.sort.sort;
                var sortField = req.body.sort.field;
            } else {
                var sortOrder = -1;
                var sortField = "_id";
            }
            let meta = {
                page: req.body.pagination.page,
                pages: categorys.pageCount,
                perpage: req.body.pagination.perpage,
                total: categorys.totalCount,
                sort: sortOrder,
                field: sortField,
            };

            return {
                status: 200,
                meta: meta,
                data: categorys.data,
                message: `Data fetched succesfully.`,
            };
        } catch (e) {
            throw e;
        }
    }

    async edit(req, res) {
        try {
            let categorys = await scienceRepo.getById(req.params.id);
            var parents = await scienceRepo.getAllByField({
                isDeleted: false,
                parent_id: null,
                status: 'Active'
            });

            if (categorys.title == 'Probe Mapping') {
                categorys.content = unescape(categorys.content);
            }

            if (!_.isEmpty(categorys)) {
                res.render("science/views/edit_science_category.ejs", {
                    page_name: "science-menu-management",
                    page_title: "Category Edit",
                    user: req.user,
                    permission: req.permission,
                    parentcat: parents,
                    response: categorys,
                });
            } else {
                req.flash("error", "Sorry, record not found!");
                res.redirect(namedRouter.urlFor("admin.science_menu.list"));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    }

    async delete(req, res) {
        try {
            let categoryData = await scienceRepo.getByField({
                status: "Active",
                isDeleted: false,
                parent_id: mongoose.Types.ObjectId(req.params.id),
            });

            if (!_.isEmpty(categoryData)) {
                req.flash("error", "This category already in use");
                res.redirect(namedRouter.urlFor("admin.science_menu.list"));
            } else {

                let categoryValue = await scienceRepo.getById(req.params.id);
                if (fs.existsSync('./public/uploads/science/' + categoryValue.image) && categoryValue.image) {
                    fs.unlinkSync('./public/uploads/science/' + categoryValue.image);
                }
                let categoryDelete = await scienceRepo.updateById(req.params.id, {
                    isDeleted: true,
                });
                req.flash("success", "Category removed successfully");
                res.redirect(namedRouter.urlFor("admin.science_menu.list"));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message,
            });
        }
    }

    async statusChange(req, res) {
        try {
            let categoryData = await scienceRepo.getByField({
                status: "Active",
                isDeleted: false,
                parent_id: mongoose.Types.ObjectId(req.params.id),
            });

            if (!_.isEmpty(categoryData)) {
                req.flash("error", "This category already in use");
                res.redirect(namedRouter.urlFor("admin.science_menu.list"));
            } else {
                let category = await scienceRepo.getById(req.params.id);
                if (!_.isEmpty(category)) {
                    let categoryStatus =
                        category.status == "Active" ? "Inactive" : "Active";
                    let categoryUpdate = scienceRepo.updateById(req.params.id, {
                        status: categoryStatus,
                    });

                    req.flash("success", "Category status has changed successfully");
                    res.redirect(namedRouter.urlFor("admin.science_menu.list"));
                }
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message,
            });
        }
    }

}

module.exports = new CategoryController();