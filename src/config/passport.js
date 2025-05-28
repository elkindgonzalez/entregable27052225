import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { UserModel } from '../dao/models/user.model.js';
import { checkPassword } from '../utils/crypto.js';
import dotenv from 'dotenv';
dotenv.config();

/* ---------- Estrategia local (usuario + contraseña) ---------- */
passport.use(
  'login',
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password', session: false },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email });
        if (!user || !checkPassword(password, user.password)) {
          return done(null, false, { message: 'Credenciales inválidas' });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

/* ---------- Estrategia JWT ---------- */
const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(
  'jwt',
  new JwtStrategy(jwtOpts, async (payload, done) => {
    try {
      const user = await UserModel.findById(payload.sub);
      if (!user) return done(null, false);
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);

export default passport;
