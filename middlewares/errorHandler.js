const logger = require("../logger/logger");

const errorHandler = (err, req, res, next) =>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    logger.error(
        `ERROR ${err.statusCode} - ${req.method} ${req.path} - ${err.status} - ${err.message} - IP: ${req.ip}`
    );

res.status(err.statusCode).json({

    status: err.status,
    message: err.message,
});
};

module.exports = errorHandler