const express = require('express');
const router = express.Router();
const teamsController = require('../controladores/teamsController');

// Ruta para agregar un nuevo equipo
router.post('/', async (req, res) => {
    try {
        const team = await teamsController.addTeam(req.body);
        res.status(201).json(team);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Ruta para obtener todos los equipos
router.get('/', async (req, res) => {
    try {
        const teams = await teamsController.getTeams();
        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para obtener un equipo por ID
router.get('/:id', async (req, res) => {
    try {
        const team = await teamsController.getTeamForId(req.params.id);
        res.status(200).json(team);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Ruta para actualizar un equipo
router.put('/:id', async (req, res) => {
    try {
        const team = await teamsController.updateTeam(req.params.id, req.body);
        if (team) {
            res.status(200).json(team);
        } else {
            res.status(404).json({ error: 'Team not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Ruta para eliminar un equipo
router.delete('/:id', async (req, res) => {
    try {
        await teamsController.deleteTeam(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

module.exports = router;