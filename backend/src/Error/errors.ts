export class ApplicationError extends Error {
    statusCode: number;
    status: string;
    message: string

    constructor (statusCode:number, message:string, status = 'Error Occured!', ) {
        super(message)
        this.statusCode = statusCode
        this.status = status;
        this.message = message
    }
}

export class NotFoundError extends ApplicationError {
    constructor(message?: string) {
        super(404, message || 'Resource not found')
    }
}

export class ServerError extends ApplicationError {
    constructor(message?: string) {
        super(500, message || "Internal Server Error")
    }
}

export class AuthenticationError extends ApplicationError {
    constructor(message?: string) {
        super(401, message || "You are unauthorized to access this service.")
    }
}

export class UserExistError extends ApplicationError {
    constructor(message?: string) {
        super(409, message || "User Already Exists");
    }
}
