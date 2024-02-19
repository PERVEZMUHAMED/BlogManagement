export default class ErrorHandler extends Error {
    status: number;
    constructor(message, status) {
        super(message);
        this.status = status;
        Error.captureStackTrace(this, this.constructor);
    }
}