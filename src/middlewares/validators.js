// src/middlewares/validators.js (o .mjs)
import Joi from 'joi';

// Esquema de validación para creación y actualización de usuarios
export const userSchema = Joi.object({
  first_name: Joi.string().min(2).required(),
  last_name:  Joi.string().min(2).required(),
  email:      Joi.string().email().required(),
  age:        Joi.number().integer().min(0).required(),
  password:   Joi.string().min(6).required()
});

// Función genérica que recibe un esquema Joi
export function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map(d => d.message);
      return res.status(400).json({ errors });
    }
    next();
  };
}
