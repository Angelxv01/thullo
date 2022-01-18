"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    text: String,
    color: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    },
    boardId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Board" },
}, { timestamps: true });
schema.set("toJSON", {
    versionKey: false,
    transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
    },
});
exports.default = (0, mongoose_1.model)("Label", schema);
