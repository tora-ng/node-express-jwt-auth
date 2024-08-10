const jwt = require('jsonwebtoken');

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

module.exports = { requireAuth };