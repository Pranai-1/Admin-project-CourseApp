"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = exports.Admin = void 0;
var mongoose_1 = require("mongoose");
var adminSchema = new mongoose_1.default.Schema({
    email: String,
    password: String
});
var courseSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    price: Number,
    image: String,
    published: Boolean,
    adminId: String,
    name: String,
});
exports.Admin = mongoose_1.default.model('Admin', adminSchema);
exports.Course = mongoose_1.default.model('Course', courseSchema);
