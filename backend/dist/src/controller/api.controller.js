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
const apiController = (model) => {
    const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const user = yield model.getUser(id);
            res.status(201).json({
                status: 'Successful',
                data: user
            });
        }
        catch (err) {
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message
            });
        }
    });
    const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield model.getAllUsers();
            res.status(200).json({
                status: 'Successful',
                data: users
            });
        }
        catch (error) {
            res.status(501).json({
                status: "Error Occured",
                message: error.message
            });
        }
    });
    return {
        getUser,
        getAllUsers
    };
};
exports.default = apiController;
//# sourceMappingURL=api.controller.js.map