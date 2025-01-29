const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/database");
const Players = require("./players");

const Teams = sequelize.define("teams", {
  team_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estadium_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tournamentId: { // Nueva columna para la relación con Tournaments
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  timestamps: true,
  paranoid: true,
});

// Relación uno a muchos: Un equipo tiene muchos jugadores
Teams.hasMany(Players, {
  foreignKey: 'teamId', // Clave foránea en el modelo Players
  onDelete: 'CASCADE', // Si se elimina un equipo, se eliminan sus jugadores
  onUpdate: 'CASCADE', // Si se actualiza el ID del equipo, se actualiza en los jugadores
});

Players.belongsTo(Teams, {
  foreignKey: 'teamId', // Clave foránea en el modelo Players
});

module.exports = Teams;