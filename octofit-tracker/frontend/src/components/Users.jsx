import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const USERS_ENDPOINT = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection(USERS_ENDPOINT).then(setUsers).catch((reason) => setError(reason.message)) }, [])
  return <section><div className="page-heading"><p className="eyebrow">PEOPLE</p><h1>Active members</h1><p>See who is showing up and building momentum.</p></div>{error ? <div className="alert alert-warning">{error}</div> : <div className="row g-3">{users.map((user) => <article className="col-md-6 col-xl-4" key={String(user._id)}><div className="metric-card h-100"><span className="avatar">{String(user.username ?? '?').slice(0, 1).toUpperCase()}</span><h2>{String(user.profile && typeof user.profile === 'object' && 'firstName' in user.profile ? user.profile.firstName : user.username ?? 'Member')}</h2><p className="text-secondary mb-1">@{String(user.username ?? 'member')}</p><p className="small mb-0">{String(user.profile && typeof user.profile === 'object' && 'goal' in user.profile ? user.profile.goal : 'Keep moving')}</p></div></article>)}</div>}</section>
}
export default Users