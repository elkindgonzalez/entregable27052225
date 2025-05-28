export const authorize =
  (...roles) => (req, _res, next) =>
    roles.includes(req.user.role) ? next() : next({ status: 403, message: 'Forbidden' });
