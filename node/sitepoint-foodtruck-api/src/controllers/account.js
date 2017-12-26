import { Router } from 'express';
import passport from 'passport';
import Account from '../models/account';
import {
  authenticate,
  generateAccessToken,
  respond,
} from '../middleware/authMiddleware';

export default () => {
  const api = Router();

  // 'v1/account/register'
  api.post('/register', (req, res) => {
    Account.register(
      new Account({ username: req.body.email }),
      req.body.password,
      err => {
        if (err) {
          res.send(err);
        }

        passport.authenticate('local', { session: false })(req, res, () => {
          res.status(200).send('Account successfully created');
        });
      }
    );
  });

  // 'v1/account/login'
  api.post(
    '/login',
    passport.authenticate('local', {
      session: false,
      scope: [],
    }),
    generateAccessToken,
    respond
  );

  // 'v1/account/logout'
  api.get('/logout', authenticate, (req, res) => {
    res.logout();
    res.status(200).send('Successfully logged out');
  });

  // 'v1/account/me'
  api.get('/me', authenticate, (req, res) => {
    res.status(200).json(req.user);
  });

  return api;
};
