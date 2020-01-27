import StoneService from '../services/StoneService';
import Util from '../utils/Utils';

const util = new Util();

class StoneController {
  static async getAllStones(req, res) {
    try {
      const allStones = await StoneService.getAllStones();
      if (allStones.length > 0) {
        util.setSuccess(200, 'Stones retrieved', allStones);
      } else {
        util.setSuccess(200, 'No stone found');
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addStone(req, res) {
    if (!req.body.title) {
      util.setError(400, 'Title is required');
      return util.send(res);
    }
    const newStone = req.body;
    try {
      const createdStone = await StoneService.addStone(newStone);
      util.setSuccess(201, 'Stone Added!', createdStone);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updatedStone(req, res) {
    const alteredStone = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }
    try {
      const updateStone = await StoneService.updateStone(id, alteredStone);
      if (!updateStone) {
        util.setError(404, `Cannot find stone with the id: ${id}`);
      } else {
        util.setSuccess(200, 'Stone updated', updateStone);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getAStone(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

    try {
      const theStone = await StoneService.getAStone(id);

      if (!theStone) {
        util.setError(404, `Cannot find stone with the id ${id}`);
      } else {
        util.setSuccess(200, 'Found Stone', theStone);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteStone(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value');
      return util.send(res);
    }

    try {
      const stoneToDelete = await StoneService.deleteStone(id);

      if (stoneToDelete) {
        util.setSuccess(200, 'Stone deleted');
      } else {
        util.setError(404, `Stone with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default StoneController;