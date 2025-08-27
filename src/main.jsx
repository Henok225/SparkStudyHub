import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider from './Context/StoreContext.jsx'
import EthioCurRoutes from './pages/EthiopianCurriculum/EthioCurRoutes/EthioCurRoutes.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <StoreContextProvider>
        <ethioCurContextProvider>

    <App />
    </ethioCurContextProvider>
    </StoreContextProvider>
    </BrowserRouter>
    
)
