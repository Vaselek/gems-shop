import database from '../src/models';

const defaultOffset = 0;

const defaultLimit = 30;

const RelatedObjectMapper = {
  "GemCategory" : "categoryId",
  "GemCoating": "coatingId",
  "GemStone": "stoneId",
  "GemMetal": "metalId"
};

const getGemsFilteredByCategoryStonesMetalsMetalsCoatings = async (categoryId, stoneIds, metalIds, coatingIds) => {
  const stoneFilter = stoneIds ? `and gs."stoneId" in (:stoneIds)` : ``;
  const metalFilter = metalIds ? `and gm."metalId" in (:metalIds)` : ``;
  const coatingFilter = coatingIds ? `and gco."coatingId" in (:coatingIds)` : ``;
  const categoryFilter = categoryId ? `gc."categoryId" = :categoryId` : `gc."categoryId" = gc."categoryId"`;
  const ids = await database.sequelize.query(
    `select g.id 
    from "Gems" g
    left join "GemCategories" gc on g."id" = gc."gemId"
    left join "Categories" c on c."id" = gc."categoryId"
    left join "GemStones" gs on g."id" = gs."gemId"
    left join "Stones" s on s."id" = gs."stoneId"
    left join "GemMetals" gm on g."id" = gm."gemId"
    left join "Metals" m on m."id" = gm."metalId"
    left join "GemCoatings" gco on g."id" = gco."gemId"
    left join "Coatings" co on co."id" = gco."coatingId"
    where ${categoryFilter} ${stoneFilter} ${metalFilter} ${coatingFilter}
    group by g."id";`,
    {
      type: database.sequelize.QueryTypes.SELECT,
      replacements: { categoryId: categoryId, stoneIds: stoneIds, metalIds: metalIds, coatingIds: coatingIds },
    }
  );
  return ids.map(elem => elem.id);
};

// const getGemsFilteredByCategoryStonesMetalsMetalsCoatings = async (categoryId, stoneIds, metalIds, coatingIds) => {
//   const stoneFilter = stoneIds ? `and gs."stoneId" in (:stoneIds)` : ``;
//   const metalFilter = metalIds ? `and gm."metalId" in (:metalIds)` : ``;
//   const coatingFilter = coatingIds ? `and gco."coatingId" in (:coatingIds)` : ``;
//   return await database.sequelize.query(
//     `select g.*,
//     array_agg(distinct s."title") as stones,
//     array_agg(distinct c."id") as "categoryId",
//     array_agg(distinct m."title") as metals,
//     array_agg(distinct co."title") as coatings
//     from "Gems" g
//     left join "GemCategories" gc on g."id" = gc."gemId"
//     left join "Categories" c on c."id" = gc."categoryId"
//     left join "GemStones" gs on g."id" = gs."gemId"
//     left join "Stones" s on s."id" = gs."stoneId"
//     left join "GemMetals" gm on g."id" = gm."gemId"
//     left join "Metals" m on m."id" = gm."metalId"
//     left join "GemCoatings" gco on g."id" = gco."gemId"
//     left join "Coatings" co on co."id" = gco."coatingId"
//     where gc."categoryId" = :categoryId ${stoneFilter} ${metalFilter} ${coatingFilter}
//     group by g."id";`,
//     {
//       type: database.sequelize.QueryTypes.SELECT,
//       replacements: { categoryId: categoryId, stoneIds: stoneIds, metalIds: metalIds, coatingIds: coatingIds },
//     }
//   );
// };


class GemService {
  static async getAllGems(categoryId, stoneIds, metalIds, coatingIds, sortBy, offset, limit) {
    try {
      let orderCriteria = ['createdAt', 'DESC'];
      if (sortBy && sortBy === 'cost-increase') orderCriteria = ['price', 'ASC'];
      if (sortBy && sortBy === 'cost-decrease') orderCriteria = ['price', 'DESC'];
      const offsetCriteria = offset ? offset : defaultOffset;
      const limitCriteria = limit ? limit : defaultLimit;
      const gemIds = await getGemsFilteredByCategoryStonesMetalsMetalsCoatings(categoryId, stoneIds, metalIds, coatingIds);
      const gems = await database.Gem.findAll({
        where: {
          id: gemIds
        },
        order: [
          orderCriteria
        ],
        include: ['categories', 'stones', 'coatings', 'metals'],
        offset: offsetCriteria,
        limit: limitCriteria
      });
      let responseData = {};
      responseData.gems = gems;
      responseData.totalCount = gemIds.length;
      return responseData
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
    const result = { isSuccessful: true, error: [] };
    const categoriesAreCorrect =  await this.validateRelatedObjects(gemData.categoryIds, 'Category');
    const metalsAreCorrect =  await this.validateRelatedObjects(gemData.metalIds, 'Metal');
    const stonesAreCorrect =  await this.validateRelatedObjects(gemData.stoneIds, 'Stone');
    const coatingsAreCorrect =  await this.validateRelatedObjects(gemData.coatings, 'Stone');

    if (!gemData.categoryIds) result.error.push({ field: 'categoryIds', text: 'Category is required' });
    if (!gemData.title) result.error.push({ field: 'title', text: 'Title is required' });
    if (!gemData.price) result.error.push({ field: 'price', text: 'Price is required' });
    if (!gemData.image) result.error.push({ field: 'image', text: 'Image is required' });
    if (!categoriesAreCorrect) result.error.push({ field: 'categoryIds', text: 'Please provide correct category or categories' });
    if (!metalsAreCorrect) result.error.push({ field: 'metalIds', text: 'Please provide correct metal or metals' });
    if (!stonesAreCorrect) result.error.push({ field: 'stoneIds', text: 'Please provide correct stone or stones' });
    if (!coatingsAreCorrect) result.error.push({ field: 'coatingIds', text: 'Please provide correct coating or coatings' });
    if (result.error.length !== 0) result.isSuccessful = false;
    return result
  }

  static async createNewAssociatedModels(gem, gemData) {
    gemData.categoryIds && gemData.categoryIds.map((categoryId) => this.createIntermediateObject(gem.id, categoryId, 'GemCategory').catch((e)=>{throw e}));
    gemData.metalIds && gemData.metalIds.map((metalId) => this.createIntermediateObject(gem.id, metalId, 'GemMetal').catch((e)=>{throw e}));
    gemData.stoneIds && gemData.stoneIds.map((stoneId) => this.createIntermediateObject(gem.id, stoneId, 'GemStone').catch((e)=>{throw e}));
    gemData.coatingIds && gemData.coatingIds.map((coatingId) => this.createIntermediateObject(gem.id, coatingId, 'GemCoating').catch((e)=>{throw e}));
  }

  static async addGem(newGem) {
    try {
      const gem = await database.Gem.create(newGem);
      await this.createNewAssociatedModels(gem, newGem);
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
  
  static async destroyOldAssociatedModels(gem) {
    const associatedModels = ['GemStone', 'GemMetal', 'GemCoating', 'GemCategory'];
    associatedModels.map(async (model) => await database[model].destroy({ where: { gemId: Number(gem.id) }}))
  }

  static async updateIntermediateObjects(updateGem) {
    try{
      await this.destroyOldAssociatedModels(updateGem)
      await this.createNewAssociatedModels(updateGem, updateGem);
      return updateGem;
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
        await this.updateIntermediateObjects(updateGem);
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
