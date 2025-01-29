const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/database");
const Teams = require("./teams"); // Importa el modelo Teams
const Players = require("./players"); // Importa el modelo Teams

const Tournaments = sequelize.define("tournaments", {
  tournament_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  paranoid: true,
});

// Relación uno a muchos: Un torneo tiene muchos equipos
Tournaments.hasMany(Teams, {
  foreignKey: 'tournamentId', // Clave foránea en el modelo Teams
  onDelete: 'CASCADE', // Si se elimina un torneo, se eliminan sus equipos
  onUpdate: 'CASCADE', // Si se actualiza el ID del torneo, se actualiza en los equipos
});

Teams.belongsTo(Tournaments, {
  foreignKey: 'tournamentId', // Clave foránea en el modelo Teams
});

// Relación muchos a muchos con Players (opcional, si es necesaria)
Tournaments.belongsToMany(Players, {
  through: "TournamentsPlayed", // Tabla intermedia
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

module.exports = Tournaments;