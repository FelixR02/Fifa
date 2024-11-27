const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/database");
const Players = require("./players");

const Tournaments = sequelize.define("tournaments", {
  tournament_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  paranoid: true,
});
module.exports = Tournaments;


// Relación muchos a muchos con Players
Tournaments.belongsToMany(Players, {
    through: "TournamentsPlayed",
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  