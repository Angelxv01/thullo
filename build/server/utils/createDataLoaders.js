"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataloader_1 = __importDefault(require("dataloader"));
const User_1 = __importDefault(require("../models/User"));
const Board_1 = __importDefault(require("../models/Board"));
const List_1 = __importDefault(require("../models/List"));
const Card_1 = __importStar(require("../models/Card"));
const Comment_1 = __importDefault(require("../models/Comment"));
const Label_1 = __importDefault(require("../models/Label"));
function cacheKeyFn(val) {
    return val;
}
const dataLoader = (Model) => new dataloader_1.default((keys) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Model.find({ _id: { $in: keys } });
    return keys.map((key) => result.find((obj) => obj.id === String(key)));
}), { cacheKeyFn });
const batchUserBoard = (keys) => __awaiter(void 0, void 0, void 0, function* () {
    const data = (yield Board_1.default.find({ "members.id": keys }));
    const results = data.map((obj) => obj.toJSON());
    return keys.map((key) => results.filter((obj) => obj.members.find((value) => String(value.id) === String(key))));
});
const boardLoader = (Model) => new dataloader_1.default((keys) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Model.find({ boardId: { $in: keys } });
    const result = data.map((obj) => obj.toJSON());
    const out = keys.reduce((acc, key) => {
        const find = result.filter((obj) => String(obj.boardId) === String(key));
        acc.push(find);
        return acc;
    }, []);
    return out;
}), { cacheKeyFn });
const batchCommentCard = (keys) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Comment_1.default.find({
        cardId: { $in: keys },
    });
    const result = data.map((obj) => obj.toJSON());
    return keys.map((key) => result.filter((obj) => String(obj.cardId) === String(key)));
});
const batchAttachmentCard = (keys) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Card_1.Attachment.find({
        cardId: { $in: keys },
    });
    const result = data.map((obj) => obj.toJSON());
    return keys.map((key) => result.filter((obj) => String(obj.cardId) === String(key)));
});
const batchCommentParent = (keys) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Comment_1.default.find({
        parentId: { $in: keys },
    });
    const result = data.map((obj) => obj.toJSON());
    return keys.map((key) => result.filter((obj) => String(obj.parentId) === String(key)));
});
const batchCardList = (keys) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Card_1.default.find({
        listId: { $in: keys },
    });
    const result = data.map((obj) => obj.toJSON());
    return keys.map((key) => result.filter((obj) => String(obj.listId) === String(key)));
});
const createDataLoader = () => {
    const dataLoaders = {
        UserLoader: dataLoader(User_1.default),
        BoardLoader: dataLoader(Board_1.default),
        ListLoader: dataLoader(List_1.default),
        CardLoader: dataLoader(Card_1.default),
        CommentLoader: dataLoader(Comment_1.default),
        LabelLoader: dataLoader(Label_1.default),
        UserBoard: new dataloader_1.default(batchUserBoard, { cacheKeyFn }),
        ListBoard: boardLoader(List_1.default),
        CardBoard: boardLoader(Card_1.default),
        LabelBoard: boardLoader(Label_1.default),
        CommentCard: new dataloader_1.default(batchCommentCard, { cacheKeyFn }),
        AttachmentCard: new dataloader_1.default(batchAttachmentCard, { cacheKeyFn }),
        CommentReply: new dataloader_1.default(batchCommentParent, { cacheKeyFn }),
        CardList: new dataloader_1.default(batchCardList, { cacheKeyFn }),
    };
    return dataLoaders;
};
exports.default = createDataLoader;
