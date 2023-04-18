"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("./user.model"));
const makeid_1 = __importDefault(require("../helpers/makeid"));
class Customer extends user_model_1.default {
    constructor(dataSource) {
        super(dataSource);
        this.custId = (0, makeid_1.default)(10);
    }
}
exports.default = Customer;
//# sourceMappingURL=customer.model.js.map