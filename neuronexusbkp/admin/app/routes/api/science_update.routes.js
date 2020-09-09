const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const request_param = multer();
const knowledge_centerController = require('webservice/science_update.controller');


/**
 * @api {get} /science_update/static Science Update Static Contents
 * @apiVersion 1.0.0
 * @apiGroup ScienceUpdate
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": {
        "header_banner_image": "header_banner_image_1590842674442_about_bnr.jpg",
        "isDeleted": false,
        "status": "Active",
        "_id": "5ed253f7c7d64cd82bc3c923",
        "updatedAt": "2020-05-30T12:44:34.626Z"
    },
    "message": "Record fetched Successfully"
}
*/
namedRouter.get("api.science_update.static", '/science_update/static', async (req, res) => {
  try {
    const success = await knowledge_centerController.getProductStaticContents(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});


/**
 * @api {get} /science_update/list?title=searchvalue Science Update List
 * @apiVersion 1.0.0
 * @apiGroup ScienceUpdate
 * @apiparam title   For search query
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "_id": "5ecf91fe62ea47218ca66f50",
            "title": "Happy 15th Anniversary To NeuroNexus!",
            "image": "image_1590661630400_update_img.jpg",
            "content": "<p>When NeuroNexus first opened its doors in 2004, a 16-channel probe sold for $99. In honor of our 15th anniversary, we are offering Brain Hacker inventory on sale: buy one at listed price, get the second for $99!</p>\r\n\r\n<p><a href=\"http://r20.rs6.net/tn.jsp?f=001Sx39GGQ9GOcJIRNaSapaZyU7MJBbIrPaTxZqCufOD2v6VF-pU8PuF7JPKvM_ZxDK07D2j9jjLFwGGuOUeoNveCff1RiCnIeQ1u_gmjr5jsqmY0fUnFTBcpVOIVriDzYuCYXF00J-tmYgfN2ROTnLZH1MwCERfqfIKY9ma9G_FEwt_yKbz31gsUDAuUq5JoUAie9rZ4qhnyI=&amp;c=9Fltp3d-oaZ5Qu82wQ-cFLV-cO3Kav5Y7uHiziE_gD3Qsi3QbcQY0w==&amp;ch=LlrIdHhRM7YHCggG9c3Xo_UsO9znd0JiblDxhWz-tAJrNocwI6M2GQ==\"><strong>Browse acute and chronic probes, optoelectrodes and Vector Arrays&trade; </strong></a></p>\r\n\r\n<p><a href=\"http://r20.rs6.net/tn.jsp?f=001Sx39GGQ9GOcJIRNaSapaZyU7MJBbIrPaTxZqCufOD2v6VF-pU8PuF7JPKvM_ZxDK07D2j9jjLFwGGuOUeoNveCff1RiCnIeQ1u_gmjr5jsqmY0fUnFTBcpVOIVriDzYuCYXF00J-tmYgfN2ROTnLZH1MwCERfqfIKY9ma9G_FEwt_yKbz31gsUDAuUq5JoUAie9rZ4qhnyI=&amp;c=9Fltp3d-oaZ5Qu82wQ-cFLV-cO3Kav5Y7uHiziE_gD3Qsi3QbcQY0w==&amp;ch=LlrIdHhRM7YHCggG9c3Xo_UsO9znd0JiblDxhWz-tAJrNocwI6M2GQ==\"><strong>in this LIMITED TIME sale!</strong></a></p>\r\n",
            "status": "Active",
            "isDeleted": false,
            "createdAt": "2020-05-28T10:27:10.617Z",
            "category_id": "5ecf871a0b33232a88c934ab",
            "category_name": "Category 1",
            "author_id": "5ec7d17ec7d64cd82b909326",
            "author_frist_name": "Super",
            "author_last_name": "Admin"
        },
        {
            "_id": "5ecf92f462ea47218ca66f52",
            "title": "NEURONEXUS – THE NEXT GENERATION",
            "image": "image_1590661876623_update_img3.jpg",
            "content": "<p>Dear colleagues and friends,</p>\r\n\r\n<p><strong>I am pleased to announce that NeuroNexus is once again an independent, private company!</strong> On January 1, 2019, we left the corporate umbrella of Nuvectra and were acquired by the NEL group, an investment company comprised of a small group of dedicated, private investors. Our entire organization is energized by this significant change &ndash; we&rsquo;re calling it NeuroNexus &ldquo;gen4.&rdquo;</p>\r\n\r\n<p><strong>What does this mean for you?</strong> Going forward, our mission does not change. Our new independence translates to bringing more flexibility and focus to all aspects of our company, from sales and customer service to production and technical support. We are accelerating and expanding our research and engineering efforts to develop innovate neuroscience products and ground-breaking technologies for neural interfacing. Additionally, we are (re-)opened for grant and contract collaborations! Overall, we are even better positioned to work with you to find meaningful, cost-effective solutions for your research or product development programs.</p>\r\n\r\n<p>NeuroNexus &ldquo;gen4&rdquo; remains dedicated to working at the forefronts of neuroscience, neurotechnology, and neuromodulation.</p>\r\n\r\n<p>I look forward to interfacing with you in the future. Please feel free to contact me at dkipke@neuronexus.com.</p>\r\n\r\n<p>With warm regards,<br />\r\n<strong>Daryl R. Kipke, PhD</strong><br />\r\nCEO and Director, NeuroNexus Technologies, Inc.<br />\r\nCEO and Director, NEL Group, Inc.</p>\r\n",
            "status": "Active",
            "isDeleted": false,
            "createdAt": "2020-05-28T10:31:16.638Z",
            "category_id": "5ecf87270b33232a88c934ac",
            "category_name": "Category 2",
            "author_id": "5ec7d17ec7d64cd82b909326",
            "author_frist_name": "Super",
            "author_last_name": "Admin"
        }
    ],
    "message": "Record fetched Successfully"
}
*/
namedRouter.get("api.science_update.list", '/science_update/list', async (req, res) => {
  try {
    const success = await knowledge_centerController.getAllscience_update(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});



/**
 * @api {get} /science_update/topthree Science Update TopThree
 * @apiVersion 1.0.0
 * @apiGroup ScienceUpdate
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "_id": "5ecf91fe62ea47218ca66f50",
            "title": "Happy 15th Anniversary To NeuroNexus!",
            "image": "image_1590661630400_update_img.jpg",
            "content": "<p>When NeuroNexus first opened its doors in 2004, a 16-channel probe sold for $99. In honor of our 15th anniversary, we are offering Brain Hacker inventory on sale: buy one at listed price, get the second for $99!</p>\r\n\r\n<p><a href=\"http://r20.rs6.net/tn.jsp?f=001Sx39GGQ9GOcJIRNaSapaZyU7MJBbIrPaTxZqCufOD2v6VF-pU8PuF7JPKvM_ZxDK07D2j9jjLFwGGuOUeoNveCff1RiCnIeQ1u_gmjr5jsqmY0fUnFTBcpVOIVriDzYuCYXF00J-tmYgfN2ROTnLZH1MwCERfqfIKY9ma9G_FEwt_yKbz31gsUDAuUq5JoUAie9rZ4qhnyI=&amp;c=9Fltp3d-oaZ5Qu82wQ-cFLV-cO3Kav5Y7uHiziE_gD3Qsi3QbcQY0w==&amp;ch=LlrIdHhRM7YHCggG9c3Xo_UsO9znd0JiblDxhWz-tAJrNocwI6M2GQ==\"><strong>Browse acute and chronic probes, optoelectrodes and Vector Arrays&trade; </strong></a></p>\r\n\r\n<p><a href=\"http://r20.rs6.net/tn.jsp?f=001Sx39GGQ9GOcJIRNaSapaZyU7MJBbIrPaTxZqCufOD2v6VF-pU8PuF7JPKvM_ZxDK07D2j9jjLFwGGuOUeoNveCff1RiCnIeQ1u_gmjr5jsqmY0fUnFTBcpVOIVriDzYuCYXF00J-tmYgfN2ROTnLZH1MwCERfqfIKY9ma9G_FEwt_yKbz31gsUDAuUq5JoUAie9rZ4qhnyI=&amp;c=9Fltp3d-oaZ5Qu82wQ-cFLV-cO3Kav5Y7uHiziE_gD3Qsi3QbcQY0w==&amp;ch=LlrIdHhRM7YHCggG9c3Xo_UsO9znd0JiblDxhWz-tAJrNocwI6M2GQ==\"><strong>in this LIMITED TIME sale!</strong></a></p>\r\n",
            "status": "Active",
            "isDeleted": false,
            "createdAt": "2020-05-28T10:27:10.617Z",
            "category_id": "5ecf871a0b33232a88c934ab",
            "category_name": "Category 1",
            "author_id": "5ec7d17ec7d64cd82b909326",
            "author_frist_name": "Super",
            "author_last_name": "Admin"
        },
        {
            "_id": "5ecf92f462ea47218ca66f52",
            "title": "NEURONEXUS – THE NEXT GENERATION",
            "image": "image_1590661876623_update_img3.jpg",
            "content": "<p>Dear colleagues and friends,</p>\r\n\r\n<p><strong>I am pleased to announce that NeuroNexus is once again an independent, private company!</strong> On January 1, 2019, we left the corporate umbrella of Nuvectra and were acquired by the NEL group, an investment company comprised of a small group of dedicated, private investors. Our entire organization is energized by this significant change &ndash; we&rsquo;re calling it NeuroNexus &ldquo;gen4.&rdquo;</p>\r\n\r\n<p><strong>What does this mean for you?</strong> Going forward, our mission does not change. Our new independence translates to bringing more flexibility and focus to all aspects of our company, from sales and customer service to production and technical support. We are accelerating and expanding our research and engineering efforts to develop innovate neuroscience products and ground-breaking technologies for neural interfacing. Additionally, we are (re-)opened for grant and contract collaborations! Overall, we are even better positioned to work with you to find meaningful, cost-effective solutions for your research or product development programs.</p>\r\n\r\n<p>NeuroNexus &ldquo;gen4&rdquo; remains dedicated to working at the forefronts of neuroscience, neurotechnology, and neuromodulation.</p>\r\n\r\n<p>I look forward to interfacing with you in the future. Please feel free to contact me at dkipke@neuronexus.com.</p>\r\n\r\n<p>With warm regards,<br />\r\n<strong>Daryl R. Kipke, PhD</strong><br />\r\nCEO and Director, NeuroNexus Technologies, Inc.<br />\r\nCEO and Director, NEL Group, Inc.</p>\r\n",
            "status": "Active",
            "isDeleted": false,
            "createdAt": "2020-05-28T10:31:16.638Z",
            "category_id": "5ecf87270b33232a88c934ac",
            "category_name": "Category 2",
            "author_id": "5ec7d17ec7d64cd82b909326",
            "author_frist_name": "Super",
            "author_last_name": "Admin"
        }
    ],
    "message": "Record fetched Successfully"
}
*/
namedRouter.get("api.science_update.topthree", '/science_update/topthree', async (req, res) => {
  try {
    const success = await knowledge_centerController.getTopThreescience_update(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});

/**
 * @api {get} /science_update/category/:category_id Science Update List by category_id
 * @apiVersion 1.0.0
 * @apiGroup ScienceUpdate
 * @apiparam category_id Category Id
 * @apiparam title   For search query
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "_id": "5ecf91fe62ea47218ca66f50",
            "title": "Happy 15th Anniversary To NeuroNexus!",
            "image": "image_1590661630400_update_img.jpg",
            "content": "<p>When NeuroNexus first opened its doors in 2004, a 16-channel probe sold for $99. In honor of our 15th anniversary, we are offering Brain Hacker inventory on sale: buy one at listed price, get the second for $99!</p>\r\n\r\n<p><a href=\"http://r20.rs6.net/tn.jsp?f=001Sx39GGQ9GOcJIRNaSapaZyU7MJBbIrPaTxZqCufOD2v6VF-pU8PuF7JPKvM_ZxDK07D2j9jjLFwGGuOUeoNveCff1RiCnIeQ1u_gmjr5jsqmY0fUnFTBcpVOIVriDzYuCYXF00J-tmYgfN2ROTnLZH1MwCERfqfIKY9ma9G_FEwt_yKbz31gsUDAuUq5JoUAie9rZ4qhnyI=&amp;c=9Fltp3d-oaZ5Qu82wQ-cFLV-cO3Kav5Y7uHiziE_gD3Qsi3QbcQY0w==&amp;ch=LlrIdHhRM7YHCggG9c3Xo_UsO9znd0JiblDxhWz-tAJrNocwI6M2GQ==\"><strong>Browse acute and chronic probes, optoelectrodes and Vector Arrays&trade; </strong></a></p>\r\n\r\n<p><a href=\"http://r20.rs6.net/tn.jsp?f=001Sx39GGQ9GOcJIRNaSapaZyU7MJBbIrPaTxZqCufOD2v6VF-pU8PuF7JPKvM_ZxDK07D2j9jjLFwGGuOUeoNveCff1RiCnIeQ1u_gmjr5jsqmY0fUnFTBcpVOIVriDzYuCYXF00J-tmYgfN2ROTnLZH1MwCERfqfIKY9ma9G_FEwt_yKbz31gsUDAuUq5JoUAie9rZ4qhnyI=&amp;c=9Fltp3d-oaZ5Qu82wQ-cFLV-cO3Kav5Y7uHiziE_gD3Qsi3QbcQY0w==&amp;ch=LlrIdHhRM7YHCggG9c3Xo_UsO9znd0JiblDxhWz-tAJrNocwI6M2GQ==\"><strong>in this LIMITED TIME sale!</strong></a></p>\r\n",
            "status": "Active",
            "isDeleted": false,
            "createdAt": "2020-05-28T10:27:10.617Z",
            "category_id": "5ecf871a0b33232a88c934ab",
            "category_name": "Category 1",
            "author_id": "5ec7d17ec7d64cd82b909326",
            "author_frist_name": "Super",
            "author_last_name": "Admin"
        }
    ],
    "message": "Record fetched Successfully"
}
*/
namedRouter.get("api.science_update.category", '/science_update/category/:category_id', async (req, res) => {
  try {
    const success = await knowledge_centerController.getAllscience_update(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});



/**
 * @api {get} /science_update/:id Science Update Detail
 * @apiVersion 1.0.0
 * @apiGroup ScienceUpdate
 * @apiparam id   Science Update Id
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": {
        "title": "       Small Animal Matrix Array",
        "image": "image_1590675043151_update_img.jpg",
        "content": "<p>The new <a href=\"/products/neural-probes/matrix-small-animal/\">Small Animal Matrix Array</a> can be configured for acute or chronic experiments, interfacing with large populations of neurons in 3D space up to 10 mm deep.</p>\r\n\r\n<p><a href=\"/contact/\">Contact us</a> for more information, or to place an order.</p>\r\n",
        "slug": "small-animal-matrix-array-040b1",
        "admin_id": "5ecfc4055139bb07ecec9d3f",
        "category_id": "5ecf871a0b33232a88c934ab",
        "isDeleted": false,
        "status": "Active",
        "_id": "5ecfc6630168e6a7c21040b1",
        "createdAt": "2020-05-28T14:10:43.400Z",
        "updatedAt": "2020-07-20T14:12:01.806Z",
        "__v": 0
    },
    "message": "Record fetched Successfully"
}
*/
namedRouter.get("api.science_update", '/science_update/:slug', async (req, res) => {
  try {
    const success = await knowledge_centerController.getDetailsscience_update(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});




module.exports = router;