import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Musicas from './pages/Musicas/Musicas'
import Filmes from './pages/Filmes/Filmes'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/home" element={<Home />}/>
      <Route path="/musicas" element={<Musicas />}/>
      <Route path="/filmes" element={<Filmes />}/>
      <Route path="/" element={<Login/>}/>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
