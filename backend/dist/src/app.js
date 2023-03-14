"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server = (0, express_1.default)();
const app = (config) => {
    const log = config.log();
    if (server.get("env") === "development") {
        server.use((req, res, next) => {
            log.debug(`${req.method}: ${req.url}`);
            return next();
        });
    }
    server.use((error, req, res, next) => {
        res.status(error.status || 500);
        log.error(error);
        return res.json({
            error: {
                message: error.message,
            },
        });
    });
    server.get('/', (req, res) => {
        res.send('Hello World!');
    });
    return server;
};
exports.default = app;
//# sourceMappingURL=app.js.map