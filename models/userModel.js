const db = require('../config/db');

const findUserByEmail = (email, callback) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => callback(err, results[0]));
};

const createUser = (name, email, password, callback) => {
  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(query, [name, email, password], (err, results) => callback(err, results));
};

module.exports = { findUserByEmail, createUser };