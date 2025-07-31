const { pool } = require('../services/db');
const validateContactInput = (data) => ({ errors: {}, isValid: true });
const logger = require('../utils/logger');

exports.getAllContacts = async (req, res, next) => {
  try {
    const { rows } = await pool.query(`
      SELECT id, nombre, correo, telefono, mensaje, 
             TO_CHAR(fecha_creacion, 'YYYY-MM-DD HH24:MI:SS') as fecha_creacion, 
             terminos 
      FROM contactos 
      ORDER BY fecha_creacion DESC
    `);
    
    logger.info(`Fetched ${rows.length} contacts`);
    res.json({
      success: true,
      data: rows,
      count: rows.length
    });
  } catch (error) {
    logger.error('Error fetching contacts:', error);
    next(error);
  }
};

exports.createContact = async (req, res, next) => {
  const { nombre, correo, telefono, mensaje, terminos } = req.body;
  
  // Validaciones
  if (!nombre || !correo || !telefono || !mensaje || terminos === undefined) {
    return res.status(400).json({
      success: false,
      error: 'Todos los campos son requeridos'
    });
  }

  if (!validateEmail(correo)) {
    return res.status(400).json({
      success: false,
      error: 'Correo electrónico no válido'
    });
  }

  if (!validatePhone(telefono)) {
    return res.status(400).json({
      success: false,
      error: 'Número de teléfono no válido'
    });
  }

  if (!terminos) {
    return res.status(400).json({
      success: false,
      error: 'Debes aceptar los términos y condiciones'
    });
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO contactos 
       (nombre, correo, telefono, mensaje, terminos) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING id, nombre, correo, telefono, mensaje, 
                 TO_CHAR(fecha_creacion, 'YYYY-MM-DD HH24:MI:SS') as fecha_creacion, 
                 terminos`,
      [nombre, correo, telefono, mensaje, terminos]
    );
    
    logger.info(`New contact created: ${correo}`);
    res.status(201).json({
      success: true,
      data: rows[0],
      message: 'Contacto creado exitosamente'
    });
  } catch (error) {
    logger.error('Error creating contact:', error);
    
    // Manejo específico de errores de duplicados
    if (error.code === '23505') {
      return res.status(409).json({
        success: true,
        error: 'Este correo electrónico ya está registrado'
      });
    }
    
    next(error);
  }
};