const Task = require('../models/Task')

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll()
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las tareas', error })
  }
}

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id)
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' })
    }
    res.json(task)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la tarea', error })
  }
}

const createTask = async (req, res) => {
  try {
    const { titulo, descripcion } = req.body
    const task = await Task.create({ titulo, descripcion })
    res.status(201).json(task)
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la tarea', error })
  }
}

const updateTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id)
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' })
    }

    const titulo = req.body.titulo !== undefined ? req.body.titulo : task.titulo
    const descripcion = req.body.descripcion !== undefined ? req.body.descripcion : task.descripcion
    const completada = req.body.completada !== undefined ? req.body.completada : task.completada

    task.titulo = titulo
    task.descripcion = descripcion
    task.completada = completada

    await task.save()

    res.json(task)
  } catch (error) {
    console.error('Error update:', error)
    res.status(500).json({ message: 'Error al actualizar la tarea', error: error.message })
  }
}

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id)
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' })
    }
    await task.destroy()
    res.json({ message: 'Tarea eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la tarea', error })
  }
}

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask }