const Joi = require('joi')

const createShiftInputValidation = (data) => {

    const schema = {
        time: Joi.string()
            .required(),
        date: Joi.string()
            .required(),
        dayOfWeek: Joi.number()
            .required(),
        examId: Joi.string()
            .required(),
        moduleId: Joi.string()
            .required(),
    };

    return Joi.validate(data, schema);
};

module.exports.createShiftInputValidation = createShiftInputValidation;
