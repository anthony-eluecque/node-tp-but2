const crypto = require('crypto');

const generateUUID = () => {
    return crypto.randomUUID();
}

module.exports = {generateUUID}