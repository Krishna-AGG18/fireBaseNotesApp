import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Login, SignUp} from '../src/pages/index.js'
import './index.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<App />} />

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
