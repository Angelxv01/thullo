"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADMIN = exports.OWNER = void 0;
const BASE = {
    canComment: false,
    canEdit: false,
    canDelete: false,
    canRemoveAdmin: false,
    canRemoveMember: false,
    canInviteUser: false,
    canAddUser: false,
};
exports.OWNER = {
    canComment: true,
    canEdit: true,
    canDelete: true,
    canRemoveAdmin: true,
    canRemoveMember: true,
    canInviteUser: true,
    canAddUser: true,
};
exports.ADMIN = Object.assign(Object.assign({}, BASE), { canRemoveMember: true });
