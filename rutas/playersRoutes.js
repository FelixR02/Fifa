const express = require('express');
const router = express.Router();
const playersController = require('../controladores/playersController');

// Ruta para agregar un nuevo jugador
router.post('/', async (req, res) => {
    try {
        const player = await playersController.addPlayer(req.body);
        res.status(201).json(player);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Ruta para obtener todos los jugadores
router.get('/', async (req, res) => {
    try {
        const players = await playersController.getPlayers();
        res.status(200).json(players);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para obtener un jugador por ID
router.get('/:id', async (req, res) => {
    try {
        const player = await playersController.getPlayerForId(req.params.id);
        res.status(200).json(player);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Ruta para actualizar un jugador
router.put('/:id', async (req, res) => {
    try {
        const player = await playersController.updatePlayer(req.params.id, req.body);
        if (player) {
            res.status(200).json(player);
        } else {
            res.status(404).json({ error: 'Player not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Ruta para eliminar un jugador
router.delete('/:id', async (req, res) => {
    try {
        await playersController.deletePlayer(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

module.exports = router;