import { useState } from 'react'
import { updateTask, deleteTask } from '../services/taskService'
import styles from './TaskCard.module.css'

function TaskCard({ task, onUpdated, onDeleted }) {
  const [loading, setLoading] = useState(false)

  const handleToggle = async () => {
    setLoading(true)
    try {
      const updated = await updateTask(task.id, {
        titulo: task.titulo,
        descripcion: task.descripcion,
        completada: !task.completada
      })
      onUpdated(updated)
    } catch (error) {
      console.error('Error al actualizar:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    setLoading(true)
    try {
      await deleteTask(task.id)
      onDeleted(task.id)
    } catch (error) {
      console.error('Error al eliminar:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`${styles.row} ${task.completada ? styles.completada : ''}`}>

      <div className={styles.taskInfo}>
        <button
          className={`${styles.check} ${task.completada ? styles.checked : ''}`}
          onClick={handleToggle}
          disabled={loading}
        >
          {task.completada && <span className={styles.checkmark}></span>}
        </button>
        <div>
          <p className={`${styles.titulo} ${task.completada ? styles.tachado : ''}`}>
            {task.titulo}
          </p>
          {task.descripcion && (
            <p className={styles.descripcion}>{task.descripcion}</p>
          )}
        </div>
      </div>

      <div className={styles.estadoCol}>
        <span className={task.completada ? styles.badgeDone : styles.badgePending}>
          {task.completada ? 'Completada' : 'Pendiente'}
        </span>
      </div>

      <div className={styles.accionesCol}>
        <button
          className={styles.btnDelete}
          onClick={handleDelete}
          disabled={loading}
        >
          Eliminar
        </button>
      </div>

    </div>
  )
}

export default TaskCard