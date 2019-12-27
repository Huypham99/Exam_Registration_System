const Module = require('../../models/module')
const Capitalize = require('../../utils/inputFormat/capitalize')
const { editModuleInputValidation } = require('../../utils/validation/module')

module.exports = async (root, { input }, { user }) => {

    await editModuleInputValidation(input)

    if (!user.isAdmin) throw new Error('You are not allowed to do access this resource !!')

    const { moduleId, newModuleId, newName } = input

    let formatedName = Capitalize(newName)
    let formatedModuleId = newModuleId.toUpperCase()

    if (moduleId !== formatedModuleId) {
        const existModule = await Module.findOne({ moduleId: formatedModuleId })
        if (existModule) { throw new Error('Đã tồn tại học phần này dmm!!') }
    }

    return Module.findOneAndUpdate({ moduleId: moduleId }, { name: formatedName, moduleId: formatedModuleId }, { new: true });

}