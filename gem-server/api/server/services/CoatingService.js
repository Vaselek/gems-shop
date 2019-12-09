import database from '../src/models';

class CoatingService {
  static async getAllCoatings() {
    try {
      return await database.Coating.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addCoating(newCoating) {
    try {
      return await database.Coating.create(newCoating);
    } catch (error) {
      throw error;
    }
  }

  static async updateCoating(id, updateCoating) {
    try {
      const coatingToUpdate = await database.Coating.findOne({
        where: { id: Number(id) }
      });

      if (coatingToUpdate) {
        await database.Coating.update(updateCoating, { where: { id: Number(id) } });

        return updateCoating;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getACoating(id) {
    try {
      const theCoating = await database.Coating.findOne({
        where: { id: Number(id) }
      });

      return theCoating;
    } catch (error) {
      throw error;
    }
  }

  static async deleteCoating(id) {
    try {
      const coatingToDelete = await database.Coating.findOne({ where: { id: Number(id) } });

      if (coatingToDelete) {
        const deletedCoating = await database.Coating.destroy({
          where: { id: Number(id) }
        });
        return deletedCoating;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default CoatingService;