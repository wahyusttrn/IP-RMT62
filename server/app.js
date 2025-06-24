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
  res.send('Hello World!');
});

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();

app.post('/login/google', async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();
    console.log(payload);

    // Find email in database
    // If not found, create a new user (name, email, password: randomly generated)
    // signToken using jwt with payload id user
    // return / respond with access_token

    res.status(200).json({ message: 'Google login successful' });
  } catch (error) {
    console.error('Error during Google login:', error);
  }
});

module.exports = app;
