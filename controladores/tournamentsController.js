const Tournaments = require("../models/tournaments");
const { sequelize } = require("../helpers/database"); // Asegúrate de que la ruta sea correcta
const Teams = require('../models/teams');

// Add new tournament
async function addTournament(data) {
    const add = await Tournaments.create(data);
    return add;
}

// Get all tournaments
async function getTournaments() {
    return await Tournaments.findAll();
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
        });

        if (teams.length !== teamsIds.length) {
            throw new Error('One or more teams not found');
        }

        // Asignar el torneo a los equipos
        await Promise.all(teams.map(team => {
            team.tournamentId = tournamentId;
            return team.save();
        }));

        return tournament;
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
};