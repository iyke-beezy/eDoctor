"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const config_1 = __importDefault(require("../config"));
const app_1 = __importDefault(require("./../src/app"));
const config = config_1.default[process.env.NODE_ENV || 'development'];
const service = (0, app_1.default)(config);
const log = config.log();
const server = http_1.default.createServer(service);
server.listen(process.env.PORT || 5000);
const { port } = server.address();
server.on('listening', () => {
    log.info(`Hi there, I am listing on port ${port} in ${service.get('env')} mode`);
});
//# sourceMappingURL=run.js.map