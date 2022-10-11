const bcryptjs = require('bcryptjs')


// Create Hash
const createHash = (password) => {
    return bcryptjs.hash(password, 10);
}

// Compare Hash
const compareHash = (password, hash) => {
    return bcryptjs.compare(password, hash)
}

module.exports = {
    createHash,
    compareHash
}