"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controller/auth.controller"));
const user_model_1 = __importDefault(require("../Models/user.model"));
const authRouter = (0, express_1.Router)();
const authRoute = (entity) => {
    const user = new user_model_1.default(entity);
    const { login, register } = (0, auth_controller_1.default)(user);
    authRouter.post('/login', login);
    authRouter.post('/register', register);
    return authRouter;
};
exports.default = authRoute;
//# sourceMappingURL=auth.route.js.map