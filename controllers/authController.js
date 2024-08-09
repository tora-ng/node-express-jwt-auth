const User = require('../models/User');
const Uesr = require('../models/User');

module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.signup_post = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.create({email, password}); // Promise 반환
        console.log('user: ', user);
        res
            .status(201)
            .json(user);
    } catch (error) {
        console.log('** error: ', error);
        res.status(400).send('erorr, user not created');
    }
}

module.exports.login_post = async (req, res) => {
    const {email, password} = req.body;

    console.log('email: ', email, 'password: ', password);
    res.send('user login');
}