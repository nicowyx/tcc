import { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import TrendingSection from '../../components/TrendingSection/TrendingSection';
import SearchBar from '../../components/SearchBar/SearchBar';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter';
import './Fotografias.css';

function Fotografias() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const categories = ['Paisagens & Natureza', 'Retratos & Pessoas', 'Arquitetura & Urbano'];

  const fotografiaSections = {
    'Paisagens & Natureza': {
      title: "Paisagens & Natureza",
      color: "linear-gradient(0deg, #1d4ed8 0%, #2563eb 100%)",
      artworks: [
        { title: 'Montanhas ao Amanhecer', artist: 'Carlos Mendes', cover: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80' },
        { title: 'Floresta Tropical', artist: 'Ana Beatriz', cover: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=80' },
        { title: 'Pôr do Sol na Praia', artist: 'Roberto Silva', cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' },
        { title: 'Cachoeira Cristalina', artist: 'Marina Costa', cover: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80' },
        { title: 'Campo de Flores', artist: 'João Pedro', cover: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=80' },
        { title: 'Lago Sereno', artist: 'Lucia Santos', cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' },
        { title: 'Aurora Boreal', artist: 'Felipe Rocha', cover: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80' },
      ]
    },
    'Retratos & Pessoas': {
      title: "Retratos & Pessoas",
      color: "linear-gradient(90deg, #1d4ed8 0%, #2563eb 100%)",
      artworks: [
        { title: 'Retrato Clássico', artist: 'Beatriz Lima', cover: 'https://images.unsplash.com/photo-1494790108755-2616c9c0e8e0?auto=format&fit=crop&w=400&q=80' },
        { title: 'Fotografia de Rua', artist: 'Diego Alves', cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
        { title: 'Ensaio Família', artist: 'Camila Ferreira', cover: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80' },
        { title: 'Retrato Artístico', artist: 'Rafael Nunes', cover: 'https://images.unsplash.com/photo-1494790108755-2616c9c0e8e0?auto=format&fit=crop&w=400&q=80' },
        { title: 'Fotografia Social', artist: 'Juliana Pinto', cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
        { title: 'Ensaio Gestante', artist: 'Amanda Torres', cover: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80' },
        { title: 'Retrato Infantil', artist: 'Bruno Castro', cover: 'https://images.unsplash.com/photo-1494790108755-2616c9c0e8e0?auto=format&fit=crop&w=400&q=80' },
      ]
    },
    'Arquitetura & Urbano': {
      title: "Arquitetura & Urbano",
      color: "linear-gradient(0deg, #1d4ed8 0%, #2563eb 100%)",
      artworks: [
        { title: 'Skyline Moderno', artist: 'Thiago Barbosa', cover: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=400&q=80' },
        { title: 'Arquitetura Clássica', artist: 'Sofia Reis', cover: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80' },
        { title: 'Detalhes Urbanos', artist: 'Lucas Moreira', cover: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=400&q=80' },
        { title: 'Ponte Icônica', artist: 'Isabela Cunha', cover: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=400&q=80' },
        { title: 'Interior Moderno', artist: 'Gabriel Gomes', cover: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80' },
        { title: 'Geometria Urbana', artist: 'Natália Oliveira', cover: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=400&q=80' },
        { title: 'Reflexos na Cidade', artist: 'Rodrigo Martins', cover: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=400&q=80' },
      ]
    }
  };

  const getSectionsToShow = () => {
    if (selectedCategory === 'all') {
      return Object.values(fotografiaSections);
    }
    return [fotografiaSections[selectedCategory]];
  };

  return (
    <div className="fotografias-layout">
      <Sidebar />
      <main className="main-content">
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 24 }}>
          <SearchBar />
        </div>
        <h2 className="fotografias-title">Fotografias Diversas</h2>
        <CategoryFilter 
          categories={categories} 
          onCategoryChange={setSelectedCategory}
          categoryColors={{
            'Paisagens & Natureza': '#1d4ed8',
            'Retratos & Pessoas': '#1d4ed8',
            'Arquitetura & Urbano': '#1d4ed8'
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

export default Fotografias;