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
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
  paranoid: true,
});
module.exports = Teams;


// Relación uno a muchos con States
Players.hasMany(Teams, {
  foreignKey: 'playerId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Teams.belongsTo(Players, {
  foreignKey: 'stateId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

