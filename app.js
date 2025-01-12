const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const app = express();
const cors = require("cors");
const playersRoutes = require("./rutas/playersRoutes.js");
const teamsRoutes = require("./rutas/teamsRoutes.js");
const tournamentsRoutes = require("./rutas/tournamentsRoutes.js");
const usersRoutes = require("./rutas/usersRoutes.js")
const errorHandler = require("./middlewares/errorHandler.js");
app.use(express.json());

// Configuración de Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "API FutbolStats",
            version: "1.0.0",
            description: "Documentation of the API",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./rutas/*.js", "./models/*.js"], // Rutas donde se encuentran las definiciones de las API
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Configuración de CORS
const allowedOrigins = ["http://localhost:3000"];
app.use(
    cors({
        origin: allowedOrigins,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true, // Permitir el envío de cookies
    })
);

function verificarAutenticacion(req, res, next) {
    const usuarioAutenticado = req.isAuthenticated ? req.isAuthenticated() : false; // Ejemplo de verificación
    if (usuarioAutenticado) {
        next();
    } else {
        res.status(401).send("No estás autenticado");
    }
}

app.use(verificarAutenticacion);

// Ruta protegida
app.get("/pagina-protegida", (req, res) => {
    res.send("Bienvenido a la página protegida");
});



//Rutas y middlewares
//Middleware manejo de errrores
app.use(errorHandler);

// Rutas
app.use('/players', playersRoutes);
app.use('/teams', teamsRoutes);
app.use('/tournaments', tournamentsRoutes);
app.use('/users', usersRoutes);

app.get("/", (req, res) => {
    res.send("Hola, mundo");
});

app.listen(3000, () => {
    console.log("Servidor iniciado en el puerto 3000");
});

// Instancia de Sequelize para conectarse a la base de datos
const sequelize = require("./helpers/database.js");

// Sincronizar los modelos para verificar la conexión con la base de datos
sequelize
    .sync({ alter: true })
    .then(() => {
        console.log("Todos los modelos se sincronizaron correctamente.");
    })
    .catch((err) => {
        console.log("Ha ocurrido un error al sincronizar los modelos: ", err);
    });