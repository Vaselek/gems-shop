import CoatingService from '../services/CoatingService';
import Util from '../utils/Utils';
import {improveMessage} from "./controllerUtils";

const util = new Util();

class CoatingController {
  static async getAllCoatings(req, res) {
    try {
      const allCoatings = await CoatingService.getAllCoatings();
      if (allCoatings.length > 0) {
        util.setSuccess(200, 'Coatings retrieved', allCoatings);
      } else {
        util.setSuccess(200, 'No coating found');
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addCoating(req, res) {
    const newCoating = req.body;
    try {
      const createdCoating = await CoatingService.addCoating(newCoating);
      util.setSuccess(201, 'Coating Added!', createdCoating);
      return util.send(res);
    } catch (error) {
      const message = improveMessage(error.message)
      util.setError(400, message);
      return util.send(res);
    }
  }

  static async updatedCoating(req, res) {
    const alteredCoating = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }
    try {
      const updateCoating = await CoatingService.updateCoating(id, alteredCoating);
      if (!updateCoating) {
        util.setError(404, `Cannot find coating with the id: ${id}`);
      } else {
        util.setSuccess(200, 'Coating updated', updateCoating);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getACoating(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

    try {
      const theCoating = await CoatingService.getACoating(id);

      if (!theCoating) {
        util.setError(404, `Cannot find coating with the id ${id}`);
      } else {
        util.setSuccess(200, 'Found Coating', theCoating);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteCoating(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value');
      return util.send(res);
    }

    try {
      const coatingToDelete = await CoatingService.deleteCoating(id);

      if (coatingToDelete) {
        util.setSuccess(200, 'Coating deleted');
      } else {
        util.setError(404, `Coating with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default CoatingController;