const joi = require('joi');

module.exports = {
    register (req, res, next) {
        const schema = {
            email: joi.string().email(),
            password: joi.string().regex(new RegExp(/^[a-z0-9]+$/i))
        };
        const {error, value} = joi.validate(req.body, schema);

        if (error) {
            switch (error.details[0].context.key) {
                case 'email':
                    msg = {
                        error: 'You must provide a valid email address'
                    };
                    break;
                case 'password':
                    msg = {
                        error: `<h4>The password provided failed to match the following rules:</h4>
                        <ol>
                            <li>It must contain ONLY following charcters: lower/upper case, numerics</li>
                            <li>It must be greater then 8 and smaller then 322 character in length</li>
                        </ol>
                        `
                    };
                    break;
                default:
                    msg = {
                        error: 'Invalid registration information'
                    };
            }
            res.status(400).send(msg);
        } else {
            next();
        }
    }
};
