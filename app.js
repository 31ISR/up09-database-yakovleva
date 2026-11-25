const express = require("express")
const projectsRouter = require("./routes/projects")
const tasksRouter = require("./routes/tasks")

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    const startedAt = new Date()

    res.on('finish', () => {
        console.log(`${startedAt.toISOString()} - ${req.method} ${req.originalUrl}`)
    })

    next()
})

app.get("/api", (req, res) => {
    res.json({message: "Service is healthy"})
})

app.use('/api/projects', projectsRouter)
app.use('/api/tasks', tasksRouter)

app.use((req, res) => {
    res.status(404).json({error: `Маршрут ${req.originalUrl} не найден`})
})

app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).json({error: "Внутренняя ошибка сервера"})
})

module.exports = app