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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../middleware/auth");
const auth_2 = require("../middleware/auth");
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
const adminInput = zod_1.z.object({
    email: zod_1.z.string().min(10).max(40).email(),
    password: zod_1.z.string().min(5).max(40)
});
router.get("/me", auth_2.AuthenticateJWTforAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const adminId = Number(req.headers["adminId"]);
    try {
        const admin = yield prisma.admin.findFirst({ where: { id: adminId } });
        if (!admin) {
            res.status(404).json({ msg: "Admin doesnt exist" });
            return;
        }
        else {
            res.json({ message: "success",
                email: admin.email
            });
        }
    }
    catch (_a) {
        res.status(404).json({ msg: "Admin doesnt exist" });
    }
    finally {
        prisma.$disconnect();
    }
}));
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInput = adminInput.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(404).json({ message: parsedInput.error.message });
    }
    const email = parsedInput.data.email;
    const password = parsedInput.data.password;
    try {
        const present = yield prisma.admin.findFirst({
            where: {
                email
            }
        });
        if (present) {
            res.status(403).json({ message: 'Admin already exists' });
        }
        else {
            const admin = yield prisma.admin.create({
                data: {
                    email,
                    password
                }
            });
            if (admin) {
                let adminToken = jsonwebtoken_1.default.sign({ id: admin.id }, auth_1.adminSecretKey, { expiresIn: '1h' });
                return res.status(201).json({ message: "success", token: adminToken });
            }
            else {
                res.status(404).json({ message: 'Failed' });
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: 'Failed' });
    }
    finally {
        prisma.$disconnect();
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInput = adminInput.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(404).json({ message: parsedInput.error.message });
    }
    const email = parsedInput.data.email;
    const password = parsedInput.data.password;
    try {
        const admin = yield prisma.admin.findFirst({ where: { email, password } });
        if (admin) {
            let adminToken = jsonwebtoken_1.default.sign({ id: admin.id }, auth_1.adminSecretKey, { expiresIn: '1h' });
            res.status(200).json({ message: "success", token: adminToken, email: email });
        }
        else {
            res.status(404).json({ message: "failed" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: "failed" });
    }
    finally {
        prisma.$disconnect();
    }
}));
exports.default = router;
