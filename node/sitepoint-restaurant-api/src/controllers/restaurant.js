import mongoose from 'mongoose';
import { Router } from 'express';
import Restaurant from '../models/restaurant';

export default ({ config, db }) => {
  const api = Router();

  // 'v1/restaurant/add'
  api.post('/add', ({ body }, res) => {
    const newRest = new Restaurant();
    newRest.name = body.name;

    newRest.save(err => {
      if (err) {
        res.send(err);
      }

      res.json({ message: 'Restaurant saved successfully' });
    });
  });

  return api;
};
