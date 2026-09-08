import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const TEAMS_ENDPOINT = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection(TEAMS_ENDPOINT).then(setTeams).catch((reason) => setError(reason.message)) }, [])
  return <section><div className="page-heading"><p className="eyebrow">COMMUNITY</p><h1>Teams</h1><p>Find your people and make progress together.</p></div>{error ? <div className="alert alert-warning">{error}</div> : <div className="row g-3">{teams.map((team) => <article className="col-md-6" key={String(team._id)}><div className="metric-card h-100"><div className="d-flex justify-content-between gap-3"><h2>{String(team.name ?? 'Team')}</h2><span className="team-count">{Array.isArray(team.members) ? team.members.length : 0} members</span></div><p className="mb-0 text-secondary">{String(team.description ?? 'No description')}</p></div></article>)}</div>}</section>
}
export default Teams