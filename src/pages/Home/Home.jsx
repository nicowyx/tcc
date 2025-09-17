import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import TrendingSection from '../../components/TrendingSection/TrendingSection';
import SearchBar from '../../components/SearchBar/SearchBar';
import apiService from '../../services/api';
import './Home.css';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await apiService.getPosts();
      setPosts(data);
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPostsByCategory = (category) => {
    return posts
      .filter(post => post.category === category)
      .slice(0, 7)
      .map(post => ({
        title: post.title,
        artist: post.author,
        cover: post.image_url
      }));
  };

  if (loading) {
    return (
      <div className={`home-layout ${document.body.className}`}>
        <Sidebar />
        <main className="main-content">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <p>Carregando...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={`home-layout ${document.body.className}`}>
      <Sidebar />
      <main className="main-content">
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 24 }}>
          <SearchBar />
        </div>
        <h2 className="recent-title">Conteúdo em Destaque</h2>

        {getPostsByCategory('musicas').length > 0 && (
          <TrendingSection
            title="#BOMBANDO em Músicas"
            color="linear-gradient(0deg, #00ff66 0%, #00bfff 100%)"
            artworks={getPostsByCategory('musicas')}
          />
        )}
        
        {getPostsByCategory('filmes').length > 0 && (
          <TrendingSection
            title="#BOMBANDO em Filmes"
            color="linear-gradient(90deg, #ff3c3c 0%, #b92b27 100%)"
            artworks={getPostsByCategory('filmes')}
          />
        )}
        
        {getPostsByCategory('artes-digitais').length > 0 && (
          <TrendingSection
            title="#BOMBANDO em Artes Digitais"
            color="linear-gradient(45deg, #ff6b6b 0%, #4ecdc4 100%)"
            artworks={getPostsByCategory('artes-digitais')}
          />
        )}
      </main>
    </div>
  );
}

export default Home;
