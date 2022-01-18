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
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = require("../utils/config");
const schema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    bio: String,
    phone: String,
    email: String,
    avatar: String,
    passwordHash: String,
    friends: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });
schema.methods.comparePasswords = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return bcryptjs_1.default.compare(password, this.passwordHash);
    });
};
schema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isNew || this.isModified("passwordHash")) {
            this.passwordHash = yield bcryptjs_1.default.hash(this.passwordHash, Number(config_1.SALT_ROUND));
        }
        next();
    });
});
schema.set("toJSON", {
    versionKey: false,
    transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.passwordHash;
    },
});
exports.default = (0, mongoose_1.model)("User", schema);
