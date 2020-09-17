const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const aboutController = require('about/controllers/about.controller');
const brain_initiativeController = require('about/controllers/brain-initiative.controller');
const science_update_collaborationController = require('about/controllers/science-update-collaboration.controller');
const careersController = require('about/controllers/careers.controller');
const distributorsController = require('about/controllers/distributors.controller');
// const auth = require("../../middlewares/auth")();

const multer = require('multer');
const request_param = multer();

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./public/uploads/cms/");
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({
    storage: Storage
});

//authentication section of about
namedRouter.all('/about*', auth.authenticate);

namedRouter.get("admin.about.editaboutus", '/about/editaboutus/', aboutController.editaboutus);
namedRouter.post("admin.about.updateaboutus", '/about/updateaboutus/', uploadFile.any(), aboutController.updateaboutus);


namedRouter.get("admin.about.edit", '/about/edit/', aboutController.editmeet_the_team);
namedRouter.post("admin.about.update", '/about/update', uploadFile.any(), aboutController.updatemeet_the_team);

// leadership Listing Route
namedRouter.get("admin.about.leadership.list", '/about/leadership/list', aboutController.list);

// leadership Get All Route
namedRouter.post("admin.about.leadership.getall", '/about/leadership/getall', async (req, res) => {
    try {
        const success = await aboutController.getAll(req, res);
        res.send({
            "meta": success.meta,
            "data": success.data
        });
    } catch (error) {
        res.status(error.status).send(error);
    }
});

// leadership Create Route
namedRouter.get("admin.about.leadership.create", '/about/leadership/create', aboutController.create);

// leadership Insert Route
namedRouter.post("admin.about.leadership.insert", '/about/leadership/insert', uploadFile.any(), aboutController.insert);

// leadership Edit Route
namedRouter.get("admin.about.leadership.edit", "/about/leadership/edit/:id", aboutController.edit);

// leadership Update Route
namedRouter.post("admin.about.leadership.update", '/about/leadership/update', uploadFile.any(), aboutController.update);

// leadership Delete Route
namedRouter.get("admin.about.leadership.delete", "/about/leadership/delete/:id", aboutController.delete);

// leadership status change
namedRouter.get("admin.about.leadership.statusChange", '/about/leadership/status-change/:id', aboutController.statusChange);

//Export the express.Router() instance

//////////////////////////////sales///////////////////////////
// sales Listing Route
namedRouter.get("admin.about.sales.list", '/about/sales/list', aboutController.listSales);

// sales Get All Route
namedRouter.post("admin.about.sales.getall", '/about/sales/getall', async (req, res) => {
    try {
        const success = await aboutController.getAllSales(req, res);
        res.send({
            "meta": success.meta,
            "data": success.data
        });
    } catch (error) {
        res.status(error.status).send(error);
    }
});

// sales Create Route
namedRouter.get("admin.about.sales.create", '/about/sales/create', aboutController.createSales);

// sales Insert Route
namedRouter.post("admin.about.sales.insert", '/about/sales/insert', uploadFile.any(), aboutController.insertSales);

// sales Edit Route
namedRouter.get("admin.about.sales.edit", "/about/sales/edit/:id", aboutController.editSales);

// sales Update Route
namedRouter.post("admin.about.sales.update", '/about/sales/update', uploadFile.any(), aboutController.updateSales);

// sales Delete Route
namedRouter.get("admin.about.sales.delete", "/about/sales/delete/:id", aboutController.deleteSales);

// sales status change
namedRouter.get("admin.about.sales.statusChange", '/about/sales/status-change/:id', aboutController.statusChangeSales);

//Export the express.Router() instance
////////////////////////////////////////////////////////////////////////////
////brain_initiative

namedRouter.get("admin.about.edit_brain_initiative", '/about/edit_brain_initiative/', brain_initiativeController.editbrain);
namedRouter.post("admin.about.update_brain_initiative", '/about/update_brain_initiative', uploadFile.any(), brain_initiativeController.updatebrain);

// brain_initiative_tab Listing Route
namedRouter.get("admin.about.brain_initiative_tab.list", '/about/brain_initiative_tab/list', brain_initiativeController.list);

// brain_initiative_tab Get All Route
namedRouter.post("admin.about.brain_initiative_tab.getall", '/about/brain_initiative_tab/getall', async (req, res) => {
    try {
        const success = await brain_initiativeController.getAll(req, res);
        res.send({
            "meta": success.meta,
            "data": success.data
        });
    } catch (error) {
        res.status(error.status).send(error);
    }
});

// brain_initiative_tab Create Route
namedRouter.get("admin.about.brain_initiative_tab.create", '/about/brain_initiative_tab/create', brain_initiativeController.create);

// brain_initiative_tab Insert Route
namedRouter.post("admin.about.brain_initiative_tab.insert", '/about/brain_initiative_tab/insert', uploadFile.any(), brain_initiativeController.insert);

// brain_initiative_tab Edit Route
namedRouter.get("admin.about.brain_initiative_tab.edit", "/about/brain_initiative_tab/edit/:id", brain_initiativeController.edit);

// brain_initiative_tab Update Route
namedRouter.post("admin.about.brain_initiative_tab.update", '/about/brain_initiative_tab/update', uploadFile.any(), brain_initiativeController.update);

// brain_initiative_tab Delete Route
namedRouter.get("admin.about.brain_initiative_tab.delete", "/about/brain_initiative_tab/delete/:id", brain_initiativeController.delete);

// brain_initiative_tab status change
namedRouter.get("admin.about.brain_initiative_tab.statusChange", '/about/brain_initiative_tab/status-change/:id', brain_initiativeController.statusChange);


////////////////////////////////////////////////////////////////////////////
////science_update_collaboration

namedRouter.get("admin.about.edit_science_update_collaboration", '/about/edit_science_update_collaboration/', science_update_collaborationController.editscience);
namedRouter.post("admin.about.update_science_update_collaboration", '/about/update_science_update_collaboration', uploadFile.any(), science_update_collaborationController.updatescience);

// science_update_collaboration_tab Listing Route
namedRouter.get("admin.about.science_update_collaboration_tab.list", '/about/science_update_collaboration_tab/list', science_update_collaborationController.list);

// science_update_collaboration_tab Get All Route
namedRouter.post("admin.about.science_update_collaboration_tab.getall", '/about/science_update_collaboration_tab/getall', async (req, res) => {
    try {
        const success = await science_update_collaborationController.getAll(req, res);
        res.send({
            "meta": success.meta,
            "data": success.data
        });
    } catch (error) {
        res.status(error.status).send(error);
    }
});

// science_update_collaboration_tab Create Route
namedRouter.get("admin.about.science_update_collaboration_tab.create", '/about/science_update_collaboration_tab/create', science_update_collaborationController.create);

// science_update_collaboration_tab Insert Route
namedRouter.post("admin.about.science_update_collaboration_tab.insert", '/about/science_update_collaboration_tab/insert', uploadFile.any(), science_update_collaborationController.insert);

// science_update_collaboration_tab Edit Route
namedRouter.get("admin.about.science_update_collaboration_tab.edit", "/about/science_update_collaboration_tab/edit/:id", science_update_collaborationController.edit);

// science_update_collaboration_tab Update Route
namedRouter.post("admin.about.science_update_collaboration_tab.update", '/about/science_update_collaboration_tab/update', uploadFile.any(), science_update_collaborationController.update);

// science_update_collaboration_tab Delete Route
namedRouter.get("admin.about.science_update_collaboration_tab.delete", "/about/science_update_collaboration_tab/delete/:id", science_update_collaborationController.delete);

// science_update_collaboration_tab status change
namedRouter.get("admin.about.science_update_collaboration_tab.statusChange", '/about/science_update_collaboration_tab/status-change/:id', science_update_collaborationController.statusChange);

////////////////////////////////////////////////////////////////////////////
////careers

namedRouter.get("admin.about.edit_careers", '/about/edit_careers/', careersController.editcareers);
namedRouter.post("admin.about.update_careers", '/about/update_careers', uploadFile.any(), careersController.updatecareers);

// careers_opening Listing Route
namedRouter.get("admin.about.careers_opening.list", '/about/careers_opening/list', careersController.list);

// careers_opening Get All Route
namedRouter.post("admin.about.careers_opening.getall", '/about/careers_opening/getall', async (req, res) => {
    try {
        const success = await careersController.getAll(req, res);
        res.send({
            "meta": success.meta,
            "data": success.data
        });
    } catch (error) {
        res.status(error.status).send(error);
    }
});

// careers_opening Create Route
namedRouter.get("admin.about.careers_opening.create", '/about/careers_opening/create', careersController.create);

// careers_opening Insert Route
namedRouter.post("admin.about.careers_opening.insert", '/about/careers_opening/insert', uploadFile.any(), careersController.insert);

// careers_opening Edit Route
namedRouter.get("admin.about.careers_opening.edit", "/about/careers_opening/edit/:id", careersController.edit);

// careers_opening Update Route
namedRouter.post("admin.about.careers_opening.update", '/about/careers_opening/update', uploadFile.any(), careersController.update);

// careers_opening Delete Route
namedRouter.get("admin.about.careers_opening.delete", "/about/careers_opening/delete/:id", careersController.delete);

// careers_opening status change
namedRouter.get("admin.about.careers_opening.statusChange", '/about/careers_opening/status-change/:id', careersController.statusChange);


////////////////////////////////////////////////////////////////////////////
////distributors

namedRouter.get("admin.about.edit_distributors", '/about/edit_distributors/', distributorsController.editdistributors);
namedRouter.post("admin.about.update_distributors", '/about/update_distributors', uploadFile.any(), distributorsController.updatedistributors);

// partners Listing Route
namedRouter.get("admin.about.partners.list", '/about/partners/list', distributorsController.list);

// partners Get All Route
namedRouter.post("admin.about.partners.getall", '/about/partners/getall', async (req, res) => {
    try {
        const success = await distributorsController.getAll(req, res);
        res.send({
            "meta": success.meta,
            "data": success.data
        });
    } catch (error) {
        res.status(error.status).send(error);
    }
});

// partners Create Route
namedRouter.get("admin.about.partners.create", '/about/partners/create', distributorsController.create);

// partners Insert Route
namedRouter.post("admin.about.partners.insert", '/about/partners/insert', uploadFile.any(), distributorsController.insert);

// partners Edit Route
namedRouter.get("admin.about.partners.edit", "/about/partners/edit/:id", distributorsController.edit);

// partners Update Route
namedRouter.post("admin.about.partners.update", '/about/partners/update', uploadFile.any(), distributorsController.update);

// partners Delete Route
namedRouter.get("admin.about.partners.delete", "/about/partners/delete/:id", distributorsController.delete);

// partners status change
namedRouter.get("admin.about.partners.statusChange", '/about/partners/status-change/:id', distributorsController.statusChange);



module.exports = router;