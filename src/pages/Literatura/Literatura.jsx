import { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import TrendingSection from '../../components/TrendingSection/TrendingSection';
import SearchBar from '../../components/SearchBar/SearchBar';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter';
import './Literatura.css';

function Literatura() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const categories = ['Poesia & Crônicas', 'Contos & Novelas', 'Ensaios & Artigos'];

  const literaturaSections = {
    'Poesia & Crônicas': {
      title: "Poesia & Crônicas",
      color: "linear-gradient(0deg, #f59e0b 0%, #fbbf24 100%)",
      artworks: [
        { title: 'Sonetos do Amor', artist: 'Ana Poética', cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=400&q=80' },
        { title: 'Crônicas Urbanas', artist: 'João Cronista', cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
        { title: 'Versos Livres', artist: 'Maria Verso', cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80' },
        { title: 'Memórias do Cotidiano', artist: 'Carlos Memória', cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=400&q=80' },
        { title: 'Haicais Modernos', artist: 'Lucia Zen', cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
        { title: 'Reflexões Poéticas', artist: 'Pedro Reflexão', cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80' },
        { title: 'Crônicas do Tempo', artist: 'Sofia Tempo', cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=400&q=80' },
      ]
    },
    'Contos & Novelas': {
      title: "Contos & Novelas",
      color: "linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)",
      artworks: [
        { title: 'Contos da Madrugada', artist: 'Bruno Narrativa', cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
        { title: 'Novela Urbana', artist: 'Camila Ficção', cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80' },
        { title: 'Histórias Breves', artist: 'Rafael Breve', cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=400&q=80' },
        { title: 'Contos Fantásticos', artist: 'Juliana Fantasia', cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
        { title: 'Narrativas do Interior', artist: 'Thiago Interior', cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80' },
        { title: 'Contos de Amor', artist: 'Beatriz Romance', cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=400&q=80' },
        { title: 'Novela Histórica', artist: 'Gabriel História', cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
      ]
    },
    'Ensaios & Artigos': {
      title: "Ensaios & Artigos",
      color: "linear-gradient(0deg, #fbbf24 0%, #fcd34d 100%)",
      artworks: [
        { title: 'Ensaios Filosóficos', artist: 'Lucas Filosofia', cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80' },
        { title: 'Artigos Culturais', artist: 'Amanda Cultura', cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=400&q=80' },
        { title: 'Reflexões Sociais', artist: 'Felipe Social', cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
        { title: 'Ensaios Literários', artist: 'Isabela Literatura', cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80' },
        { title: 'Crítica Contemporânea', artist: 'Rodrigo Crítica', cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=400&q=80' },
        { title: 'Artigos de Opinião', artist: 'Natália Opinião', cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
        { title: 'Ensaios Históricos', artist: 'Diego História', cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80' },
      ]
    }
  };

  const getSectionsToShow = () => {
    if (selectedCategory === 'all') {
      return Object.values(literaturaSections);
    }
    return [literaturaSections[selectedCategory]];
  };

  return (
    <div className="literatura-layout">
      <Sidebar />
      <main className="main-content">
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 24 }}>
          <SearchBar />
        </div>
        <h2 className="literatura-title">Literatura Diversa</h2>
        <CategoryFilter 
          categories={categories} 
          onCategoryChange={setSelectedCategory}
          categoryColors={{
            'Poesia & Crônicas': '#fbbf24',
            'Contos & Novelas': '#fbbf24',
            'Ensaios & Artigos': '#fbbf24'
          }}
        />

        {getSectionsToShow().map((section, index) => (
          <TrendingSection
            key={index}
            title={section.title}
            color={section.color}
            artworks={section.artworks}
          />
        ))}
      </main>
    </div>
  );
}

export default Literatura;