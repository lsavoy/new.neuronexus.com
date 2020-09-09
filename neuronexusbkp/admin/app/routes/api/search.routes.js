const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const request_param = multer();
const searchController = require('webservice/search.controller');


/**
 * @api {post} /search Search
 * @apiVersion 1.0.0
 * @apiGroup Search
 * @apiparam searchkey search key
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "product_list": [
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
                    "__v": 0
                }
            ]
        },
        {
            "product_static": []
        },
        {
            "meet_the_team": []
        },
        {
            "leadership": []
        },
        {
            "aboutus": null
        },
        {
            "brain": []
        },
        {
            "brain_tab": []
        },
        {
            "careers": []
        },
        {
            "careers_opening": []
        },
        {
            "distributors": []
        },
        {
            "partners": []
        },
        {
            "science_update_collaboration": []
        },
        {
            "science_update_collaboration_tab": []
        },
        {
            "contact": []
        },
        {
            "supportstatic": []
        },
        {
            "supportcategory": []
        },
        {
            "knowledgeCenter": []
        },
        {
            "science_update": []
        }
    ],
    "message": "Records fetched Successfully"
}
*/



namedRouter.post("api.search", '/search', async (req, res) => {
  try {
    const success = await searchController.getAllsearch(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});






module.exports = router;