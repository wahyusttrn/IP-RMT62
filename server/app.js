if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).json({ message: "Hello World! This is Shred's API" });
});

const UserController = require('./controllers/UserController');
const errorHandler = require('./middlewares/errorHandler');

app.post('/login/google', UserController.googleLogin);

app.use(errorHandler);

module.exports = app;
