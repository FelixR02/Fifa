const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cors = require("cors");
const jwt = require("jsonwebtoken"); // Importar jsonwebtoken
const playersRoutes = require("./rutas/playersRoutes.js");
const teamsRoutes = require("./rutas/teamsRoutes.js");
const tournamentsRoutes = require("./rutas/tournamentsRoutes.js");
const usersRoutes = require("./rutas/usersRoutes.js");
const errorHandler = require("./middlewares/errorHandler.js");
const requestLogger = require("./middlewares/requestLogger");
const app = express();
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
                url: ["http://localhost:3000", "https://fifa-u40o.onrender.com"]
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    apis: ["./rutas/*.js", "./models/*.js"], // Rutas donde se encuentran las definiciones de las API
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
        authAction: {
            bearerAuth: {
                name: "Bearer",
                schema: {
                    type: "apiKey",
                    in: "header",
                    name: "Authorization",
                },
                value: "Bearer <your_token_here>",
            },
        },
    },
}));

// Configuración de CORS
const allowedOrigins = ["http://localhost:3000","http://localhost:3002", "https://fronted-fifa.onrender.com", "https://fifa-u40o.onrender.com"];
app.use(
    cors({
        origin: allowedOrigins,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true, // Permitir el envío de cookies
    })
);

// Rutas protegidas
/*app.use(verificarAutenticacion); // Aplica la verificación de autenticación a todas las rutas siguientes

app.get("/pagina-protegida", (req, res) => {
    res.send("Bienvenido a la página protegida");
});*/

// Rutas y middlewares
app.use(errorHandler);
app.use(requestLogger);
// Rutas
app.use('/players', playersRoutes);
app.use('/teams', teamsRoutes);
app.use('/tournaments', tournamentsRoutes);
app.use(usersRoutes);

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