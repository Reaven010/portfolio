import React from 'react'
import ReactDOM from 'react-dom/client'
import ProjectsCarousel from './components/ProjectsCarousel'

const rootElement = document.getElementById('projects-root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ProjectsCarousel />
    </React.StrictMode>,
  )
}
