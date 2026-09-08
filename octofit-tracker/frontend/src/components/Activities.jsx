import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const ACTIVITIES_ENDPOINT = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection(ACTIVITIES_ENDPOINT).then(setActivities).catch((reason) => setError(reason.message)) }, [])
  return <section><div className="page-heading"><p className="eyebrow">ACTIVITY LOG</p><h1>Recent movement</h1><p>Every session adds up.</p></div>{error ? <div className="alert alert-warning">{error}</div> : <div className="table-responsive metric-card p-0"><table className="table align-middle mb-0"><thead><tr><th>Type</th><th>Duration</th><th>Points</th><th>Completed</th></tr></thead><tbody>{activities.map((activity) => <tr key={String(activity._id)}><td className="fw-semibold text-capitalize">{String(activity.type ?? 'activity')}</td><td>{String(activity.durationMinutes ?? 0)} min</td><td><span className="points">+{String(activity.points ?? 0)}</span></td><td>{activity.completedAt ? new Date(String(activity.completedAt)).toLocaleDateString() : '-'}</td></tr>)}</tbody></table></div>}</section>
}
export default Activities