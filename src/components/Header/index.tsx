import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { PhosphorLogo, Hamburger, Scroll, User, SignOut, FilePlus } from 'phosphor-react'

import { HeaderContainer } from './styles'
import { DeliveryContext } from '../../context/DeliveryContext'

export function Header() {
  const { logout } = useContext(DeliveryContext)

  function handleLogout(){
    logout()
  }

  return (
    <HeaderContainer>
    <PhosphorLogo size={40} />
      <nav>
        <NavLink to="/novo-usuario" title="Novo Usuário">
          <FilePlus  size={24} />
        </NavLink>
        <NavLink to="/dashboard" title="Entregas">
          <Hamburger  size={24} />
        </NavLink>
        <NavLink to="/relatorios" title="Relatórios">
          <Scroll size={24} />
        </NavLink>
        <NavLink to="/perfil" title="Perfil">
          <User  size={24} />
        </NavLink>
        <NavLink to="/" title="Sair">
          <SignOut onClick={handleLogout} size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
