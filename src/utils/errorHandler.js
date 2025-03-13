import CustomError from './customError.js';

// Middleware para manejar errores
const errorHandler = (err, req, res, next) => {
  
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  // Para otros tipos de errores no controlados
  console.error(err);  
  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error' 
  });
};

export default errorHandler;
