import  mongoose  from 'mongoose';

const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact number is required'],
  },
  membershipId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Membership',
  },
  status: {
    type: String,
    enum: ['Gold', 'Diamond'],
    required: [true, 'Status is required'],
  },
}, { timestamps: true });

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;