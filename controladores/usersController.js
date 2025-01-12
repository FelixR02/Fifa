const Users = require("../models/users"); // Asegúrate de que la ruta sea correcta

// Agregar un nuevo usuario
async function addUsuario(data) {
    const newUsuario = await Usuario.create(data);
    return newUsuario;
}

// Obtener todos los usuarios
async function getUsuarios() {
    return await Usuario.findAll();
}

// Obtener un usuario por ID
async function getUsuarioForId(id) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
        throw new Error('User not found');
    }
    return usuario;
}

// Actualizar un usuario
const updateUsuario = async (id, data) => {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
        return await usuario.update(data);
    }
    return null;
};

// Eliminar un usuario
async function deleteUsuario(id) {
    const eliminatedUsuario = await Usuario.destroy({
        where: { id },
    });
    if (!eliminatedUsuario) {
        throw new Error('User not found');
    }
}

module.exports = {
    addUsuario,
    getUsuarios,
    getUsuarioForId,
    updateUsuario,
    deleteUsuario,
};