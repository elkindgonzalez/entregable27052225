// src/middlewares/roles.js

/**
 * Middleware para verificar si el usuario tiene un rol permitido.
 * @param  {...string} rolesPermitidos 
 */
export const checkRole = (...rolesPermitidos) => {
    return (req, res, next) => {
      const role = req.user?.role;
      if (!rolesPermitidos.includes(role)) {
        return res.status(403).json({ error: 'Acceso denegado: rol no autorizado' });
      }
      next();
    };
  };
  