import GemService from '../services/GemService';
import Util from '../utils/Utils';

const util = new Util();

class GemController {
  static async getAllGems(req, res) {
    try {
      let responseData;
      const categoryId = req.query.categoryId;
      const stoneIds = req.query.stoneIds;
      const metalIds = req.query.metalIds;
      const coatingIds = req.query.coatingIds;
      const sortField = req.query.sortField;
      const sortOrder = req.query.sortOrder;
      const sortWithoutNull = req.query.withoutNull;
      const offset = req.query.offset;
      const limit = req.query.limit;
      const search = req.query.search;
      if (search) {
        responseData = await GemService.getAllFoundGems({search, offset, limit});
      } else {
        responseData = await GemService.getAllGems({categoryId, stoneIds, metalIds, coatingIds, sortField, sortOrder, sortWithoutNull, offset, limit});
      }
      util.setSuccess(200, 'Gems retrieved', responseData);
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }


  static async addGem(req, res) {
    const newGem = req.body;
    newGem.weight = req.body.weight ? req.body.weight : null;
    newGem.discount = req.body.discount ? req.body.discount : null;
    if (req.file) {
      newGem.image = req.file.filename;
    }
    const gemDataValidation = await GemService.validateGemData(newGem);
    if (!gemDataValidation.isSuccessful) {
      util.setError(400, gemDataValidation.error);
      return util.send(res);
    }
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
    alteredGem.weight = req.body.weight ? req.body.weight : null;
    if (req.file) {
      alteredGem.image = req.file.filename;
    }
    const gemDataValidation = await GemService.validateGemData(alteredGem);
    if (!gemDataValidation.isSuccessful) {
      util.setError(400, gemDataValidation.error);
      return util.send(res);
    }
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }
    try {
      const updateGem = await GemService.updateGem(id, alteredGem);
      if (!updateGem) {
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