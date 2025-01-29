const express = require('express');
const router = express.Router();
const teamsController = require('../controladores/teamsController');

/**
 * @swagger
 * tags:
 *   name: Teams
 *   description: API to manage teams
 */

/**
 * @swagger
 * /teams:
 *   post:
 *     summary: Add a new team
 *     tags: [Teams]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               team_name:
 *                 type: string
 *               estadium_name:
 *                 type: string
 *               capacity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Team created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', async (req, res) => {
    try {
        const team = await teamsController.addTeam(req.body);
        res.status(201).json(team);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * @swagger
 * /teams:
 *   get:
 *     summary: Get all teams
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: List of teams
 *       500:
 *         description: Internal server error
 */
// En tu archivo de rutas (teamsRouter.js)
router.get('/', async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const { count, rows: teams } = await teamsController.getTeams(page, limit);
      res.status(200).json({
        total: count,
        page: page,
        limit: limit,
        teams: teams,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

/**
 * @swagger
 * /teams/{id}:
 *   get:
 *     summary: Get a team by ID
 *     tags: [Teams]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the team
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Team found
 *       404:
 *         description: Team not found
 */
router.get('/:id', async (req, res) => {
    try {
        const team = await teamsController.getTeamForId(req.params.id);
        res.status(200).json(team);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

/**
 * @swagger
 * /teams/{id}/players:
 *   get:
 *     summary: Get players of a specific team by team ID
 *     tags: [Teams]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the team
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of players in the team
 *       404:
 *         description: Team not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id/players', async (req, res) => {
    try {
        const players = await teamsController.getPlayersByTeamId(req.params.id);
        res.status(200).json(players);
    } catch (error) {
        if (error.message === 'Team not found') {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});

/**
 * @swagger
 * /teams/{id}:
 *   put:
 *     summary: Update a team
 *     tags: [Teams]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the team
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               team_name:
 *                 type: string
 *               estadium_name:
 *                 type: string
 *               capacity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Team updated successfully
 *       404:
 *         description: Team not found
 *       400:
 *         description: Bad request
 */
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

/**
 * @swagger
 * /teams/{id}:
 *   delete:
 *     summary: Delete a team
 *     tags: [Teams]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the team
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Team deleted successfully
 *       404:
 *         description: Team not found
 */
router.delete('/:id', async (req, res) => {
    try {
        await teamsController.deleteTeam(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

module.exports = router;