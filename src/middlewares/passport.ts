import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { comparePasswords } from '../libraries/bcrypt';
import { findOne, findById } from '../repositories/userRepository'; // Import your User model

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
      const user = await findOne(email);
      if (user.length === 0) {
          return done(null, false, { message: 'Invalid Login!' });
      }

      console.log(user, 'ini sh usernya')
      const passwordMatch = await comparePasswords(password, user[0].password || '');
      if (!passwordMatch) {
        console.log('apa bener?')
          return done(null, false, { message: 'Invalid Login!' });
      }
      console.log('apa salah?', user)

      return done(null, user[0]);
  } catch (error) {
      return done(error);
  }
}));

passport.serializeUser((user, done) => {
  console.log("masuk sini ga?", user)
  done(null, user);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    console.log("masuk sini ga?", id)
    const user = await findById(id);
    done(null, user[0]);
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
    console.log(jwtPayload, 'ini sh')
    const user = await findById(jwtPayload.id);
    if (!user) {
      return done(null, false);
    }
    console.log("ini user", user)
    return done(null, user?.[0]);
  } catch (error) {
    return done(error);
  }
}));
const localStrategy = passport.authenticate('local', { session: false });
const jwtStrategy = passport.authenticate('jwt', { session: false });
export {localStrategy, jwtStrategy};
// export const jwtStrategy = passport.authenticate('jwt', { session: false });