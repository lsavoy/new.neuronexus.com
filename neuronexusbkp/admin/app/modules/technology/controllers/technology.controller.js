const technologyRepo = require('technology/repositories/technology.repository');
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
    async edittechnology_static(req, res) {
        try {
            let result = {};
            let cms = await technologyRepo.technology_staticGetByField({ "isDeleted": false });
            if (!_.isEmpty(cms)) {
                result.cms_data = cms;
                res.render('technology/views/edit_technology_static.ejs', {
                    page_name: 'technology-static-management',
                    page_title: 'Technology Page',
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
    async updatetechnology_static(req, res) {
        try {
            const technology_staticId = req.body.id;


            let about = await technologyRepo.technology_staticGetByField({
                _id: req.body.id,
                'isDeleted': false
            });
            if (req.files.length > 0) {
                for (let i = 0; i < req.files.length; i++) {

                    if (req.files[i].fieldname == 'image') {
                        if (fs.existsSync('./public/uploads/technology/' + about.image) && about.image) {
                            fs.unlinkSync('./public/uploads/technology/' + about.image);
                        }
                        req.body.image = req.files[i].filename;
                    }
                    if (req.files[i].fieldname == 'header_banner_image') {
                        if (fs.existsSync('./public/uploads/technology/' + about.header_banner_image) && about.header_banner_image) {
                            fs.unlinkSync('./public/uploads/technology/' + about.header_banner_image);
                        }
                        req.body.header_banner_image = req.files[i].filename;
                    }

                }
            }

            let cmsIdUpdate = technologyRepo.technology_staticUpdateById(req.body, technology_staticId)
            if (cmsIdUpdate) {
                req.flash('success', "Content updated successfully");
                res.redirect(namedRouter.urlFor('admin.technology_static.edit'));
            }


        } catch (e) {
            return res.status(500).send({ message: e.message });
        }

    };

    async list(req, res) {
        try {
            res.render("technology/views/list_technology_category.ejs", {
                page_name: "technology-category-management",
                page_title: "Technology Category",
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

            var parents = await technologyRepo.getAllByField({
                isDeleted: false,
                parent_id: null,
                status: 'Active'
            });

            res.render("technology/views/add_technology_category.ejs", {
                page_name: "technology-category-management",
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
            let checkData = await technologyRepo.getByField({
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
                    let countData = await technologyRepo.getDocumentCount({
                        "isHome": true,
                        "status": "Active",
                        isDeleted: false,
                    });
                    if (countData >= 4) {
                        req.flash("error", "Category can not be selected as Home Screen move then 4 .");
                        res.redirect(namedRouter.urlFor("admin.technology_category.list"));
                        return false;
                    }

                }



                let newCategory = await technologyRepo.save(req.body);
                if (newCategory) {
                    let slugValue = slug(newCategory.title, { lower: true, replacement: "-" });
                    var insertedId = newCategory._id.toString();
                    var last5Digit = insertedId.substring(insertedId.length - 5, insertedId.length);
                    var updatedSlug = `${slugValue}-${last5Digit}`;

                    let newprobeFinderSlugUpdate = await technologyRepo.updateById(insertedId, { slug: updatedSlug });
                    if (newprobeFinderSlugUpdate) {
                        req.flash("success", "Category created succesfully.");
                        res.redirect(namedRouter.urlFor("admin.technology_category.list"));
                    }
                }

            } else {
                req.flash("error", "Category exist with same title");
                res.redirect(namedRouter.urlFor("admin.technology_category.create"));
            }
        } catch (e) {
            const error = errorHandler(e);
            req.flash("error", error.message);
            res.redirect(namedRouter.urlFor("admin.technology_category.create"));
        }
    }

    async update(req, res) {

        try {
            const categoryId = req.body.id;

            let checkData = await technologyRepo.getByField({
                title: req.body.title,
                isDeleted: false,
                _id: {
                    $ne: categoryId
                },
            });
            if (_.isEmpty(checkData)) {

                if (req.body.isHome == "true") {
                    let countData = await technologyRepo.getDocumentCount({
                        "isHome": true,
                        "status": "Active",
                        isDeleted: false,
                    });
                    if (countData >= 4) {
                        req.flash("error", "Category can not be selected as Home Screen move then 4 .");
                        res.redirect(namedRouter.urlFor("admin.technology_category.list"));
                        return false;
                    }

                }

                let categoryValue = await technologyRepo.getById(categoryId);

                if (req.files.length > 0) {

                    if (fs.existsSync('./public/uploads/technology/' + categoryValue.image) && categoryValue.image) {
                        fs.unlinkSync('./public/uploads/technology/' + categoryValue.image);
                    }

                    for (let i = 0; i < req.files.length; i++) {
                        req.body.image = req.files[i].filename;
                    }
                }

                if (req.body.title == 'Probe Mapping') {
                    req.body.content = escape(unescape(req.body.content));
                }


                let categoryUpdate = await technologyRepo.updateById(categoryId, req.body);
                if (categoryUpdate) {

                    let slugValue = slug(categoryUpdate.title, { lower: true, replacement: "-" });
                    var insertedId = categoryUpdate._id.toString();
                    var last5Digit = insertedId.substring(insertedId.length - 5, insertedId.length);
                    var updatedSlug = `${slugValue}-${last5Digit}`;

                    let newprobeFinderSlugUpdate = await technologyRepo.updateById(insertedId, { slug: updatedSlug });
                    console.log("newprobeFinderSlugUpdate", newprobeFinderSlugUpdate);
                    if (newprobeFinderSlugUpdate) {
                        req.flash("success", "Category Updated Successfully");
                        res.redirect(namedRouter.urlFor("admin.technology_category.list"));
                    }


                } else {
                    res.redirect(
                        namedRouter.urlFor("admin.technology_category.edit", {
                            id: categoryId
                        })
                    );
                }
            } else {
                req.flash("error", "Category already exist with same title");
                res.redirect(
                    namedRouter.urlFor("admin.technology_category.edit", {
                        id: categoryId
                    })
                );
            }
        } catch (e) {
            req.flash("error", e.message);
            res.redirect(namedRouter.urlFor("admin.technology_category.edit", {
                id: categoryId
            }));
        }
    }

    async getAll(req, res) {
        try {
            let categorys = await technologyRepo.getAll(req);

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
            let categorys = await technologyRepo.getById(req.params.id);
            var parents = await technologyRepo.getAllByField({
                isDeleted: false,
                parent_id: null,
                status: 'Active'
            });

            if (categorys.title == 'Probe Mapping') {
                categorys.content = unescape(categorys.content);
            }

            if (!_.isEmpty(categorys)) {
                res.render("technology/views/edit_technology_category.ejs", {
                    page_name: "technology-category-management",
                    page_title: "Category Edit",
                    user: req.user,
                    permission: req.permission,
                    parentcat: parents,
                    response: categorys,
                });
            } else {
                req.flash("error", "Sorry, record not found!");
                res.redirect(namedRouter.urlFor("admin.technology_category.list"));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    }

    async delete(req, res) {
        try {
            let categoryData = await technologyRepo.getByField({
                status: "Active",
                isDeleted: false,
                parent_id: mongoose.Types.ObjectId(req.params.id),
            });

            if (!_.isEmpty(categoryData)) {
                req.flash("error", "This category already in use");
                res.redirect(namedRouter.urlFor("admin.technology_category.list"));
            } else {

                let categoryValue = await technologyRepo.getById(req.params.id);
                if (fs.existsSync('./public/uploads/technology/' + categoryValue.image) && categoryValue.image) {
                    fs.unlinkSync('./public/uploads/technology/' + categoryValue.image);
                }
                let categoryDelete = await technologyRepo.updateById(req.params.id, {
                    isDeleted: true,
                });
                req.flash("success", "Category removed successfully");
                res.redirect(namedRouter.urlFor("admin.technology_category.list"));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message,
            });
        }
    }

    async statusChange(req, res) {
        try {
            let categoryData = await technologyRepo.getByField({
                status: "Active",
                isDeleted: false,
                parent_id: mongoose.Types.ObjectId(req.params.id),
            });

            if (!_.isEmpty(categoryData)) {
                req.flash("error", "This category already in use");
                res.redirect(namedRouter.urlFor("admin.technology_category.list"));
            } else {
                let category = await technologyRepo.getById(req.params.id);
                if (!_.isEmpty(category)) {
                    let categoryStatus =
                        category.status == "Active" ? "Inactive" : "Active";
                    let categoryUpdate = technologyRepo.updateById(req.params.id, {
                        status: categoryStatus,
                    });

                    req.flash("success", "Category status has changed successfully");
                    res.redirect(namedRouter.urlFor("admin.technology_category.list"));
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