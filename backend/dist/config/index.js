"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bunyan_1 = __importDefault(require("bunyan"));
const package_json_1 = __importDefault(require("../package.json"));
const { name, version } = package_json_1.default;
const getLogger = (serviceName, serviceVersion, level) => bunyan_1.default.createLogger({ name: `${serviceName}:${serviceVersion}`, level });
const development = {
    name,
    version,
    serviceTimeOut: 30,
    log: () => getLogger(name, version, 'debug')
};
const production = {
    name,
    version,
    serviceTimeout: 30,
    log: () => getLogger(name, version, 'info'),
};
const test = {
    name,
    version,
    serviceTimeout: 30,
    log: () => getLogger(name, version, 'fatal'),
};
exports.default = {
    development,
    production,
    test
};
//# sourceMappingURL=index.js.map