const Shift = require('../../models/shift')
const FormatDate = require('../../utils/inputFormat/date')
const FormatTime = require('../../utils/inputFormat/time')
const createShiftInputValidation = require('../../utils/validation/shift')

module.exports = async (root, { input }, { user }) => {

    await createShiftInputValidation(input)

    if (!user.isAdmin) throw new Error('You are not allowed to do access this resource !!')

    const { time, date, dayOfWeek, examId, moduleId } = input;

    let formatedTime = FormatTime(time);
    let formatedDate = FormatDate(date);

    const shift = await new Shift({
        time: formatedTime,
        date: formatedDate,
        dayOfWeek,
        moduleId,
        examId
    })

    return shift.save()
    
}