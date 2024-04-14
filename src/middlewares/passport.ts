import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { comparePasswords } from '../libraries/bcrypt';
import { findOne, findById } from '../repositories/userRepository';

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
      const user = await findOne(email);
      if (!user) {
          return done(null, false, { message: 'Invalid Login!' });
      }
      
      const passwordMatch = await comparePasswords(password, user?.password);
      if (!passwordMatch) {
          return done(null, false, { message: 'Invalid Login!' });
      }

      return done(null, user);
  } catch (error) {
      return done(error);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your-secret',
};

passport.use(new JwtStrategy(opts, async (jwtPayload, done) => {
  try {
    const user = await findById(jwtPayload.id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

const localStrategy = passport.authenticate('local', { session: false });
const jwtStrategy = passport.authenticate('jwt', { session: false });

export {localStrategy, jwtStrategy};