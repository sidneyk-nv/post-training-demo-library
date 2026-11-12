import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@nvidia/foundations-react-core'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* The Figma design is dark-only, so the theme is pinned to dark. */}
    <ThemeProvider theme="dark" global>
      {/* Apply navigations synchronously. React Router otherwise defers them with
          startTransition, so the stage zoom (StageFlow) can capture the page before
          the new layout renders and the cards just snap. */}
      <BrowserRouter useTransitions={false}>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
