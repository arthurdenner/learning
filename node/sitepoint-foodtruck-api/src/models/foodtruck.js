import mongoose from 'mongoose';

const foodtruckSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    foodtype: {
      type: String,
      required: true,
    },
    avgcost: Number,
    geometry: {
      type: { type: String, default: 'Point' },
      coordinates: [Number],
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  },
  { usePushEach: true }
);

export default mongoose.model('FoodTruck', foodtruckSchema);
