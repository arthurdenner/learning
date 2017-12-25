import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  name: String,
});

export default mongoose.model('Restaurant', restaurantSchema);
