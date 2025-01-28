const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/database");
const bcrypt = require('bcrypt')

const Usuario = sequelize.define("users", {
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Asegura que el email sea único
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false, // Asegura que el password no sea nulo
  },
  rol: {
    type: DataTypes.ENUM("usuario","administrador"),
    allowNull: false,
    defaultValue: "usuario",
  },
}, {
  timestamps: true, // Habilita los campos createdAt y updatedAt
  underscored: true, // Usa snake_case en lugar de camelCase
  paranoid: true, // Habilita el soft delete (eliminación suave)
});

Usuario .beforeCreate(async (users) => {
  const s = await bcrypt.genSalt(10);
  users.password = await bcrypt.hash(users.password, s);
});

module.exports = Usuario;