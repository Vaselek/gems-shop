import database from '../src/models';

class UserService {
  static async getAllUsers() {
    try {
      return await database.User.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addUser(newUser) {
    try {
      const user = await database.User.create(newUser);
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async loginUser(data) {
    try {
      const user = await database.User.findOne({ where: { username: data.username } });
      if (!user) return null;
      const isMatch = await user.checkPassword(data.password);
      if (!isMatch) return null;
      user.generateToken();
      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async logoutUser(data) {
    try {
      const user = await database.User.findOne({ where: { username: data.username } });
      if (!user) return;
      user.generateToken();
      await user.save();
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(id, token, updateUser) {
    if (!token) return null;
    try {
      const userToUpdate = await database.User.findOne({
        where: { id: id }
      });
      if (!userToUpdate) return null;
      if (userToUpdate.token !== token) return null;
      await database.User.update(updateUser, { where: { id: Number(id) } });
      return updateUser;
    } catch (error) {
      throw error;
    }
  }

  static async updateUserByAdmin(id, updateUser) {
    try {
      const userToUpdate = await database.User.findOne({
        where: { id: Number(id) }
      });

      if (userToUpdate) {
        await database.User.update(updateUser, { where: { id: Number(id) } });

        return updateUser;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getAUserByToken(token) {
    try {
      const theUser = await database.User.findOne({
        where: { token: token },
    });
      return theUser;
    } catch (error) {
      throw error;
    }
  }


  static async getAUser(id) {
    try {
      const theUser = await database.User.findOne({
        where: { id: Number(id) }
      });

      return theUser;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUser(id) {
    try {
      const userToDelete = await database.User.findOne({ where: { id: Number(id) } });

      if (userToDelete) {
        const deletedUser = await database.User.destroy({
          where: { id: Number(id) }
        });
        return deletedUser;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;