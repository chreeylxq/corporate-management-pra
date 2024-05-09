const jwt = require('jsonwebtoken');

const secret = 'lxq';
const expires = '3d';
let JWT = {
    generate: (value) => {
        return jwt.sign(value, secret, { expiresIn: expires })
    },
    verify: (token) => {
        try {
            return jwt.verify(token, secret)
        } catch (error) {
            console.log(error.message)
        }
    }
}
module.exports = JWT;