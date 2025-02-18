const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./baseUserSchema");

const parentSchema = User.discriminator(
  "parent",
  new Schema({
    address: {
      type: String,
      require: true,
    },
  })
);
module.exports = parentSchema;
