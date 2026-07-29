import jwt from 'jsonwebtoken';

const isAuth = (req, res, next) => {
    let token = req.cookies?.token;

    if (!token && req.headers.authorization) {
        const authHeader = req.headers.authorization;
        if (authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
    }
    catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
    
    next();
};

export default isAuth;