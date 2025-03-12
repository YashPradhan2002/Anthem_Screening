import mongoose from 'mongoose';

const membershipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  benefits: {
    type: String,
    required: true,
  },
});

const Membership = mongoose.model('Membership', membershipSchema);

export default Membership;