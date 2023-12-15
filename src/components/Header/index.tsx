import { HeaderContainer } from './styles'

import { PhosphorLogo, Hamburger, Scroll, User, SignOut } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <HeaderContainer>
    <PhosphorLogo size={40} />
      <nav>
        <NavLink to="" title="Entregas">
          <Hamburger  size={24} />
        </NavLink>
        <NavLink to="" title="Relatórios">
          <Scroll size={24} />
        </NavLink>
        <NavLink to="" title="Perfil">
          <User  size={24} />
        </NavLink>
        <NavLink to="" title="Sair">
          <SignOut  size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
