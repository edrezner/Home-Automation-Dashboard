const mongoose = require("mongoose");
const { Schema } = mongoose;

const deviceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    required: true,
  },

  settings: {
    type: Schema.Types.ObjectId,
    ref: "Setting",
    required: true,
  },
});

const Device = mongoose.model("Device", deviceSchema);

module.exports = Device;
