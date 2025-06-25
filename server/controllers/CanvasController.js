const { Canvas } = require('../models');

module.exports = class CanvasController {
  static async getMyScenes(req, res, next) {
    try {
      const { user } = req;
      const collections = await Canvas.findAll({
        where: {
          UserId: user.id
        }
      });
      res.status(200).json({ message: 'Success fetch Collections', collections });
    } catch (error) {
      next(error);
    }
  }
};
