import database from '../src/models';

class MetalService {
  static async getAllMetals() {
    try {
      return await database.Metal.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addMetal(newMetal) {
    try {
      return await database.Metal.create(newMetal);
    } catch (error) {
      throw error;
    }
  }

  static async updateMetal(id, updateMetal) {
    try {
      const metalToUpdate = await database.Metal.findOne({
        where: { id: Number(id) }
      });

      if (metalToUpdate) {
        await database.Metal.update(updateMetal, { where: { id: Number(id) } });

        return updateMetal;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getAMetal(id) {
    try {
      const theMetal = await database.Metal.findOne({
        where: { id: Number(id) }
      });

      return theMetal;
    } catch (error) {
      throw error;
    }
  }

  static async deleteMetal(id) {
    try {
      const metalToDelete = await database.Metal.findOne({ where: { id: Number(id) } });

      if (metalToDelete) {
        const deletedMetal = await database.Metal.destroy({
          where: { id: Number(id) }
        });
        return deletedMetal;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default MetalService;