const Module = require('../../models/module')

module.exports = async (root, { input }) => {

    const { name, moduleId } = input

    const existModule = await Module.findOne({ moduleId: moduleId })
    if (existModule) { throw new Error('Đã tồn tại học phần này !!') }

    const module = await new Module(input)
    return module.save()
}