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

  static async validateCategoryIds(categoryIds) {
    if (!categoryIds || categoryIds.length === 0) return true;
    const areCategoriesCorrect = await Promise.all(categoryIds.map(async (categoryId) => {
      const category = await database.Category.findOne({where: {id: categoryId}});
      if (!category) return false;
      return true
    }));
    return !areCategoriesCorrect.some(isCategoryCorrect => isCategoryCorrect === false)
  }

  static async validateGemData(gemData) {
    const result = { isSuccessful: true, error: null };
    const categoriesAreCorrect =  await this.validateCategoryIds(gemData.categoryIds);

    if (!gemData.title) result.error = 'Please provide title';
    if (!gemData.price) result.error = 'Please provide price';
    if (!gemData.image) result.error = 'Please provide image';
    if (!categoriesAreCorrect) result.error = 'Please provide correct category or categories';
    // if (!gemData.metalIds) result.error = 'Please provide metal or metals';
    // if (!gemData.stoneIds) result.error = 'Please provide stone or stones';
    // if (!gemData.coatingIds) result.error = 'Please provide coating or coatings';
    if (result.error !== null) result.isSuccessful = false;
    return result
  }

  static async addGem(newGem) {
    try {
      const gem = await database.Gem.create(newGem);
      newGem.categoryIds.map((categoryId) => this.createAssociatedGemCategory(categoryId, gem.id).catch((e)=>{throw e}));
      // newGem.metalIds.map((metalId) => this.createAssociatedGemCategory(metalId, gem.id));
      return gem;
    } catch (error) {
      throw error;
    }
  }

static async createAssociatedGemCategory(categoryId, gemId) {
    try {
      await database.GemCategory.create({
        categoryId: categoryId,
        gemId
      });
    } catch(e) {
      throw e
    }
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
        where: { id: Number(id) },
        include: ['categories']
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
