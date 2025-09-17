import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import TrendingSection from '../../components/TrendingSection/TrendingSection';
import SearchBar from '../../components/SearchBar/SearchBar';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter';
import apiService from '../../services/api';
import './Musicas.css';

function Musicas() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await apiService.getPosts();
      const musicPosts = data.filter(post => post.category === 'musicas');
      setPosts(musicPosts);
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
      <div className="musicas-layout">
        <Sidebar />
        <main className="main-content">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <p>Carregando músicas...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="musicas-layout">
      <Sidebar />
      <main className="main-content">
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 24 }}>
          <SearchBar onSearch={setSearchTerm} placeholder="Buscar músicas, artistas..." />
        </div>
        <h2 className="musicas-title">Músicas Diversas</h2>
        
        {posts.length > 0 ? (
          <TrendingSection
            title="Músicas Publicadas"
            color="linear-gradient(0deg, #00ff66 0%, #00cc52 100%)"
            artworks={postsToArtworks(getFilteredPosts())}
          />
        ) : (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <p>Nenhuma música encontrada. Seja o primeiro a publicar!</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Musicas;