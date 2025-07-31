const axios = require('axios');
const logger = require('../utils/logger');

const verifyRecaptcha = async (req, res, next) => {
  const { recaptcha } = req.body;
  
  if (!recaptcha) {
    return res.status(400).json({
      success: false,
      error: 'reCAPTCHA es requerido'
    });
  }

  try {
    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: recaptcha
        }
      }
    );

    if (!response.data.success) {
      logger.warn('reCAPTCHA verification failed:', response.data);
      return res.status(400).json({
        success: false,
        error: 'Verificación de reCAPTCHA fallida'
      });
    }

    next();
  } catch (error) {
    logger.error('Error verifying reCAPTCHA:', error);
    res.status(500).json({
      success: false,
      error: 'Error al verificar reCAPTCHA'
    });
  }
};

module.exports = verifyRecaptcha;