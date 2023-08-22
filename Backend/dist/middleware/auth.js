"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateJWTforAdmin = exports.adminSecretKey = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.adminSecretKey = "admin";
const AuthenticateJWTforAdmin = (req, res, next) => {
    let authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, exports.adminSecretKey, (err, admin) => {
            if (err) {
                return res.status(403).json({ message: "Invalid" });
            }
            if (!admin) {
                return res.status(403).json({ message: "Invalid" });
            }
            if (typeof admin == "string") {
                return res.status(403).json({ message: "Invalid" });
            }
            req.headers["adminId"] = admin.id;
            next();
        });
    }
    else {
        return res.status(401).json({ message: "Invalid" });
    }
};
exports.AuthenticateJWTforAdmin = AuthenticateJWTforAdmin;
