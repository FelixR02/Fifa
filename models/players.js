const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/database");

const Players = sequelize.define("players", {
  player_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  games_played: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  goals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  assists: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tarjets: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  teamId: { // Nueva columna para la relación
    type: DataTypes.INTEGER,
    allowNull: true, // Puede ser null si un jugador no está en un equipo
  },
}, {
  timestamps: true,
  paranoid: true,
});

module.exports = Players;