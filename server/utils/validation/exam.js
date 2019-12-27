const Joi = require('joi')

const createExamInputValidation = (data) => {

    const schema = {
        name: Joi.string()
            .required(),
        academyYear: Joi.string()
            .required(),
        trainingSystem: Joi.String()
            .required(),
        openDate: Joi.string()
            .required(),
        openTime: Joi.string()
            .required(),
        endDate: Joi.string()
            .required(),
        endTime: Joi.string()
            .required(),
    };

    return Joi.validate(data, schema);
};

module.exports.createExamInputValidation = createExamInputValidation;
