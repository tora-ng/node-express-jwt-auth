const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

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

// db에서 값을 저장한 뒤 실행됨
userSchema.post('save', function(doc, next){
    console.log('new user was created & saved', doc);
    next();
});

// db에서 값을 저장하기 전에 실행됨
userSchema.pre('save', async function(next){
    // 암호화
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// static mothod to login user
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password); // 입력된 비밀번호와 DB에 저장된 비밀번호 비교
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

const User = mongoose.model('user', userSchema);
module.exports = User;