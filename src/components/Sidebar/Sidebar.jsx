import './Sidebar.css';
import { Link } from 'react-router-dom';
import { FaCog, FaUser, FaBell } from 'react-icons/fa';
import { useTheme } from '../../contexts/ThemeContext';

function Sidebar() {
  const { isDarkMode } = useTheme();
  
  return (
    <aside className={`sidebar ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="sidebar-logo">
        <img src="https://i.imgur.com/0y0y0y0.png" alt="Inspirart Logo" />
        <Link to="/home"><span>Inspirart</span></Link>
      </div>
      <nav className="sidebar-nav">
        <Link to="/musicas"><span role="img" aria-label="músicas">🎵</span> músicas</Link>
        <Link to="/filmes"><span role="img" aria-label="filmes">🎬</span> filmes</Link>
        <Link to="/artes-digitais"><span role="img" aria-label="artes digitais">🖼️</span> artes digitais</Link>
        <Link to="/fotografias"><span role="img" aria-label="fotografias">📸</span> fotografias</Link>
        <Link to="/obras"><span role="img" aria-label="obras">🎨</span> obras</Link>
        <Link to="/literatura"><span role="img" aria-label="literatura">📚</span> literatura</Link>
        <Link to="/explorar"><span role="img" aria-label="explorar">🔍</span> explorar</Link>
        <Link to="/comunidade"><span role="img" aria-label="comunidade">👥</span> comunidade</Link>
        <Link to="/publicar"><span role="img" aria-label="publicar">➕</span> publicar</Link>
      </nav>
      <div className="sidebar-footer">
        <Link to="/configuracoes"><FaCog aria-label="configurações" /></Link>
        <Link to="/perfil"><FaUser aria-label="perfil" /></Link>
        <Link to="/notificacoes"><FaBell aria-label="notificações" /></Link>
      </div>
    </aside>
  );
}

export default Sidebar;