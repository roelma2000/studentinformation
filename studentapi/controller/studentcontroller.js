const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const StudentModel = require('../model/student');

// Get all students
router.get("/students", async (req, res) =>{
  try {
    const students = await StudentModel.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one student by ID
router.get("/information/:id", async (req, res) =>{
  try {
    const student = await StudentModel.findById(req.params.id).exec();
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create student record
router.post("/create", async (req, res) => {
  const student = new StudentModel({
    studentNumber: req.body.studentNumber,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    city: req.body.city,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    program: req.body.program
  });
  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update one student by ID
router.patch('/update/:id', async (req, res, next) => {
  try {
    const student = await StudentModel.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    // Define the middleware function inside the route handler
    req.student = student;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}, async (req, res) => {
  if (req.body.studentNumber != null) {
    req.student.studentNumber = req.body.studentNumber;
  }
  if (req.body.firstName != null) {
    req.student.firstName = req.body.firstName;
  }
  if (req.body.lastName != null) {
    req.student.lastName = req.body.lastName;
  }
  if (req.body.address != null) {
    req.student.address = req.body.address;
  }
  if (req.body.city != null) {
    req.student.city = req.body.city;
  }
  if (req.body.phoneNumber != null) {
    req.student.phoneNumber = req.body.phoneNumber;
  }
  if (req.body.email != null) {
    req.student.email = req.body.email;
  }
  if (req.body.program != null) {
    req.student.program = req.body.program;
  }
  try {
    const updatedStudent = await req.student.save();
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete one student by ID
router.post('/delete/:id', async (req, res) => {
  try {
    const result = await StudentModel.findByIdAndRemove(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Cannot find student' });
    }
    res.json({ message: 'Deleted student' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
