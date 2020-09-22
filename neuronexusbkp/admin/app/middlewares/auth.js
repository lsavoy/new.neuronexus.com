const passport = require("passport");
const passportJWT = require("passport-jwt");
const users = require('user/models/user.model');
var Promise = require('promise');
const userRepo = require('user/repositories/user.repository');

const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromHeader('token')
};

module.exports = () => {
    const strategy = new Strategy(params, (payload, done) => {
        users.findById(payload.id).populate({
            'path': 'role',
            'select': 'role title'
        }).exec((err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    });
    passport.use(strategy);
    return {
        initialize: () => {
            return passport.initialize();
        },
        authenticate: (req, res, next) => {
            passport.authenticate("jwt", config.jwtSession, (err, user, info) => {
                if (err) {
                    return next(err);
                }
                if (!user && (req.path.indexOf("/api") != 0)) {
                    return res.redirect('/')
                }
                if (user) {
                    if (user.role.role == 'admin' || user.role.role == 'user') {
                        req.user = user
                        if (user.role.role == 'admin') {
                            return next();
                        }
                        else {

                            userRepo.getPermissionByField({ user_id: user._id })
                                .then(function (result) {
                                    req.permission = result;
                                    if ((result.about && (req.path.indexOf("/events") >= 0 || req.path.indexOf("/events_update") >= 0 || req.path.indexOf("/about") >= 0)) ||
                                        (result.contact && req.path.indexOf("/contact") >= 0) ||
                                        (result.knowledge_center && (req.path.indexOf("/knowledge-center") >= 0 || req.path.indexOf("/knowledge_category") >= 0 || req.path.indexOf("/knowledge_subcategory") >= 0)) ||
                                        (result.science_update && (req.path.indexOf("/science_menu") >= 0 || req.path.indexOf("/science_testimonials") >= 0 || req.path.indexOf("/science_update") >= 0 || req.path.indexOf("/science_category") >= 0)) ||
                                        (result.product && (req.path.indexOf("/instrumentationvideos") >= 0 || req.path.indexOf("/accessoriesvideos") >= 0 || req.path.indexOf("/softwarevideos") >= 0 || req.path.indexOf("/electrodevideos") >= 0 || req.path.indexOf("/category") >= 0 || req.path.indexOf('/site-layout') >= 0 || req.path.indexOf('/site-area') >= 0 || req.path.indexOf('/shanks') >= 0 || req.path.indexOf('/shank-length') >= 0 || req.path.indexOf('/experiment') >= 0 || req.path.indexOf('/channels') >= 0 || req.path.indexOf('/probe-finder') >= 0 || req.path.indexOf("/product") >= 0)) ||
                                        (result.support && (req.path.indexOf('/support_blog') >= 0 || req.path.indexOf('/trainingvideos') >= 0 || req.path.indexOf('/support_category') >= 0 || req.path.indexOf('/support_static') >= 0)) ||
                                        (result.home_slider && req.path.indexOf('/slider') >= 0) ||
                                        (result.setting && req.path.indexOf('/setting') >= 0) ||
                                        (result.technology && (req.path.indexOf('/technology_electrode_arrays') >= 0 || req.path.indexOf('/technology_static') >= 0 || req.path.indexOf('/technology_category') >= 0)) ||
                                        (result.product_feature && req.path.indexOf('/product-feature') >= 0) ||
                                        (result.image_carousel && req.path.indexOf('/image_carousel') >= 0) ||
                                        (result.video_carousel && req.path.indexOf('/video_carousel') >= 0) ||
                                        (result.top_blog && req.path.indexOf('/top_blog') >= 0) ||

                                        (req.path.indexOf("/profile") >= 0) ||
                                        (req.path.indexOf("/change") >= 0) ||
                                        (req.path.indexOf("/update") >= 0) ||

                                        (req.path.indexOf("/dashboard") >= 0) ||
                                        (req.path.indexOf("/uploads") >= 0)) {
                                        return next();

                                    }
                                    else {
                                        res.send('Unauthorized access');
                                    }


                                })

                        }



                    } else {
                        res.send(' to access this page');
                    }
                } else {
                    if ((req.path.indexOf("/api") == 0)) {
                        return next();
                    } else {
                        return res.redirect('/');
                    }

                }

            })(req, res, next);
        },
        // This is for agent portal //
        authenticateFrontAgentPortal: (req, res, next) => {
            passport.authenticate("jwt", config.jwtSession, (err, user, info) => {
                if (err) { return next(err); }
                if (!user) { return res.redirect('/' + process.env.AGENT_FOLDER_NAME) }
                if (user) {
                    if (user.role.role == 'agent') {
                        req.user = user
                        return next();
                    } else {
                        res.send(' to access this page');
                    }
                } else {
                    return res.redirect('/' + process.env.AGENT_FOLDER_NAME);
                }

            })(req, res, next);
        },
    };


};
