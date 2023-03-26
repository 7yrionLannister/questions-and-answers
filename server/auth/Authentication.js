const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if(!token) {
        return res.status(401).send('A token is required for authentication');
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
    } catch(err) {
        return res.status(401).send('Invalid token');
    }
    return next();
}

module.exports = verifyToken;