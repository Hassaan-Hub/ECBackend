const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        // Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                status: 401,
                message: "Authorization header is required"
            });
        }

        // Bearer token
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                status: 401,
                message: "Bearer token is required"
            });
        }

        // JWT verify
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY
        );

        // User information request ke andar store
        req.user = decoded;

        // Controller ki taraf jao
        next();

    } catch (error) {
        return res.status(401).json({
            status: 401,
            message: "Invalid or expired token"
        });
    }
};

module.exports = authMiddleware;