const Module = require('../../models/module')
const Capitalize = require('../../utils/inputFormat/capitalize')
const { createModuleInputValidation } = require('../../utils/validation/module')

module.exports = async (root, { input }, { user }) => {

    await createModuleInputValidation(input)

    if (!user.isAdmin) throw new Error('You are not allowed to do access this resource !!')

    const { name, moduleId } = input

    let newName = Capitalize(name)
    let newModuleId = moduleId.toUpperCase()

    const existModule = await Module.findOne({ moduleId: moduleId })
    if (existModule) throw new Error('Đã tồn tại học phần này !!')

    const module = await new Module({ name: newName, moduleId: newModuleId })
    return module.save()
}