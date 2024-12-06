const Players = require("../models/players");

// Add new player
async function addPlayer(data) {
    const addPlayer = await Players.create(data);
    return addPlayer;
}

// Get all players
async function getPlayers() {
    return await Players.findAll();
}

// Get a player for ID
async function getPlayerForId(id) {
    const player = await Players.findByPk(id);
    if (!player) {
        throw new Error('Player not found');
    }
    return player;
}

// Update a player
const updatePlayer = async (id, data) => {
    const player = await Players.findByPk(id);
    if (player) {
        return await player.update(data);
    }
    return null;
};


// Delete a player
async function deletePlayer(id) {
    const eliminatedPlayer = await Players.destroy({
        where: { id },
    });
    if (!eliminatedPlayer) {
        throw new Error('Player not found');
    }
}

module.exports = {
    addPlayer,
    getPlayers,
    getPlayerForId,
    updatePlayer,
    deletePlayer,
};