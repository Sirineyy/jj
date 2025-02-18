const mongoose = require("mongoose"); //import

module.exports.connectToMongoDb = async () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.MongoURL)
    .then(
        () => { console.log("Connected :p") }
    )
    .catch((err) => {
      console.log(err);
    });
};