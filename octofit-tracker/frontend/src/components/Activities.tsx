import { useEffect, useState } from 'react'
import { fetchCollection, type ApiItem } from '../api'

function Activities() {
  const [activities, setActivities] = useState<ApiItem[]>([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('activities').then(setActivities).catch((reason: Error) => setError(reason.message)) }, [])
  return <section><div className="page-heading"><p className="eyebrow">ACTIVITY LOG</p><h1>Recent movement</h1><p>Every session adds up.</p></div>{error ? <div className="alert alert-warning">{error}</div> : <div className="table-responsive metric-card p-0"><table className="table align-middle mb-0"><thead><tr><th>Type</th><th>Duration</th><th>Points</th><th>Completed</th></tr></thead><tbody>{activities.map((activity) => <tr key={String(activity._id)}><td className="fw-semibold text-capitalize">{String(activity.type ?? 'activity')}</td><td>{String(activity.durationMinutes ?? 0)} min</td><td><span className="points">+{String(activity.points ?? 0)}</span></td><td>{activity.completedAt ? new Date(String(activity.completedAt)).toLocaleDateString() : '-'}</td></tr>)}</tbody></table></div>}</section>
}
export default Activities