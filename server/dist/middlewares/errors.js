"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (error, req, res, next) => {
    console.log(error.message);
    res.status(error.statusCode).json({
        message: error.message,
        errors: error.errors
    });
};
exports.errorMiddleware = errorMiddleware;
