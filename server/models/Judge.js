const mongoose = require("mongoose");

const judgeSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "judge" },
});

module.exports = mongoose.model("Judge", judgeSchema);