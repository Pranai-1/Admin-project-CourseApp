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
const auth_1 = require("../middleware/auth");
const db_1 = require("../db"); // Assuming these are separate modules
const router = express_1.default.Router();
router.post('/create', auth_1.AuthenticateJWTforAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    if (body.title.length < 3 || body.description.length < 6) {
        return res.status(404).json({ message: "failed" });
    }
    else {
        const admin = yield db_1.Admin.findOne({ _id: req.headers["adminId"] });
        if (admin) {
            const name = admin.email.split('@')[0];
            let obj = Object.assign(Object.assign({}, body), { adminId: req.headers["adminId"], name: name });
            const course = new db_1.Course(obj);
            course.save();
            return res.status(200).json({ message: "success" });
        }
        else {
            res.status(404).json({ message: 'failed' });
        }
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield db_1.Course.find({});
    if (data) {
        return res.json({ data: data, message: "success" });
    }
    else {
        res.status(404).json({ message: 'Course not found' });
    }
}));
router.get("/individual", auth_1.AuthenticateJWTforAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield db_1.Course.find({ adminId: req.headers["adminId"] });
    if (data) {
        return res.json({ courses: data, message: "success" });
    }
    else {
        res.status(404).json({ message: 'Course not found' });
    }
}));
router.get("/:id", auth_1.AuthenticateJWTforAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const course = yield db_1.Course.findById(id);
    if (course) {
        res.json({ course: course, message: "success" });
    }
    else {
        res.status(404).json({ message: 'Course not found' });
    }
}));
router.post("/:id", auth_1.AuthenticateJWTforAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield db_1.Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (course) {
        return res.status(200).json({ message: "success" });
    }
    else {
        res.status(404).json({ message: 'Course not found' });
    }
}));
router.delete("/delete/:id", auth_1.AuthenticateJWTforAdmin, (req, res) => {
    try {
        db_1.Course.findByIdAndDelete(req.params.id).then(() => { return res.status(200).json({ message: "success" }); });
    }
    catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
});
exports.default = router;
