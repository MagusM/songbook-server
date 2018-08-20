const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

function hashPassword (password, options) {
    const SALT_ROUNDS = 10;
    return bcrypt.hash(password, SALT_ROUNDS)
            .then((hashed) => {
                return hashed;
            });
}

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
});

const User = mongoose.model('User', UserSchema);
User.prototype.comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
};

module.exports = User;
module.exports.hashPassword = hashPassword;
module.exports.createUser = async (user, callback) => {
    hashPassword(user.password)
        .then((hashed) => {
            user.password = hashed;
            user.save(callback);
    });    
};
module.exports.comparePassword = async (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        callback(null, isMatch);
    });
};

module.exports.getUserById = async (id, callback) => {
    User.findById(id, callback);
};
