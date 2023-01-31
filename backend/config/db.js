const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect("", () => console.log("database is connect"));
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

module.exports = connectDB;
