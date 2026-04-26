const express = require('express')
const cors = require('cors')
require('dotenv').config()
const sequelize = require('./config/database')
const taskRoutes = require('./routes/tasks')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/tasks', taskRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'API Task Manager funcionando' })
})

sequelize.sync({ force: false })
  .then(() => {
    console.log('Base de datos conectada y tabla creada')
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`)
    })
  })
  .catch(error => {
    console.error('Error conectando la base de datos:', error)
  })