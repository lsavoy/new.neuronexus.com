const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const request_param = multer();
const productController = require('webservice/product.controller');


/**
 * @api {get} /product/staticinfo Product Static Contents
 * @apiVersion 1.0.0
 * @apiGroup Product
 * @apiSuccessExample {json} Success
 * {
  "status": 200,
  "data": {
      "title": "Products",
      "content": "<p>NeuroNexus offers leading edge multichannel electrodes, systems, and accessories for all your experimental needs. Our high-quality, high channel count <a href=\"\">neural probes</a> enable single-unit, multi-unit, and local field potential electrophysiology, and are designed to minimize tissue damage for superior signal quality. The <a href=\"\">SmartBox</a> Data Acquisition system miniaturizes conventional rack-mounted gear, enabling high-channel count recording in an inexpensive, portable package. NeuroNexus <a href=\"\">microdrives</a> and <a href=\"\">accessories</a> are carefully designed to simplify surgical procedures so you can focus on what matters: your science.</p>\r\n",
      "isDeleted": false,
      "status": "Active",
      "_id": "5ec93e64c7d64cd82b96945c",
      "updatedAt": "2020-05-23T15:50:40.997Z"
  },
  "message": "Products fetched Successfully"
}
*/



namedRouter.get("api.product.staticinfo", '/product/staticinfo', async (req, res) => {
  try {
    const success = await productController.getProductStaticContents(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});

/**
 * @api {get} /product/list Product List
 * @apiVersion 1.0.0
 * @apiGroup Product
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "name": " Neural Probes",
            "image": "image_1590420532422_product1.jpg",
            "content": "<p>NeuroNexus Probes are fabricated using state-of-the-art silicon MEMs technology, originally developed at the University of Michigan. NeuroNexus Probes are used in labs worldwide for single unit, multiple unit, and local field potential (LFP) recording and stimulation, in acute and chronic applications.</p>\r\n\r\n<ul>\r\n\t<li><strong>Consistent results &ndash; </strong>\r\n\r\n\t<p>NeuroNexus Probes are produced with reliable mechanical, geometric, and electrical characteristics. This means fewer variables for you to manage.</p>\r\n\t</li>\r\n\t<li><strong>A Toolbox of Designs &ndash;</strong>\r\n\t<p>We offer a huge variety of electrode array designs for different applications and/or brain structures. Think of it as selecting the right tool for your task &ndash; and if you need a custom design, we can make it for you.</p>\r\n\t</li>\r\n\t<li><strong>Acute and Chronic &ndash; </strong>\r\n\t<p>Probes can be used successfully in both acute and chronic applications..</p>\r\n\t</li>\r\n\t<li><strong>Connect to any system &ndash; </strong>\r\n\t<p>Each microelectrode array is matched with a connector package to connect to a headstage. NeuroNexus collaborates with system manufacturers to ensure our probes connect seamlessly.</p>\r\n\t</li>\r\n</ul>\r\n",
            "section2_content": "<p>&quot;Since NeuroNexus began fabricating probes with high reliability and reasonable costs, we virtually stopped using wire electrodes and monitor electrical activity with silicon probes. It is a one-way process: once one begins to record with silicon probes, he/she never goes back to wires.&quot;</p>\r\n",
            "section2_name": "Dr. György Buzsáki",
            "section2_location": "New York University",
            "specification_title": "Specification",
            "specification_content": "<p>Configuration<br />\r\nEach probe consists of two parts: an electrode array and a package. You must specify both to place an order.</p>\r\n\r\n<p>First, using the Probe Finder or our catalog, select an electrode array design that meets your experimental needs. Consider how the array design matches your target depth and shape, and if you require a particular site layout (e.g. tetrode for cell discrimination, linear for laminar coverage).</p>\r\n\r\n<p>Secondly, select a probe package that matches your headstage and/or recording system.</p>\r\n",
            "ordering_information_title": "Ordering Information",
            "ordering_information_content": "<p>Configuration<br />\r\nEach probe consists of two parts: an electrode array and a package. You must specify both to place an order.</p>\r\n\r\n<p>First, using the Probe Finder or our catalog, select an electrode array design that meets your experimental needs. Consider how the array design matches your target depth and shape, and if you require a particular site layout (e.g. tetrode for cell discrimination, linear for laminar coverage).</p>\r\n\r\n<p>Secondly, select a probe package that matches your headstage and/or recording system.</p>\r\n",
            "documentation_title": "Documentation",
            "documentation_content": "<p>Configuration<br />\r\nEach probe consists of two parts: an electrode array and a package. You must specify both to place an order.</p>\r\n\r\n<p>First, using the Probe Finder or our catalog, select an electrode array design that meets your experimental needs. Consider how the array design matches your target depth and shape, and if you require a particular site layout (e.g. tetrode for cell discrimination, linear for laminar coverage).</p>\r\n\r\n<p>Secondly, select a probe package that matches your headstage and/or recording system.</p>\r\n",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ec8fdc0c7d64cd82b95786b",
            "createdAt": "2020-05-23T08:14:51.142Z",
            "updatedAt": "2020-06-12T10:06:39.763Z",
            "category_id": "5ee3356cee2d572cf7c2f5e0",
            "__v": 0
        },
        {
            "name": "Cardiac Products",
            "image": "image_1590420594542_product3.jpg",
            "content": "<p>NeuroNexus Probes are fabricated using state-of-the-art silicon MEMs technology, originally developed at the University of Michigan. NeuroNexus Probes are used in labs worldwide for single unit, multiple unit, and local field potential (LFP) recording and stimulation, in acute and chronic applications.</p>\r\n\r\n<ul>\r\n\t<li><strong>Consistent results &ndash; </strong>\r\n\r\n\t<p>NeuroNexus Probes are produced with reliable mechanical, geometric, and electrical characteristics. This means fewer variables for you to manage.</p>\r\n\t</li>\r\n\t<li><strong>A Toolbox of Designs &ndash;</strong>\r\n\t<p>We offer a huge variety of electrode array designs for different applications and/or brain structures. Think of it as selecting the right tool for your task &ndash; and if you need a custom design, we can make it for you.</p>\r\n\t</li>\r\n\t<li><strong>Acute and Chronic &ndash; </strong>\r\n\t<p>Probes can be used successfully in both acute and chronic applications..</p>\r\n\t</li>\r\n\t<li><strong>Connect to any system &ndash; </strong>\r\n\t<p>Each microelectrode array is matched with a connector package to connect to a headstage. NeuroNexus collaborates with system manufacturers to ensure our probes connect seamlessly.</p>\r\n\t</li>\r\n</ul>\r\n",
            "section2_content": "<p>&quot;Since NeuroNexus began fabricating probes with high reliability and reasonable costs, we virtually stopped using wire electrodes and monitor electrical activity with silicon probes. It is a one-way process: once one begins to record with silicon probes, he/she never goes back to wires.&quot;</p>\r\n",
            "section2_name": "Dr. György Buzsáki",
            "section2_location": "New York University",
            "specification_title": "Specification",
            "specification_content": "<p>Configuration<br />\r\nEach probe consists of two parts: an electrode array and a package. You must specify both to place an order.</p>\r\n\r\n<p>First, using the Probe Finder or our catalog, select an electrode array design that meets your experimental needs. Consider how the array design matches your target depth and shape, and if you require a particular site layout (e.g. tetrode for cell discrimination, linear for laminar coverage).</p>\r\n\r\n<p>Secondly, select a probe package that matches your headstage and/or recording system.</p>\r\n",
            "ordering_information_title": "Ordering Information",
            "ordering_information_content": "<p>Configuration<br />\r\nEach probe consists of two parts: an electrode array and a package. You must specify both to place an order.</p>\r\n\r\n<p>First, using the Probe Finder or our catalog, select an electrode array design that meets your experimental needs. Consider how the array design matches your target depth and shape, and if you require a particular site layout (e.g. tetrode for cell discrimination, linear for laminar coverage).</p>\r\n\r\n<p>Secondly, select a probe package that matches your headstage and/or recording system.</p>\r\n",
            "documentation_title": "Documentation",
            "documentation_content": "<p>Configuration<br />\r\nEach probe consists of two parts: an electrode array and a package. You must specify both to place an order.</p>\r\n\r\n<p>First, using the Probe Finder or our catalog, select an electrode array design that meets your experimental needs. Consider how the array design matches your target depth and shape, and if you require a particular site layout (e.g. tetrode for cell discrimination, linear for laminar coverage).</p>\r\n\r\n<p>Secondly, select a probe package that matches your headstage and/or recording system.</p>\r\n",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ec90065c7d64cd82b958365",
            "createdAt": "2020-05-23T08:14:51.142Z",
            "updatedAt": "2020-05-25T16:01:37.840Z",
            "category_id": "5ee33a2e91972e2e06125655",
            "__v": 0
        },
        {
            "name": "Primate Products",
            "image": "image_1590420470684_product2.jpg",
            "content": "<p>NeuroNexus Probes are fabricated using state-of-the-art silicon MEMs technology, originally developed at the University of Michigan. NeuroNexus Probes are used in labs worldwide for single unit, multiple unit, and local field potential (LFP) recording and stimulation, in acute and chronic applications.</p>\r\n\r\n<ul>\r\n\t<li><strong>Consistent results &ndash; </strong>\r\n\r\n\t<p>NeuroNexus Probes are produced with reliable mechanical, geometric, and electrical characteristics. This means fewer variables for you to manage.</p>\r\n\t</li>\r\n\t<li><strong>A Toolbox of Designs &ndash;</strong>\r\n\t<p>We offer a huge variety of electrode array designs for different applications and/or brain structures. Think of it as selecting the right tool for your task &ndash; and if you need a custom design, we can make it for you.</p>\r\n\t</li>\r\n\t<li><strong>Acute and Chronic &ndash; </strong>\r\n\t<p>Probes can be used successfully in both acute and chronic applications..</p>\r\n\t</li>\r\n\t<li><strong>Connect to any system &ndash; </strong>\r\n\t<p>Each microelectrode array is matched with a connector package to connect to a headstage. NeuroNexus collaborates with system manufacturers to ensure our probes connect seamlessly.</p>\r\n\t</li>\r\n</ul>\r\n",
            "section2_content": "<p>&quot;Since NeuroNexus began fabricating probes with high reliability and reasonable costs, we virtually stopped using wire electrodes and monitor electrical activity with silicon probes. It is a one-way process: once one begins to record with silicon probes, he/she never goes back to wires.&quot;</p>\r\n",
            "section2_name": "Dr. György Buzsáki",
            "section2_location": "New York University",
            "specification_title": "Specification",
            "specification_content": "<p>Configuration<br />\r\nEach probe consists of two parts: an electrode array and a package. You must specify both to place an order.</p>\r\n\r\n<p>First, using the Probe Finder or our catalog, select an electrode array design that meets your experimental needs. Consider how the array design matches your target depth and shape, and if you require a particular site layout (e.g. tetrode for cell discrimination, linear for laminar coverage).</p>\r\n\r\n<p>Secondly, select a probe package that matches your headstage and/or recording system.</p>\r\n",
            "ordering_information_title": "Ordering Information",
            "ordering_information_content": "<p>Configuration<br />\r\nEach probe consists of two parts: an electrode array and a package. You must specify both to place an order.</p>\r\n\r\n<p>First, using the Probe Finder or our catalog, select an electrode array design that meets your experimental needs. Consider how the array design matches your target depth and shape, and if you require a particular site layout (e.g. tetrode for cell discrimination, linear for laminar coverage).</p>\r\n\r\n<p>Secondly, select a probe package that matches your headstage and/or recording system.</p>\r\n",
            "documentation_title": "Documentation",
            "documentation_content": "<p>Configuration<br />\r\nEach probe consists of two parts: an electrode array and a package. You must specify both to place an order.</p>\r\n\r\n<p>First, using the Probe Finder or our catalog, select an electrode array design that meets your experimental needs. Consider how the array design matches your target depth and shape, and if you require a particular site layout (e.g. tetrode for cell discrimination, linear for laminar coverage).</p>\r\n\r\n<p>Secondly, select a probe package that matches your headstage and/or recording system.</p>\r\n",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ec9003fc7d64cd82b9582d5",
            "createdAt": "2020-05-23T08:14:51.142Z",
            "updatedAt": "2020-05-25T16:01:59.764Z",
            "category_id": "5ee33a2e91972e2e06125655",
            "__v": 0
        },
        {
            "name": "test",
            "image": "image_1590994007375_download.jpg",
            "content": "<p>lorem</p>\r\n",
            "section2_content": "<p>lorem</p>\r\n",
            "section2_name": "lorem",
            "section2_location": "lorem",
            "specification_title": "lorem",
            "specification_content": "<p>lorem</p>\r\n",
            "ordering_information_title": "lorem",
            "ordering_information_content": "<p>lorem</p>\r\n",
            "documentation_title": "lorem",
            "documentation_content": "<p>lorem</p>\r\n",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ed4a45756bd0bb8c5035403",
            "createdAt": "2020-06-01T06:46:47.560Z",
            "updatedAt": "2020-06-12T10:01:47.041Z",
            "__v": 0,
            "category_id": "5ee33a2e91972e2e06125655"
        }
    ],
    "message": "Products fetched Successfully"
}
*/
namedRouter.get("api.product.list", '/product/list', async (req, res) => {
  try {
    const success = await productController.getAllProducts(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});

/**
 * @api {get} /product/:slug Product Details
 * @apiVersion 1.0.0
 * @apiGroup Product
 * @apiparam slug Product slug
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": {
        "d_drive_nano": {
            "nano_title": null,
            "nano_image": "",
            "nano_des": null
        },
        "d_drive_m": {
            "m_title": null,
            "m_image": "",
            "m_des": null
        },
        "d_drive_xl": {
            "xl_title": null,
            "xl_image": "",
            "xl_des": null
        },
        "name": "Primate Products",
        "slug": "primate-products-582d5",
        "image": "image_1590420470684_product2.jpg",
        "video": "",
        "order_sort": "",
        "short_content": "<p>NeuroNexus Probes are fabricated using state-of-the-art silicon MEMs technology, originally developed at the University of Michigan. NeuroNexus Probes are used in labs worldwide for single unit, multiple unit, and local field potential (LFP) recording and stimulation, in acute and chronic applications.</p>\r\n",
        "content": "<p>NeuroNexus Probes are fabricated using state-of-the-art silicon MEMs technology, originally developed at the University of Michigan. NeuroNexus Probes are used in labs worldwide for single unit, multiple unit, and local field potential (LFP) recording and stimulation, in acute and chronic applications.</p>\r\n\r\n<ul>\r\n\t<li><strong>Consistent results &ndash; </strong>\r\n\r\n\t<p>NeuroNexus Probes are produced with reliable mechanical, geometric, and electrical characteristics. This means fewer variables for you to manage.</p>\r\n\t</li>\r\n\t<li><strong>A Toolbox of Designs &ndash;</strong>\r\n\t<p>We offer a huge variety of electrode array designs for different applications and/or brain structures. Think of it as selecting the right tool for your task &ndash; and if you need a custom design, we can make it for you.</p>\r\n\t</li>\r\n\t<li><strong>Acute and Chronic &ndash; </strong>\r\n\t<p>Probes can be used successfully in both acute and chronic applications..</p>\r\n\t</li>\r\n\t<li><strong>Connect to any system &ndash; </strong>\r\n\t<p>Each microelectrode array is matched with a connector package to connect to a headstage. NeuroNexus collaborates with system manufacturers to ensure our probes connect seamlessly.</p>\r\n\t</li>\r\n</ul>\r\n",
        "section2_content": "<p>&quot;Since NeuroNexus began fabricating probes with high reliability and reasonable costs, we virtually stopped using wire electrodes and monitor electrical activity with silicon probes. It is a one-way process: once one begins to record with silicon probes, he/she never goes back to wires.&quot;</p>\r\n",
        "section2_name": "Dr. György Buzsáki",
        "section2_location": "New York University",
        "specification_title": "Specification",
        "specification_content": "<p>Configuration<br />\r\nEach probe consists of two parts: an electrode array and a package. You must specify both to place an order.</p>\r\n\r\n<p>First, using the Probe Finder or our catalog, select an electrode array design that meets your experimental needs. Consider how the array design matches your target depth and shape, and if you require a particular site layout (e.g. tetrode for cell discrimination, linear for laminar coverage).</p>\r\n\r\n<p>Secondly, select a probe package that matches your headstage and/or recording system.</p>\r\n",
        "ordering_information_title": "Ordering Information",
        "ordering_information_content": "<p>Configuration<br />\r\nEach probe consists of two parts: an electrode array and a package. You must specify both to place an order.</p>\r\n\r\n<p>First, using the Probe Finder or our catalog, select an electrode array design that meets your experimental needs. Consider how the array design matches your target depth and shape, and if you require a particular site layout (e.g. tetrode for cell discrimination, linear for laminar coverage).</p>\r\n\r\n<p>Secondly, select a probe package that matches your headstage and/or recording system.</p>\r\n",
        "documentation_title": "Documentation",
        "documentation_content": "<p>Configuration<br />\r\nEach probe consists of two parts: an electrode array and a package. You must specify both to place an order.</p>\r\n\r\n<p>First, using the Probe Finder or our catalog, select an electrode array design that meets your experimental needs. Consider how the array design matches your target depth and shape, and if you require a particular site layout (e.g. tetrode for cell discrimination, linear for laminar coverage).</p>\r\n\r\n<p>Secondly, select a probe package that matches your headstage and/or recording system.</p>\r\n",
        "isDeleted": false,
        "status": "Active",
        "_id": "5ec9003fc7d64cd82b9582d5",
        "createdAt": "2020-05-23T08:14:51.142Z",
        "updatedAt": "2020-07-20T11:55:29.226Z",
        "category_id": "5ee33a2e91972e2e06125655",
        "__v": 0
    },
    "message": "Product fetched Successfully"
}
*/
namedRouter.get("api.product.slug", '/product/:slug', async (req, res) => {
  try {
    const success = await productController.getProductsById(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});

/**
 * @api {get} /product/list/category Product List With Category
 * @apiVersion 1.0.0
 * @apiGroup Product

 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "_id": "5ee3356cee2d572cf7c2f5e0",
            "name": "Category 1",
            "isDeleted": false,
            "status": "Active",
            "createdAt": "2020-06-12T07:57:32.977Z",
            "updatedAt": "2020-06-12T07:57:32.977Z",
            "__v": 0,
            "productsList": [
                {
                    "_id": "5ec8fdc0c7d64cd82b95786b",
                    "name": " Neural Probes",
                    "image": "image_1590420532422_product1.jpg",
                    "content": "<p>NeuroNexus Probes are fabricated using state-of-the-art silicon MEMs technology, originally developed at the University of Michigan. NeuroNexus Probes are used in labs worldwide for single unit, multiple unit, and local field potential (LFP) recording and stimulation, in acute and chronic applications.</p>\r\n\r\n<ul>\r\n\t<li><strong>Consistent results &ndash; </strong>\r\n\r\n\t<p>NeuroNexus Probes are produced with reliable mechanical, geometric, and electrical characteristics. This means fewer variables for you to manage.</p>\r\n\t</li>\r\n\t<li><strong>A Toolbox of Designs &ndash;</strong>\r\n\t<p>We offer a huge variety of electrode array designs for different applications and/or brain structures. Think of it as selecting the right tool for your task &ndash; and if you need a custom design, we can make it for you.</p>\r\n\t</li>\r\n\t<li><strong>Acute and Chronic &ndash; </strong>\r\n\t<p>Probes can be used successfully in both acute and chronic applications..</p>\r\n\t</li>\r\n\t<li><strong>Connect to any system &ndash; </strong>\r\n\t<p>Each microelectrode array is matched with a connector package to connect to a headstage. NeuroNexus collaborates with system manufacturers to ensure our probes connect seamlessly.</p>\r\n\t</li>\r\n</ul>\r\n",
                    "section2_content": "<p>&quot;Since NeuroNexus began fabricating probes with high reliability and reasonable costs, we virtually stopped using wire electrodes and monitor electrical activity with silicon probes. It is a one-way process: once one begins to record with silicon probes, he/she never goes back to wires.&quot;</p>\r\n",
                    "section2_name": "Dr. György Buzsáki",
                    "section2_location": "New York University",
                    "specification_title": "Specification",
                    "specification_content": "<p>Configuration<br />\r\nEach probe consists of two parts: an electrode array and a package. You must specify both to place an order.</p>\r\n\r\n<p>First, using the Probe Finder or our catalog, select an electrode array design that meets your experimental needs. Consider how the array design matches your target depth and shape, and if you require a particular site layout (e.g. tetrode for cell discrimination, linear for laminar coverage).</p>\r\n\r\n<p>Secondly, select a probe package that matches your headstage and/or recording system.</p>\r\n",
                    "ordering_information_title": "Ordering Information",
                    "ordering_information_content": "<p>Configuration<br />\r\nEach probe consists of two parts: an electrode array and a package. You must specify both to place an order.</p>\r\n\r\n<p>First, using the Probe Finder or our catalog, select an electrode array design that meets your experimental needs. Consider how the array design matches your target depth and shape, and if you require a particular site layout (e.g. tetrode for cell discrimination, linear for laminar coverage).</p>\r\n\r\n<p>Secondly, select a probe package that matches your headstage and/or recording system.</p>\r\n",
                    "documentation_title": "Documentation",
                    "documentation_content": "<p>Configuration<br />\r\nEach probe consists of two parts: an electrode array and a package. You must specify both to place an order.</p>\r\n\r\n<p>First, using the Probe Finder or our catalog, select an electrode array design that meets your experimental needs. Consider how the array design matches your target depth and shape, and if you require a particular site layout (e.g. tetrode for cell discrimination, linear for laminar coverage).</p>\r\n\r\n<p>Secondly, select a probe package that matches your headstage and/or recording system.</p>\r\n",
                    "isDeleted": false,
                    "status": "Active",
                    "createdAt": "2020-05-23T08:14:51.142Z",
                    "updatedAt": "2020-06-12T10:06:39.763Z",
                    "category_id": "5ee3356cee2d572cf7c2f5e0",
                    "__v": 0
                }
            ]
        },
        {
            "_id": "5ee33a2e91972e2e06125655",
            "name": "Categroy 3",
            "isDeleted": false,
            "status": "Active",
            "createdAt": "2020-06-12T08:17:50.196Z",
            "updatedAt": "2020-06-12T10:04:02.811Z",
            "__v": 0,
            "productsList": [
                {
                    "_id": "5ec9003fc7d64cd82b9582d5",
                    "name": "Primate Products",
                    "image": "image_1590420470684_product2.jpg",
                    "content": "<p>NeuroNexus Probes are fabricated using state-of-the-art silicon MEMs technology, originally developed at the University of Michigan. NeuroNexus Probes are used in labs worldwide for single unit, multiple unit, and local field potential (LFP) recording and stimulation, in acute and chronic applications.</p>\r\n\r\n<ul>\r\n\t<li><strong>Consistent results &ndash; </strong>\r\n\r\n\t<p>NeuroNexus Probes are produced with reliable mechanical, geometric, and electrical characteristics. This means fewer variables for you to manage.</p>\r\n\t</li>\r\n\t<li><strong>A Toolbox of Designs &ndash;</strong>\r\n\t<p>We offer a huge variety of electrode array designs for different applications and/or brain structures. Think of it as selecting the right tool for your task &ndash; and if you need a custom design, we can make it for you.</p>\r\n\t</li>\r\n\t<li><strong>Acute and Chronic &ndash; </strong>\r\n\t<p>Probes can be used successfully in both acute and chronic applications..</p>\r\n\t</li>\r\n\t<li><strong>Connect to any system &ndash; </strong>\r\n\t<p>Each microelectrode array is matched with a connector package to connect to a headstage. NeuroNexus collaborates with system manufacturers to ensure our probes connect seamlessly.</p>\r\n\t</li>\r\n</ul>\r\n",
                    "section2_content": "<p>&quot;Since NeuroNexus began fabricating probes with high reliability and reasonable costs, we virtually stopped using wire electrodes and monitor electrical activity with silicon probes. It is a one-way process: once one begins to record with silicon probes, he/she never goes back to wires.&quot;</p>\r\n",
                    "section2_name": "Dr. György Buzsáki",
                    "section2_location": "New York University",
                    "specification_title": "Specification",
                    "specification_content": "<p>Configuration<br />\r\nEach probe consists of two parts: an electrode array and a package. You must specify both to place an order.</p>\r\n\r\n<p>First, using the Probe Finder or our catalog, select an electrode array design that meets your experimental needs. Consider how the array design matches your target depth and shape, and if you require a particular site layout (e.g. tetrode for cell discrimination, linear for laminar coverage).</p>\r\n\r\n<p>Secondly, select a probe package that matches your headstage and/or recording system.</p>\r\n",
                    "ordering_information_title": "Ordering Information",
                    "ordering_information_content": "<p>Configuration<br />\r\nEach probe consists of two parts: an electrode array and a package. You must specify both to place an order.</p>\r\n\r\n<p>First, using the Probe Finder or our catalog, select an electrode array design that meets your experimental needs. Consider how the array design matches your target depth and shape, and if you require a particular site layout (e.g. tetrode for cell discrimination, linear for laminar coverage).</p>\r\n\r\n<p>Secondly, select a probe package that matches your headstage and/or recording system.</p>\r\n",
                    "documentation_title": "Documentation",
                    "documentation_content": "<p>Configuration<br />\r\nEach probe consists of two parts: an electrode array and a package. You must specify both to place an order.</p>\r\n\r\n<p>First, using the Probe Finder or our catalog, select an electrode array design that meets your experimental needs. Consider how the array design matches your target depth and shape, and if you require a particular site layout (e.g. tetrode for cell discrimination, linear for laminar coverage).</p>\r\n\r\n<p>Secondly, select a probe package that matches your headstage and/or recording system.</p>\r\n",
                    "isDeleted": false,
                    "status": "Active",
                    "createdAt": "2020-05-23T08:14:51.142Z",
                    "updatedAt": "2020-05-25T16:01:59.764Z",
                    "category_id": "5ee33a2e91972e2e06125655",
                    "__v": 0
                }
            ]
        }
    ],
    "message": "Products fetched Successfully"
}
*/
namedRouter.get("api.product.withCategory", '/product/list/category', async (req, res) => {
  try {
    const success = await productController.getAllProductsWithCategory(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});

/**
 * @api {get} /catalogs/list Catalog Details
 * @apiVersion 1.0.0
 * @apiGroup Product
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": {
        "catalog_title": "2019 Catalog",
        "catalog_file": "catalog_file_1593510036051_2019_NNxCatalog_20190122_Web.pdf",
        "brochures_title": "Cardiac Catalog",
        "brochures_file": "brochures_file_1593510036721_2017AHABrochure.pdf",
        "isDeleted": false,
        "status": "Active",
        "_id": "5efafb5c1ab27e0a6dcaadee",
        "updatedAt": "2020-06-30T09:40:36.997Z"
    },
    "message": "Catalogs fetched Successfully"
}
*/
namedRouter.get("api.catalog", '/catalogs/list', async (req, res) => {
  try {
    const success = await productController.getcatalogs(req);
    
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});




module.exports = router;