import Sidebar from '../../components/Sidebar/Sidebar';
import TrendingSection from '../../components/TrendingSection/TrendingSection';
import SearchBar from '../../components/SearchBar/SearchBar';
import './Musicas.css';

function Musicas() {
  return (
    <div className="musicas-layout">
      <Sidebar />
      <main className="main-content">
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 24 }}>
          <SearchBar />
        </div>
        <h2 className="musicas-title">Suas Músicas</h2>

        <TrendingSection
          title="Top Hits"
          color="linear-gradient(0deg, #00ff66 0%, #00cc52 100%)"
          artworks={[
            { title: 'Blinding Lights', artist: 'The Weeknd', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400&q=80' },
            { title: 'Watermelon Sugar', artist: 'Harry Styles', cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80' },
            { title: 'Levitating', artist: 'Dua Lipa', cover: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
            { title: 'Good 4 U', artist: 'Olivia Rodrigo', cover: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
            { title: 'Stay', artist: 'The Kid LAROI, Justin Bieber', cover: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80' },
            { title: 'As It Was', artist: 'Harry Styles', cover: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b43?auto=format&fit=crop&w=400&q=80' },
            { title: 'Heat Waves', artist: 'Glass Animals', cover: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80' },
          ]}
        />

        <TrendingSection
          title="Rock Clássico"
          color="linear-gradient(90deg, #1b9a4a 0%, #00ff66 100%)"
          artworks={[
            { title: 'Bohemian Rhapsody', artist: 'Queen', cover: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b43?auto=format&fit=crop&w=400&q=80' },
            { title: 'Stairway to Heaven', artist: 'Led Zeppelin', cover: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80' },
            { title: 'Hotel California', artist: 'Eagles', cover: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' },
            { title: 'Sweet Child O Mine', artist: 'Guns N Roses', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400&q=80' },
            { title: 'Imagine', artist: 'John Lennon', cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80' },
            { title: 'Smoke on the Water', artist: 'Deep Purple', cover: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
            { title: 'Another Brick in the Wall', artist: 'Pink Floyd', cover: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
          ]}
        />

        <TrendingSection
          title="Pop Nacional"
          color="linear-gradient(0deg, #28a745 0%, #20c997 100%)"
          artworks={[
            { title: 'Jenifer', artist: 'Gabriel Diniz', cover: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
            { title: 'Morena', artist: 'Luan Santana', cover: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
            { title: 'Coração Cigano', artist: 'Luan Santana', cover: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80' },
            { title: 'Evidências', artist: 'Chitãozinho & Xororó', cover: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b43?auto=format&fit=crop&w=400&q=80' },
            { title: 'Temporal', artist: 'Marília Mendonça', cover: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80' },
            { title: 'Ai Preto', artist: 'L7NNON', cover: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' },
            { title: 'Batom de Cereja', artist: 'Israel & Rodolffo', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400&q=80' },
          ]}
        />
      </main>
    </div>
  );
}

export default Musicas;