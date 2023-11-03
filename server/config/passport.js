import passport from 'passport';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';

import { User } from '../models/User.js';

export const configPassport = () => {
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (decodedToken, done) => {
        try {
          const user = await User.findOne({ name: decodedToken.username });
          if (!user) {
            const error = new Error('User not found.');
            error.status = 404;
            throw error;
          }

          done(null, user);
        } catch (error) {
          done(error, false);
        }
      }
    )
  );
};
