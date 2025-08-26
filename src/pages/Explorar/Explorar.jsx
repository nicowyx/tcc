import Sidebar from '../../components/Sidebar/Sidebar';
import SearchBar from '../../components/SearchBar/SearchBar';
import './Explorar.css';

function Explorar() {
  const posts = [
    { id: 1, image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=400&q=80', likes: 1234, type: 'image' },
    { id: 2, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80', likes: 856, type: 'image' },
    { id: 3, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=400&q=80', likes: 2341, type: 'video' },
    { id: 4, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80', likes: 567, type: 'image' },
    { id: 5, image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=80', likes: 1789, type: 'image' },
    { id: 6, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80', likes: 934, type: 'video' },
    { id: 7, image: 'https://images.unsplash.com/photo-1494790108755-2616c9c0e8e0?auto=format&fit=crop&w=400&q=80', likes: 1456, type: 'image' },
    { id: 8, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', likes: 678, type: 'image' },
    { id: 9, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80', likes: 2103, type: 'video' },
    { id: 10, image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=400&q=80', likes: 1234, type: 'image' },
    { id: 11, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80', likes: 789, type: 'image' },
    { id: 12, image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=400&q=80', likes: 1567, type: 'video' },
  ];

  return (
    <div className="explorar-layout">
      <Sidebar />
      <main className="main-content">
        <div className="explorar-header">
          <h2 className="explorar-title">Explorar</h2>
          <SearchBar />
        </div>
        
        <div className="explorar-grid">
          {posts.map((post) => (
            <div key={post.id} className="explorar-item">
              <img src={post.image} alt={`Post ${post.id}`} />
              <div className="explorar-overlay">
                <div className="explorar-stats">
                  <span className="likes">❤️ {post.likes}</span>
                  {post.type === 'video' && <span className="video-icon">▶️</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Explorar;