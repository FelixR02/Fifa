const Teams = require("./teams");

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

module.exports = {
    addTeam,
    getTeams,
    getTeamForId,
    updateTeam,
    deleteTeam,
};