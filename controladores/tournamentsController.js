const Tournaments = require("../models/tournaments");
const { sequelize } = require("../helpers/database"); // Asegúrate de que la ruta sea correcta
const Teams = require('../models/teams');
const Players = require('../models/players');

// Add new tournament
async function addTournament(data) {
    const add = await Tournaments.create(data);
    return add;
}

// Get all tournaments
async function getTournaments(page = 1, limit = 10) {
    const offset = (page - 1) * limit;

    const { count, rows } = await Tournaments.findAndCountAll({
        limit: parseInt(limit),
        offset: offset,
    });

    return {
        tournaments: rows,
        total: count,
    };
}

// Get a tournament for ID
async function getTournamentForId(id) {
    const tournament = await Tournaments.findByPk(id);
    if (!tournament) {
        throw new Error('Tournament not found');
    }
    return tournament;
}

// Update a tournament
const updateTournament = async (id, data) => {
    const tournament = await Tournaments.findByPk(id);
    if (tournament) {
        return await tournament.update(data);
    }
    return null;
};


// Delete a tournament
async function deleteTournament(id) {
    const eliminatedTournament = await Tournaments.destroy({
        where: { id },
    });
    if (!eliminatedTournament) {
        throw new Error('Tournament not found');
    }
}
// Función para agregar equipos a un torneo existente
async function addTeamsToTournament(tournamentId, teamsIds) {
    try {
        const tournament = await Tournaments.findByPk(tournamentId);
        if (!tournament) {
            throw new Error('Tournament not found');
        }

        // Verificar si los equipos (teams) existen
        const teams = await Teams.findAll({
            where: { id: teamsIds },
            include: [{ model: Players, as: 'players' }], // Incluye los jugadores de cada equipo
        });

        if (teams.length !== teamsIds.length) {
            throw new Error('One or more teams not found');
        }

        // Asignar el torneo a los equipos
        await Promise.all(teams.map(team => {
            team.tournamentId = tournamentId;
            return team.save();
        }));

        // Asignar el torneo a los jugadores de los equipos
        await Promise.all(teams.map(team => {
            return Promise.all(team.players.map(player => {
                player.tournamentId = tournamentId;
                return player.save();
            }));
        }));

        return tournament;
    } catch (error) {
        throw error;
    }
}

// Obtener todos los equipos de un torneo
async function getTeamsByTournamentId(tournamentId) {
    try {
        const tournament = await Tournaments.findByPk(tournamentId, {
            include: [{ model: Teams, as: 'teams' }],
        });

        if (!tournament) {
            throw new Error('Tournament not found');
        }

        return tournament.teams;
    } catch (error) {
        throw error;
    }
}

// Obtener todos los jugadores de un torneo
async function getPlayersByTournamentId(tournamentId) {
    try {
        const tournament = await Tournaments.findByPk(tournamentId, {
            include: [
                {
                    model: Teams,
                    as: 'teams',
                    include: [
                        {
                            model: Players,
                            as: 'players',
                        },
                    ],
                },
            ],
        });

        if (!tournament) {
            throw new Error('Tournament not found');
        }

        const players = tournament.teams.flatMap(team => team.players);
        return players;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    addTournament,
    getTournaments,
    getTournamentForId,
    updateTournament,
    deleteTournament,
    addTeamsToTournament,
    getTeamsByTournamentId, 
    getPlayersByTournamentId, 
};