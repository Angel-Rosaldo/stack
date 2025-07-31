// src/utils/validators.js
exports.validateContactInput = (data) => {
  const errors = {};
  
  if (!data.nombre || data.nombre.trim() === '') {
    errors.nombre = 'El nombre es requerido';
  }
  
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Email inválido';
  }
  
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

exports.validateLoginInput = (data) => {
  const errors = {};
  
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Email inválido';
  }
  
  if (!data.password || data.password.length < 6) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres';
  }
  
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};