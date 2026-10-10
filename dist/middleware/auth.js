"use strict";
// higher order function always return a function 
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
//roles = ["admin", "user"]
const auth = (...roles) => {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization;
            // console.log({authTokem: token});
            if (!token) {
                return res.status(500).json({ message: "You are not allowed!" });
            }
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecter);
            console.log({ decoded });
            req.user = decoded;
            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(500).json({
                    error: "unauthorized!!!"
                });
            }
            next();
        }
        catch (err) {
            res.status(404).json({
                success: false,
                message: err.message
            });
        }
    };
};
exports.default = auth;
