const express = require("express");
const mongoose = require("mongoose");
const routeLabel = require("route-label");
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require("querystring");
const productLevel4Repo = require("product_level4/repositories/productlevel4.repository");
const errorHandler = require("../../../errorHandler");
const fs = require("fs");
const gm = require("gm").subClass({
  imageMagick: true,
});
const slug = require("slug");

class ProductLevel4Controller {
  constructor() { }

  async list(req, res) {
    try {
      res.render("product_level4/views/list.ejs", {
        page_name: "level4-product-management",
        page_title: "Level4 Products",
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
      let productList = await productLevel4Repo.getAllValidProduct({isDeleted:false,status:'Active'});

      res.render("product_level4/views/add.ejs", {
        page_name: "level4-product-management",
        page_title: "Create New Level4 Product",
        user: req.user,
        productList:productList,
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
      if (req.files.length > 0) {
        for (let i = 0; i < req.files.length; i++) {
          req.body.image = req.files[i].filename;
        }
      }
      req.body.slug = slug(req.body.name, { lower: true, replacement: "-" });
      let newProduct = await productLevel4Repo.save(req.body);
      if(newProduct){
        var insertedId = newProduct._id.toString();
        var last5Digit = insertedId.substring( insertedId.length - 5, insertedId.length);
        var updatedSlug = `${req.body.slug}-${last5Digit}`;

        let update = await productLevel4Repo.updateById(insertedId,{ slug: updatedSlug });
        if(update){
          req.flash("success", "Product created succesfully.");
          res.redirect(namedRouter.urlFor("admin.level4.product.list"));
        }
      }
    } catch (e) {
      const error = errorHandler(e);
      req.flash("error", error.message);
      res.redirect(namedRouter.urlFor("admin.level4.product.create"));
    }
  }

  async update(req, res) {
    try {
      let dbProduct = await productLevel4Repo.getById(req.body.id);
      if (req.files.length > 0) {
        if( dbProduct.image != ''){
          for(var y= 0; y<req.files.length; y++){
            if(req.files[y].fieldname == 'image'){
              if (fs.existsSync('./public/uploads/product/' + dbProduct.image) && dbProduct.image) {
                  fs.unlinkSync('./public/uploads/product/' + dbProduct.image);
              }
            }
          }
        }

        for (let i = 0; i < req.files.length; i++) {
          if(req.files[i].fieldname == 'image'){
            req.body.image = req.files[i].filename
          }
        }
      }

      let updateResult = await productLevel4Repo.updateById(dbProduct._id, req.body);
      if (updateResult) {
        let productSlug = slug(updateResult.name, { lower: true, replacement: "-" });
        var insertedId = updateResult._id.toString();
        var last5Digit = insertedId.substring( insertedId.length - 5, insertedId.length);
        var updatedSlug = `${productSlug}-${last5Digit}`;

        let updateResult2 = await productLevel4Repo.updateById(insertedId,{ slug: updatedSlug });
        if(updateResult2){
          req.flash("success", "Product Updated Successfully");
        res.redirect(namedRouter.urlFor("admin.level4.product.list"));
        }
      } else {
        res.redirect(
          namedRouter.urlFor("admin.level4.product.edit", {
            id: req.body.id
          })
        );
      }
    } catch (e) {
      req.flash("error", e.message);
      res.redirect(namedRouter.urlFor("admin.level4.product.edit", {
        id: req.body.id
      }));
    }
  }

  async getAll(req, res) {
    try {
      let products = await productLevel4Repo.getAll(req);

      if (_.has(req.body, "sort")) {
        var sortOrder = req.body.sort.sort;
        var sortField = req.body.sort.field;
      } else {
        var sortOrder = -1;
        var sortField = "_id";
      }
      let meta = {
        page: req.body.pagination.page,
        pages: products.pageCount,
        perpage: req.body.pagination.perpage,
        total: products.totalCount,
        sort: sortOrder,
        field: sortField,
      };

      return {
        status: 200,
        meta: meta,
        data: products.data,
        message: `Data fetched succesfully.`,
      };
    } catch (e) {
      throw e;
    }
  }

  async edit(req, res) {
    try {
      let dbProduct = await productLevel4Repo.getById(req.params.id);
      let productList = await productLevel4Repo.getAllValidProduct({isDeleted:false,status:'Active'});
      if (!_.isEmpty(dbProduct)) {
        res.render("product_level4/views/edit.ejs", {
          page_name: "level4-product-management",
          page_title: "Level4 Product Edit",
          user: req.user,
          permission: req.permission,
          productList:productList,
          response: dbProduct,
        });
      } else {
        req.flash("error", "Sorry, record not found!");
        res.redirect(namedRouter.urlFor("admin.level4.product.list"));
      }
    } catch (e) {
      return res.status(500).send({
        message: e.message
      });
    }
  }

  async delete(req, res) {
    try {
      let dbProduct = await productLevel4Repo.getById(req.params.id);
      if (dbProduct.image) {
        if (fs.existsSync('./public/uploads/product/' + dbProduct.image) && dbProduct.image) {
          fs.unlinkSync('./public/uploads/product/' + dbProduct.image);
        }
      }

      let deleteResult = await productLevel4Repo.updateById(req.params.id, {
        isDeleted: true,
      });
      req.flash("success", "Product removed successfully");
      res.redirect(namedRouter.urlFor("admin.level4.product.list"));
    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  async statusChange(req, res) {
    try {

      let dbProduct = await productLevel4Repo.getById(req.params.id);
      if (!_.isEmpty(dbProduct)) {
        let dbProductStatus =
            dbProduct.status == "Active" ? "Inactive" : "Active";
        let updateResult = productLevel4Repo.updateById(req.params.id, {
          status: dbProductStatus,
        });

        req.flash("success", "Product status has changed successfully");
        res.redirect(namedRouter.urlFor("admin.level4.product.list"));
      }

    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

}

module.exports = new ProductLevel4Controller();
