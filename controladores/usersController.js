const Users = require("../models/users"); // Asegúrate de que la ruta sea correcta
const bcrypt = require('bcryptjs'); // Asegúrate de importar bcryptjs
const jwt = require('jsonwebtoken'); // Asegúrate de importar jsonwebtoken

// Agregar un nuevo usuario
async function addUsuario(data) {
    const newUsuario = await Users.create(data);
    return newUsuario;
}

// Función para iniciar sesión
async function iniciarSesion(email, password) {
    
   // console.log("Email recibido:", email); // Depuración
    const usuario = await Users.findOne({ where: { email } });
    if (!usuario) {
      console.log("Usuario no encontrado"); // Depuración
      throw new Error('Usuario no encontrado');
    }
  
   // console.log("Contraseña recibida:", password); // Depuración
   // console.log("Contraseña almacenada:", usuario.password); // Depuración
    const contrasenaValida = await bcrypt.compare(password, usuario.password);
    if (!contrasenaValida) {
    //  console.log("Contraseña incorrecta"); // Depuración
      throw new Error('Contraseña incorrecta');
    }
  
   /* const payload = {
      id: usuario.id,
      first_name: usuario.first_name,
      last_name: usuario.last_name,
      email: usuario.email,
      rol: usuario.rol,
    };
  
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "1d" });
  
    console.log("Tokens generados:", { accessToken, refreshToken }); // Depuración
  */ 
    const accessToken = jwt.sign(
        { 
            id: usuario.id,
            first_name: usuario.first_name,
            last_name: usuario.last_name,
            email: usuario.email,
            rol: usuario.rol,     
         }, process.env.JWT_SECRET,{expiresIn: "1h"});
    const refreshToken = jwt.sign(
        { 
            id: usuario.id,
            first_name: usuario.first_name,
            last_name: usuario.last_name,
            email: usuario.email,
            rol: usuario.rol,     
         }, process.env.JWT_REFRESH_SECRET,{expiresIn: "1h"});

    
    return { accessToken, refreshToken };
  }


// Obtener todos los usuarios
async function getUsuarios() {
    return await Users.findAll();
}

// Obtener un usuario por ID
async function getUsuarioForId(id) {
    const usuario = await Users.findByPk(id);
    if (!usuario) {
        throw new Error('User not found');
    }
    return usuario;
}

// Actualizar un usuario
const updateUsuario = async (id, data) => {
    const usuario = await Users.findByPk(id);
    if (usuario) {
        return await Users.update(data);
    }
    return null;
};

// Eliminar un usuario
async function deleteUsuario(id) {
    const eliminatedUsuario = await Users.destroy({
        where: { id },
    });
    if (!eliminatedUsuario) {
        throw new Error('User not found');
    }
}

async function obtenerPerfilUsuario(id) {
    const usuario = await Users.findByPk(id, {
        attributes: { exclude: ['password'] }, 
    });
    
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    
    return usuario;
}

async function invalidarRefreshToken(userId) {
    const user = await Users.findByPk(userId);
    if (!user) {
        console.error('Usuario no encontrado');
        return null;
    }
    user.refreshToken = null;
    await user.save();
    return user;
}


module.exports = {
    addUsuario,
    iniciarSesion,
    getUsuarios,
    getUsuarioForId,
    updateUsuario,
    deleteUsuario,
    obtenerPerfilUsuario,
    invalidarRefreshToken
};