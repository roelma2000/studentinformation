const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const studentRouter = require('./controller/studentcontroller');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use('/', studentRouter);

mongoose.connect('mongodb://127.0.0.1:27017/students', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to database!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
