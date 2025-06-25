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
  static async postMyScene(req, res, next) {
    try {
      const { user } = req;
      const { title } = req.body;
      const canvas = await Canvas.create({ title, UserId: user.id });
      res.status(200).json({ message: 'Success post Collections', canvas });
    } catch (error) {
      next(error);
    }
  }
  static async putMyScene(req, res, next) {
    try {
      const { user } = req;
      const { id } = req.params;
      res.status(200).json({ message: 'Success update Collections', user, id });
    } catch (error) {
      next(error);
    }
  }
  static async deleteMyScene(req, res, next) {
    try {
      const { user } = req;
      const { id } = req.params;
      res.status(200).json({ message: 'Success delete Collections', user, id });
    } catch (error) {
      next(error);
    }
  }
};
