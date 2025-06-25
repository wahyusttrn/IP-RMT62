const { User } = require('../models');
const { OAuth2Client } = require('google-auth-library');
const { signToken } = require('../helpers/jwt');
const client = new OAuth2Client();

module.exports = class UserController {
  static async googleLogin(req, res, next) {
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

      // Find email in database
      let user = await User.findOne({
        where: {
          email: payload.email
        }
      });

      // If not found, create a new user (name, email, password: randomly generated)
      if (!user) {
        user = await User.create({
          name: payload.name,
          email: payload.email,
          password: Math.random().toString(36).slice(-10),
          profilePic: payload.picture
        });
      }

      // signToken using jwt with payload id user
      const access_token = signToken({ id: user.id });

      // return / respond with access_token
      res.status(200).json({ message: `Welcome, ${user.name}`, access_token });
    } catch (error) {
      console.log(error);
    }
  }
};
