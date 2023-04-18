"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDataSource = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = __importDefault(require("../entity/user.entity"));
exports.myDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "edoctor",
    password: "edoctor",
    database: "api",
    entities: [user_entity_1.default],
    logging: true,
    synchronize: true,
});
//# sourceMappingURL=data-source.js.map