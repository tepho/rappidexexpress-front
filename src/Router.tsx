import { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'

import { DeliveryContext } from './context/DeliveryContext'

import { Login } from './pages/Login'

import { DefaultLayout } from './layouts/DefaultLayout'
import { Dashboard } from './pages/Dashboard'
import { Reports } from './pages/Reports'
import { Profile } from './pages/Profile'
import { NewUser } from './pages/NewUser'
import { ChangePassword } from './pages/ChangePassword'

export function Router() {
  const { token } = useContext(DeliveryContext)
  return (
    <Routes>
      { 
      !token ? <Route path="/" element={<Login />} /> :
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/relatorios" element={<Reports />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/novo-usuario" element={<NewUser />} />
          <Route path="/alterar-senha" element={<ChangePassword />} />
        </Route>
      }
      
    </Routes>
  )
  }