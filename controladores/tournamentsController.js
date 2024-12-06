const Tournaments = require("../models/tournaments");

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

module.exports = {
    addTournament,
    getTournaments,
    getTournamentForId,
    updateTournament,
    deleteTournament,
};