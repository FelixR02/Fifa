const express = require('express');
const router = express.Router();
const playersController = require('../controladores/playersController');

/**
 * @swagger
 * tags:
 *   name: Players
 *   description: API for managing players
 */

/**
 * @swagger
 * /players:
 *   post:
 *     summary: Add a new player
 *     tags: [Players]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               player_name:
 *                 type: string
 *               games_played:
 *                 type: integer
 *               goals:
 *                 type: integer
 *               assists:
 *                 type: integer
 *               tarjets:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Player created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', async (req, res) => {
    try {
        const player = await playersController.addPlayer(req.body);
        res.status(201).json(player);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * @swagger
 * /players:
 *   get:
 *     summary: Get all players
 *     tags: [Players]
 *     responses:
 *       200:
 *         description: A list of players
 *       500:
 *         description: Internal server error
 */
router.get('/', async (req, res) => {
    try {
        const players = await playersController.getPlayers();
        res.status(200).json(players);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /players/{id}:
 *   get:
 *     summary: Get a player by ID
 *     tags: [Players]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the player
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Player found
 *       404:
 *         description: Player not found
 */
router.get('/:id', async (req, res) => {
    try {
        const player = await playersController.getPlayerForId(req.params.id);
        res.status(200).json(player);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

/**
 * @swagger
 * /players/{id}:
 *   put:
 *     summary: Update a player
 *     tags: [Players]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the player
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               player_name:
 *                 type: string
 *               games_played:
 *                 type: integer
 *               goals:
 *                 type: integer
 *               assists:
 *                 type: integer
 *               tarjets:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Player updated successfully
 *       404:
 *         description: Player not found
 *       400:
 *         description: Bad request
 */
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

/**
 * @swagger
 * /players/{id}:
 *   delete:
 *     summary: Delete a player
 *     tags: [Players]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the player
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Player deleted successfully
 *       404:
 *         description: Player not found
 */
router.delete('/:id', async (req, res) => {
    try {
        await playersController.deletePlayer(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

module.exports = router;