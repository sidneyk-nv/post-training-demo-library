import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { ExamplesPage } from './pages/ExamplesPage'
import { FlowPage } from './pages/FlowPage'
import { CtaPage } from './pages/CtaPage'
import { IntroductionPage } from './pages/IntroductionPage'

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<ExamplesPage />} />
        <Route path="/introduction" element={<IntroductionPage />} />
        <Route path="/examples/:exampleId" element={<FlowPage />} />
        <Route path="/cta" element={<CtaPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  )
}
