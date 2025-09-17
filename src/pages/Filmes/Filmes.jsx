import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import TrendingSection from '../../components/TrendingSection/TrendingSection';
import SearchBar from '../../components/SearchBar/SearchBar';
import apiService from '../../services/api';
import './Filmes.css';

function Filmes() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await apiService.getPosts();
      const filmePosts = data.filter(post => post.category === 'filmes');
      setPosts(filmePosts);
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredPosts = () => {
    if (!searchTerm) return posts;
    return posts.filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const postsToArtworks = (posts) => {
    return posts.map(post => ({
      title: post.title,
      artist: post.author,
      cover: post.image_url
    }));
  };

  if (loading) {
    return (
      <div className="filmes-layout">
        <Sidebar />
        <main className="main-content">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <p>Carregando filmes...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="filmes-layout">
      <Sidebar />
      <main className="main-content">
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 24 }}>
          <SearchBar onSearch={setSearchTerm} placeholder="Buscar filmes, diretores..." />
        </div>
        <h2 className="filmes-title">Longas e Curta-metragens Diversas</h2>
        
        {posts.length > 0 ? (
          <TrendingSection
            title="Filmes Publicados"
            color="linear-gradient(0deg, #ff3c3c 0%, #dc2626 100%)"
            artworks={postsToArtworks(getFilteredPosts())}
          />
        ) : (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <p>Nenhum filme encontrado. Seja o primeiro a publicar!</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Filmes;