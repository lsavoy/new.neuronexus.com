const mongoose = require('mongoose');
const Category = require('product_category/models/products.model');
const Product_static = require('product_category/models/product_static.model');
const aboutRepo = require('about/repositories/about.repository');
const About = require('about/models/meet_the_team.model');
const Brain = require('about/models/brain-initiative.model');
const Brain_tab = require('about/models/brain-initiative-tabs.model');
const Careers = require('about/models/careers.model');
const Careers_opening = require('about/models/careers-opening.model');
const Distributors = require('about/models/distributors.model');
const Partners = require('about/models/distributors-partners.model');
const Science_update_collaboration = require('about/models/science-update-collaboration.model');
const Science_update_collaboration_tab = require('about/models/science-update-collaboration-tabs.model');
const Contact = require('contact/models/contact.model');
const Supportstatic = require('support/models/support_static.model');
const Supportcategory = require('support/models/support_category.model');
const knowledgeCenterRepo = require('knowledge_center/repositories/knowledgecenter.repository');
const scienceRepo = require("science_update/repositories/science.repository");

const perPage = config.PAGINATION_PERPAGE;

const categoryRepository = {



    getAllByField: async (req) => {
        try {

            let key = req.body.searchkey

            let search = [
                {
                    product_list: await Category.find({
                        $and: [
                            {
                                $or: [{
                                    'name': {
                                        $regex: key,
                                        $options: 'i'
                                    }
                                },
                                {
                                    'content': {
                                        $regex: key,
                                        $options: 'i'
                                    },
                                },
                                {
                                    'section2_name': {
                                        $regex: key,
                                        $options: 'i'
                                    },
                                },
                                {
                                    'section2_location': {
                                        $regex: key,
                                        $options: 'i'
                                    },
                                }]
                            },

                            { "isDeleted": false, "status": "Active" }
                        ]
                    })
                },
                {
                    product_static: await Product_static.find({
                        $and: [
                            {
                                $or: [{
                                    'title': {
                                        $regex: key,
                                        $options: 'i'
                                    }
                                },
                                {
                                    'content': {
                                        $regex: key,
                                        $options: 'i'
                                    },
                                }]
                            },
                            { "isDeleted": false, "status": "Active" }
                        ]

                    })
                },
                {
                    meet_the_team: await About.find({
                        $and: [
                            {
                                $or: [{
                                    'title_h2': {
                                        $regex: key,
                                        $options: 'i'
                                    }
                                }, {
                                    'title_h3': {
                                        $regex: key,
                                        $options: 'i'
                                    }
                                }, {
                                    'content': {
                                        $regex: key,
                                        $options: 'i'
                                    },
                                }]
                            },
                            { "isDeleted": false, "status": "Active" }
                        ]
                    })
                },
                {
                    leadership: await aboutRepo.getAllByFieldLeadership({
                        $and: [
                            {
                                $or: [{
                                    'name': {
                                        $regex: key,
                                        $options: 'i'
                                    }
                                }, {
                                    'description': {
                                        $regex: key,
                                        $options: 'i'
                                    },
                                }]
                            },
                            { "isDeleted": false, "status": "Active" }
                        ]
                    })
                },
                {
                    aboutus: await aboutRepo.aboutusGetByField({
                        $and: [
                            {
                                $or: [{
                                    'title_h2': {
                                        $regex: key,
                                        $options: 'i'
                                    }
                                }, {
                                    'title_h3': {
                                        $regex: key,
                                        $options: 'i'
                                    }
                                }, {
                                    'content': {
                                        $regex: key,
                                        $options: 'i'
                                    },
                                }]
                            },
                            { "isDeleted": false, "status": "Active" }
                        ]
                    })
                },
                {
                    brain: await Brain.find({
                        $and: [
                            {
                                $or: [{
                                    'content': {
                                        $regex: key,
                                        $options: 'i'
                                    },
                                }]
                            },
                            { "isDeleted": false, "status": "Active" }
                        ]
                    })
                },
                {
                    brain_tab: await Brain_tab.find({
                        $and: [
                            {
                                $or: [{
                                    'title': {
                                        $regex: key,
                                        $options: 'i'
                                    }
                                }, {
                                    'content': {
                                        $regex: key,
                                        $options: 'i'
                                    },
                                }]
                            },
                            { "isDeleted": false, "status": "Active" }
                        ]
                    })
                },
                {
                    careers: await Careers.find({
                        $and: [
                            {
                                $or: [{
                                    'title': {
                                        $regex: key,
                                        $options: 'i'
                                    }
                                },
                                {
                                    'content': {
                                        $regex: key,
                                        $options: 'i'
                                    },
                                }]
                            },
                            { "isDeleted": false, "status": "Active" }
                        ]
                    })
                },
                {
                    careers_opening: await Careers_opening.find({
                        $and: [
                            {
                                $or: [{
                                    'position': {
                                        $regex: key,
                                        $options: 'i'
                                    }
                                },
                                {
                                    'position_link': {
                                        $regex: key,
                                        $options: 'i'
                                    },
                                }]
                            },
                            { "isDeleted": false, "status": "Active" }
                        ]
                    })
                },
                {
                    distributors: await Distributors.find({
                        $and: [
                            {
                                $or: [{
                                    'title': {
                                        $regex: key,
                                        $options: 'i'
                                    }
                                }, {
                                    'content': {
                                        $regex: key,
                                        $options: 'i'
                                    },
                                }]
                            },
                            { "isDeleted": false, "status": "Active" }
                        ]
                    })
                },
                {
                    partners: await Partners.find({
                        $and: [
                            {
                                $or: [{
                                    'country': {
                                        $regex: key,
                                        $options: 'i'
                                    }
                                }, {
                                    'company': {
                                        $regex: key,
                                        $options: 'i'
                                    }
                                },
                                {
                                    'company_info': {
                                        $regex: key,
                                        $options: 'i'
                                    },
                                }]
                            },
                            { "isDeleted": false, "status": "Active" }
                        ]
                    })
                },
                {
                    science_update_collaboration: await Science_update_collaboration.find({
                        $and: [
                            {
                                $or: [{
                                    'title': {
                                        $regex: key,
                                        $options: 'i'
                                    }
                                },
                                {
                                    'content': {
                                        $regex: key,
                                        $options: 'i'
                                    },
                                }]
                            },
                            { "isDeleted": false, "status": "Active" }
                        ]
                    })
                },
                {
                    science_update_collaboration_tab: await Science_update_collaboration_tab.find({
                        $and: [
                            {
                                $or: [{
                                    'title': {
                                        $regex: key,
                                        $options: 'i'
                                    }
                                },
                                {
                                    'content': {
                                        $regex: key,
                                        $options: 'i'
                                    },
                                }]
                            },
                            { "isDeleted": false, "status": "Active" }
                        ]
                    })
                },
                {
                    contact: await Contact.find({
                        $and: [
                            {
                                $or: [{
                                    'title_h2': {
                                        $regex: key,
                                        $options: 'i'
                                    }
                                }, {
                                    'title_h3': {
                                        $regex: key,
                                        $options: 'i'
                                    },
                                }]
                            },
                            { "isDeleted": false, "status": "Active" }
                        ]
                    })
                },
                {
                    supportstatic: await Supportstatic.find({
                        $and: [
                            {
                                $or: [{
                                    'title': {
                                        $regex: key,
                                        $options: 'i'
                                    }
                                }, {
                                    'content': {
                                        $regex: key,
                                        $options: 'i'
                                    },
                                }]
                            },
                            { "isDeleted": false, "status": "Active" }
                        ]
                    })
                },

                {
                    supportcategory: await Supportcategory.find({
                        $and: [
                            {
                                $or: [{
                                    'title': {
                                        $regex: key,
                                        $options: 'i'
                                    }
                                },
                                {
                                    'content': {
                                        $regex: key,
                                        $options: 'i'
                                    },
                                }]
                            },
                            { "isDeleted": false, "status": "Active" }
                        ]
                    })
                },
                {
                    knowledgeCenter: await knowledgeCenterRepo.getAllSearchByField(key)
                },

                {
                    science_update: await await scienceRepo.getAllSearchByField(key)
                },

            ]

            return search;

        } catch (e) {
            throw (e);
        }
    }

}


module.exports = categoryRepository;