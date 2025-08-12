import passport from '../config/passport.js';

export const auth = passport.authenticate('jwt', { session: false });
