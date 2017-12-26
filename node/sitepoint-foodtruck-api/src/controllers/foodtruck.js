import mongoose from 'mongoose';
import { Router } from 'express';
import FoodTruck from '../models/foodtruck';
import Review from '../models/review';
import { authenticate } from '../middleware/authMiddleware';
mongoose.Promise = global.Promise;

export default () => {
  const api = Router();

  // 'v1/foodtruck/add'
  api.post('/add', authenticate, ({ body }, res) => {
    const newFoodTruck = new FoodTruck();
    newFoodTruck.name = body.name;
    newFoodTruck.foodtype = body.foodtype;
    newFoodTruck.avgcost = body.avgcost;
    newFoodTruck.geometry.coordinates = body.geometry.coordinates;

    newFoodTruck.save(err => {
      if (err) {
        res.send(err);
      }

      res.json({ message: 'FoodTruck saved successfully' });
    });
  });

  // 'v1/foodtruck'
  api.get('/', (req, res) => {
    FoodTruck.find({}, (err, foodtrucks) => {
      if (err) {
        res.send(err);
      }

      res.json(foodtrucks);
    });
  });

  // 'v1/foodtruck/:id'
  api.get('/:id', ({ params }, res) => {
    FoodTruck.findById(params.id, (err, foodtruck) => {
      if (err) {
        res.send(err);
      }

      res.json(foodtruck);
    });
  });

  /* TODO: Verify how to replace the properties
    passed on the request object */
  // 'v1/foodtruck/:id'
  api.put('/:id', authenticate, ({ body, params }, res) => {
    FoodTruck.findById(params.id, (err, foodtruck) => {
      if (err) {
        res.send(err);
      }

      foodtruck.name = body.name;

      foodtruck.save(err => {
        if (err) {
          res.send(err);
        }

        res.json({ message: 'FoodTruck information was updated' });
      });
    });
  });

  // 'v1/foodtruck/:id'
  api.delete('/:id', authenticate, (req, res) => {
    FoodTruck.remove({ _id: req.params.id }, err => {
      if (err) {
        res.send(err);
      }

      res.json({ message: 'FoodTruck successfully removed' });
    });
  });

  // add review to a foodtruck
  // 'v1/foodtruck/reviews/add/:id
  api.post('/reviews/add/:id', authenticate, ({ body, params }, res) => {
    FoodTruck.findById(params.id, (err, foodtruck) => {
      if (err) {
        res.send(err);
      }

      const newReview = new Review();
      newReview.title = body.title;
      newReview.text = body.text;
      newReview.foodtruck = foodtruck._id;

      newReview.save(err => {
        if (err) {
          res.send(err);
        }

        foodtruck.reviews.push(newReview);
        foodtruck.save(err => {
          if (err) {
            res.send(err);
          }

          res.json({ message: 'Review successfully saved' });
        });
      });
    });
  });

  // get reviews for a foodtruck
  //'v1/foodtruck/reviews/:id'
  api.get('/reviews/:id', ({ params }, res) => {
    Review.find({ foodtruck: params.id }, (err, reviews) => {
      if (err) {
        res.send(err);
      }

      res.json(reviews);
    });
  });

  return api;
};
