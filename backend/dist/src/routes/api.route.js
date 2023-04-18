"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_controller_1 = __importDefault(require("../controller/api.controller"));
const user_model_1 = __importDefault(require("../Models/user.model"));
const auth_1 = require("../middlewares/auth");
const apiRouter = (0, express_1.Router)();
const apiRoute = (entity) => {
    const user = new user_model_1.default(entity);
    const { getUser, getAllUsers } = (0, api_controller_1.default)(user);
    apiRouter.get('/getUser/:id', auth_1.auth, getUser);
    apiRouter.get('/getAllUsers', auth_1.auth, getAllUsers);
    return apiRouter;
};
exports.default = apiRoute;
//# sourceMappingURL=api.route.js.map