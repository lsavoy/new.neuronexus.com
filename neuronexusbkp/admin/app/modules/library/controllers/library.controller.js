const libraryRepo = require('library/repositories/library.repository');
const slug = require('slug');
const express = require('express');
const mongoose = require("mongoose");
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');
var striptags = require('striptags');
const fs = require('fs');

const errorHandler = require('../../../helpers/errorHandler');

class LibraryController {

    async list(req, res) {
        try {
            res.render('library/views/list.ejs', {
                page_name: 'library-management',
                page_title: 'Library List',
                user: req.user,
                permission: req.permission,
            });
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    async getAllData(req, res) {
        try {
            let resultList = await libraryRepo.getAll(req);

            if (_.has(req.body, "sort")) {
                var sortOrder = req.body.sort.sort;
                var sortField = req.body.sort.field;
            } else {
                var sortOrder = -1;
                var sortField = "_id";
            }

            let meta = {
                page: req.body.pagination.page,
                pages: resultList.pageCount,
                perpage: req.body.pagination.perpage,
                total: resultList.totalCount,
                sort: sortOrder,
                field: sortField,
            };

            return {
                status: 200,
                meta: meta,
                data: resultList.data,
                message: `Data fetched succesfully.`,
            };
        } catch (e) {
            throw e;
        }
    }

    async edit(req, res) {
        try {
            let item = await libraryRepo.getById(req.params.id);
            if (!_.isEmpty(item)) {
                res.render('library/views/edit.ejs', {
                    page_name: 'library-management',
                    page_title: 'Library Edit',
                    user: req.user,
                    permission: req.permission,
                    response: item
                });
            } else {
                req.flash('error', "Sorry library not found!");
                res.redirect(namedRouter.urlFor('library.list'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    async update(req, res) {
        try {
            const itemId = req.body.id;

            let dbItem = await libraryRepo.getById(itemId);
            if (!_.isEmpty(dbItem)) {
                if (req.files.length > 0) {
                    if (dbItem.store_file_name != '') {
                        if (fs.existsSync('./public/uploads/library/' + dbItem.store_file_name)) {
                            fs.unlinkSync('./public/uploads/library/' + dbItem.store_file_name);
                        }
                    }
                    req.body.file_name = req.files[0].originalname.replace(/\s/g, '_');
                    req.body.store_file_name = req.files[0].filename;
                    req.body.file_path = process.env.LIBRARY_DOMAIN_PREFIX + req.files[0].filename;
                }
            }

            let itemUpdate = await libraryRepo.updateById(itemId, req.body);
            if (itemUpdate) {
                req.flash('success', "Library Updated Successfully");
                res.redirect(namedRouter.urlFor('library.list'));
            } else {
                res.redirect(namedRouter.urlFor('library.edit', {
                    id: itemId
                }));
            }
        } catch (e) {
            const error = errorHandler(e);
            req.flash('error', error.message);
            res.redirect(namedRouter.urlFor('library.edit', {
                id: req.body.id
            }));
        }
    };

    async create(req, res) {
        try {
            res.render("library/views/add.ejs", {
                page_name: 'library-management',
                page_title: 'Library List',
                user: req.user,
                permission: req.permission,
            });
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    }

    async store(req, res) {
        try {
            if (req.files.length > 0) {
                req.body.file_name = req.files[0].originalname.replace(/\s/g, '_');
                req.body.store_file_name = req.files[0].filename;
                req.body.file_path = process.env.LIBRARY_DOMAIN_PREFIX + req.files[0].filename;
            }
            let newItem = await libraryRepo.save(req.body);
            if (newItem) {
                req.flash("success", "Library created succesfully.");
                res.redirect(namedRouter.urlFor("library.list"));
            }
        } catch (e) {
            req.flash("error", e.message);
            res.redirect(namedRouter.urlFor("library.create"));
        }
    }

    async delete(req, res) {
        try {
            let dbItem = await libraryRepo.getById(req.params.id);
            if (_.isEmpty(dbItem)) {
                req.flash("error", "Library did not exists.");
                res.redirect(namedRouter.urlFor("library.list"));
            } else {
                await libraryRepo.deleteById(req.params.id);
                req.flash("success", "Library removed successfully");
                res.redirect(namedRouter.urlFor("library.list"));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message,
            });
        }
    }
}

module.exports = new LibraryController();
