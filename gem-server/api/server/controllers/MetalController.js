import MetalService from '../services/MetalService';
import Util from '../utils/Utils';

const util = new Util();

class MetalController {
  static async getAllMetals(req, res) {
    try {
      const allMetals = await MetalService.getAllMetals();
      if (allMetals.length > 0) {
        util.setSuccess(200, 'Metals retrieved', allMetals);
      } else {
        util.setSuccess(200, 'No metal found');
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addMetal(req, res) {
    if (!req.body.title) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }
    const newMetal = req.body;
    try {
      const createdMetal = await MetalService.addMetal(newMetal);
      util.setSuccess(201, 'Metal Added!', createdMetal);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updatedMetal(req, res) {
    const alteredMetal = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }
    try {
      const updateMetal = await MetalService.updateMetal(id, alteredMetal);
      if (!updateMetal) {
        util.setError(404, `Cannot find metal with the id: ${id}`);
      } else {
        util.setSuccess(200, 'Metal updated', updateMetal);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getAMetal(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

    try {
      const theMetal = await MetalService.getAMetal(id);

      if (!theMetal) {
        util.setError(404, `Cannot find metal with the id ${id}`);
      } else {
        util.setSuccess(200, 'Found Metal', theMetal);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteMetal(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value');
      return util.send(res);
    }

    try {
      const metalToDelete = await MetalService.deleteMetal(id);

      if (metalToDelete) {
        util.setSuccess(200, 'Metal deleted');
      } else {
        util.setError(404, `Metal with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default MetalController;