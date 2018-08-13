const {User} = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

function jwtSignUser (user) {
    const ONE_WEEK = 60 * 60 * 24 * 7;
    return jwt.sign(user, config.authentication.jwsSecret, {
        expiresIn: ONE_WEEK
    });
}

module.exports = {
    async hello (req, res) {
        res.send('hello');
    },
    async register (req, res) {
        try {
            const user = await User.create(req.body);
            res.send(user.toJSON());
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
            const user = await User.findOne({
            where: {
                email: email
            }});
            if (!user) {
                res.status(403).send({
                    error: 'No user found'
                });
            }
            const isPasswordValid = user.comparePassword(password, user.password);
            console.log('res', isPasswordValid);
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
        } catch (error) {
            res.status(500).send({
                error: 'Login failed: ' + error.message
            });
        }
    }
}
