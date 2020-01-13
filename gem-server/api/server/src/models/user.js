import bcrypt from 'bcrypt';
import nanoid from 'nanoid';

const SALT_WORK_FACTOR = 10;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      isEmail: true,
      unique: true
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      allowNull: false,
      defaultValue: 'user'
    },
    token: {
      type: DataTypes.STRING
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  User.prototype.generateToken = function () {
    this.token = nanoid();
  };
  User.prototype.checkPassword = function(password) {
    return bcrypt.compare(password, this.password)
  };
  User.beforeSave(async (user, options) => {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    user.password = await bcrypt.hash(user.getDataValue('password'), salt);
    user.token = nanoid();
  });
  return User;
};