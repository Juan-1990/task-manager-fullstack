import TaskCard from './TaskCard'
import styles from './TaskList.module.css'

function TaskList({ tasks, filtro, onUpdated, onDeleted }) {

  const tareasFiltradas = tasks.filter(task => {
    if (filtro === 'pendientes') return !task.completada
    if (filtro === 'completadas') return task.completada
    return true
  })

  if (tareasFiltradas.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyText}>No hay tareas aqui todavia</p>
        <p className={styles.emptySubtext}>
          {filtro === 'todas' ? 'Crea tu primera tarea arriba' : `No tienes tareas ${filtro}`}
        </p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.tableHeader}>
        <span>Tarea</span>
        <span>Estado</span>
        <span>Acciones</span>
      </div>
      <div className={styles.lista}>
        {tareasFiltradas.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onUpdated={onUpdated}
            onDeleted={onDeleted}
          />
        ))}
      </div>
    </div>
  )
}

export default TaskList