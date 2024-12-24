const express = require("express")
const app = express()
const playersRoutes = require("./rutas/playersRoutes.js")
const teamsRoutes = require("./rutas/teamsRoutes.js")
const tournamentsRoutes = require("./rutas/tournamentsRoutes.js")

app.use(express.json())

//Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//rutas
app.use('/players', playersRoutes)
app.use('/teams', teamsRoutes)
app.use('/tournaments',tournamentsRoutes)

app.get("/",(req,res) =>{
    res.send("Hola, mundo")
})

app.listen(3000,()=>{
    console.log("Servidor iniciado en el puerto 3000")

})


// Instancia de Sequelize para conectarse a la base de datos
const sequelize = require("./helpers/database.js"); 



// Sincronizar los modelos para verificar la conexión con la base de datos
 sequelize
 .sync({ alter: true })
 .then(() => {
 console.log("Todos los modelos se sincronizaron correctamente.");
 }) .catch((err) => {
 console.log("Ha ocurrido un error al sincronizar los modelos: ", err); 
});
