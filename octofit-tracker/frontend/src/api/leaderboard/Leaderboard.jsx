import { useEffect, useState } from 'react'
import { fetchCollection } from '../index'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('leaderboard').then(setEntries).catch((reason) => setError(reason.message)) }, [])
  return <section><div className="page-heading"><p className="eyebrow">COMPETITION</p><h1>Leaderboard</h1><p>Friendly competition, measured in consistency.</p></div>{error ? <div className="alert alert-warning">{error}</div> : <div className="metric-card p-0 overflow-hidden"><div className="list-group list-group-flush">{entries.sort((a, b) => Number(a.rank ?? 999) - Number(b.rank ?? 999)).map((entry) => <div className="list-group-item d-flex align-items-center gap-3 py-3" key={String(entry._id)}><span className="rank">{String(entry.rank ?? '-')}</span><div className="flex-grow-1"><strong>{String(entry.user ?? 'Member')}</strong><div className="small text-secondary">Personal total</div></div><strong className="points">{String(entry.points ?? 0)} pts</strong></div>)}</div></div>}</section>
}
export default Leaderboard