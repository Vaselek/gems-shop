import database from '../src/models';

class GemService {
  static async getAllGems() {
    try {
      return await database.Gem.findAll({
        include: ['categories']
      });
    } catch (error) {
      throw error;
    }
  }

  static async addGem(newGem) {
    try {
      const categoryIds = newGem.categoryIds;
      const gem = await database.Gem.create(newGem);
      categoryIds.map((categoryId) => this.createAssociatedGemCategory(categoryId, gem.id));
      return gem;
    } catch (error) {
      throw error;
    }
  }

  static async createAssociatedGemCategory(categoryId, gemId) {
    const category = await database.Category.findOne({ where: { id: categoryId } });
    const gemCategoryData = {
      categoryId: category.id,
      gemId
    };
    database.GemCategory.create(gemCategoryData);
  }

  static async updateGem(id, updateGem) {
    try {
      const gemToUpdate = await database.Gem.findOne({
        where: { id: Number(id) }
      });

      if (gemToUpdate) {
        await database.Gem.update(updateGem, { where: { id: Number(id) } });

        return updateGem;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getAGem(id) {
    try {
      const theGem = await database.Gem.findOne({
        where: { id: Number(id) }
      });

      return theGem;
    } catch (error) {
      throw error;
    }
  }

  static async deleteGem(id) {
    try {
      const gemToDelete = await database.Gem.findOne({ where: { id: Number(id) } });

      if (gemToDelete) {
        const deletedGem = await database.Gem.destroy({
          where: { id: Number(id) }
        });
        return deletedGem;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default GemService;
