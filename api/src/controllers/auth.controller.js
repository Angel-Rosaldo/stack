const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { pool } = require('../services/db');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Buscar usuario
    const userResult = await pool.query(
      'SELECT id, email, password FROM usuarios WHERE email = $1',
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const user = userResult.rows[0];

    // 2. Validar contraseña
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // 3. Generar JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    // 4. Responder sin la contraseña
    delete user.password;
    res.json({ token, user });

  } catch (error) {
    next(error);
  }
};

exports.verifyToken = async (req, res) => {
  try {
    const user = await pool.query(
      'SELECT id, email FROM usuarios WHERE id = $1',
      [req.user.id]
    );
    
    if (user.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    res.json(user.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al verificar token' });
  }
};