import mongoose from 'mongoose';
import FoodTruck from './foodtruck';

const reviewSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: String,
  foodtruck: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FoodTruck',
    required: true,
  },
});

export default mongoose.model('Review', reviewSchema);
