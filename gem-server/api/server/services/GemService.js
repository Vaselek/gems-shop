import database from '../src/models';

const RelatedObjectMapper = {
  "GemCategory" : "categoryId",
  "GemCoating": "coatingId",
  "GemStone": "stoneId",
  "GemMetal": "metalId"
};

class GemService {
  static async getAllGems() {
    try {
      return await database.Gem.findAll({
        include: ['categories', 'stones', 'metals', 'coatings']
      });
    } catch (error) {
      throw error;
    }
  }

  static async validateRelatedObjects(ids, modelName) {
    if (!ids || ids.length === 0) return true;
    const areObjectsCorrect = await Promise.all(ids.map(async (id) => {
      const object = await database[modelName].findOne({where: {id: id}});
      if (!object) return false;
      return true
    }));
    return !areObjectsCorrect.some(isObjectCorrect => isObjectCorrect === false)
  }

  static async validateGemData(gemData) {
    const result = { isSuccessful: true, error: null };
    const categoriesAreCorrect =  await this.validateRelatedObjects(gemData.categoryIds, 'Category');
    const metalsAreCorrect =  await this.validateRelatedObjects(gemData.metalIds, 'Metal');
    const stonesAreCorrect =  await this.validateRelatedObjects(gemData.stoneIds, 'Stone');
    const coatingsAreCorrect =  await this.validateRelatedObjects(gemData.coatings, 'Stone');

    if (!gemData.title) result.error = 'Please provide title';
    if (!gemData.price) result.error = 'Please provide price';
    if (!gemData.image) result.error = 'Please provide image';
    if (!categoriesAreCorrect) result.error = 'Please provide correct category or categories';
    if (!metalsAreCorrect) result.error = 'Please provide correct metal or metals';
    if (!stonesAreCorrect) result.error = 'Please provide correct stone or stones';
    if (!coatingsAreCorrect) result.error = 'Please provide correct coating or coatings';
    if (result.error !== null) result.isSuccessful = false;
    return result
  }

  static async addGem(newGem) {
    try {
      const gem = await database.Gem.create(newGem);
      newGem.categoryIds && newGem.categoryIds.map((categoryId) => this.createIntermediateObject(gem.id, categoryId, 'GemCategory').catch((e)=>{throw e}));
      newGem.metalIds && newGem.metalIds.map((metalId) => this.createIntermediateObject(gem.id, metalId, 'GemMetal').catch((e)=>{throw e}));
      newGem.stoneIds && newGem.stoneIds.map((stoneId) => this.createIntermediateObject(gem.id, stoneId, 'GemStone').catch((e)=>{throw e}));
      newGem.coatingIds && newGem.coatingIds.map((coatingId) => this.createIntermediateObject(gem.id, coatingId, 'GemCoating').catch((e)=>{throw e}));
      return gem;
    } catch (error) {
      throw error;
    }
  }

  static async createIntermediateObject(gemId, relatedObjectId, intermediateModel) {
    try {
      await database[intermediateModel].create({
        [RelatedObjectMapper[intermediateModel]]: relatedObjectId,
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
        include: ['categories', 'stones', 'metals', 'coatings']
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
