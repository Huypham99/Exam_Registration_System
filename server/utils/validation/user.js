const Joi = require('joi')

const createUserInputValidation = (data) => {

    const schema = {
        name: Joi.string()
            .required(),
        password: Joi.string(),
        email: Joi.email()
            .required(),
        dob: Joi.string()
            .required(),
        studentId: Joi.string()
            .required(),
        program: Joi.string()
            .required(),
        schoolYear: Joi.string()
            .required(),
    };

    return Joi.validate(data, schema);
};

module.exports.createUserInputValidation = createUserInputValidation;

const editUserInputValidation = (data) => {

    const schema = {
        studentId: Joi.string()
            .required(),
        email: Joi.email()
            .required(),
        newName: Joi.string()
            .required(),
        newEmail: Joi.email()
            .required(),
        newDob: Joi.string()
            .required(),
        newStudentId: Joi.string()
            .required(),
        newProgram: Joi.string()
            .required(),
        newSchoolYear: Joi.string()
            .required(),
    };

    return Joi.validate(data, schema);
};

module.exports.editUserInputValidation = editUserInputValidation;