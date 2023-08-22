"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateJWTforAdmin = exports.adminSecretKey = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
exports.adminSecretKey = "admin";
var AuthenticateJWTforAdmin = function (req, res, next) {
    var authHeader = req.headers.authorization;
    if (authHeader) {
        var token = authHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, exports.adminSecretKey, function (err, admin) {
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
