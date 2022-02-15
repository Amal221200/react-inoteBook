require('dotenv').config()
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const fetchUser = (req, res, next) => {
    const token = req.header('authToken')
    if (!token) {
        return res.status(401).json({ error: 'Please authenticate using a valid token' })
    }
    try {
        const data = jwt.verify(token, SECRET_KEY)
        req.user = data.user
        next()
    } catch (error) {
        console.log(error.message)
        res.status(401).json({ error: 'Please authenticate using a valid token' })
    }
}

module.exports = fetchUser