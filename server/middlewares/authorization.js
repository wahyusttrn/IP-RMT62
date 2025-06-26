const { Canvas } = require('../models');

async function guardOwnerOnly(req, res, next) {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const canvas = await Canvas.findByPk(id);

    if (!canvas) {
      throw { name: 'Not Found', message: 'Canvas Not Found' };
    }

    if (userId === canvas.UserId) {
      req.canvas = canvas;
      next();
    } else {
      throw { name: 'Forbidden' };
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  guardOwnerOnly
};
