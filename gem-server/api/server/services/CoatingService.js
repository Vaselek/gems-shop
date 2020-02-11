import database from '../src/models';

class CoatingService {
  static async getAllCoatings({sortField, sortOrder}) {
    try {
      let orderCriteria = ['createdAt', 'desc'];
      if (sortField && sortOrder) orderCriteria = [sortField, sortOrder];
      return await database.Coating.findAll({
        order: [
          orderCriteria
        ]
      });
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