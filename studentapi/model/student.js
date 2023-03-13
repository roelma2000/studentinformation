const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
  studentNumber: {
    type: Number,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  program: {
    type: String,
    required: true
  }
});
const StudentModel = mongoose.model('Student', studentSchema);
module.exports = StudentModel;
            