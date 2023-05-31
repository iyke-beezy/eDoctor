"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const data_source_1 = require("./dbconfig/data-source");
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const api_route_1 = __importDefault(require("./routes/api.route"));
require("dotenv/config");
class App {
    constructor(config) {
        this.config = config;
        this.server = (0, express_1.default)();
        this.log = config.log();
        this.dbConnect();
        this.configuration();
        this.routerConfig();
    }
    configuration() {
        this.server.use(body_parser_1.default.urlencoded({ extended: true }));
        this.server.use(body_parser_1.default.json({ limit: '1mb' }));
        if (this.server.get("env") === "development") {
            this.server.use((req, res, next) => {
                this.log.debug(`${req.method}: ${req.url}`);
                return next();
            });
        }
    }
    dbConnect() {
        data_source_1.myDataSource
            .initialize()
            .then(() => {
            this.log.info("Data Source has been initialized!");
        })
            .catch((err) => {
            this.log.error("Error during Data Source initialization:", err);
        });
        const options = {
            maxPoolSize: 10
        };
        const { MONGODB_URI } = process.env;
        mongoose_1.default
            .connect(MONGODB_URI, options)
            .then(() => this.log.info('MongoDb is connected!'))
            .catch((error) => this.log.error('MongoDb connection is unsuccessful.: ', error.message));
        this.dataSource = data_source_1.myDataSource;
    }
    routerConfig() {
        this.server.get('/', (req, res) => {
            res.send('Hello World!');
        });
        this.server.use('/auth', (0, auth_route_1.default)(this.dataSource));
        this.server.use('/api', (0, api_route_1.default)(this.dataSource));
    }
    getServer() {
        return this.server;
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map