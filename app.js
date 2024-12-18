const express = require("express")
const app = express()
const playersRoutes = require("./rutas/playersRoutes.js")

const tournamentsRouter = require("./rutas/tournamentsRoutes.js")

app.use(express.json())
app.use('/players', playersRoutes)

app.use('/tournaments',tournamentsRouter)

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
