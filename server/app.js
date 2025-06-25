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
const CanvasController = require('./controllers/CanvasController');
const GeminiController = require('./controllers/GeminiController');
const errorHandler = require('./middlewares/errorHandler');
const authentication = require('./middlewares/authentication');
const { guardOwnerOnly } = require('./middlewares/authorization');

app.post('/login/google', UserController.googleLogin);

app.use(authentication);

app.get('/profile', UserController.getProfileInfo);
app.get('/my-scenes', CanvasController.getMyScenes);
app.post('/my-scenes', CanvasController.postMyScene);

app.put('/my-scenes/:id', guardOwnerOnly, CanvasController.putMyScene);
app.delete('/my-scenes/:id', guardOwnerOnly, CanvasController.deleteMyScene);
app.get('/my-scenes/:id', guardOwnerOnly, CanvasController.getMySceneById);

app.post('/gemini/build', GeminiController.geminiBuild);

app.use(errorHandler);

module.exports = app;
