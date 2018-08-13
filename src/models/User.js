const bcrypt = require('bcrypt');


function hashPassword (user, options) {
  const SALT_ROUNDS = 10;

  return bcrypt.hash(user.password, SALT_ROUNDS).then((hash) => {
    user.setDataValue('password', hash);
  });
  
}

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      password: DataTypes.STRING
    }, {
      charset: 'utf8',
      hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword
      }
    });
    User.associate = function(models) {
      // associations can be defined here
    };

    User.prototype.comparePassword = function (password, hash) {
      console.log('pass', password);
      console.log('hash', hash);
      return bcrypt.compareSync(password, hash);
    };

    return User;
  };