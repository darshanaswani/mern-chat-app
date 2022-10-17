const mongoose = require("mongoose");
const colors = require("colors");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "..", "..", ".env") });

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`.bgYellow);
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = connectDB;
