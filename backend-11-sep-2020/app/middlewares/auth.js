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
                                    if ((result.about && req.path.indexOf("/about") >= 0) ||
                                        (result.contact && req.path.indexOf("/contact") >= 0) ||
                                        (result.knowledge_center && (req.path.indexOf("/knowledge-center") >= 0 || req.path.indexOf("/knowledge_category") >= 0 || req.path.indexOf("/knowledge_subcategory") >= 0)) ||
                                        (result.science_update && (req.path.indexOf("/science_update") >= 0 || req.path.indexOf("/science_category") >= 0)) ||
                                        (result.product && req.path.indexOf("/product") >= 0) ||
                                        (result.support && (req.path.indexOf('/support_category') >= 0 || req.path.indexOf('/support_static') >= 0)) ||
                                        (result.home_slider && req.path.indexOf('/slider') >= 0) ||
                                        (result.setting && req.path.indexOf('/setting') >= 0) ||
                                        (result.probe_finder && req.path.indexOf('/probe-finder') >= 0) ||
                                        (result.probe_finder && req.path.indexOf('/channels') >= 0) ||
                                        (result.probe_finder && req.path.indexOf('/experiment') >= 0) ||
                                        (result.probe_finder && req.path.indexOf('/shank-length') >= 0) ||
                                        (result.probe_finder && req.path.indexOf('/shanks') >= 0) ||
                                        (result.probe_finder && req.path.indexOf('/site-area') >= 0) ||
                                        (result.probe_finder && req.path.indexOf('/site-layout') >= 0) ||

                                        (req.path.indexOf("/profile") >= 0) ||
                                        (req.path.indexOf("/change") >= 0) ||
                                        (req.path.indexOf("/update") >= 0) ||
                                        (req.path.indexOf("/category") >= 0) ||
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