import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Home, Login, SignUp,Dashboard, AddPost, Summary } from '../src/pages/index.js'
import './index.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path='/' element={<App />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Dashboard routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Home />} />   {/* default: "/" */}
          <Route path="addNote" element={<AddPost />} />
          <Route path="summary" element={<Summary />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
