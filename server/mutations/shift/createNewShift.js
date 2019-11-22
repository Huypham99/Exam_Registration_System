const Shift = require('../../models/shift')
module.exports = async (root, { input }) => {
    const { time, date, dayOfWeek, examId, moduleId } = input;
    const shift = await new Shift({
        time,
        date,
        dayOfWeek,
        moduleId,
        examId
    })
    return shift.save()
}