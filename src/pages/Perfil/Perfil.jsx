import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import apiService from '../../services/api';
import { useNavigate } from 'react-router-dom';
import './Perfil.css';

function Perfil() {
  const [activeTab, setActiveTab] = useState('posts');
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [userActivities, setUserActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!apiService.isAuthenticated()) {
      navigate('/login');
      return;
    }
    loadUserData();
  }, [navigate]);

  const loadUserData = async () => {
    try {
      const user = apiService.getCurrentUser();
      
      if (!user) {
        navigate('/login');
        return;
      }
      
      // Carregar dados salvos do perfil apenas se existirem
      const savedProfile = localStorage.getItem('userProfile');
      const profileData = savedProfile ? JSON.parse(savedProfile) : {};
      
      // Verificar se é um perfil já personalizado ou se deve usar dados padrão
      const hasCustomProfile = savedProfile && (profileData.name || profileData.bio || profileData.avatar);
      
      setUserInfo({
        name: hasCustomProfile ? profileData.name : user.name || '',
        email: user.email || '',
        username: user.email ? user.email.split('@')[0] : 'usuario',
        bio: hasCustomProfile ? profileData.bio : '',
        location: hasCustomProfile ? profileData.location : '',
        avatar: hasCustomProfile ? profileData.avatar : null,
        joinDate: new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
      });
      
      // Tentar carregar posts, mas não falhar se der erro
      try {
        const posts = await apiService.getUserPosts();
        setUserPosts(posts || []);
      } catch (postError) {
        console.log('Erro ao carregar posts:', postError);
        setUserPosts([]);
      }
      
      // Carregar atividades do usuário
      await loadUserActivities();
      
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      // Usar dados padrão limpos se falhar
      setUserInfo({
        name: '',
        email: '',
        username: 'usuario',
        bio: '',
        location: '',
        avatar: null,
        joinDate: new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
      });
      setUserPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const loadUserActivities = async () => {
    try {
      if (apiService.isAuthenticated()) {
        // Tentar carregar atividades reais da API
        const activities = await apiService.getUserActivities();
        const formattedActivities = activities.map(activity => ({
          ...activity,
          date: new Date(activity.date)
        }));
        setUserActivities(formattedActivities);
      } else {
        // Usar atividades simuladas se não estiver logado
        const activities = [
          {
            id: 1,
            type: 'like',
            action: 'curtiu',
            target: 'Sunset Photography',
            targetType: 'post',
            author: 'Maria Silva',
            date: new Date(Date.now() - 2 * 60 * 60 * 1000),
            icon: '❤️'
          },
          {
            id: 2,
            type: 'follow',
            action: 'começou a seguir',
            target: 'João Santos',
            targetType: 'user',
            date: new Date(Date.now() - 5 * 60 * 60 * 1000),
            icon: '👥'
          }
        ];
        setUserActivities(activities);
      }
    } catch (error) {
      console.error('Erro ao carregar atividades:', error);
      // Usar atividades vazias em caso de erro
      setUserActivities([]);
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInMs = now - date;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInHours < 1) {
      return 'Agora há pouco';
    } else if (diffInHours < 24) {
      return `${diffInHours}h atrás`;
    } else if (diffInDays === 1) {
      return 'Ontem';
    } else if (diffInDays < 7) {
      return `${diffInDays} dias atrás`;
    } else {
      return date.toLocaleDateString('pt-BR');
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserInfo({...userInfo, avatar: e.target.result});
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfile = () => {
    // Salvar no localStorage por enquanto
    localStorage.setItem('userProfile', JSON.stringify({
      name: userInfo.name,
      bio: userInfo.bio,
      location: userInfo.location,
      avatar: userInfo.avatar
    }));
    setIsEditing(false);
    alert('Perfil atualizado com sucesso!');
  };

  const stats = {
    posts: userPosts.length,
    followers: 0,
    following: 0,
    likes: 0
  };

  const achievements = [
    { icon: '🏆', title: 'Artista Destaque', description: 'Mais de 1000 curtidas em uma publicação' },
    { icon: '🎵', title: 'Músico Ativo', description: '10 músicas publicadas' },
    { icon: '🎨', title: 'Criador Versátil', description: 'Publicou em 3 categorias diferentes' },
    { icon: '👥', title: 'Influenciador', description: 'Mais de 1000 seguidores' }
  ];

  if (loading) {
    return (
      <div className="home-layout">
        <Sidebar />
        <main className="main-content">
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <h2>Carregando perfil...</h2>
          </div>
        </main>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="home-layout">
        <Sidebar />
        <main className="main-content">
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <h2>Erro ao carregar perfil</h2>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="home-layout">
      <Sidebar />
      <main className="main-content">
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-cover">
              <div className="profile-avatar" onClick={() => isEditing && document.getElementById('avatar-input').click()}>
                <img src={userInfo.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop&crop=face"} alt="Perfil" />
                <div className="avatar-badge">✓</div>
                {isEditing && (
                  <div className="avatar-edit-overlay">
                    <span>📷</span>
                  </div>
                )}
                <input 
                  id="avatar-input"
                  type="file" 
                  accept="image/*" 
                  onChange={handleAvatarChange}
                  style={{display: 'none'}}
                />
              </div>
            </div>
            <div className="profile-info">
              <div className="profile-main">
                {isEditing ? (
                  <div className="edit-form">
                    <input 
                      type="text" 
                      value={userInfo.name} 
                      onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                      placeholder="Nome"
                      style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '10px', padding: '5px', border: '1px solid #ccc', borderRadius: '5px'}}
                    />
                    <textarea 
                      value={userInfo.bio} 
                      onChange={(e) => setUserInfo({...userInfo, bio: e.target.value})}
                      placeholder="Bio"
                      rows="3"
                      style={{width: '100%', marginBottom: '10px', padding: '5px', border: '1px solid #ccc', borderRadius: '5px'}}
                    />
                    <input 
                      type="text" 
                      value={userInfo.location} 
                      onChange={(e) => setUserInfo({...userInfo, location: e.target.value})}
                      placeholder="Localização"
                      style={{marginBottom: '10px', padding: '5px', border: '1px solid #ccc', borderRadius: '5px'}}
                    />
                  </div>
                ) : (
                  <div>
                    <h1>{userInfo.name}</h1>
                    <p className="username">@{userInfo.username}</p>
                    <p className="bio">{userInfo.bio}</p>
                    <div className="profile-meta">
                      <span>📧 {userInfo.email}</span>
                      <span>📍 {userInfo.location}</span>
                      <span>📅 Entrou em {userInfo.joinDate}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="profile-actions">
                <button className="edit-btn" onClick={() => isEditing ? saveProfile() : setIsEditing(true)}>
                  {isEditing ? '💾 Salvar' : '✏️ Editar Perfil'}
                </button>
                {isEditing && (
                  <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                    ❌ Cancelar
                  </button>
                )}
                <button className="share-btn">🔗 Compartilhar</button>
              </div>
            </div>
          </div>

          <div className="profile-stats">
            <div className="stat">
              <h3>{stats.posts}</h3>
              <span>Publicações</span>
            </div>
            <div className="stat">
              <h3>{stats.followers.toLocaleString()}</h3>
              <span>Seguidores</span>
            </div>
            <div className="stat">
              <h3>{stats.following}</h3>
              <span>Seguindo</span>
            </div>
            <div className="stat">
              <h3>{stats.likes.toLocaleString()}</h3>
              <span>Curtidas</span>
            </div>
          </div>

          <div className="profile-tabs">
            <button 
              className={`tab ${activeTab === 'posts' ? 'active' : ''}`}
              onClick={() => setActiveTab('posts')}
            >
              📝 Publicações ({userPosts.length})
            </button>
            <button 
              className={`tab ${activeTab === 'achievements' ? 'active' : ''}`}
              onClick={() => setActiveTab('achievements')}
            >
              🏆 Conquistas
            </button>
            <button 
              className={`tab ${activeTab === 'activities' ? 'active' : ''}`}
              onClick={() => setActiveTab('activities')}
            >
              📊 Atividades ({userActivities.length})
            </button>
            <button 
              className={`tab ${activeTab === 'about' ? 'active' : ''}`}
              onClick={() => setActiveTab('about')}
            >
              ℹ️ Sobre
            </button>
          </div>

          <div className="profile-content">
            {activeTab === 'posts' && (
              <div className="content-grid">
                {userPosts.length > 0 ? (
                  userPosts.map(post => (
                    <div key={post.id} className="content-item">
                      <div className="content-info">
                        <div className="content-type">
                          {post.category === 'musicas' && '🎵'}
                          {post.category === 'artes-digitais' && '🎨'}
                          {post.category === 'fotografias' && '📸'}
                          {post.category === 'filmes' && '🎬'}
                          {post.category === 'obras' && '🖼️'}
                        </div>
                        <h4>{post.title}</h4>
                        <p>{post.description}</p>
                        <div className="post-meta">
                          <span>📅 {new Date(post.created_at).toLocaleDateString('pt-BR')}</span>
                          <span>👁️ {post.visibility}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ textAlign: 'center', padding: '50px', gridColumn: '1 / -1' }}>
                    <h3>Nenhuma publicação ainda</h3>
                    <p>Comece criando seu primeiro post!</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="achievements-grid">
                {achievements.map((achievement, index) => (
                  <div key={index} className="achievement-item">
                    <div className="achievement-icon">{achievement.icon}</div>
                    <h4>{achievement.title}</h4>
                    <p>{achievement.description}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'activities' && (
              <div className="activities-section">
                <div className="activities-header">
                  <h3>📊 Suas Atividades Recentes</h3>
                  <p>Acompanhe suas curtidas, seguidores e interações</p>
                </div>
                
                <div className="activities-stats">
                  <div className="activity-stat">
                    <div className="stat-icon">❤️</div>
                    <div className="stat-info">
                      <h4>{userActivities.filter(a => a.type === 'like').length}</h4>
                      <span>Curtidas dadas</span>
                    </div>
                  </div>
                  <div className="activity-stat">
                    <div className="stat-icon">👥</div>
                    <div className="stat-info">
                      <h4>{userActivities.filter(a => a.type === 'follow').length}</h4>
                      <span>Pessoas seguidas</span>
                    </div>
                  </div>
                  <div className="activity-stat">
                    <div className="stat-icon">📈</div>
                    <div className="stat-info">
                      <h4>{userActivities.length}</h4>
                      <span>Atividades totais</span>
                    </div>
                  </div>
                </div>

                <div className="activities-timeline">
                  {userActivities.length > 0 ? (
                    userActivities.map(activity => (
                      <div key={activity.id} className="activity-item">
                        <div className="activity-icon">{activity.icon}</div>
                        <div className="activity-content">
                          <div className="activity-main">
                            <span className="activity-text">
                              Você <strong>{activity.action}</strong> 
                              {activity.targetType === 'post' ? (
                                <>
                                  <span className="activity-target"> "{activity.target}"</span>
                                  {activity.author && <span className="activity-author"> de {activity.author}</span>}
                                </>
                              ) : (
                                <span className="activity-target"> {activity.target}</span>
                              )}
                            </span>
                          </div>
                          <div className="activity-time">
                            {formatTimeAgo(new Date(activity.date))}
                          </div>
                        </div>
                        <div className="activity-actions">
                          {activity.targetType === 'post' && (
                            <button className="activity-btn">👁️ Ver post</button>
                          )}
                          {activity.targetType === 'user' && (
                            <button className="activity-btn">👤 Ver perfil</button>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-activities">
                      <h4>Nenhuma atividade ainda</h4>
                      <p>Comece curtindo posts e seguindo outros usuários!</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="about-section">
                <div className="about-card">
                  <h3>📊 Estatísticas</h3>
                  <div className="stats-detailed">
                    <div className="stat-item">
                      <span className="stat-label">Total de visualizações</span>
                      <span className="stat-value">0</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Média de curtidas</span>
                      <span className="stat-value">0</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Engajamento</span>
                      <span className="stat-value">0%</span>
                    </div>
                  </div>
                </div>
                <div className="about-card">
                  <h3>🎯 Interesses</h3>
                  <div className="interests-tags">
                    <span className="tag">Música Eletrônica</span>
                    <span className="tag">Arte Digital</span>
                    <span className="tag">Fotografia</span>
                    <span className="tag">Design</span>
                    <span className="tag">Tecnologia</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Perfil;