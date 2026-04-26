import { useState } from 'react'
import { createTask } from '../services/taskService'
import styles from './TaskForm.module.css'

function TaskForm({ onTaskCreated }) {
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!titulo.trim()) return
    setLoading(true)
    try {
      const newTask = await createTask({ titulo, descripcion })
      onTaskCreated(newTask)
      setTitulo('')
      setDescripcion('')
    } catch (error) {
      console.error('Error al crear tarea:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.formContainer}>
      <p className={styles.formTitle}>Agregar nueva tarea</p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          className={styles.input}
          placeholder="Titulo de la tarea..."
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input
          type="text"
          className={styles.input}
          placeholder="Descripcion opcional..."
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <button
          type="submit"
          className={styles.btn}
          disabled={loading}
        >
          {loading ? 'Agregando...' : '+ Agregar'}
        </button>
      </form>
    </div>
  )
}

export default TaskForm