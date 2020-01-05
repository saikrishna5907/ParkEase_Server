import jwt from 'jsonwebtoken';

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return res.status(403).send({ auth: false, message: 'Token Authentication failed' });
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    }
    catch (err) {
        return res.status(500).send({ auth: false, message: 'Token authentication failed' });
    }
    if (!decodedToken) {
        return res.status(500).send({ auth: false, message: 'Token authentication failed' });
    }
    req.userId = decodedToken.userId;
    next();
}