const { OAuth2Client } = require('google-auth-library');
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
      console.log(payload);

      // Find email in database
      // If not found, create a new user (name, email, password: randomly generated)
      // signToken using jwt with payload id user
      // return / respond with access_token

      res.status(200).json({ message: 'Google login successful' });
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  }
};
