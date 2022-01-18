"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPLOAD_URL = exports.MONGODB = exports.SECRET = exports.SALT_ROUND = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = require("path");
dotenv_1.default.config();
exports.PORT = process.env.PORT || 4000;
exports.SALT_ROUND = process.env.SALT_ROUND;
exports.SECRET = process.env.SECRET;
exports.MONGODB = process.env.NODE_ENV === "test"
    ? process.env.MONGODB_TEST
    : process.env.MONGODB;
exports.UPLOAD_URL = new URL((0, path_1.join)(process.cwd()));
