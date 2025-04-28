import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Routes from './routes/Routes.jsx'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={Routes} />
  </StrictMode>,
)
