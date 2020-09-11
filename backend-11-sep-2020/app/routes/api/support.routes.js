const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const request_param = multer();
const supportController = require('webservice/support.controller');




/**
 * @api {get} /support/list Support List
 * @apiVersion 1.0.0
 * @apiGroup Support
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "title": "Mapping and Wiring",
            "content": "<p>A mapping document describes the relationships between input and output channels.</p>\r\n\r\n<p><a href=\"https://neuronexus.com/support/mapping-and-wiring/probe-mapping/\">Probe maps</a> are organized by Probe Package, as each may be different. Always check with the settings in your acquisition systems to make sure that the maps are properly decoded in your software.</p>\r\n\r\n<p><a href=\"https://neuronexus.com/support/mapping-and-wiring/adaptor-mapping/\">Adaptor maps</a> are necessary to convert the Probe package pin-out to the adaptor pin-out.</p>\r\n\r\n<p><a href=\"https://neuronexus.com/support/mapping-and-wiring/smartlink-mapping/\">SmartLink&trade; maps</a> describe the relationship between an electrode site and a connector channel through the SmartLink&trade; headstage.</p>\r\n\r\n<p>Some Probe packages have <a href=\"https://neuronexus.com/support/mapping-and-wiring/wiring-configuration/\">customizable wiring configurations</a> to enable various ground and reference connections. NeuroNexus probes are designed for maximum flexibility, as recording setups vary greatly from lab to lab.</p>\r\n",
            "parent_id": null,
            "isDeleted": false,
            "status": "Active",
            "_id": "5ed0c8b1e03c10224c797653",
            "createdAt": "2020-05-29T08:32:49.256Z",
            "updatedAt": "2020-05-29T08:32:49.256Z",
            "__v": 0
        },
        {
            "title": "Ordering",
            "content": "<p>To match orders to appropriate users/labs, we require all information in the&nbsp;<a href=\"https://neuronexus.com/wp-content/uploads/2018/07/InfoForm_2018.pdf\">Information Form</a>&nbsp;to be filled out. If you have obtained a quote from us, please include it with your purchase order(s). It is very important that you identify the technical contact (or the actual user) for each order for order coordination.</p>\r\n\r\n<p>If you have ordered from us before and have the Information Form already on file,&nbsp;<a href=\"https://neuronexus.com/contact/\">contact us directly</a>&nbsp;and we will send you a quote. &nbsp;If no quote is necessary, send your Purchase Order directly to&nbsp;<a href=\"mailto:sales@neuronexus.com\">sales@neuronexus.com</a>, or fax it to +1.734.786.0069.</p>\r\n\r\n<h3>DELIVERY SCHEDULE</h3>\r\n\r\n<p>Most NeuroNexus probes are built to order. Typical delivery time will take approximately 4 weeks if we do not have fully assembled probes in stock. If you have a specific experimental deadline that you need to meet, please advise the sales coordinator at the time of the order. We will do our best to accommodate such deadlines, but regrettably cannot always satisfy needs. Please order early if you can.</p>\r\n\r\n<h3>BULK DISCOUNT</h3>\r\n\r\n<p>Receive a 10% discount for bulk orders of standard catalog probe design totaling over $7,500. Starting a new lab and are a believer in our technology? Contact us for a bulk order quote!</p>\r\n\r\n<h3>IMPORT DUTY TAXES</h3>\r\n\r\n<p>If you are required to pay import duty on shipments, contact us to reduce your fees. Instead of paying cash on delivery, pre-pay and save up to 10% on import duties.</p>\r\n\r\n<p><a href=\"/contact\">Contact NeuroNexus</a></p>\r\n",
            "parent_id": null,
            "isDeleted": false,
            "status": "Active",
            "_id": "5ed0d6afb3b6a6289c72e01e",
            "createdAt": "2020-05-29T09:32:31.409Z",
            "updatedAt": "2020-05-29T09:32:31.409Z",
            "__v": 0
        }
    ],
    "message": "Record fetched Successfully"
}
*/
namedRouter.get("api.support.list", '/support/list', async (req, res) => {
  try {
    const success = await supportController.getAllsupportcategory(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});


/**
 * @api {get} /support/static Support Static Contents
 * @apiVersion 1.0.0
 * @apiGroup Support
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": {
        "title": "NeuroNexus provides first-class support",
        "content": "<p>Find supporting document and information on all NeuroNexus products.&nbsp; We are producing new <a href=\"https://neuronexus.com/support/video-guides\">video guides</a> &ndash; if you&rsquo;d like to see a video guide for a topic or product for video, <a href=\"https://neuronexus.com/contact/\">leave us a message!</a></p>\r\n\r\n<p>Have questions?&nbsp; Or have something to share?&nbsp; Check out the <a href=\"https://neuronexus.com/support/community-powered-support\">community-powered support site</a> with answers to frequently asked questions or ask your peers directly.</p>\r\n",
        "isDeleted": false,
        "status": "Active",
        "_id": "5ed0c437c7d64cd82bba90cd",
        "updatedAt": "2020-05-29T08:16:48.138Z"
    },
    "message": "Record fetched Successfully"
}
*/
namedRouter.get("api.support.static", '/support/static', async (req, res) => {
  try {
    const success = await supportController.getsupportstatic(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});

/**
 * @api {get} /support/details/:slug Support Detail by Id
 * @apiVersion 1.0.0
 * @apiGroup Support
 * @apiparam id Support Id
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "title": "O Series Connectors",
            "slug": "o-series-connectors-0a5c2",
            "content": "<p>O-Series Packages feature integrated optical fibers for combined optogenetics and electrophysiology. Certain probe and package combinations allow for multiple optical fibers &ndash; your NeuroNexus sales representative will assist you in configuring a multi-fiber optrode.</p>\r\n\r\n<table>\r\n\t<tbody>\r\n\t\t<tr>\r\n\t\t\t<th style=\"text-align:left\">Package</th>\r\n\t\t\t<th style=\"text-align:left\">Weight</th>\r\n\t\t\t<th style=\"text-align:left\"># CH</th>\r\n\t\t\t<th style=\"text-align:left\">Connector</th>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td><a href=\"https://neuronexus.com/wp-content/uploads/2019/02/Package_Specs_2019_OA16LP.png\">OA16LP</a></td>\r\n\t\t\t<td>1.40 g</td>\r\n\t\t\t<td>16</td>\r\n\t\t\t<td>DIP: pin length: 5.5 mm , spacing: 2.5 mm</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td><a href=\"https://neuronexus.com/wp-content/uploads/2019/02/Package_Specs_2019_OA32LP.png\">OA32LP</a></td>\r\n\t\t\t<td>1.40 g</td>\r\n\t\t\t<td>32</td>\r\n\t\t\t<td>Samtec MOLC-110-01-S-Q</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td><a href=\"https://neuronexus.com/wp-content/uploads/2019/02/Package_Specs_2019_OCM16LP.png\">OCM16LP</a></td>\r\n\t\t\t<td>0.25 g</td>\r\n\t\t\t<td>16</td>\r\n\t\t\t<td>Omnetics NPD18 (2 guideposts)</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td><a href=\"https://neuronexus.com/wp-content/uploads/2019/02/Package_Specs_2019_OCM32LP.png\">OCM32LP</a></td>\r\n\t\t\t<td>0.35 g</td>\r\n\t\t\t<td>32</td>\r\n\t\t\t<td>Omnetics NPD36 (4 guideposts)</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td><a href=\"https://neuronexus.com/wp-content/uploads/2019/02/Package_Specs_2019_OZ16LP.png\">OZ16LP</a></td>\r\n\t\t\t<td>0.30 g</td>\r\n\t\t\t<td>16</td>\r\n\t\t\t<td>Connects to TDT ZC16 headstage</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td><a href=\"https://neuronexus.com/wp-content/uploads/2019/02/Package_Specs_2019_OZ32LP.png\">OZ32LP</a></td>\r\n\t\t\t<td>0.30 g</td>\r\n\t\t\t<td>32</td>\r\n\t\t\t<td>Connects to TDT ZC32 headstage</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td>OA64LP</td>\r\n\t\t\t<td>&nbsp;</td>\r\n\t\t\t<td>&nbsp;</td>\r\n\t\t\t<td>2x&nbsp;Samtec MOLC-110-01-S-Q</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td>OA64LP_v2</td>\r\n\t\t\t<td>&nbsp;</td>\r\n\t\t\t<td>&nbsp;</td>\r\n\t\t\t<td>2x&nbsp;Samtec MOLC-110-01-S-Q</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td>OH64LP (oDrive)</td>\r\n\t\t\t<td>&nbsp;</td>\r\n\t\t\t<td>&nbsp;</td>\r\n\t\t\t<td>2x&nbsp;Omnetics NPD36 (4 guideposts)</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td>OXA64LP (Optogenix)</td>\r\n\t\t\t<td>&nbsp;</td>\r\n\t\t\t<td>&nbsp;</td>\r\n\t\t\t<td>2x&nbsp;Samtec MOLC-110-01-S-Q</td>\r\n\t\t</tr>\r\n\t</tbody>\r\n</table>\r\n\r\n<p><a href=\"/contact\">Contact NeuroNexus</a></p>\r\n",
            "parent_id": "5ed0e3070b7931236cd3713b",
            "isDeleted": false,
            "isHome": false,
            "order_sort": "",
            "image": "",
            "status": "Active",
            "_id": "5ed2003cc7d64cd82bc0a5c2",
            "createdAt": "2020-05-29T10:33:00.088Z",
            "updatedAt": "2020-07-20T14:27:27.481Z",
            "__v": 0
        }
    ],
    "message": "Record fetched Successfully"
}
*/
namedRouter.get("api.support.detail", '/support/details/:slug', async (req, res) => {
  try {
    const success = await supportController.getAllsupportcategory(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});


/**
 * @api {get} /support/:category_id Support Detail by Category Id
 * @apiVersion 1.0.0
 * @apiGroup Support
 * @apiparam category_id Support Category Id
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "_id": "5ece36e35b74191d706ef164",
            "title": "Example Title One updated",
            "description": "<p>Example Sentance one update</p>\r\n",
            "sub_category_id": "5ece258001c0531fb8413a48",
            "status": "Active",
            "isDeleted": false,
            "createdAt": "2020-05-27T09:43:03.435Z",
            "sub_category_name": "testc",
            "category_id": "5ece233157a3391bbcceaebb",
            "category_name": "testp"
        },
        {
            "_id": "5ece37135b74191d706ef165",
            "title": "Sample Question One",
            "description": "<p>Sample Sentance One</p>\r\n",
            "sub_category_id": "5ece3105565b7b1d381e53f1",
            "status": "Active",
            "isDeleted": false,
            "createdAt": "2020-05-27T09:43:03.435Z",
            "sub_category_name": "test2c",
            "category_id": "5ece233157a3391bbcceaebb",
            "category_name": "testp"
        }
       
    ],
    "message": "Record fetched Successfully"
}
*/
namedRouter.get("api.support", '/support/:category_id', async (req, res) => {
  try {
    const success = await supportController.getAllsupportcategory(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});









module.exports = router;