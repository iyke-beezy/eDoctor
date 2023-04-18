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
Object.defineProperty(exports, "__esModule", { value: true });
const authController = (userModel) => {
    const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { username, password } = req.body;
        try {
            const user = yield userModel.login(username, password);
            res.status(201).json({
                status: 'Successful',
                data: user
            });
        }
        catch (error) {
            res.status(error.statusCode).json({
                status: error.name,
                message: error.message
            });
        }
    });
    const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { username, firstName, lastName, email, mobile, dob, password, address } = req.body;
        try {
            const user = yield userModel.register(username, firstName, lastName, email, mobile, dob, password, address);
            res.status(201).json({
                status: 'Successful',
                data: user
            });
        }
        catch (error) {
            res.status(error.statusCode).json({
                status: error.name,
                message: error.message
            });
        }
    });
    return {
        login,
        register
    };
};
exports.default = authController;
//# sourceMappingURL=auth.controller.js.map