const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    require: true,
  },
  dateEvent: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  bets: {
    type: Number,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  cover: {
    type: String,
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
