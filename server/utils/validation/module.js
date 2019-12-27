const Joi = require('joi')

const createModuleInputValidation = (data) => {

    const schema = {
        name: Joi.string()
            .required(),
        moduleId: Joi.string()
            .required(),
    };

    return Joi.validate(data, schema);
};

module.exports.createModuleInputValidation = createModuleInputValidation;

const editModuleInputValidation = (data) => {

    const schema = {
        moduleId: Joi.string()
            .required(),
        newModuleId: Joi.string()
            .required(),
        newName: Joi.string()
            .required(),
    };

    return Joi.validate(data, schema);
};

module.exports.editModuleInputValidation = editModuleInputValidation;