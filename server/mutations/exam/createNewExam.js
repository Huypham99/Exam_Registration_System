const Exam = require('../../models/exam')
module.exports = async (root, { input }) => {
    const { name, academyYear, trainingSystem } = input;
    const exam = await new Exam({
        name,
        academyYear,
        trainingSystem
    })
    return exam.save()
}