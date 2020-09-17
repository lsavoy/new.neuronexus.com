const aboutRepo = require('about/repositories/about.repository');
const brainRepo = require('about/repositories/brain-initiative.repository');
const scienceRepo = require('about/repositories/science-update-collaboration.repository');
const careersRepo = require('about/repositories/careers.repository');
const distributorsRepo = require('about/repositories/distributors.repository');

/* 
// @Method: getAllLeadership
// @Description: Leadership
*/
exports.getAllLeadership = async req => {
    try {
        var searchQuery = {
            "isDeleted": false,
            "status": "Active"
        };
        var leadership = await aboutRepo.getAllByFieldLeadership(searchQuery);
        return { status: 200, data: leadership, message: 'Leadership fetched Successfully' };
    } catch (error) {
        return { "status": 500, data: {}, "message": error.message }
    }
};

exports.getAllSales = async req => {
    try {
        var searchQuery = {
            "isDeleted": false,
            "status": "Active"
        };
        var Sales = await aboutRepo.getAllByFieldSales(searchQuery);
        return { status: 200, data: Sales, message: 'Sales fetched Successfully' };
    } catch (error) {
        return { "status": 500, data: {}, "message": error.message }
    }
};


/* 
// @Method: getAboutUs
// @Description: About
*/
exports.getAboutUs = async req => {
    try {
        var searchQuery = {
            "isDeleted": false,
            "status": "Active"
        };
        var about = await aboutRepo.aboutusGetByField(searchQuery);
        return { status: 200, data: about, message: 'Record fetched Successfully' };
    } catch (error) {
        return { "status": 500, data: {}, "message": error.message }
    }
};



/* 
// @Method: getAboutmeet_the_teamStaticContents
// @Description: About
*/
exports.getAboutmeet_the_teamStaticContents = async req => {
    try {
        var searchQuery = {
            "isDeleted": false,
            "status": "Active"
        };
        var about = await aboutRepo.meet_the_teamGetByField(searchQuery);
        return { status: 200, data: about, message: 'Record fetched Successfully' };
    } catch (error) {
        return { "status": 500, data: {}, "message": error.message }
    }
};

/* 
// @Method: getbrain_initiativeContents
// @Description: About
*/
exports.getbrain_initiativeContents = async req => {
    try {
        var searchQuery = {
            "isDeleted": false,
            "status": "Active"
        };
        var about = await brainRepo.brainGetByField(searchQuery);
        return { status: 200, data: about, message: 'Record fetched Successfully' };
    } catch (error) {
        return { "status": 500, data: {}, "message": error.message }
    }
};

/* 
// @Method: getAllbrain_initiative_tabs
// @Description: About
*/
exports.getAllbrain_initiative_tabs = async req => {
    try {
        var searchQuery = {
            "isDeleted": false,
            "status": "Active"
        };
        var brain = await brainRepo.getAllByField(searchQuery);
        return { status: 200, data: brain, message: 'Record fetched Successfully' };
    } catch (error) {
        return { "status": 500, data: {}, "message": error.message }
    }
};


/* 
// @Method: getscience_update_collaborationContents
// @Description: About
*/
exports.getscience_update_collaborationContents = async req => {
    try {
        var searchQuery = {
            "isDeleted": false,
            "status": "Active"
        };
        var science = await scienceRepo.scienceGetByField(searchQuery);
        return { status: 200, data: science, message: 'Record fetched Successfully' };
    } catch (error) {
        return { "status": 500, data: {}, "message": error.message }
    }
};


/* 
// @Method: getAllscience_update_collaboration_tabs
// @Description: About
*/
exports.getAllscience_update_collaboration_tabs = async req => {
    try {
        var searchQuery = {
            "isDeleted": false,
            "status": "Active"
        };
        var science = await scienceRepo.getAllByField(searchQuery);
        return { status: 200, data: science, message: 'Record fetched Successfully' };
    } catch (error) {
        return { "status": 500, data: {}, "message": error.message }
    }
};

/* 
// @Method: getcareersContents
// @Description: About
*/
exports.getcareersContents = async req => {
    try {
        var searchQuery = {
            "isDeleted": false,
            "status": "Active"
        };
        var careers = await careersRepo.careersGetByField(searchQuery);
        return { status: 200, data: careers, message: 'Record fetched Successfully' };
    } catch (error) {
        return { "status": 500, data: {}, "message": error.message }
    }
};


/* 
// @Method: getAllcareers_opening
// @Description: About
*/
exports.getAllcareers_opening = async req => {
    try {
        var searchQuery = {
            "isDeleted": false,
            "status": "Active"
        };
        var careers = await careersRepo.getAllByField(searchQuery);
        return { status: 200, data: careers, message: 'Record fetched Successfully' };
    } catch (error) {
        return { "status": 500, data: {}, "message": error.message }
    }
};


/* 
// @Method: getdistributorsContents
// @Description: About
*/
exports.getdistributorsContents = async req => {
    try {
        var searchQuery = {
            "isDeleted": false,
            "status": "Active"
        };
        var distributors = await distributorsRepo.distributorsGetByField(searchQuery);
        return { status: 200, data: distributors, message: 'Record fetched Successfully' };
    } catch (error) {
        return { "status": 500, data: {}, "message": error.message }
    }
};


/* 
// @Method: getAllpartners
// @Description: About
*/
exports.getAllpartners = async req => {
    try {
        var searchQuery = {
            "isDeleted": false,
            "status": "Active"
        };
        var partners = await distributorsRepo.getAllByField(searchQuery);
        return { status: 200, data: partners, message: 'Record fetched Successfully' };
    } catch (error) {
        return { "status": 500, data: {}, "message": error.message }
    }
};


