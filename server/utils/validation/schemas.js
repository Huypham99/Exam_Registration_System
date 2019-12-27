const Joi = require('joi')

const schemas = {
    logIn: Joi.object().keys({
        userName: Joi.string()
            .required(),
        password: Joi.string()
            .required()
            .label('password')
    })
};
module.exports = schemas;