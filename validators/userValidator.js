const { z } = require('zod');

const registerSchema = z.object({
  name: z.string().min(3, 'Nama harus minimal 3 karakter'),
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password harus minimal 6 karakter'),
});

const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password harus minimal 6 karakter'),
});

module.exports = { registerSchema, loginSchema };