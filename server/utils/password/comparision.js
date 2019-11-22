const bcrypt = require('bcryptjs')

module.exports = async (inputPassword, existingPassword) => {
    return await bcrypt.compare(inputPassword, existingPassword);
}