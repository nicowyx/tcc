import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './contexts/ThemeContext'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Musicas from './pages/Musicas/Musicas'
import Filmes from './pages/Filmes/Filmes'
import ArtesDigitais from './pages/ArtesDigitais/ArtesDigitais'
import Fotografias from './pages/Fotografias/Fotografias'
import Obras from './pages/Obras/Obras'
import Literatura from './pages/Literatura/Literatura'
import Explorar from './pages/Explorar/Explorar'
import Comunidade from './pages/Comunidade/Comunidade'
import Publicar from './pages/Publicar/Publicar'
import Perfil from './pages/Perfil/Perfil'
import Notificacoes from './pages/Notificacoes/Notificacoes'
import Configuracoes from './pages/Configuracoes/Configuracoes'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
    <Routes>
      <Route path="/home" element={<Home />}/>
      <Route path="/musicas" element={<Musicas />}/>
      <Route path="/filmes" element={<Filmes />}/>
      <Route path="/artes-digitais" element={<ArtesDigitais />}/>
      <Route path="/fotografias" element={<Fotografias />}/>
      <Route path="/obras" element={<Obras />}/>
      <Route path="/literatura" element={<Literatura />}/>
      <Route path="/explorar" element={<Explorar />}/>
      <Route path="/comunidade" element={<Comunidade />}/>
      <Route path="/publicar" element={<Publicar />}/>
      <Route path="/perfil" element={<Perfil />}/>
      <Route path="/notificacoes" element={<Notificacoes />}/>
      <Route path="/configuracoes" element={<Configuracoes />}/>
      <Route path="/" element={<Login/>}/>
      </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
