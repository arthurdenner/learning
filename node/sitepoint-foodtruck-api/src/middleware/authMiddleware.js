import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';

const TOKENTIME = 60 * 60 * 24 * 30; // 30 days
const SECRET = "Shh! That's a secret!";

export const authenticate = expressJwt({ secret: SECRET });

export const generateAccessToken = (req, res, next) => {
  req.token = req.token || {};
  req.token = jwt.sign({ id: req.user.id }, SECRET, {
    expiresIn: TOKENTIME,
  });

  next();
};

export const respond = (req, res) => {
  res.status(200).json({
    user: req.user.username,
    token: req.token,
  });
};
