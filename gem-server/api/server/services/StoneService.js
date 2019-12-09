import database from '../src/models';

class StoneService {
  static async getAllStones() {
    try {
      return await database.Stone.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addStone(newStone) {
    try {
      return await database.Stone.create(newStone);
    } catch (error) {
      throw error;
    }
  }

  static async updateStone(id, updateStone) {
    try {
      const stoneToUpdate = await database.Stone.findOne({
        where: { id: Number(id) }
      });

      if (stoneToUpdate) {
        await database.Stone.update(updateStone, { where: { id: Number(id) } });

        return updateStone;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getAStone(id) {
    try {
      const theStone = await database.Stone.findOne({
        where: { id: Number(id) }
      });

      return theStone;
    } catch (error) {
      throw error;
    }
  }

  static async deleteStone(id) {
    try {
      const stoneToDelete = await database.Stone.findOne({ where: { id: Number(id) } });

      if (stoneToDelete) {
        const deletedStone = await database.Stone.destroy({
          where: { id: Number(id) }
        });
        return deletedStone;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default StoneService;