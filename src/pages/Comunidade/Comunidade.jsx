import { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import SearchBar from '../../components/SearchBar/SearchBar';
import './Comunidade.css';

function Comunidade() {
  const [activeTab, setActiveTab] = useState('feed');
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: { name: 'João Silva', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face', verified: true },
      time: '2h',
      content: 'Acabei de lançar minha nova música! Inspirada nos sons urbanos de São Paulo 🎵',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=500&q=80',
      type: 'music',
      likes: 156,
      comments: 23,
      shares: 12,
      liked: false,
      tags: ['#NovaMusica', '#SaoPaulo', '#Urbano']
    },
    {
      id: 2,
      user: { name: 'Maria Santos', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face', verified: false },
      time: '5h',
      content: 'Processo criativo da minha nova arte digital. Cada pixel conta uma história! 🎨✨',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80',
      type: 'art',
      likes: 89,
      comments: 15,
      shares: 8,
      liked: true,
      tags: ['#ArteDigital', '#Criatividade', '#Design']
    },
    {
      id: 3,
      user: { name: 'Carlos Fotógrafo', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face', verified: true },
      time: '1d',
      content: 'Golden hour perfeito hoje! A natureza sempre nos surpreende com sua beleza.',
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=500&q=80',
      type: 'photo',
      likes: 234,
      comments: 31,
      shares: 19,
      liked: false,
      tags: ['#Fotografia', '#GoldenHour', '#Natureza']
    }
  ]);

  const [newPost, setNewPost] = useState('');
  const [showCreatePost, setShowCreatePost] = useState(false);

  const trendingTopics = [
    { tag: '#NovaMusica', posts: 1247, trend: '+15%' },
    { tag: '#ArteDigital', posts: 892, trend: '+8%' },
    { tag: '#Fotografia', posts: 2156, trend: '+23%' },
    { tag: '#Cinema', posts: 567, trend: '+5%' },
    { tag: '#Design', posts: 743, trend: '+12%' }
  ];

  const suggestedUsers = [
    { name: 'Ana Designer', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face', followers: '2.1k', category: 'Design' },
    { name: 'Pedro Músico', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face', followers: '1.8k', category: 'Música' },
    { name: 'Luiza Arte', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face', followers: '3.2k', category: 'Arte' }
  ];

  const communities = [
    { name: 'Produtores Musicais', members: '12.5k', image: '🎵', active: true },
    { name: 'Artistas Digitais', members: '8.9k', image: '🎨', active: false },
    { name: 'Fotógrafos Unidos', members: '15.2k', image: '📸', active: true },
    { name: 'Cineastas Indie', members: '6.7k', image: '🎬', active: false }
  ];

  const handleLike = (postId) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const post = {
        id: Date.now(),
        user: { name: 'Você', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face', verified: false },
        time: 'agora',
        content: newPost,
        type: 'text',
        likes: 0,
        comments: 0,
        shares: 0,
        liked: false,
        tags: []
      };
      setPosts(prev => [post, ...prev]);
      setNewPost('');
      setShowCreatePost(false);
    }
  };

  return (
    <div className="home-layout">
      <Sidebar />
      <main className="main-content">
        <div className="community-header">
          <div className="header-content">
            <h2 className="page-title">🌟 Comunidade</h2>
            <p className="page-subtitle">Conecte-se com artistas e criadores</p>
          </div>
          <div className="header-actions">
            <SearchBar />
            <button className="create-post-btn" onClick={() => setShowCreatePost(!showCreatePost)}>
              ✏️ Criar Post
            </button>
          </div>
        </div>

        {showCreatePost && (
          <div className="create-post-modal">
            <div className="create-post-content">
              <h3>✨ Compartilhe sua criação</h3>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="O que você está criando hoje?"
                rows={4}
              />
              <div className="create-post-actions">
                <button onClick={() => setShowCreatePost(false)} className="cancel-btn">Cancelar</button>
                <button onClick={handleCreatePost} className="publish-btn">Publicar</button>
              </div>
            </div>
          </div>
        )}

        <div className="community-tabs">
          <button className={`tab ${activeTab === 'feed' ? 'active' : ''}`} onClick={() => setActiveTab('feed')}>
            🏠 Feed
          </button>
          <button className={`tab ${activeTab === 'trending' ? 'active' : ''}`} onClick={() => setActiveTab('trending')}>
            🔥 Em Alta
          </button>
          <button className={`tab ${activeTab === 'communities' ? 'active' : ''}`} onClick={() => setActiveTab('communities')}>
            👥 Comunidades
          </button>
          <button className={`tab ${activeTab === 'events' ? 'active' : ''}`} onClick={() => setActiveTab('events')}>
            📅 Eventos
          </button>
        </div>
        
        <div className="community-sections">
          <section className="community-feed">
            {activeTab === 'feed' && (
              <div className="posts">
                {posts.map(post => (
                  <div key={post.id} className="post">
                    <div className="post-header">
                      <div className="user-info">
                        <img src={post.user.avatar} alt={post.user.name} className="user-avatar" />
                        <div className="user-details">
                          <div className="user-name">
                            <h4>{post.user.name}</h4>
                            {post.user.verified && <span className="verified">✓</span>}
                          </div>
                          <span className="post-time">{post.time}</span>
                        </div>
                      </div>
                      <div className="post-type">
                        {post.type === 'music' && '🎵'}
                        {post.type === 'art' && '🎨'}
                        {post.type === 'photo' && '📸'}
                        {post.type === 'text' && '💭'}
                      </div>
                    </div>
                    
                    <div className="post-content">
                      <p>{post.content}</p>
                      {post.image && <img src={post.image} alt="Post" className="post-image" />}
                      {post.tags.length > 0 && (
                        <div className="post-tags">
                          {post.tags.map((tag, index) => (
                            <span key={index} className="tag">{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="post-actions">
                      <button 
                        className={`action-btn ${post.liked ? 'liked' : ''}`}
                        onClick={() => handleLike(post.id)}
                      >
                        ❤️ {post.likes}
                      </button>
                      <button className="action-btn">
                        💬 {post.comments}
                      </button>
                      <button className="action-btn">
                        🔄 {post.shares}
                      </button>
                      <button className="action-btn">
                        📤 Compartilhar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'trending' && (
              <div className="trending-content">
                <h3>🔥 Tendências da Semana</h3>
                <div className="trending-grid">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="trending-item">
                      <div className="trending-info">
                        <h4>{topic.tag}</h4>
                        <p>{topic.posts.toLocaleString()} posts</p>
                      </div>
                      <div className="trending-stats">
                        <span className="trend-up">{topic.trend}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'communities' && (
              <div className="communities-content">
                <h3>👥 Comunidades Recomendadas</h3>
                <div className="communities-grid">
                  {communities.map((community, index) => (
                    <div key={index} className="community-card">
                      <div className="community-image">{community.image}</div>
                      <div className="community-info">
                        <h4>{community.name}</h4>
                        <p>{community.members} membros</p>
                        <div className="community-status">
                          <span className={`status ${community.active ? 'active' : 'inactive'}`}>
                            {community.active ? '🟢 Ativo' : '🟡 Moderado'}
                          </span>
                        </div>
                      </div>
                      <button className="join-btn">Participar</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <div className="events-content">
                <h3>📅 Próximos Eventos</h3>
                <div className="events-list">
                  <div className="event-item">
                    <div className="event-date">
                      <span className="day">15</span>
                      <span className="month">DEZ</span>
                    </div>
                    <div className="event-info">
                      <h4>Festival de Arte Digital</h4>
                      <p>🌍 Online • 19:00 - 22:00</p>
                      <span className="attendees">234 participantes</span>
                    </div>
                    <button className="attend-btn">Participar</button>
                  </div>
                  
                  <div className="event-item">
                    <div className="event-date">
                      <span className="day">20</span>
                      <span className="month">DEZ</span>
                    </div>
                    <div className="event-info">
                      <h4>Workshop de Produção Musical</h4>
                      <p>📍 São Paulo • 14:00 - 18:00</p>
                      <span className="attendees">89 participantes</span>
                    </div>
                    <button className="attend-btn">Participar</button>
                  </div>
                </div>
              </div>
            )}
          </section>
          
          <aside className="community-sidebar">
            <div className="sidebar-section">
              <h3>🔥 Tópicos em Alta</h3>
              <div className="trending-topics">
                {trendingTopics.slice(0, 5).map((topic, index) => (
                  <div key={index} className="topic-item">
                    <span className="topic-tag">{topic.tag}</span>
                    <span className="topic-count">{topic.posts}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="sidebar-section">
              <h3>👤 Sugestões para Seguir</h3>
              <div className="suggested-users">
                {suggestedUsers.map((user, index) => (
                  <div key={index} className="user-suggestion">
                    <img src={user.avatar} alt={user.name} className="suggestion-avatar" />
                    <div className="suggestion-info">
                      <h4>{user.name}</h4>
                      <p>{user.category} • {user.followers} seguidores</p>
                    </div>
                    <button className="follow-btn">Seguir</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="sidebar-section">
              <h3>📊 Suas Estatísticas</h3>
              <div className="user-stats">
                <div className="stat-item">
                  <span className="stat-number">42</span>
                  <span className="stat-label">Posts</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">1.2k</span>
                  <span className="stat-label">Curtidas</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">234</span>
                  <span className="stat-label">Comentários</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Comunidade;