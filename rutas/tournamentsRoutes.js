const express = require('express');
const router = express.Router();
const tournamentsController = require("../controladores/tournamentsController"); // Importación corregida

/**
 * @swagger
 * tags:
 *   name: Tournaments
 *   description: API to manage tournaments
 */

/**
 * @swagger
 * /tournaments:
 *   post:
 *     summary: Add a new tournament
 *     tags: [Tournaments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tournament_name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tournament created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', async (req, res) => {
    try {
        const tournament = await tournamentsController.addTournament(req.body);
        res.status(201).json(tournament);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * @swagger
 * /tournaments:
 *   get:
 *     summary: Get all tournaments with pagination
 *     tags: [Tournaments]
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         description: Page number (default is 1)
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         required: false
 *         description: Number of items per page (default is 10)
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of tournaments with pagination info
 *       500:
 *         description: Internal server error
 */
router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const result = await tournamentsController.getTournaments(page, limit);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /tournaments/{id}:
 *   get:
 *     summary: Get a tournament by ID
 *     tags: [Tournaments]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the tournament
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tournament found
 *       404:
 *         description: Tournament not found
 */
router.get('/:id', async (req, res) => {
    try {
        const tournament = await tournamentsController.getTournamentForId(req.params.id);
        res.status(200).json(tournament);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

/**
 * @swagger
 * /tournaments/{id}:
 *   put:
 *     summary: Update a tournament
 *     tags: [Tournaments]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the tournament
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tournament_name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tournament updated successfully
 *       404:
 *         description: Tournament not found
 *       400:
 *         description: Bad request
 */
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

/**
 * @swagger
 * /tournaments/{id}:
 *   delete:
 *     summary: Delete a tournament
 *     tags: [Tournaments]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the tournament
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Tournament deleted successfully
 *       404:
 *         description: Tournament not found
 */
router.delete('/:id', async (req, res) => {
    try {
        await tournamentsController.deleteTournament(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

/**
 * @swagger
 * /tournaments/{id}/add-teams:
 *   post:
 *     summary: Add teams to a tournament
 *     tags: [Tournaments]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the tournament
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teamsIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Array of team IDs to add to the tournament
 *     responses:
 *       200:
 *         description: Teams added to the tournament successfully
 *       404:
 *         description: Tournament or one or more teams not found
 *       400:
 *         description: Bad request
 */
router.post('/:id/add-teams', async (req, res) => {
    try {
        const tournamentId = req.params.id; // Obtener ID del torneo de los parámetros
        const { teamsIds } = req.body;

        if (!teamsIds || !Array.isArray(teamsIds)) {
            return res.status(400).json({ error: 'teamsIds must be an array' });
        }

        const tournament = await tournamentsController.addTeamsToTournament(tournamentId, teamsIds);
        res.status(200).json(tournament);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /tournaments/{id}/teams:
 *   get:
 *     summary: Get all teams in a tournament
 *     tags: [Tournaments]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the tournament
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of teams in the tournament
 *       404:
 *         description: Tournament not found
 */
router.get('/:id/teams', async (req, res) => {
    try {
        const tournamentId = req.params.id;
        const teams = await tournamentsController.getTeamsByTournamentId(tournamentId);
        res.status(200).json(teams);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

/**
 * @swagger
 * /tournaments/{id}/players:
 *   get:
 *     summary: Get all players in a tournament
 *     tags: [Tournaments]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the tournament
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of players in the tournament
 *       404:
 *         description: Tournament not found
 */
router.get('/:id/players', async (req, res) => {
    try {
        const tournamentId = req.params.id;
        const players = await tournamentsController.getPlayersByTournamentId(tournamentId);
        res.status(200).json(players);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

/**
 * @swagger
 * /tournaments/{id}/remove-team/{teamId}:
 *   delete:
 *     summary: Remove a team from tournament
 *     tags: [Tournaments]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Tournament ID
 *       - name: teamId
 *         in: path
 *         required: true
 *         description: Team ID to remove
 *     responses:
 *       204:
 *         description: Team removed successfully
 *       404:
 *         description: Team not found or not in tournament
 */
router.delete('/:id/remove-team/:teamId', async (req, res) => {
    try {
        await tournamentsController.deleteTeamFromTournament(req.params.id, req.params.teamId);
        res.status(204).send();
    } catch (error) {
        console.error('Error in delete route:', error); // Log del error
        res.status(404).json({ error: error.message });
    }
});
module.exports = router;