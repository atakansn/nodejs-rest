class BaseError extends Error {
    constructor(message, status, stack = false) {
        super(message);
        this.message = message
        this.status = status

        if (stack) {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

module.exports = BaseError