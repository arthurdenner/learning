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

  // 'v1/restaurant'
  api.get('/', (req, res) => {
    Restaurant.find({}, (err, restaurants) => {
      if (err) {
        res.send(err);
      }

      res.json(restaurants);
    });
  });

  // 'v1/restaurant/:id'
  api.get('/:id', ({ params }, res) => {
    Restaurant.findById(params.id, (err, restaurant) => {
      if (err) {
        res.send(err);
      }

      res.json(restaurant);
    });
  });

  // 'v1/restaurant/:id'
  api.put('/:id', ({ body, params }, res) => {
    Restaurant.findById(params.id, (err, restaurant) => {
      if (err) {
        res.send(err);
      }

      restaurant.name = body.name;

      restaurant.save(err => {
        if (err) {
          res.send(err);
        }

        res.json({ message: 'Restaurant information was updated' });
      });
    });
  });

  // 'v1/restaurant/:id'
  api.delete('/:id', (req, res) => {
    Restaurant.remove({ _id: req.params.id }, (err, restaurant) => {
      if (err) {
        res.send(err);
      }

      res.json({ message: 'Restaurant successfully removed' });
    });
  });

  return api;
};
