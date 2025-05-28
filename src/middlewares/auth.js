import passport from '../config/passport.js';
export const authJWT = passport.authenticate('jwt', { session: false });
