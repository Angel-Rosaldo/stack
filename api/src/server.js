require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { pool } = require('./services/db');
const authRoutes = require('./routes/auth.routes');
const contactRoutes = require('./routes/contacts.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Test DB connection
pool.query('SELECT NOW()', (err) => {
  if (err) {
    console.error('❌ Error connecting to database:', err);
  } else {
    console.log('✅ Database connected successfully');
  }
});

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'API is healthy', timestamp: new Date() });
});

app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});