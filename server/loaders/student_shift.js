const DataLoader = require('dataloader')
const Student_shift = require('../models/student_shift')

const batchStudentShift = async (ids) => {

    const student_shifts = await Student_shift.find({ _id: { $in: ids } })

    return student_shifts

}

const StudentShiftLoader = () => new DataLoader(batchStudentShift);

module.exports = StudentShiftLoader;