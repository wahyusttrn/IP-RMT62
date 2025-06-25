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
      res.status(201).json({ message: 'Success post Collections', canvas });
    } catch (error) {
      next(error);
    }
  }
  static async putMyScene(req, res, next) {
    try {
      const { user } = req;
      const { title, scene } = req.body;
      const { canvas } = req;

      const updatedCanvas = await canvas.update({ title, scene, UserId: user.id });
      res.status(200).json({ message: 'Success update Collections', updatedCanvas });
    } catch (error) {
      next(error);
    }
  }
  static async deleteMyScene(req, res, next) {
    try {
      const { canvas } = req;
      await canvas.destroy();
      res.status(200).json({ message: `Success delete canvas ${canvas.title}` });
    } catch (error) {
      next(error);
    }
  }
};
