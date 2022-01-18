"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    title: String,
    visibility: {
        type: Number,
        enum: [0, 1],
        default: 0,
    },
    description: String,
    coverId: String,
    members: [
        {
            _id: false,
            id: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "User",
            },
            role: {
                type: Number,
                enum: [0, 1, 2],
                default: 2,
            },
        },
    ],
}, { timestamps: true });
schema.set("toJSON", {
    versionKey: false,
    transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
    },
});
exports.default = (0, mongoose_1.model)("Board", schema);
