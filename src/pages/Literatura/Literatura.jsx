import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import TrendingSection from '../../components/TrendingSection/TrendingSection';
import SearchBar from '../../components/SearchBar/SearchBar';
import apiService from '../../services/api';
import './Literatura.css';

function Literatura() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await apiService.getPosts();
      const literaturaPosts = data.filter(post => post.category === 'literatura');
      setPosts(literaturaPosts);
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
      <div className="literatura-layout">
        <Sidebar />
        <main className="main-content">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <p>Carregando literatura...</p>
          </div>
        </main>
      </div>
    );
  }



  return (
    <div className="literatura-layout">
      <Sidebar />
      <main className="main-content">
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 24 }}>
          <SearchBar onSearch={setSearchTerm} placeholder="Buscar literatura..." />
        </div>
        <h2 className="literatura-title">Literatura Diversa</h2>
        
        {posts.length > 0 ? (
          <TrendingSection
            title="Literatura Publicada"
            color="linear-gradient(0deg, #f59e0b 0%, #fbbf24 100%)"
            artworks={postsToArtworks(getFilteredPosts())}
          />
        ) : (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <p>Nenhuma literatura encontrada. Seja o primeiro a publicar!</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Literatura;