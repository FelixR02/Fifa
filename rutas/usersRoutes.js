const express = require('express');
const router = express.Router();
const usersController = require('../controladores/usersController'); // Asegúrate de que esta ruta sea correcta

// Ruta para agregar un nuevo usuario
router.post('/usuarios', async (req, res) => {
    try {
        const newUsuario = await usersController.addUsuario(req.body); // Cambia 'usuarioController' a 'usersController'
        res.status(201).json(newUsuario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Ruta para obtener todos los usuarios
router.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await usersController.getUsuarios(); // Cambia 'usuarioController' a 'usersController'
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para obtener un usuario por ID
router.get('/usuarios/:id', async (req, res) => {
    try {
        const usuario = await usersController.getUsuarioForId(req.params.id); // Cambia 'usuarioController' a 'usersController'
        res.status(200).json(usuario);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Ruta para actualizar un usuario
router.put('/usuarios/:id', async (req, res) => {
    try {
        const updatedUsuario = await usersController.updateUsuario(req.params.id, req.body); // Cambia 'usuarioController' a 'usersController'
        if (updatedUsuario) {
            res.status(200).json(updatedUsuario);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Ruta para eliminar un usuario
router.delete('/usuarios/:id', async (req, res) => {
    try {
        await usersController.deleteUsuario(req.params.id); // Cambia 'usuarioController' a 'usersController'
        res.status(204).send(); // No content
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

module.exports = router;