import mongoose from 'mongoose';

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

export default connectDB;