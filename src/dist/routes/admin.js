"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../db"); // Assuming these are separate modules
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../middleware/auth");
const auth_2 = require("../middleware/auth");
const router = express_1.default.Router();
router.get("/me", auth_2.AuthenticateJWTforAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const adminId = req.headers["adminId"];
    const admin = yield db_1.Admin.findOne({ _id: adminId });
    if (!admin) {
        res.status(403).json({ msg: "Admin doesnt exist" });
        return;
    }
    res.json({ message: "success",
        email: admin.email
    });
}));
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (email.length < 5 || password.length < 5) {
        return res.status(404).json({ message: "Invalid" });
    }
    const admin = yield db_1.Admin.findOne({ email });
    if (admin) {
        res.status(403).json({ message: 'Admin already exists' });
    }
    else {
        const newAdmin = new db_1.Admin({ email, password });
        newAdmin.save();
        let adminToken = jsonwebtoken_1.default.sign({ id: newAdmin._id }, auth_1.adminSecretKey, { expiresIn: '1h' });
        return res.status(201).json({ message: "success", token: adminToken });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (email.length < 5 || password.length < 5) {
        return res.status(404).json({ message: "Invalid" });
    }
    const admin = yield db_1.Admin.findOne({ email, password });
    if (admin) {
        let adminToken = jsonwebtoken_1.default.sign({ id: admin._id }, auth_1.adminSecretKey, { expiresIn: '1h' });
        res.status(200).json({ message: "success", token: adminToken });
    }
    else {
        res.status(404).json({ message: "failed" });
    }
}));
exports.default = router;
