const mongoose = require("mongoose");
const { Schema } = mongoose;

const settingSchema = new Schema({
  isOn: {
    type: Boolean,
    required: true,
  },

  temperature: {
    type: Number,
    min: 50,
    max: 80,
    required: false,
  },

  brightness: {
    type: Number,
    min: 0,
    max: 100,
    required: false,
  },

  color: {
    type: String,
    required: false,
  },

  volume: {
    type: Number,
    min: 0,
    max: 100,
    required: false,
  },
});

const Device = mongoose.model("Setting", settingSchema);

module.exports = Setting;
