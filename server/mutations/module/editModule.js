const Module = require('../../models/module')
module.exports = async (root, { input }) => {

    const { moduleId, newModuleId, newName } = input

    const existModule = await Module.findOne({ moduleId: newModuleId })
    if (existModule) { throw new Error('Đã tồn tại học phần này dmm!!') }

    const module = await Module.findOneAndUpdate({ moduleId: moduleId }, { name: newName, moduleId: newModuleId }, { new: true });
    
}