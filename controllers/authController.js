const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { findUserByEmail, createUser } = require('../models/userModel');
const { registerSchema, loginSchema } = require('../validators/userValidator');

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const register = (req, res) => {
  const validation = registerSchema.safeParse(req.body);
  if (!validation.success) return res.status(400).json(validation.error.errors);

  const { name, email, password } = req.body;

  findUserByEmail(email, (err, user) => {
    if (err) return res.status(500).json({ message: 'Database error.' });
    if (user) return res.status(400).json({ message: 'Email sudah terdaftar.' });

    const hashedPassword = bcrypt.hashSync(password, 10);
    createUser(name, email, hashedPassword, (err) => {
      if (err) return res.status(500).json({ message: 'Database error.' });
      res.status(201).json({ message: 'Registrasi berhasil.' });
    });
  });
};

// Login user
const login = (req, res) => {
  const validation = loginSchema.safeParse(req.body);
  if (!validation.success) return res.status(400).json(validation.error.errors);

  const { email, password } = req.body;

  findUserByEmail(email, (err, user) => {
    if (err) return res.status(500).json({ message: 'Database error.' });
    if (!user) return res.status(400).json({ message: 'Email atau password salah.' });

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Email atau password salah.' });

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '24h' });
    res.json({ message: 'Login berhasil.', token });
  });
};

// Verify User
const verifyToken = (req, res) => {
  const { user } = req;
  res.json({ isValid: true, user });
};

module.exports = { register, login, verifyToken };