"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = exports.Visibility = void 0;
var Visibility;
(function (Visibility) {
    Visibility[Visibility["PRIVATE"] = 0] = "PRIVATE";
    Visibility[Visibility["PUBLIC"] = 1] = "PUBLIC";
})(Visibility = exports.Visibility || (exports.Visibility = {}));
var Role;
(function (Role) {
    Role[Role["OWNER"] = 0] = "OWNER";
    Role[Role["ADMIN"] = 1] = "ADMIN";
    Role[Role["MEMBER"] = 2] = "MEMBER";
})(Role = exports.Role || (exports.Role = {}));
