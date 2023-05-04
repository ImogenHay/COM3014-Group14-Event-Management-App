"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = __importDefault(require("../Utils/logger"));
const validateUser = (req, res, next) => {
    // getting the secret from environment variables
    const secret = process.env.SECRET;
    // Retrieving authorization string from req header
    const { authorization } = req.headers;
    // making sure the authorization string is there
    if (authorization == null) {
        return res.status(401).json({ error: 'The Authorization token is required' });
    }
    // extracting the token
    const token = authorization.split(' ')[1];
    // this might not be needed
    try {
        // verifying the token using the secret and retrieving the users ID from it
        const { _id } = jsonwebtoken_1.default.verify(token, secret);
        // assigning the ID as a parameter to the req
        req.userId = _id;
    }
    catch (error) {
        logger_1.default.info(error);
        res.status(401).json({ error: 'The Request is not authorized' });
    }
    next();
};
exports.default = validateUser;
