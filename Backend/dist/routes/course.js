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
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
const courseInput = zod_1.z.object({
    title: zod_1.z.string().min(5).max(40),
    description: zod_1.z.string().min(5).max(40),
    price: zod_1.z.number().max(10000),
    image: zod_1.z.string(),
    published: zod_1.z.boolean()
});
router.post('/create', auth_1.AuthenticateJWTforAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInput = courseInput.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(404).json({ message: parsedInput.error.message });
    }
    let { title, description, price, image, published } = parsedInput.data;
    price = Number(price);
    try {
        const admin = yield prisma.admin.findFirst({ where: { id: Number(req.headers["adminId"]) } });
        if (admin) {
            const name = admin.email.split('@')[0];
            const course = yield prisma.courses.create({
                data: {
                    title,
                    description,
                    price,
                    image,
                    published,
                    adminId: admin.id,
                    name
                }
            });
            if (course) {
                return res.status(200).json({ message: "success" });
            }
            else {
                res.status(404).json({ message: 'failed' });
            }
        }
        else {
            res.status(404).json({ message: 'failed' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: 'failed' });
    }
    finally {
        prisma.$disconnect();
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.courses.findMany({});
        if (data) {
            return res.json({ data: data, message: "success" });
        }
        else {
            res.status(404).json({ message: 'Course not found' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: 'Course not found' });
    }
    finally {
        prisma.$disconnect();
    }
}));
router.get("/individual", auth_1.AuthenticateJWTforAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.courses.findMany({
            where: {
                adminId: Number(req.headers["adminId"])
            }
        });
        if (data) {
            return res.json({ courses: data, message: "success" });
        }
        else {
            res.status(404).json({ message: 'Course not found' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: 'Course not found' });
    }
    finally {
        prisma.$disconnect();
    }
}));
router.get("/:id", auth_1.AuthenticateJWTforAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const course = yield prisma.courses.findFirst({
            where: {
                id
            }
        });
        if (course) {
            res.json({ course: course, message: "success" });
        }
        else {
            res.status(404).json({ message: 'Course not found' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: 'Course not found' });
    }
    finally {
        prisma.$disconnect();
    }
}));
router.post("/:id", auth_1.AuthenticateJWTforAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInput = courseInput.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(400).json({ message: parsedInput.error.message });
    }
    const { title, description, price, image, published } = parsedInput.data;
    const courseId = Number(req.params.id);
    try {
        const existingCourse = yield prisma.courses.findFirst({
            where: {
                id: courseId,
            },
        });
        if (existingCourse) {
            const updatedCourse = yield prisma.courses.update({
                where: {
                    id: courseId,
                },
                data: {
                    title,
                    description,
                    price,
                    image,
                    published,
                },
            });
            return res.status(200).json({ message: "Course updated successfully" });
        }
        else {
            // Course not found
            res.status(404).json({ message: 'Course not found' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
    finally {
        yield prisma.$disconnect();
    }
}));
router.delete("/delete/:id", auth_1.AuthenticateJWTforAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = Number(req.params.id);
    try {
        const existingCourse = yield prisma.courses.findFirst({
            where: {
                id: courseId,
            },
        });
        if (existingCourse) {
            yield prisma.courses.delete({
                where: {
                    id: courseId,
                },
            });
            return res.status(200).json({ message: "Course deleted successfully" });
        }
        else {
            res.status(404).json({ message: 'Course not found' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
    finally {
        yield prisma.$disconnect();
    }
}));
exports.default = router;
