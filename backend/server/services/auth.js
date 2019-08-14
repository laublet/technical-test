import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt, } from 'passport-jwt';

import User from '@/components/users/user.model';
import constants from '@/config/constants';

import catchError from './error';

const localLogin = new LocalStrategy({ usernameField: 'email', }, (email, password, done) => {
  console.log('email', email);
  console.log('password', password);
  User.findOne({ email, })
    .then(user => {
      if (!user) {
        return done(null, false);
      }
      if (!user.authenticate(password)) {
        return done(null, false);
      }

      return done(null, user);
    })
    .catch(err => {
      done(catchError(err));
    });
});

const jwtOpts = {
  // Telling Passport to check authorization headers for Bearer
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // Telling Passport where to find the secret
  secretOrKey: constants.JWT_SECRET,
};

const jwtLogin = new JWTStrategy(jwtOpts, (payload, done) => {
  User.findById(payload._id)
    .then(user => {
      if (!user) {
        return done(null, false);
      }

      return done(null, user.toJSON());
    })
    .catch(err => {
      done(catchError(err));
    });
});

passport.use(localLogin);
passport.use(jwtLogin);

export const authLocal = passport.authenticate('local', { session: false, }); // session to be added
export const authJwt = passport.authenticate('jwt', { session: false, });
