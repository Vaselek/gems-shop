import GemService from '../services/GemService';
import Util from '../utils/Utils';

const util = new Util();

class GemController {
  static async getAllGems(req, res) {
    try {
      const allGems = await GemService.getAllGems();
      if (allGems.length > 0) {
        util.setSuccess(200, 'Gems retrieved', allGems);
      } else {
        util.setSuccess(200, 'No gem found');
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }


  static async addGem(req, res) {
    const gemDataValidation = await GemService.validateGemData(req.body);
    if (!gemDataValidation.isSuccessful) {
      util.setError(400, 'Please provide correct details: ' + gemDataValidation.error);
      return util.send(res);
    }
    const newGem = req.body;
    try {
      const createdGem = await GemService.addGem(newGem);
      util.setSuccess(201, 'Gem Added!', createdGem);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updatedGem(req, res) {
    const alteredGem = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }
    try {
      const updateGem = await GemService.updateGem(id, alteredGem);      if (!updateGem) {
        util.setError(404, `Cannot find gem with the id: ${id}`);
      } else {
        util.setSuccess(200, 'Gem updated', updateGem);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getAGem(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

    try {
      const theGem = await GemService.getAGem(id);

      if (!theGem) {
        util.setError(404, `Cannot find gem with the id ${id}`);
      } else {
        util.setSuccess(200, 'Found Gem', theGem);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteGem(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value');
      return util.send(res);
    }

    try {
      const gemToDelete = await GemService.deleteGem(id);

      if (gemToDelete) {
        util.setSuccess(200, 'Gem deleted');
      } else {
        util.setError(404, `Gem with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default GemController;