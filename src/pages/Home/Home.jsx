import Sidebar from '../../components/Sidebar/Sidebar';
import TrendingSection from '../../components/TrendingSection/TrendingSection';
import SearchBar from '../../components/SearchBar/SearchBar';
import './Home.css';

function Home() {
  return (
    <div className="home-layout">
      <Sidebar />
      <main className="main-content">
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 24 }}>
          <SearchBar />
        </div>
        <h2 className="recent-title">Baseado no que você viu recentemente</h2>

        {/* TALVEZ TENHA AGUMA FORMA DE FAZER COM QUE TODOS ESSAS POSTAGENS QUE ESTAO LISTADAS ABAIXO SEJAM CARREGADOS DIRETO DA API, USEM O CHATGPT PARA FAZER ISSO SE FOR FACIL, SE FOR COMPLICADO NEM PERCAM TEMPO*/}
        <TrendingSection
          title="#BOMBANDO em Rap"
          color="linear-gradient(0deg, #00ff66 0%, #00bfff 100%)"
          artworks={[
            { title: 'Sigilo', artist: 'Og Blocky, SlauniBeats', cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80' },
            { title: 'Antisocial', artist: 'Boyzi', cover: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
            { title: 'ABAYOMI (Freestyle)', artist: 'DAVÔ', cover: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
            { title: 'Corrente', artist: 'Og Barbosa', cover: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80' },
            { title: 'Noite Urbana', artist: 'MC Lira', cover: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b43?auto=format&fit=crop&w=400&q=80' },
            { title: 'Versos Livres', artist: 'Rima Forte', cover: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80' },
            { title: 'Flow Infinito', artist: 'BeatMakerX', cover: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' },         
          ]}
        />
        <TrendingSection
          title="#BOMBANDO em Terror"
          color="linear-gradient(90deg, #ff3c3c 0%, #b92b27 100%)"
          artworks={[
            { title: 'Larry', artist: '', cover: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80' },
            { title: 'Intruders', artist: '', cover: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b43?auto=format&fit=crop&w=400&q=80' },
            { title: 'Lights out', artist: '', cover: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
            { title: 'The Babadook', artist: '', cover: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' },
            { title: 'O Sussurro', artist: '', cover: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80' },
            { title: 'A Casa', artist: '', cover: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
            { title: 'Pesadelo', artist: '', cover: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
          ]}
        />
      </main>
    </div>
  );
}

export default Home;
