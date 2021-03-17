const Exam = require('../../models/exam')
const inputHelper = require('../../utils/inputHelper')
const { createExamInputValidation } = require('../../utils/validation/exam')

module.exports = async (root, { input }) => {

    await createExamInputValidation(input)

    const { 
        name, 
        academyYear, 
        trainingSystem, 
        openDate, 
        openTime, 
        endDate, 
        endTime 
    } = input;

    let formatedOpenDate = inputHelper.formatDate(openDate);
    let formatedOpenTime = inputHelper.formatTime(openTime);
    let formatedEndDate =  inputHelper.formatDate(endDate);
    let formatedEndTime = inputHelper.formatTime(endTime);

    const exam = await new Exam({
        name,
        academyYear,
        trainingSystem,
        openDate: formatedOpenDate,
        openTime: formatedOpenTime,
        endDate: formatedEndDate,
        endTime: formatedEndTime
    })
    return exam.save()
}