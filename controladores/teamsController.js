const Teams = require("../models/teams");
const Players = require("../models/players");

// Add new team
async function addTeam(data) {
    const addTeam = await Teams.create(data);
    return addTeam;
}

// Get all teams
async function getTeams() {
    return await Teams.findAll();
}

// Get a team for ID
async function getTeamForId(id) {
    const team = await Teams.findByPk(id);
    if (!team) {
        throw new Error('Team not found');
    }
    return team;
}

// Update a team
const updateTeam = async (id, data) => {
    const team = await Teams.findByPk(id);
    if (team) {
        return await team.update(data);
    }
    return null;
};


// Delete a team
async function deleteTeam(id) {
    const eliminatedTeam = await Teams.destroy({
        where: { id },
    });
    if (!eliminatedTeam) {
        throw new Error('Team not found');
    }
}

async function getPlayersByTeamId(teamId) {
    const team = await Teams.findByPk(teamId, {
        include: [{ model: Players, as: 'players' }], // Incluye los jugadores asociados
    });
    if (!team) {
        throw new Error('Team not found');
    }
    return team.players; // Devuelve solo los jugadores del equipo
}

module.exports = {
    addTeam,
    getTeams,
    getTeamForId,
    updateTeam,
    deleteTeam,
    getPlayersByTeamId,
};