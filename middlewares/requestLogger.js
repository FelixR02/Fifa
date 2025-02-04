const logger = require("../logger/logger");

const requestLogger = (req, res, next) => {
  console.log('\n=== NUEVA PETICIÓN ===');
  console.log('Método:', req.method);
  console.log('URL:', req.originalUrl);
  console.log('Headers:', {
    authorization: req.headers.authorization ? 'Bearer presente' : 'No presente',
    contentType: req.headers['content-type']
  });
  console.log('Body:', req.body);
 
  console.log('Params:', req.params);
  console.log('Query:', req.query);
  
  // Log original
 // logger.info(${req.method} ${req.originalUrl} from ${req.ip});
  
  next();
};

module.exports = requestLogger;