import database from '../src/models';

class CategoryService {
  static async getAllCategories({sortField, sortOrder}) {
    try {
      let orderCriteria = ['createdAt', 'desc'];
      if (sortField && sortOrder) orderCriteria = [sortField, sortOrder];
      return await database.Category.findAll({
        order: [
          orderCriteria
        ]
      });
    } catch (error) {
      throw error;
    }
  }

  static async addCategory(newCategory) {
    try {
      return await database.Category.create(newCategory);
    } catch (error) {
      throw error;
    }
  }

  static async updateCategory(id, updateCategory) {
    try {
      const categoryToUpdate = await database.Category.findOne({
        where: { id: Number(id) }
      });

      if (categoryToUpdate) {
        await database.Category.update(updateCategory, { where: { id: Number(id) } });

        return updateCategory;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getACategory(id) {
    try {
      const theCategory = await database.Category.findOne({
        where: { id: Number(id) },
        include: [{
          all: true,
          nested: true
        }]
      });
      return theCategory;
    } catch (error) {
      throw error;
    }
  }

  static async deleteCategory(id) {
    try {
      const categoryToDelete = await database.Category.findOne({ where: { id: Number(id) } });

      if (categoryToDelete) {
        const deletedCategory = await database.Category.destroy({
          where: { id: Number(id) }
        });
        return deletedCategory;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default CategoryService;