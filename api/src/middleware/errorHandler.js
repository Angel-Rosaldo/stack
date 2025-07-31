module.exports = (err, req, res, next) => {
  console.error(err.stack);
  
  // Errores de validación
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }
  
  // Errores de JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Token inválido' });
  }
  
  // Error por defecto
  res.status(500).json({ error: 'Algo salió mal en el servidor' });
};