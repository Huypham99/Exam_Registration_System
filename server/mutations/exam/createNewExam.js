const Exam = require('../../models/exam')
const FormatDate = require('../../utils/inputFormat/date')
const FormatTime = require('../../utils/inputFormat/time')
const createExamInputValidation = require('../../utils/validation/exam')

module.exports = async (root, { input }) => {

    await createExamInputValidation(input)

    const { name, academyYear, trainingSystem, openDate, openTime, endDate, endTime } = input;

    let formatedOpenDate = FormatDate(openDate);
    let formatedOpenTime = FormatTime(openTime);
    let formatedEndDate = FormatDate(endDate);
    let formatedEndTime = FormatTime(endTime);

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