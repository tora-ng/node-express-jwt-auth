const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log('token: ', token);

    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, 'net ninja secret', (err, decodedToken) => {
            if (err) {
                console.log('error: ', err.message);
                res.redirect('/login');
            } else {
                console.log('decodedToken: ', decodedToken);
                next();
            };
        });
    } else {
        res.redirect('/login');
    };
};

// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
            if (err) {
                console.log('error: ', err.message);
                res.locals.user = null;
                next();
            } else {
                console.log('decodedToken: ', decodedToken);
                let user = await User.findById(decodedToken.id);
                console.log('user: ', user);
                res.locals.user = user;
                next();
            };
        });
    } else {
        res.locals.user = null;
        next();
    };
    console.log('res.locals.user: ', res.locals.user)
};

module.exports = { requireAuth, checkUser };