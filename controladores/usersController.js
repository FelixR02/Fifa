const Users = require("../models/users"); // Asegúrate de que la ruta sea correcta
const bcrypt = require('bcryptjs'); // Asegúrate de importar bcryptjs
const jwt = require('jsonwebtoken'); // Asegúrate de importar jsonwebtoken

// Agregar un nuevo usuario
async function addUsuario(data) {
    const newUsuario = await Usuario.create(data);
    return newUsuario;
}

// Función para iniciar sesión
async function iniciarSesion(email, password) {
    // Buscar el usuario por email
    const usuario = await User.findOne({ where: { email } });
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    
                
    // Comparar la contraseña hasheada con la contraseña de entrada
    const contrasenaValida = await bcrypt.compare(password, usuario.password);
    if (!contrasenaValida) {
        throw new Error('Contraseña incorrecta');
    }

    // Generar el token JWT
    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    // Generar el token de refresh
    const refreshToken = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET_REFRESH, { expiresIn: '7d' });

    // Retornar los tokens
    return {
        token,
        refreshToken,
        usuario: {
            id: usuario.id,
            email: usuario.email,
            phone_number: usuario.phone_number,
            username: usuario.username,
            rol: usuario.rol,
        },
    };
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
    iniciarSesion,
    getUsuarios,
    getUsuarioForId,
    updateUsuario,
    deleteUsuario,
};