import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import config from './config';
import routes from './routes';
import Account from './models/account';

const app = express();
app.server = http.createServer(app);

// middleware
// parse application/json
app.use(
  bodyParser.json({
    limit: config.bodyLimit,
  })
);

// passport config
app.use(passport.initialize());
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    Account.authenticate()
  )
);
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// api routes v1
app.use('/v1', routes);
app.server.listen(config.port);

console.log(`Started on port ${config.port}`);

export default app;
