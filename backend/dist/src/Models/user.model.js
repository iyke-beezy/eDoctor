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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const user_entity_1 = __importDefault(require("../entity/user.entity"));
const errors_1 = require("../Error/errors");
class User {
    constructor(dataSource) {
        this.generateVerificationToken = (id, name) => {
            return jsonwebtoken_1.default.sign({ id, name }, this.jwtPrivateSecret, {
                expiresIn: "10d",
                algorithm: "RS256",
            });
        };
        this.dataSource = dataSource;
        this.repository = dataSource.getRepository(user_entity_1.default);
        this.jwtPrivateSecret = process.env.JWT_PRIVATE_SECRET.replace(/\\n/g, "\n");
    }
    getPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.hash(password, parseInt(process.env.hash) || 10);
        });
    }
    login(userName, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.dataSource.getRepository(user_entity_1.default).findOneBy({
                    userName
                });
                if (!user) {
                    throw new errors_1.NotFoundError('User does not exist, please create a new User.');
                }
                this.password = user.password;
                const checkPassword = yield this.comparePassword(password);
                if (!checkPassword) {
                    throw new errors_1.AuthenticationError('Wrong Credentials!');
                }
                this.lastLogin = new Date();
                user.lastLogin = this.lastLogin;
                yield this.repository.save(user);
                const token = this.generateVerificationToken(user.id, user.name);
                return {
                    user: { id: user.id, name: user.firstName + " " + user.lastName },
                    token
                };
            }
            catch (error) {
                if (error instanceof errors_1.NotFoundError || error instanceof errors_1.AuthenticationError) {
                    throw error;
                }
                else {
                    throw new errors_1.ServerError();
                }
            }
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.findOneBy({
                    id
                });
            }
            catch (err) {
                throw err;
            }
        });
    }
    getUsers(cliche, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.repository.find({
                    where: {
                        [cliche]: value
                    }
                });
                return users;
            }
            catch (err) {
                return err;
            }
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.repository.find({
                    order: {
                        id: "DESC",
                    },
                });
                return users;
            }
            catch (err) {
                return err;
            }
        });
    }
    register(username, firstName, lastName, email, mobile, dob, password, address) {
        return __awaiter(this, void 0, void 0, function* () {
            this.userName = username;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.mobile = mobile;
            this.address = address;
            this.dob = new Date(dob);
            this.password = password;
            password = yield this.getPassword(password);
            this.signupDate = new Date();
            const checkUserName = yield this.repository.findOneBy({
                userName: username,
            });
            if (checkUserName) {
                throw new errors_1.UserExistError('Username Already Exists! Please choose another username');
            }
            else {
                const user = new user_entity_1.default();
                user.firstName = this.firstName;
                user.lastName = this.lastName;
                user.userName = this.userName;
                user.email = this.email;
                user.password = password;
                user.mobile = this.mobile;
                user.address = this.address;
                user.dob = this.dob;
                user.signupDate = this.signupDate;
                yield this.repository.save(user);
                return {
                    status: '200',
                    data: this.toJSON()
                };
            }
        });
    }
    comparePassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.compare(password, this.password);
        });
    }
    toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            userName: this.userName,
            email: this.email,
            mobile: this.mobile,
            address: this.address,
            dob: this.dob,
        };
    }
}
exports.default = User;
//# sourceMappingURL=user.model.js.map