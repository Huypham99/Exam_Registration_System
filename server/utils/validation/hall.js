const Joi = require('joi')

const createHallInputValidation = (data) => {

    const schema = {
        name: Joi.string()
            .required(),
        capacity: Joi.number()
            .required()
    };

    return Joi.validate(data, schema);
};

module.exports.createHallInputValidation = createHallInputValidation;

const editHallInputValidation = (data) => {

    const schema = {
        name: Joi.string()
            .required(),
        newName: Joi.string()
            .required(),
        newCapacity: Joi.number()
            .required()
    };

    return Joi.validate(data, schema);
};

module.exports.editHallInputValidation = editHallInputValidation;