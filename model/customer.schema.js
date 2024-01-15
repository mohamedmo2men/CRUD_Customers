const mongoose = require("mongoose");
const customerSchema = mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  mobileNumber: {
    type: String,
  },
  age: {
    type: String,
  },
  country: {
    type: String,
  },
  gender: {
    type: String,
  },
}, { timestamps: true });

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer; 