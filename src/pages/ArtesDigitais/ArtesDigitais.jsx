import Sidebar from '../../components/Sidebar/Sidebar';
import TrendingSection from '../../components/TrendingSection/TrendingSection';
import SearchBar from '../../components/SearchBar/SearchBar';
import './ArtesDigitais.css';

function ArtesDigitais() {
  return (
    <div className="artes-layout">
      <Sidebar />
      <main className="main-content">
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 24 }}>
          <SearchBar />
        </div>
        <h2 className="artes-title">Suas Artes Digitais</h2>

        <TrendingSection
          title="Ilustração Digital"
          color="linear-gradient(0deg, #8b5cf6 0%, #7c3aed 100%)"
          artworks={[
            { title: 'Retrato Fantasia', artist: 'Ana Silva', cover: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=400&q=80' },
            { title: 'Paisagem Cyberpunk', artist: 'João Santos', cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=400&q=80' },
            { title: 'Personagem Anime', artist: 'Maria Costa', cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80' },
            { title: 'Arte Conceitual', artist: 'Pedro Lima', cover: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=400&q=80' },
            { title: 'Ilustração Sci-Fi', artist: 'Laura Mendes', cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=400&q=80' },
            { title: 'Digital Painting', artist: 'Carlos Rocha', cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80' },
            { title: 'Arte Abstrata', artist: 'Sofia Alves', cover: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=400&q=80' },
          ]}
        />

        <TrendingSection
          title="3D & Modelagem"
          color="linear-gradient(90deg, #7c3aed 0%, #a855f7 100%)"
          artworks={[
            { title: 'Modelo 3D Realista', artist: 'Bruno Ferreira', cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=400&q=80' },
            { title: 'Ambiente Virtual', artist: 'Camila Dias', cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80' },
            { title: 'Personagem 3D', artist: 'Rafael Souza', cover: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=400&q=80' },
            { title: 'Arquitetura Virtual', artist: 'Juliana Pinto', cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=400&q=80' },
            { title: 'Produto 3D', artist: 'Thiago Martins', cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80' },
            { title: 'Cenário Fantástico', artist: 'Beatriz Cunha', cover: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=400&q=80' },
            { title: 'Render Artístico', artist: 'Gabriel Nunes', cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=400&q=80' },
          ]}
        />

        <TrendingSection
          title="Arte Conceitual & Design"
          color="linear-gradient(0deg, #a855f7 0%, #c084fc 100%)"
          artworks={[
            { title: 'Concept Art Game', artist: 'Lucas Barbosa', cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80' },
            { title: 'Design de Personagem', artist: 'Amanda Reis', cover: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=400&q=80' },
            { title: 'Storyboard Digital', artist: 'Felipe Moreira', cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=400&q=80' },
            { title: 'Matte Painting', artist: 'Isabela Torres', cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80' },
            { title: 'Visual Development', artist: 'Rodrigo Castro', cover: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=400&q=80' },
            { title: 'Environment Design', artist: 'Natália Gomes', cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=400&q=80' },
            { title: 'Concept Vehicles', artist: 'Diego Oliveira', cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80' },
          ]}
        />
      </main>
    </div>
  );
}

export default ArtesDigitais;