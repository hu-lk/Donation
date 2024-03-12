const bcrypt = require('bcrypt')

class Hasher {
  static async generateHash(stringToHash) {
    try {
      const salt = await bcrypt.genSalt(Number(process.env.saltRounds))
      const hashedString = await bcrypt.hash(stringToHash, salt)
      return hashedString
    } catch (error) {
      console.error('Error hashing string:', error)
      throw error
    }
  }
}

module.exports = Hasher
