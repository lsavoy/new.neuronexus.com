const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const probeFinderController = require('webservice/probe_finder.controller');
const request_param = multer();




/**
 * @api {post} /probe-finder/list Probe Finder List
 * @apiVersion 1.0.0
 * @apiGroup Probe Finder
 * @apiParam {String} site_layout_id Site Layout Id
 * @apiParam {String} site_area_id Site Area Id
 * @apiParam {String} shanks_id Shanks Id
 * @apiParam {String} shank_length_id Shank Length Id
 * @apiParam {String} experiment_id Experiment Id
 * @apiParam {String} channel_id Channel Id
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "name": "A16x1-2mm-100-177",
            "image": "1593252987934_A16x1-2mm-50-177.png",
            "site_layout_id": "5ef6f9f01ab27e0a6dbcf40f",
            "site_area_id": "5ef6f0361ab27e0a6dbcd4d8",
            "shanks_id": "5ef6ec1b1ab27e0a6dbcc7a1",
            "shank_length_id": "5ef6f9531ab27e0a6dbcf1bd",
            "experiment_id": "5ef6c4720bf3800a24248006",
            "channel_id": "5ef6d9599fbbd51f94721d4e",
            "specification_title": "Specifications",
            "specification_content": "<table>\r\n\t<tbody>\r\n\t\t<tr>\r\n\t\t\t<td><strong>Electrode Site Material</strong></td>\r\n\t\t\t<td>Iridium (standard)</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td><strong>Electrode Thickness</strong></td>\r\n\t\t\t<td>15 &micro;m</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td><strong>Electrode Length</strong></td>\r\n\t\t\t<td>2 mm</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td><strong>Site Layout</strong></td>\r\n\t\t\t<td>Linear</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td><strong>Channel Count</strong></td>\r\n\t\t\t<td>16</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td><strong>Available Packages</strong></td>\r\n\t\t\t<td>A16, CM16LP, H16_21mm, Z16</td>\r\n\t\t</tr>\r\n\t</tbody>\r\n</table>\r\n",
            "ordering_information_title": "Ordering Information",
            "ordering_information_content": "",
            "documentation_title": "Documentation",
            "documentation_content": "<p><a href=\"https://neuronexus.com/support/mapping-and-wiring/probe-mapping/\"><strong>Mapping</strong></a></p>\r\n",
            "windows_link": "",
            "mac_link": "",
            "linux_link": "",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ef71c7c3a09753118831720",
            "createdAt": "2020-06-27T10:16:28.048Z",
            "updatedAt": "2020-06-27T10:16:28.048Z",
            "__v": 0
        }
    ],
    "message": "Data fetched Successfully"
}
*/
namedRouter.post("api.probe-finder.list", '/probe-finder/list', request_param.any(), async (req, res) => {
    try {
        const success = await probeFinderController.probeFinderList(req);
        res.status(success.status).send(success);
    }
    catch (error) {
        res.status(error.status).send(error);
    }
});


/**
 * @api {get} /probe-finder/master-list Probe Finder Master List
 * @apiVersion 1.0.0
 * @apiGroup Probe Finder
 * @apiSuccessExample {json} Success
 *  "channels": [
        {
            "title": "128",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ef6d9599fbbd51f94721d4e",
            "createdAt": "2020-06-27T05:30:01.040Z",
            "updatedAt": "2020-06-27T05:30:01.040Z",
            "__v": 0
        },
        {
            "title": "16",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ef6d9c79fbbd51f94721d4f",
            "createdAt": "2020-06-27T05:31:51.207Z",
            "updatedAt": "2020-06-27T05:31:51.207Z",
            "__v": 0
        },
        {
            "title": "256",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ef6d9d89fbbd51f94721d50",
            "createdAt": "2020-06-27T05:32:08.613Z",
            "updatedAt": "2020-06-27T05:32:08.613Z",
            "__v": 0
        },
        {
            "title": "32",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ef6d9ee9fbbd51f94721d51",
            "createdAt": "2020-06-27T05:32:30.453Z",
            "updatedAt": "2020-06-27T05:32:30.453Z",
            "__v": 0
        },
        {
            "title": "4",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ef6d9fc9fbbd51f94721d52",
            "createdAt": "2020-06-27T05:32:44.286Z",
            "updatedAt": "2020-06-27T05:32:44.286Z",
            "__v": 0
        },
        {
            "title": "64",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ef6da0b9fbbd51f94721d53",
            "createdAt": "2020-06-27T05:32:59.074Z",
            "updatedAt": "2020-06-27T05:32:59.074Z",
            "__v": 0
        }
    ],
    "experiment": [
        {
            "title": "Acute",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ef6c4720bf3800a24248006",
            "createdAt": "2020-06-27T04:00:50.983Z",
            "updatedAt": "2020-06-27T04:00:50.983Z",
            "__v": 0
        },
        {
            "title": "Chronic",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ef6c9e069b15827f072efb1",
            "createdAt": "2020-06-27T04:24:00.776Z",
            "updatedAt": "2020-06-27T04:24:00.776Z",
            "__v": 0
        },
        {
            "title": "Chronic Microdrive",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ef6c9f469b15827f072efb2",
            "createdAt": "2020-06-27T04:24:20.391Z",
            "updatedAt": "2020-06-27T04:24:20.391Z",
            "__v": 0
        },
        {
            "title": "Drug Delivery",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ef6ca1569b15827f072efb3",
            "createdAt": "2020-06-27T04:24:53.120Z",
            "updatedAt": "2020-06-27T04:24:53.120Z",
            "__v": 0
        },
        {
            "title": "ECoG",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ef6ca3d69b15827f072efb4",
            "createdAt": "2020-06-27T04:25:33.298Z",
            "updatedAt": "2020-06-27T04:25:33.298Z",
            "__v": 0
        },
        {
            "title": "EEG",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ef6ca4b69b15827f072efb5",
            "createdAt": "2020-06-27T04:25:47.685Z",
            "updatedAt": "2020-06-27T04:25:47.685Z",
            "__v": 0
        },
        {
            "title": "In Vitro",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ef6ca6469b15827f072efb6",
            "createdAt": "2020-06-27T04:26:12.039Z",
            "updatedAt": "2020-06-27T04:26:12.039Z",
            "__v": 0
        },
        {
            "title": "Nerve Cuff",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ef6ca9869b15827f072efb7",
            "createdAt": "2020-06-27T04:27:04.509Z",
            "updatedAt": "2020-06-27T04:27:04.509Z",
            "__v": 0
        },
        {
            "title": "Optogenetics",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ef6caa469b15827f072efb8",
            "createdAt": "2020-06-27T04:27:16.034Z",
            "updatedAt": "2020-06-27T04:30:35.480Z",
            "__v": 0
        },
        {
            "title": "Peripheral Nerve",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ef6caae69b15827f072efb9",
            "createdAt": "2020-06-27T04:27:26.715Z",
            "updatedAt": "2020-06-27T04:27:26.715Z",
            "__v": 0
        },
        {
            "title": "Primate Floating Chronic",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ef6cabe69b15827f072efba",
            "createdAt": "2020-06-27T04:27:42.436Z",
            "updatedAt": "2020-06-27T04:27:42.436Z",
            "__v": 0
        },
        {
            "title": "Primate/Large Animal Deep Brain",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ef6cae669b15827f072efbb",
            "createdAt": "2020-06-27T04:28:22.303Z",
            "updatedAt": "2020-06-27T04:28:22.303Z",
            "__v": 0
        }
    ],
    "shankLength": [
        {
            "title": "1.5",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ef6f9531ab27e0a6dbcf1bd",
            "createdAt": "2020-06-27T05:30:01.040Z",
            "updatedAt": "2020-06-27T05:30:01.040Z"
        },
        {
            "title": "10",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ef6f95f1ab27e0a6dbcf1e7",
            "createdAt": "2020-06-27T05:30:01.040Z",
            "updatedAt": "2020-06-27T05:30:01.040Z"
        },
        {
            "title": "5",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ef6f96f1ab27e0a6dbcf21d",
            "createdAt": "2020-06-27T05:30:01.040Z",
            "updatedAt": "2020-06-27T05:30:01.040Z"
        }
    ],
    "shank": [
        {
            "title": "1",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ef6ebc81ab27e0a6dbcc68b",
            "createdAt": "2020-06-27T05:30:01.040Z",
            "updatedAt": "2020-06-27T05:30:01.040Z"
        },
        {
            "title": "16",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ef6ec1b1ab27e0a6dbcc7a1",
            "createdAt": "2020-06-27T05:30:01.040Z",
            "updatedAt": "2020-06-27T05:30:01.040Z"
        },
        {
            "title": "2",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ef6ecd91ab27e0a6dbcc9f8",
            "createdAt": "2020-06-27T05:30:01.040Z",
            "updatedAt": "2020-06-27T05:30:01.040Z"
        },
        {
            "title": "4",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ef6ecf31ab27e0a6dbcca4a",
            "createdAt": "2020-06-27T05:30:01.040Z",
            "updatedAt": "2020-06-27T05:30:01.040Z"
        },
        {
            "title": "8",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ef6ed021ab27e0a6dbcca83",
            "createdAt": "2020-06-27T05:30:01.040Z",
            "updatedAt": "2020-06-27T05:30:01.040Z"
        }
    ],
    "siteArea": [
        {
            "title": "160",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ef6f0361ab27e0a6dbcd4d8",
            "createdAt": "2020-06-27T05:30:01.040Z",
            "updatedAt": "2020-06-27T05:30:01.040Z"
        }
    ],
    "siteLayout": [
        {
            "title": "Buzsaki",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ef6f9f01ab27e0a6dbcf40f",
            "createdAt": "2020-06-27T05:30:01.040Z",
            "updatedAt": "2020-06-27T05:30:01.040Z"
        },
        {
            "title": "Edge",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ef6f9fb1ab27e0a6dbcf430",
            "createdAt": "2020-06-27T05:30:01.040Z",
            "updatedAt": "2020-06-27T05:30:01.040Z"
        },
        {
            "title": "Linear",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ef6fa0a1ab27e0a6dbcf45f",
            "createdAt": "2020-06-27T05:30:01.040Z",
            "updatedAt": "2020-06-27T05:30:01.040Z"
        },
        {
            "title": "Polytrode",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ef6fa131ab27e0a6dbcf483",
            "createdAt": "2020-06-27T05:30:01.040Z",
            "updatedAt": "2020-06-27T05:30:01.040Z"
        },
        {
            "title": "Tetrode",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ef6fa1c1ab27e0a6dbcf4a5",
            "createdAt": "2020-06-27T05:30:01.040Z",
            "updatedAt": "2020-06-27T05:30:01.040Z"
        }
    ],
    "message": "Data fetched Successfully"
}
*/
namedRouter.get("api.probe-finder.masterlist", '/probe-finder/master-list', request_param.any(), async (req, res) => {
    try {
        const success = await probeFinderController.MasterList(req);
        res.status(success.status).send(success);
    }
    catch (error) {
        res.status(error.status).send(error);
    }
});

/**
 * @api {get} /probe-finder/details/:slug Probe Finder details
 * @apiVersion 1.0.0
 * @apiGroup Probe Finder
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": {
        "name": "A16x1-2mm-100-17",
        "image": "1593771046675_A16x1-2mm-50-177.png",
        "slug": "a16x1-2mm-100-17-8a6ae",
        "site_layout_id": "5ef6fa0a1ab27e0a6dbcf45f",
        "site_area_id": null,
        "shanks_id": null,
        "shank_length_id": null,
        "experiment_id": "5ef6c4720bf3800a24248006",
        "channel_id": "5ef6d9599fbbd51f94721d4e",
        "specification_title": "Specifications",
        "specification_content": "",
        "ordering_information_title": "Ordering Information",
        "ordering_information_content": "",
        "documentation_title": "Documentation",
        "documentation_content": "",
        "windows_link": "",
        "mac_link": "",
        "linux_link": "",
        "isDeleted": false,
        "status": "Active",
        "_id": "5eff0426ab641f1960d8a6ae",
        "createdAt": "2020-07-03T10:10:46.753Z",
        "updatedAt": "2020-07-20T08:34:12.685Z",
        "__v": 0
    },
    "message": "Data fetched Successfully"
}
*/
namedRouter.get("api.probe-finder.details", '/probe-finder/details/:slug', request_param.any(), async (req, res) => {
    try {
        const success = await probeFinderController.probeFinderDetails(req);
        res.status(success.status).send(success);
    }
    catch (error) {
        res.status(error.status).send(error);
    }
});


module.exports = router;