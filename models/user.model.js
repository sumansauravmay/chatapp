const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  phone: { type: Number, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model("users", userSchema);
module.exports = { UserModel };

