import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

const navigation = [
  { label: 'Overview', to: '/users' },
  { label: 'Activities', to: '/activities' },
  { label: 'Leaderboard', to: '/leaderboard' },
  { label: 'Teams', to: '/teams' },
  { label: 'Workouts', to: '/workouts' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="app-header border-bottom">
        <div className="container-xl d-flex align-items-center justify-content-between gap-3 py-3">
          <NavLink className="brand text-decoration-none" to="/users">
            <span className="brand-mark">O</span>
            <span>OctoFit <small>TRACKER</small></span>
          </NavLink>
          <nav className="nav nav-pills flex-nowrap overflow-auto" aria-label="Primary navigation">
            {navigation.map((item) => (
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} key={item.to} to={item.to}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="container-xl py-4 py-lg-5">
        <Routes>
          <Route path="/" element={<Navigate replace to="/users" />} />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate replace to="/users" />} />
        </Routes>
      </main>
    </div>
  )
}

export default App