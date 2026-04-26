import { useState, useEffect } from 'react'
import { getTasks } from './services/taskService'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import styles from './App.module.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro] = useState('todas')

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const data = await getTasks()
      setTasks(data)
    } catch (error) {
      console.error('Error cargando tareas:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask])
  }

  const handleTaskUpdated = (updatedTask) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t))
  }

  const handleTaskDeleted = (id) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const pendientes = tasks.filter(t => !t.completada)
  const completadas = tasks.filter(t => t.completada)

  return (
    <div className={styles.app}>

      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <p className={styles.sidebarLogoTitle}>Task Manager</p>
          <span className={styles.sidebarLogoSub}>Juan Camilo Dev</span>
        </div>
        <nav className={styles.sidebarNav}>
          <div
            className={`${styles.navItem} ${filtro === 'todas' ? styles.active : ''}`}
            onClick={() => setFiltro('todas')}
          >
            <div className={styles.navDot}></div>
            Todas ({tasks.length})
          </div>
          <div
            className={`${styles.navItem} ${filtro === 'pendientes' ? styles.active : ''}`}
            onClick={() => setFiltro('pendientes')}
          >
            <div className={styles.navDot}></div>
            Pendientes ({pendientes.length})
          </div>
          <div
            className={`${styles.navItem} ${filtro === 'completadas' ? styles.active : ''}`}
            onClick={() => setFiltro('completadas')}
          >
            <div className={styles.navDot}></div>
            Completadas ({completadas.length})
          </div>
        </nav>
      </aside>

      <main className={styles.main}>
        <div className={styles.topbar}>
          <h1 className={styles.topbarTitle}>Mis tareas</h1>
        </div>

        <div className={styles.stats}>
          <div className={styles.statCard}>
            <p className={styles.statLabel}>Total</p>
            <p className={`${styles.statValue} ${styles.blue}`}>{tasks.length}</p>
          </div>
          <div className={styles.statCard}>
            <p className={styles.statLabel}>Pendientes</p>
            <p className={`${styles.statValue} ${styles.amber}`}>{pendientes.length}</p>
          </div>
          <div className={styles.statCard}>
            <p className={styles.statLabel}>Completadas</p>
            <p className={`${styles.statValue} ${styles.green}`}>{completadas.length}</p>
          </div>
        </div>

        <TaskForm onTaskCreated={handleTaskCreated} />

        {loading ? (
          <p className={styles.loading}>Cargando tareas...</p>
        ) : (
          <TaskList
            tasks={tasks}
            filtro={filtro}
            onUpdated={handleTaskUpdated}
            onDeleted={handleTaskDeleted}
          />
        )}
      </main>

    </div>
  )
}

export default App