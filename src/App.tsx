import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { Router } from './Router'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'
import { DeliveryContextProvider } from './context/DeliveryContext'

function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <BrowserRouter>
        <DeliveryContextProvider>
          <Router />
        </DeliveryContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
