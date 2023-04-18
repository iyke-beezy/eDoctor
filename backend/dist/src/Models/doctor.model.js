"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("./user.model"));
const makeid_1 = __importDefault(require("../helpers/makeid"));
class Doctor extends user_model_1.default {
    constructor(dataSource) {
        super(dataSource);
        this.doctorId = (0, makeid_1.default)(10);
    }
}
exports.default = Doctor;
//# sourceMappingURL=doctor.model.js.map