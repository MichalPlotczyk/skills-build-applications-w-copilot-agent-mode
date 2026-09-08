import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const WORKOUTS_ENDPOINT = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection(WORKOUTS_ENDPOINT).then(setWorkouts).catch((reason) => setError(reason.message)) }, [])
  return <section><div className="page-heading"><p className="eyebrow">PERSONALIZED PICKS</p><h1>Workout library</h1><p>Choose a challenge that fits today.</p></div>{error ? <div className="alert alert-warning">{error}</div> : <div className="row g-3">{workouts.map((workout) => <article className="col-md-6 col-xl-4" key={String(workout._id)}><div className="metric-card h-100 d-flex flex-column"><div className="d-flex justify-content-between gap-2 mb-3"><span className="difficulty">{String(workout.difficulty ?? 'all levels')}</span><span className="small text-secondary">{String(workout.targetMinutes ?? 0)} min</span></div><h2>{String(workout.title ?? 'Workout')}</h2><p className="text-secondary mb-0 mt-auto">{String(workout.description ?? '')}</p></div></article>)}</div>}</section>
}
export default Workouts