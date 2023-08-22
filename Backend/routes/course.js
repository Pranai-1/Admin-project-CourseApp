"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = require("../middleware/auth");
var db_1 = require("../db"); // Assuming these are separate modules
var zod_1 = require("zod");
var router = express_1.default.Router();
var courseInput = zod_1.z.object({
    title: zod_1.z.string().min(5).max(40),
    description: zod_1.z.string().min(5).max(40),
    price: zod_1.z.number().max(10000),
    image: zod_1.z.string(),
    published: zod_1.z.boolean()
});
router.post('/create', auth_1.AuthenticateJWTforAdmin, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedInput, _a, title, description, price, image, published, obj, body, admin, name_1, newObj, course;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                parsedInput = courseInput.safeParse(req.body);
                if (!parsedInput.success) {
                    return [2 /*return*/, res.status(404).json({ message: parsedInput.error.message })];
                }
                _a = parsedInput.data, title = _a.title, description = _a.description, price = _a.price, image = _a.image, published = _a.published;
                obj = { title: title, description: description, price: price, image: image, published: published };
                body = obj;
                return [4 /*yield*/, db_1.Admin.findOne({ _id: req.headers["adminId"] })];
            case 1:
                admin = _b.sent();
                if (admin) {
                    name_1 = admin.email.split('@')[0];
                    newObj = __assign(__assign({}, body), { adminId: req.headers["adminId"], name: name_1 });
                    course = new db_1.Course(newObj);
                    course.save();
                    return [2 /*return*/, res.status(200).json({ message: "success" })];
                }
                else {
                    res.status(404).json({ message: 'failed' });
                }
                return [2 /*return*/];
        }
    });
}); });
router.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.Course.find({})];
            case 1:
                data = _a.sent();
                if (data) {
                    return [2 /*return*/, res.json({ data: data, message: "success" })];
                }
                else {
                    res.status(404).json({ message: 'Course not found' });
                }
                return [2 /*return*/];
        }
    });
}); });
router.get("/individual", auth_1.AuthenticateJWTforAdmin, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.Course.find({ adminId: req.headers["adminId"] })];
            case 1:
                data = _a.sent();
                if (data) {
                    return [2 /*return*/, res.json({ courses: data, message: "success" })];
                }
                else {
                    res.status(404).json({ message: 'Course not found' });
                }
                return [2 /*return*/];
        }
    });
}); });
router.get("/:id", auth_1.AuthenticateJWTforAdmin, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, course;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, db_1.Course.findById(id)];
            case 1:
                course = _a.sent();
                if (course) {
                    res.json({ course: course, message: "success" });
                }
                else {
                    res.status(404).json({ message: 'Course not found' });
                }
                return [2 /*return*/];
        }
    });
}); });
router.post("/:id", auth_1.AuthenticateJWTforAdmin, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedInput, _a, title, description, price, image, published, obj, body, course;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                parsedInput = courseInput.safeParse(req.body);
                if (!parsedInput.success) {
                    return [2 /*return*/, res.status(404).json({ message: parsedInput.error.message })];
                }
                _a = parsedInput.data, title = _a.title, description = _a.description, price = _a.price, image = _a.image, published = _a.published;
                obj = { title: title, description: description, price: price, image: image, published: published };
                body = obj;
                return [4 /*yield*/, db_1.Course.findByIdAndUpdate(req.params.id, body, { new: true })];
            case 1:
                course = _b.sent();
                if (course) {
                    return [2 /*return*/, res.status(200).json({ message: "success" })];
                }
                else {
                    res.status(404).json({ message: 'Course not found' });
                }
                return [2 /*return*/];
        }
    });
}); });
router.delete("/delete/:id", auth_1.AuthenticateJWTforAdmin, function (req, res) {
    try {
        db_1.Course.findByIdAndDelete(req.params.id).then(function () { return res.status(200).json({ message: "success" }); });
    }
    catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
});
exports.default = router;
