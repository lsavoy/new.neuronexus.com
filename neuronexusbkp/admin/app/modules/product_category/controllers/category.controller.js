const express = require("express");
const mongoose = require("mongoose");
const routeLabel = require("route-label");
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require("querystring");
const categoryRepo = require("product_category/repositories/category.repository");
const categoryMasterRepo = require("category/repositories/category.repository");
const errorHandler = require("../../../errorHandler");
const fs = require("fs");
const gm = require("gm").subClass({
  imageMagick: true,
});
const slug = require("slug");

class ProductController {
  constructor() { }


  /*
    // @Method: editmeet_the_team
    // @Description:  Edit meet_the_team page Content
    */
  async editproduct_static_contents(req, res) {
    try {
      let result = {};
      let cms = await categoryRepo.product_static_contentsGetByField({ "isDeleted": false });
      if (!_.isEmpty(cms)) {
        result.cms_data = cms;
        res.render('product_category/views/edit_product_static_contents.ejs', {
          page_name: 'product-static-management',
          page_title: 'Product page',
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
  async updateproduct_static_contents(req, res) {
    try {
      const aboutId = req.body.id;

      let about = await categoryRepo.product_static_contentsGetByField({
        _id: req.body.id,
        'isDeleted': false
      });
      if (req.files.length > 0) {
        for (let i = 0; i < req.files.length; i++) {

          if (req.files[i].fieldname == 'image') {
            if (fs.existsSync('./public/uploads/product/' + about.image) && about.image) {
              fs.unlinkSync('./public/uploads/product/' + about.image);
            }
            req.body.image = req.files[i].filename;
          }
          if (req.files[i].fieldname == 'catalog_image') {
            if (fs.existsSync('./public/uploads/product/' + about.catalog_image) && about.catalog_image) {
              fs.unlinkSync('./public/uploads/product/' + about.catalog_image);
            }
            req.body.catalog_image = req.files[i].filename;
          }
          if (req.files[i].fieldname == 'header_banner_image') {
            if (fs.existsSync('./public/uploads/product/' + about.header_banner_image) && about.header_banner_image) {
              fs.unlinkSync('./public/uploads/product/' + about.header_banner_image);
            }
            req.body.header_banner_image = req.files[i].filename;
          }

        }
      }


      let cmsIdUpdate = categoryRepo.product_static_contentsUpdateById(req.body, aboutId)
      if (cmsIdUpdate) {
        req.flash('success', "Content updated successfully");
        res.redirect(namedRouter.urlFor('admin.product.editstatic'));
      }


    } catch (e) {
      return res.status(500).send({ message: e.message });
    }

  };


  async list(req, res) {
    try {
      res.render("product_category/views/list.ejs", {
        page_name: "product-management",
        page_title: "Products",
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
      let categoryMaster = await categoryMasterRepo.getAllByField({isDeleted:false,status:'Active'},{name:1});

      res.render("product_category/views/add.ejs", {
        page_name: "product-management",
        page_title: "Create New Product",
        user: req.user,
        categoryMaster:categoryMaster,
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

      req.body.parent_id = null;

      if (req.files.length > 0) {
        for (let i = 0; i < req.files.length; i++) {
          req.body.image = req.files[i].filename;
        }
      }
      req.body.slug = slug(req.body.name, { lower: true, replacement: "-" });
      let newCategory = await categoryRepo.save(req.body);
      if(newCategory){
        var insertedId = newCategory._id.toString();
        var last5Digit = insertedId.substring( insertedId.length - 5, insertedId.length);
        var updatedSlug = `${req.body.slug}-${last5Digit}`;

        let newprobeFinderSlugUpdate = await categoryRepo.updateById(insertedId,{ slug: updatedSlug });
        if(newprobeFinderSlugUpdate){
          req.flash("success", "Product created succesfully.");
          res.redirect(namedRouter.urlFor("admin.product.list"));
        }
      }
    } catch (e) {
      const error = errorHandler(e);
      req.flash("error", error.message);
      res.redirect(namedRouter.urlFor("admin.product.create"));
    }
  }

  async update(req, res) {
    try {
     let dDriveNano = {
      'nano_image':'',
      'nano_title':req.body.nano_title,
      'nano_des':req.body.nano_des
     }
     let dDriveM = {
      'm_title':req.body.m_title,
      'm_image':'',
      'm_des':req.body.m_des
     }
     let dDriveXL = {
      'xl_title':req.body.xl_title,
      'xl_des':req.body.m_des,
      'xl_image':''
     }
      let categoryValue = await categoryRepo.getById(req.body.id);

      if (req.files.length > 0) {

        if( categoryValue.image != '' || categoryValue.d_drive_nano.nano_image != '' || categoryValue.d_drive_m.m_image != '' || categoryValue.d_drive_xl.xl_image != ''){
          for(var y= 0; y<req.files.length; y++){

            if(req.files[y].fieldname == 'image'){
              if (fs.existsSync('./public/uploads/product/' + categoryValue.image) && categoryValue.image) {
                  fs.unlinkSync('./public/uploads/product/' + categoryValue.image);
              }
            }
            // if(req.files[y].fieldname == 'd_drive_nano.nano_image'){
            //   if (fs.existsSync('./public/uploads/product/dDrive/' + categoryValue.d_drive_nano.nano_image)) {
            //     fs.unlinkSync('./public/uploads/product/dDrive/' + categoryValue.d_drive_nano.nano_image);
            //   }
            // }
            // if(req.files[y].fieldname == 'd_drive_m.m_image'){
            //   if (fs.existsSync('./public/uploads/product/dDrive/' + categoryValue.d_drive_m.m_image)) {
            //     fs.unlinkSync('./public/uploads/product/dDrive/' + categoryValue.d_drive_m.m_image);
            //   }
            // }
            // if(req.files[y].fieldname == 'd_drive_xl.xl_image'){
            //   if (fs.existsSync('./public/uploads/product/dDrive/' + categoryValue.d_drive_xl.xl_image)) {
            //     fs.unlinkSync('./public/uploads/product/dDrive/' + categoryValue.d_drive_xl.xl_image);
            //   }
            // }
          }
        }

        for (let i = 0; i < req.files.length; i++) {
          if(req.files[i].fieldname == 'image'){
            req.body.image = req.files[i].filename
          }
          if(req.files[i].fieldname == 'nano_image'){
            dDriveNano.nano_image = req.files[i].filename
          }
          if(req.files[i].fieldname == 'm_image'){
            dDriveM.m_image = req.files[i].filename
          }
          if(req.files[i].fieldname == 'xl_image'){
            dDriveXL.xl_image = req.files[i].filename
          }
        }
      }
      req.body.d_drive_nano = dDriveNano;
      req.body.d_drive_m = dDriveM;
      req.body.d_drive_xl = dDriveXL;

      let categoryUpdate = await categoryRepo.updateById(categoryValue._id, req.body);
      if (categoryUpdate) {
        let cateyorySlug = slug(categoryUpdate.name, { lower: true, replacement: "-" });
        var insertedId = categoryUpdate._id.toString();
        var last5Digit = insertedId.substring( insertedId.length - 5, insertedId.length);
        var updatedSlug = `${cateyorySlug}-${last5Digit}`;

        let newprobeFinderSlugUpdate = await categoryRepo.updateById(insertedId,{ slug: updatedSlug });
        if(newprobeFinderSlugUpdate){
          req.flash("success", "Product Updated Successfully");
        res.redirect(namedRouter.urlFor("admin.product.list"));
        }
      } else {
        res.redirect(
          namedRouter.urlFor("admin.product.edit", {
            id: categoryId
          })
        );
      }

    } catch (e) {
      req.flash("error", e.message);
      res.redirect(namedRouter.urlFor("admin.product.edit", {
        id: req.body.id
      }));
    }
  }

  async getAll(req, res) {
    try {
      let categorys = await categoryRepo.getAll(req);

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
      let categorys = await categoryRepo.getById(req.params.id);
      let categoryMaster = await categoryMasterRepo.getAllByField({isDeleted:false,status:'Active'},{name:1});

      if (!_.isEmpty(categorys)) {
        res.render("product_category/views/edit.ejs", {
          page_name: "product-category-management",
          page_title: "Product Edit",
          user: req.user,
          permission: req.permission,
          categoryMaster:categoryMaster,
          response: categorys,
        });
      } else {
        req.flash("error", "Sorry, record not found!");
        res.redirect(namedRouter.urlFor("admin.product.list"));
      }
    } catch (e) {
      return res.status(500).send({
        message: e.message
      });
    }
  }

  async delete(req, res) {
    try {

      let categoryValue = await categoryRepo.getById(req.params.id);
      if (categoryValue.image) {

        if (fs.existsSync('./public/uploads/product/' + categoryValue.image) && categoryValue.image) {
          fs.unlinkSync('./public/uploads/product/' + categoryValue.image);
        }

      }

      let categoryDelete = await categoryRepo.updateById(req.params.id, {
        isDeleted: true,
      });
      req.flash("success", "Product removed successfully");
      res.redirect(namedRouter.urlFor("admin.product.list"));

    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  async statusChange(req, res) {
    try {

      let category = await categoryRepo.getById(req.params.id);
      if (!_.isEmpty(category)) {
        let categoryStatus =
          category.status == "Active" ? "Inactive" : "Active";
        let categoryUpdate = categoryRepo.updateById(req.params.id, {
          status: categoryStatus,
        });

        req.flash("success", "Product status has changed successfully");
        res.redirect(namedRouter.urlFor("admin.product.list"));
      }

    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }

  async catalogCreate(req, res) {
    try {
      let catagory = await categoryRepo.getByFieldCatalog({isDeleted:false,status:'Active'});

      res.render("product_category/views/catalogs_brochures.ejs", {
        page_name: "catalogs-management",
        page_title: "Create Catalogs Brochures",
        user: req.user,
        catagory:catagory,
        permission: req.permission
      });
    } catch (e) {
      return res.status(500).send({
        message: e.message
      });
    }
  }

  async catalogupdate(req, res) {
    try {
      //2019 Catalog Cardiac Catalog
      let catalogValue = await categoryRepo.getByIdCatalog(req.body.id);
      if(catalogValue){
        if (req.files.length > 0) {
          if(catalogValue.catalog_file != '' || catalogValue.brochures_file != ''){
            for(var y= 0; y<req.files.length; y++){
              if(req.files[y].fieldname == 'catalog_file'){
                if (fs.existsSync('./public/uploads/catalogs/' + catalogValue.catalog_file)) {
                  fs.unlinkSync('./public/uploads/catalogs/' + catalogValue.catalog_file);
                }
              }
              if(req.files[y].fieldname == 'brochures_file'){
                if (fs.existsSync('./public/uploads/catalogs/' + catalogValue.brochures_file)) {
                  fs.unlinkSync('./public/uploads/catalogs/' + catalogValue.brochures_file);
                }
              }
            }
          }

          for(var x= 0; x<req.files.length; x++){
              if(req.files[x].fieldname == 'catalog_file'){
                req.body.catalog_file = req.files[x].filename
              }
              if(req.files[x].fieldname == 'brochures_file'){
                req.body.brochures_file = req.files[x].filename
              }
          }
        }
        let catalogUpdate = await categoryRepo.updateByIdCatalog(catalogValue._id, req.body);
        if (catalogUpdate) {
          req.flash("success", "Catalogs and brochures Updated Successfully");
          res.redirect(namedRouter.urlFor("admin.product.catelog"));
        } else {
          res.redirect(
            namedRouter.urlFor("admin.product.catelog")
            );
        }

      }
    } catch (e) {
      req.flash("error", e.message);
      res.redirect(namedRouter.urlFor("admin.product.catelog"));
    }
  }


}

module.exports = new ProductController();
