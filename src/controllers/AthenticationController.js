const jwt = require('jsonwebtoken');
const config = require('../config/config');

const User = require('../models/User');

function jwtSignUser (user) {
    const ONE_WEEK = 60 * 60 * 24 * 7;
    return jwt.sign(user, config.authentication.jwsSecret, {
        expiresIn: ONE_WEEK
    });
}

module.exports = {
    async hello (req, res) {
        res.send({message: 'hello'});
    },
    async register (req, res) {
        try {
            const user = new User(req.body);
            let isUserExist = await User.find({email: user.email});
            if (isUserExist) {
                throw new Error('User already exists');
            } else {
                await User.createUser(user, (err) => {
                    if (err) {
                        throw err;
                    }
                });
                res.send(user.toJSON());
            }
        } catch (err) {
            res.status(400).send(
                {
                    error: 'This email account is already in use'
                }
            );
        }
    },
    async login (req, res) {
        try {
            const {email, password} = req.body;
            User.findOne({email: email}, (err, user) => {
                if (err) {
                    throw err;
                }
                if (!user) {
                    res.status(403).send({
                        error: 'No user found'
                    });
                }
                const isPasswordValid = User.isPasswordValid(password, user.password);
                if (!isPasswordValid) {
                    res.status(403).send({
                        error: 'The logging information was incorrect'
                    });
                } else {
                    res.send({
                        user: user.toJSON(),
                        token: jwtSignUser(user.toJSON())
                    });
                }    
            });
        } catch (error) {
            res.status(500).send({
                error: 'Login failed: ' + error.message
            });
        }
    }
}
