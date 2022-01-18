"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: String,
    boardId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Board",
    },
});
schema.set("toJSON", {
    versionKey: false,
    transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
    },
});
exports.default = (0, mongoose_1.model)("List", schema);
