import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'; // ← Añadido ExtractJwt
import { UserModel } from '../dao/models/user.model.js';
import { checkPassword } from '../utils/crypto.js';
import dotenv from 'dotenv';
dotenv.config();

/* ---------- Estrategia Local (Login) ---------- */
passport.use(
  'login',
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password', session: false },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email }).lean();
        if (!user || !checkPassword(password, user.password)) {
          return done(null, false, { message: 'Credenciales inválidas' });
        }
        delete user.password;                     // ← Quitamos hash antes de pasar el user
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

/* ---------- Estrategia JWT (Protección de rutas) ---------- */
const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(
  'jwt',
  new JwtStrategy(jwtOpts, async (payload, done) => {
    try {
      const user = await UserModel.findById(payload.sub).lean();
      if (!user) return done(null, false, { message: 'Usuario no válido' });
      delete user.password;                     // ← Y aquí también
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);

export default passport;
