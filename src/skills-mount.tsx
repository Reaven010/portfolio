import React from 'react'
import ReactDOM from 'react-dom/client'
import OrbitingSkills from './components/ui/orbiting-skills'

const rootElement = document.getElementById('skills-root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <OrbitingSkills />
    </React.StrictMode>,
  )
}
