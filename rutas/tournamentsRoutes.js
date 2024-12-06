const express = require('express');
const router = express.Router();
const tournamentsController = require("../controladores/tournamentsController")

// Ruta para agregar un nuevo torneo
router.post('/', async (req, res) => {
    try {
        const tournament = await tournamentsController.addTournament(req.body);
        res.status(201).json(tournament);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Ruta para obtener todos los torneos
router.get('/', async (req, res) => {
    try {
        const tournaments = await tournamentsController.getTournaments();
        res.status(200).json(tournaments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para obtener un torneo por ID
router.get('/:id', async (req, res) => {
    try {
        const tournament = await tournamentsController.getTournamentForId(req.params.id);
        res.status(200).json(tournament);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Ruta para actualizar un torneo
router.put('/:id', async (req, res) => {
    try {
        const tournament = await tournamentsController.updateTournament(req.params.id, req.body);
        if (tournament) {
            res.status(200).json(tournament);
        } else {
            res.status(404).json({ error: 'Tournament not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Ruta para eliminar un torneo
router.delete('/:id', async (req, res) => {
    try {
        await tournamentsController.deleteTournament(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

module.exports = router;