"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserExistError = exports.AuthenticationError = exports.ServerError = exports.NotFoundError = exports.ApplicationError = void 0;
class ApplicationError extends Error {
    constructor(statusCode, message, status = 'Error Occured!') {
        super(message);
        this.statusCode = statusCode;
        this.status = status;
        this.message = message;
    }
}
exports.ApplicationError = ApplicationError;
class NotFoundError extends ApplicationError {
    constructor(message) {
        super(404, message || 'Resource not found');
    }
}
exports.NotFoundError = NotFoundError;
class ServerError extends ApplicationError {
    constructor(message) {
        super(500, message || "Internal Server Error");
    }
}
exports.ServerError = ServerError;
class AuthenticationError extends ApplicationError {
    constructor(message) {
        super(401, message || "You are unauthorized to access this service.");
    }
}
exports.AuthenticationError = AuthenticationError;
class UserExistError extends ApplicationError {
    constructor(message) {
        super(409, message || "User Already Exists");
    }
}
exports.UserExistError = UserExistError;
//# sourceMappingURL=errors.js.map