import CustomError from './customError.js';

const errorHandler = (err, req, res, next) => {

    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    }

    console.error(err);
    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    });
};

export default errorHandler;
