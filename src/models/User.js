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
module.exports.createUser = (user, callback) => {
    hashPassword(user.password)
        .then((hashed) => {
            user.password = hashed;
            user.save(callback);
    });    
};
module.exports.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, callback);
};

module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
};
