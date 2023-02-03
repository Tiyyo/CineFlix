const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.set("strictQuery", false);

  mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log("database is connect"))
    .catch((error) => {
      console.log("database connection failed, exiting now ...");
      console.error(error);
      process.exit();
    });
};

module.exports = connectDB;
