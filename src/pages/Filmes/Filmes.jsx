import { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import TrendingSection from '../../components/TrendingSection/TrendingSection';
import SearchBar from '../../components/SearchBar/SearchBar';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter';
import './Filmes.css';

function Filmes() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const categories = ['Ação & Aventura', 'Terror & Suspense', 'Drama & Romance'];

  return (
    <div className="filmes-layout">
      <Sidebar />
      <main className="main-content">
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 24 }}>
          <SearchBar />
        </div>
        <h2 className="filmes-title">Longas e Curta-metragens Diversas</h2>
        <CategoryFilter 
          categories={categories} 
          onCategoryChange={setSelectedCategory}
          categoryColors={{
            'Ação & Aventura': '#ff3c3c',
            'Terror & Suspense': '#ff3c3c',
            'Drama & Romance': '#ff3c3c'
          }}
        />

        <TrendingSection
          title="Ação & Aventura"
          color="linear-gradient(0deg, #ff3c3c 0%, #dc2626 100%)"
          artworks={[
            { title: 'Mad Max: Fury Road', artist: 'George Miller', cover: 'https://images.unsplash.com/photo-1489599735734-79b4169c2a78?auto=format&fit=crop&w=400&q=80' },
            { title: 'John Wick', artist: 'Chad Stahelski', cover: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=400&q=80' },
            { title: 'Mission Impossible', artist: 'Christopher McQuarrie', cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=400&q=80' },
            { title: 'Die Hard', artist: 'John McTiernan', cover: 'https://images.unsplash.com/photo-1489599735734-79b4169c2a78?auto=format&fit=crop&w=400&q=80' },
            { title: 'The Dark Knight', artist: 'Christopher Nolan', cover: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=400&q=80' },
            { title: 'Gladiator', artist: 'Ridley Scott', cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=400&q=80' },
            { title: 'Speed', artist: 'Jan de Bont', cover: 'https://images.unsplash.com/photo-1489599735734-79b4169c2a78?auto=format&fit=crop&w=400&q=80' },
          ]}
        />

        <TrendingSection
          title="Terror & Suspense"
          color="linear-gradient(90deg, #b91c1c 0%, #ff3c3c 100%)"
          artworks={[
            { title: 'O Exorcista', artist: 'William Friedkin', cover: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=400&q=80' },
            { title: 'Halloween', artist: 'John Carpenter', cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=400&q=80' },
            { title: 'A Quiet Place', artist: 'John Krasinski', cover: 'https://images.unsplash.com/photo-1489599735734-79b4169c2a78?auto=format&fit=crop&w=400&q=80' },
            { title: 'Hereditary', artist: 'Ari Aster', cover: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=400&q=80' },
            { title: 'Get Out', artist: 'Jordan Peele', cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=400&q=80' },
            { title: 'The Conjuring', artist: 'James Wan', cover: 'https://images.unsplash.com/photo-1489599735734-79b4169c2a78?auto=format&fit=crop&w=400&q=80' },
            { title: 'Scream', artist: 'Wes Craven', cover: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=400&q=80' },
          ]}
        />

        <TrendingSection
          title="Drama & Romance"
          color="linear-gradient(0deg, #dc2626 0%, #ef4444 100%)"
          artworks={[
            { title: 'Titanic', artist: 'James Cameron', cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=400&q=80' },
            { title: 'The Notebook', artist: 'Nick Cassavetes', cover: 'https://images.unsplash.com/photo-1489599735734-79b4169c2a78?auto=format&fit=crop&w=400&q=80' },
            { title: 'Forrest Gump', artist: 'Robert Zemeckis', cover: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=400&q=80' },
            { title: 'La La Land', artist: 'Damien Chazelle', cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=400&q=80' },
            { title: 'The Shawshank Redemption', artist: 'Frank Darabont', cover: 'https://images.unsplash.com/photo-1489599735734-79b4169c2a78?auto=format&fit=crop&w=400&q=80' },
            { title: 'Casablanca', artist: 'Michael Curtiz', cover: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=400&q=80' },
            { title: 'Gone with the Wind', artist: 'Victor Fleming', cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=400&q=80' },
          ]}
        />
      </main>
    </div>
  );
}

export default Filmes;