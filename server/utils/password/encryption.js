const bcrypt = require('bcryptjs')

module.exports =  async (inputPassword) => {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(inputPassword, salt);
    return hashPassword;
}