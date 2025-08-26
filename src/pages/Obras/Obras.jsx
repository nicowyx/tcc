import Sidebar from '../../components/Sidebar/Sidebar';
import TrendingSection from '../../components/TrendingSection/TrendingSection';
import SearchBar from '../../components/SearchBar/SearchBar';
import './Obras.css';

function Obras() {
  return (
    <div className="obras-layout">
      <Sidebar />
      <main className="main-content">
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 24 }}>
          <SearchBar />
        </div>
        <h2 className="obras-title">Suas Obras</h2>

        <TrendingSection
          title="Pinturas Clássicas"
          color="linear-gradient(0deg, #ea580c 0%, #dc2626 100%)"
          artworks={[
            { title: 'Mona Lisa', artist: 'Leonardo da Vinci', cover: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=400&q=80' },
            { title: 'A Noite Estrelada', artist: 'Vincent van Gogh', cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80' },
            { title: 'O Grito', artist: 'Edvard Munch', cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=400&q=80' },
            { title: 'Guernica', artist: 'Pablo Picasso', cover: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=400&q=80' },
            { title: 'A Persistência da Memória', artist: 'Salvador Dalí', cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80' },
            { title: 'O Nascimento de Vênus', artist: 'Sandro Botticelli', cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=400&q=80' },
            { title: 'A Última Ceia', artist: 'Leonardo da Vinci', cover: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=400&q=80' },
          ]}
        />

        <TrendingSection
          title="Arte Contemporânea"
          color="linear-gradient(90deg, #f97316 0%, #ea580c 100%)"
          artworks={[
            { title: 'Balloon Girl', artist: 'Banksy', cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80' },
            { title: 'Campbell Soup Cans', artist: 'Andy Warhol', cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=400&q=80' },
            { title: 'Infinity Rooms', artist: 'Yayoi Kusama', cover: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=400&q=80' },
            { title: 'The Physical Impossibility', artist: 'Damien Hirst', cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80' },
            { title: 'Untitled', artist: 'Jean-Michel Basquiat', cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=400&q=80' },
            { title: 'Spider', artist: 'Louise Bourgeois', cover: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=400&q=80' },
            { title: 'Puppy', artist: 'Jeff Koons', cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80' },
          ]}
        />

        <TrendingSection
          title="Esculturas & Instalações"
          color="linear-gradient(0deg, #fb923c 0%, #f97316 100%)"
          artworks={[
            { title: 'O Pensador', artist: 'Auguste Rodin', cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=400&q=80' },
            { title: 'David', artist: 'Michelangelo', cover: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=400&q=80' },
            { title: 'The Gates', artist: 'Christo and Jeanne-Claude', cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80' },
            { title: 'Cloud Gate', artist: 'Anish Kapoor', cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=400&q=80' },
            { title: 'Vênus de Milo', artist: 'Alexandros de Antioquia', cover: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=400&q=80' },
            { title: 'The Weather Project', artist: 'Olafur Eliasson', cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80' },
            { title: 'Balloon Dog', artist: 'Jeff Koons', cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=400&q=80' },
          ]}
        />
      </main>
    </div>
  );
}

export default Obras;