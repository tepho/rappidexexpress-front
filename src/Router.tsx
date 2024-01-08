import { Routes, Route } from 'react-router-dom'

import { Login } from './pages/Login'

import { DefaultLayout } from './layouts/DefaultLayout'
import { Dashboard } from './pages/Dashboard'
import { Reports } from './pages/Reports'

export function Router() {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/relatorios" element={<Reports />} />
        </Route>
      </Routes>
    )
  }