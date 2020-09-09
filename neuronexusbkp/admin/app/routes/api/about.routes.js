const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const request_param = multer();
const aboutController = require('webservice/about.controller');




/**
 * @api {get} /about/aboutus/staticinfo Aboutus Static Contents
 * @apiVersion 1.0.0
 * @apiGroup About
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": {
        "title_h2": "About",
        "title_h3": "NeuroNexus",
        "image": "image_1590414077396_system_img.jpg",
        "content": "<p>NeuroNexus is a fast-growing neurotechnology company that develops and commercializes high-value neural interface technology, components, systems, and software for neuroscience and clinical applications.</p>\r\n\r\n<p>Originally developed at the University of Michigan, NeuroNexus&rsquo; suite of commercialized technologies has, for over a decade, led to hundreds of publications from research labs all around the world. Our products include conventional and high-density leads, recording and stimulation systems, and software for data analytics. Our products have been used in a wide variety of animal models from fruit fly to rodent to non-human primates. NeuroNexus is currently working to make our state-of-the-art technologies and systems available for human clinical research.</p>\r\n\r\n<p>NeuroNexus&rsquo; proprietary microelectronic, fluidic, and optical technology is used to &ldquo;map&rdquo; brain function, detect neural activity, and stimulate or modulate neural circuits when brain function is impaired.</p>\r\n\r\n<p>NeuroNexus is located in Ann Arbor, Michigan, USA.</p>\r\n",
        "isDeleted": false,
        "status": "Active",
        "_id": "5ec91b10c7d64cd82b95fb21",
        "updatedAt": "2020-05-25T13:41:17.507Z"
    },
    "message": "Record fetched Successfully"
}
*/



namedRouter.get("api.about.aboutus.staticinfo", '/about/aboutus/staticinfo', async (req, res) => {
  try {
    const success = await aboutController.getAboutUs(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});

/**
 * @api {get} /about/meet-the-team/staticinfo meet-the-team Static Contents
 * @apiVersion 1.0.0
 * @apiGroup About
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": {
        "title_h2": "Meet The",
        "title_h3": "NeuroNexus Team",
        "image": "image_1590239400105_team_img.jpg",
        "content": "<p _ngcontent-eqy-c43=\"\">Welcome! We’re glad you’re here. </p>\r\n<p _ngcontent-eqy-c43=\"\">The NeuroNexus team brings together decades of combined experience in neuroscience research, probe design, microfabrication, and assembly. We’re always excited to see what researchers are doing in their fields and how the probes and devices we build get used.</p>",
        "isDeleted": false,
        "status": "Active",
        "_id": "5ec91b10c7d64cd82b95fb21",
        "updatedAt": "2020-05-23T13:10:00.558Z"
    },
    "message": "Record fetched Successfully"
}
*/



namedRouter.get("api.about.meet-the-team.staticinfo", '/about/meet-the-team/staticinfo', async (req, res) => {
  try {
    const success = await aboutController.getAboutmeet_the_teamStaticContents(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});

/**
 * @api {get} /about/leadership/list Leadership List
 * @apiVersion 1.0.0
 * @apiGroup About
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "name": "Daryl R. Kipke",
            "qualification": "PhD",
            "designation": "President, Chief Executive Officer",
            "description": "Dr. Kipke is an internationally recognized expert in neurotechnology and biomedical engineering. He served as CEO/Founder of NeuroNexus from its initial spinout from the University of Michigan in 2004 to its acquisition by Greatbatch, Inc. in 2012. Dr. Kipke also holds the position of Professor of Biomedical Engineering at the University of Michigan and directs a leading academic research program in neural engineering, neuroprostheses, and biomaterials. Previously, Dr. Kipke co-founded and served as CSO and Board Member for Neural Intervention Technologies, Inc., which spun out from the University of Michigan in 2001 and was acquired by W.L. Gore, Inc. in 2006. Dr. Kipke is a Fellow of the American Institute of Medical and Biological Engineering and serves on several institutional advisory boards in biomedical engineering and neurotechnology.",
            "image": "image_1590391401163_leader1.jpg",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ecb6f20ddbd260df04cfcc0",
            "createdAt": "2020-05-25T07:09:20.157Z",
            "updatedAt": "2020-05-25T07:24:49.036Z",
            "__v": 0
        },
        {
            "name": "Rio Vetter",
            "qualification": "PhD",
            "designation": "Vice President, Chief Technology Officer",
            "description": "Dr. Vetter leads the research and development of new technologies towards innovative, new products directed at research and clinical applications. He also directs the organization’s technical infrastructure. Dr. Vetter has leadership experience through directing in-house R&D and production teams, as well as federally funded multi-institutional and international R&D programs.",
            "image": "image_1590391855858_leader2.jpg",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ecb742fd86c9606c800db86",
            "createdAt": "2020-05-25T07:30:55.957Z",
            "updatedAt": "2020-05-25T07:30:55.957Z",
            "__v": 0
        }
    ],
    "message": "Leadership fetched Successfully"
}
*/
namedRouter.get("api.about.leadership.list", '/about/leadership/list', async (req, res) => {
  try {
    const success = await aboutController.getAllLeadership(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});

/**
 * @api {get} /about/brain_initiative/staticinfo  Brain Initiative Static Contents
 * @apiVersion 1.0.0
 * @apiGroup About
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": {
        "image": "image_1590422349604_BRAINblogImg.jpg",
        "content": "<p>If you are writing a proposal to the&nbsp;<a href=\"http://www.braininitiative.nih.gov/\">NIH BRAIN Initiative&reg;,</a>&nbsp;we invite you to consider NeuroNexus as a collaborator or supplier for your research program.</p>\r\n\r\n<p>As an official BRAIN Initiative&reg; industry partner, NeuroNexus is uniquely positioned at the intersection of neuroscience, technology, and clinical applications.</p>\r\n",
        "isDeleted": false,
        "status": "Active",
        "_id": "5ecbe560c7d64cd82ba21aa6",
        "updatedAt": "2020-05-25T15:59:09.740Z"
    },
    "message": "Record fetched Successfully"
}
*/



namedRouter.get("api.about.brain_initiative.staticinfo", '/about/brain_initiative/staticinfo', async (req, res) => {
  try {
    const success = await aboutController.getbrain_initiativeContents(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});

/**
 * @api {get} /about/brain_initiative_tabs/list Brain initiative tabs list
 * @apiVersion 1.0.0
 * @apiGroup About
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "title": "Neuromodulation Technologies",
            "content": "<p>NeuroNexus has access to state-of-the-art neuromodulation technologies and devices used in human therapies. The NeuroNexus neuromodulation catalog includes both conventional neuromodulation leads, as well as high-density, thin-film microelectrodes. Both types of leads can be customized and configured for recording and/or stimulation.</p>\r\n\r\n<p>To learn more about our offerings for clinical research applications, download the&nbsp;<a href=\"https://neuronexus.com/wp-content/uploads/2019/02/NeuroNexus_Neuromodulation_Brochure.pdf\">Neuromodulation brochure.</a>&nbsp;Contact us today to discuss your research, and learn how our turnkey solutions can get you up and running quickly.</p>\r\n",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ecbef301c2ade0e9cfcd9dc",
            "createdAt": "2020-05-25T16:15:44.513Z",
            "updatedAt": "2020-05-25T16:20:18.323Z",
            "__v": 0
        }
    ],
    "message": "Record fetched Successfully"
}
*/
namedRouter.get("api.about.brain_initiative_tabs.list", '/about/brain_initiative_tabs/list', async (req, res) => {
  try {
    const success = await aboutController.getAllbrain_initiative_tabs(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});

//
/**
 * @api {get} /about/science_update_collaboration/staticinfo  Science update collaboration static contents
 * @apiVersion 1.0.0
 * @apiGroup About
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": {
        "title": "Science Update Collaboration",
        "content": "<p>Science Update provides a forum for users to communicate, collaborate, and share their published work. We are looking for graduate students or postdoctoral fellows to work with us on keeping the Science Update current and comprehensive.</p>\r\n\r\n<p>This is how it works: Chosen participants will be sent a pack of research papers to read, with an attached set of basic questions to answer for each paper. Once you finish that pack of papers and submit your answers to us, we validate the information and send you a check.</p>\r\n\r\n<p>For more information on program details and pay scale, please send the required information to&nbsp;<a href=\"mailto:support@neuronexus.com\">support@neuronexus.com</a>.</p>\r\n",
        "isDeleted": false,
        "status": "Active",
        "_id": "5ecccb7ac7d64cd82ba61743",
        "updatedAt": "2020-05-26T07:58:25.352Z"
    },
    "message": "Record fetched Successfully"
}
*/



namedRouter.get("api.about.science_update_collaboration.staticinfo", '/about/science_update_collaboration/staticinfo', async (req, res) => {
  try {
    const success = await aboutController.getscience_update_collaborationContents(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});

/**
 * @api {get} /about/science_update_collaboration_tabs/list Science update collaboration tabs list
 * @apiVersion 1.0.0
 * @apiGroup About
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "title": "Program Benefits",
            "content": "<h3>Participant Requirements</h3>\r\n\r\n<ul>\r\n\t<li>An undergrad degree in a related engineering or science field</li>\r\n\t<li>Enrollment in a graduate school program OR employment as a post-doctoral fellow</li>\r\n\t<li>A curriculum vitae (CV) or resume</li>\r\n</ul>\r\n",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ecccec220319c2cd4318bd5",
            "createdAt": "2020-05-26T08:09:38.883Z",
            "updatedAt": "2020-05-26T08:14:55.706Z",
            "__v": 0
        },
        {
            "title": "Participant Requirements",
            "content": "<h3>Participant Requirements</h3>\r\n\r\n<ul>\r\n\t<li>An undergrad degree in a related engineering or science field</li>\r\n\t<li>Enrollment in a graduate school program OR employment as a post-doctoral fellow</li>\r\n\t<li>A curriculum vitae (CV) or resume</li>\r\n</ul>\r\n\r\n<p>&nbsp;</p>\r\n",
            "isDeleted": false,
            "status": "Active",
            "_id": "5eccd1189687b22130783f4c",
            "createdAt": "2020-05-26T08:19:36.358Z",
            "updatedAt": "2020-05-26T08:19:59.086Z",
            "__v": 0
        }
    ],
    "message": "Record fetched Successfully"
}
*/
namedRouter.get("api.about.science_update_collaboration_tabs.list", '/about/science_update_collaboration_tabs/list', async (req, res) => {
  try {
    const success = await aboutController.getAllscience_update_collaboration_tabs(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});


//
/**
 * @api {get} /about/careers/staticinfo Careers static contents
 * @apiVersion 1.0.0
 * @apiGroup About
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": {
        "title": "Careers with NeuroNexus",
        "content": "<p>NeuroNexus offers a fast-paced work environment that challenges employees to be both productive and creative.</p>\r\n\r\n<p>Employees work independently within a team and are encouraged to explore new solutions to existing problems while, at the same time, remaining focused on project objectives. NeuroNexus offers competitive wages and benefits.</p>\r\n",
        "isDeleted": false,
        "status": "Active",
        "_id": "5eccf113c7d64cd82ba6fb6e",
        "updatedAt": "2020-05-26T10:39:37.682Z"
    },
    "message": "Record fetched Successfully"
}
*/



namedRouter.get("api.about.careers.staticinfo", '/about/careers/staticinfo', async (req, res) => {
  try {
    const success = await aboutController.getcareersContents(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});

/**
 * @api {get} /about/careers_opening/list Careers opening list
 * @apiVersion 1.0.0
 * @apiGroup About
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "position": "Microfabrication Engineering Specialist",
            "position_link": "#",
            "isDeleted": false,
            "status": "Active",
            "_id": "5eccf503948768077840b5c9",
            "createdAt": "2020-05-26T10:52:51.708Z",
            "updatedAt": "2020-05-26T10:52:51.708Z",
            "__v": 0
        },
        {
            "position": "Entry Level Account Executive – Cambridge, MA or Ann Arbor, MI",
            "position_link": "#",
            "isDeleted": false,
            "status": "Active",
            "_id": "5eccf51c948768077840b5ca",
            "createdAt": "2020-05-26T10:53:16.530Z",
            "updatedAt": "2020-05-26T10:53:16.530Z",
            "__v": 0
        }
    ],
    "message": "Record fetched Successfully"
}
*/
namedRouter.get("api.about.careers_opening.list", '/about/careers_opening/list', async (req, res) => {
  try {
    const success = await aboutController.getAllcareers_opening(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});

//
/**
 * @api {get} /about/distributors/staticinfo Distributors static contents
 * @apiVersion 1.0.0
 * @apiGroup About
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": {
        "title": "Distributors",
        "image": "image_1590501919620_Distributors.jpg",
        "subtitle": "Our global partners are available to help.",
        "content": "<p>To better serve you, we are working with the following distributor companies outside of the United States.</p>\r\n\r\n<p>If you are conducting research in the countries listed below, contact your local distributor directly to order and for technical support.</p>\r\n",
        "isDeleted": false,
        "status": "Active",
        "_id": "5ecd20bcc7d64cd82ba80693",
        "updatedAt": "2020-05-26T14:05:19.845Z"
    },
    "message": "Record fetched Successfully"
}
*/



namedRouter.get("api.about.distributors.staticinfo", '/about/distributors/staticinfo', async (req, res) => {
  try {
    const success = await aboutController.getdistributorsContents(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});

/**
 * @api {get} /about/partners/list Partners list
 * @apiVersion 1.0.0
 * @apiGroup About
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": [
        {
            "country": "China",
            "company": "Global Biotech Inc",
            "company_link": "#",
            "company_info": "<p>格罗贝尔生物科技有限公司<br />\r\nGLOBAL BIOTECH INC.<br />\r\n上海市徐汇区云锦路500号A幢2526室，200000<br />\r\nRM 2526, Building A, No.500 Yunjin Road, Xuhui District<br />\r\nShanghai 200000 P.R. China<br />\r\nTel: 400 839 0899<br />\r\nE-mail: <a href=\"mailto:info@glo-bio.com.cn\">info@glo-bio.com.cn</a>/ <a href=\"mailto:info@glo-bio.com\">info@glo-bio.com</a><br />\r\nWeb: <a href=\"http://www.glo-bio.com.cn/index.asp\">www.glo-bio.com.cn</a> / <a href=\"https://glo-bio.com/\">www.glo-bio.com</a></p>\r\n",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ecd1dafcf3f671be81d8cf8",
            "createdAt": "2020-05-26T13:46:23.670Z",
            "updatedAt": "2020-05-26T14:45:54.803Z",
            "__v": 0
        },
        {
            "country": "Japan",
            "company": "Bio Research Center Co. Ltd",
            "company_link": "#",
            "company_info": "<p>Yokota Bldg. 2-28-24 Izumi,<br />\r\nHigashi-ku, Nagoya, Japan<br />\r\nTel: +81-52-932-6421<br />\r\nFax: +81-52-932-6755<br />\r\nContact:<br />\r\nMr. Mitsuhiro Edamura: edamura@brck.co.jp</p>\r\n",
            "isDeleted": false,
            "status": "Active",
            "_id": "5ecd1e4bcf3f671be81d8cfa",
            "createdAt": "2020-05-26T13:48:59.528Z",
            "updatedAt": "2020-05-26T14:44:52.639Z",
            "__v": 0
        }
    ],
    "message": "Record fetched Successfully"
}
*/
namedRouter.get("api.about.partners.list", '/about/partners/list', async (req, res) => {
  try {
    const success = await aboutController.getAllpartners(req);
    res.status(success.status).send(success);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});


module.exports = router;