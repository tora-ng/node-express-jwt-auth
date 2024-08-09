const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, '이메일을 입력해 주세요.'],
        unique: true,
        lowercase: true,
        validate: [isEmail, '이메일 형식으로 입력해 주세요.'] // 유효한 이메일이면 true, 아니면 false 반환
    },
    password: {
        type: String,
        required: [true, '비밀번호를 입력해 주세요.'],
        minLength: [6, '6글자 이상의 비밀번호를 입력해 주세요.'],
    }
});

const User = mongoose.model('user', userSchema);
module.exports = User;