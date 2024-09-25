const jwt = require('jsonwebtoken');
require('dotenv').config();

const fetchuser = (req, res, next) => {
    // Get the user from the JWT _TOKEN and add id to req object
    const token = req.header("auth-token");
    if (!token) {
        res.status(401).send({ error: "Use a valid token for authenticate" });
    }
    try {
        const data = jwt.verify(token, process.env.JWT_TOKEN);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token by login" });
    }
}


module.exports = fetchuser;