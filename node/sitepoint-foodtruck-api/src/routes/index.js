import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initializeDb from '../db';
import account from '../controllers/account';
import foodtruck from '../controllers/foodtruck';

const router = express();

initializeDb(db => {
  // internal middleware
  router.use(middleware({ config, db }));

  // api routes v1 (/v1)
  router.use('/account', account({ config, db }));
  router.use('/foodtruck', foodtruck({ config, db }));
});

export default router;
