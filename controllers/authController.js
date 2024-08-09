const User = require('../models/User');
const Uesr = require('../models/User');

// handle errors
const handleErrors = (err) => {
    let errors = {
        email: '',
        password: ''
    };

    // duplicate error code
    if (err.code === 11000) {
        errors.email = '이 이메일은 이미 등록이 되어 있습니다.';
        return errors;
    }

    // validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

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
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.login_post = async (req, res) => {
    const {email, password} = req.body;

    console.log('email: ', email, 'password: ', password);
    res.send('user login');
}