"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attachment = void 0;
const mongoose_1 = require("mongoose");
const attachmentSchema = new mongoose_1.Schema({
    title: String,
    coverId: String,
    cardId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Card" },
    filename: String,
}, { timestamps: true });
attachmentSchema.set("toJSON", {
    versionKey: false,
    transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
    },
});
const schema = new mongoose_1.Schema({
    title: String,
    description: String,
    boardId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Board" },
    listId: { type: mongoose_1.Schema.Types.ObjectId, ref: "List" },
    members: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    coverId: String,
    comments: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Comment" }],
    labels: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Label" }],
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });
schema.set("toJSON", {
    versionKey: false,
    transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
    },
});
exports.Attachment = (0, mongoose_1.model)("Attachment", attachmentSchema);
exports.default = (0, mongoose_1.model)("Card", schema);
