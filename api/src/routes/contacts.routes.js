const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
  getAllContacts,
  createContact
} = require('../controllers/contacts.controller');

router.use(authMiddleware); // Protege todas las rutas de contactos

router.get('/', getAllContacts);
router.post('/', createContact);

module.exports = router;