import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Membership from './models/Membership.js';

dotenv.config();

const db = process.env.MONGO_URI || "mongodb+srv://screening:customer123@customer.9my8j.mongodb.net/";

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const seedMemberships = async () => {
  await connectDB();

  const memberships = [
    {
      name: 'Basic',
      benefits: 'Access to all basic features',
    },
    {
      name: 'Premium',
      benefits: 'Access to all features including premium support',
    },
  ];

  try {
    await Membership.deleteMany();
    await Membership.insertMany(memberships);
    console.log('Memberships seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding memberships:', error);
    process.exit(1);
  }
};

seedMemberships();