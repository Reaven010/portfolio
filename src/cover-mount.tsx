import React from 'react'
import ReactDOM from 'react-dom/client'
import TearableCover from './components/ui/tearable-cover'

const rootElement = document.getElementById('cover-root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <TearableCover />
    </React.StrictMode>,
  )
}
