import { useState, useRef } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import SearchBar from '../../components/SearchBar/SearchBar';
import './Publicar.css';

function Publicar() {
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    genre: '',
    tags: [],
    file: null,
    thumbnail: null,
    visibility: 'public',
    allowComments: true,
    allowDownloads: false,
    monetization: false,
    price: '',
    collaborators: [],
    scheduledDate: '',
    location: ''
  });
  
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [currentTag, setCurrentTag] = useState('');
  const fileInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);

  const categories = [
    { id: 'musicas', name: 'Músicas', icon: '🎵', description: 'Faixas, álbuns e composições' },
    { id: 'filmes', name: 'Filmes', icon: '🎬', description: 'Vídeos, curtas e documentários' },
    { id: 'artes-digitais', name: 'Artes Digitais', icon: '🎨', description: 'Ilustrações e designs digitais' },
    { id: 'fotografias', name: 'Fotografias', icon: '📸', description: 'Fotos e ensaios fotográficos' },
    { id: 'obras', name: 'Obras', icon: '🖼️', description: 'Pinturas e obras físicas' }
  ];

  const genresByCategory = {
    'musicas': ['Rock', 'Pop', 'Jazz', 'Clássica', 'Eletrônica', 'Hip Hop', 'Reggae', 'Country', 'Blues', 'Folk'],
    'filmes': ['Drama', 'Comédia', 'Ação', 'Terror', 'Ficção Científica', 'Romance', 'Documentário', 'Animação', 'Thriller', 'Aventura'],
    'artes-digitais': ['Ilustração', 'Design Gráfico', '3D', 'Pixel Art', 'Concept Art', 'Digital Painting', 'Motion Graphics', 'UI/UX', 'Arte Vetorial', 'NFT'],
    'fotografias': ['Retrato', 'Paisagem', 'Street', 'Macro', 'Natureza', 'Arquitetura', 'Moda', 'Esporte', 'Documental', 'Fine Art'],
    'obras': ['Pintura', 'Escultura', 'Desenho', 'Gravura', 'Aquarela', 'Óleo', 'Acrílica', 'Pastel', 'Carvão', 'Arte Abstrata']
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = (file) => {
    setFormData(prev => ({ ...prev, file }));
    
    // Simular upload com progress
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Preview do arquivo
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    } else if (file.type.startsWith('video/')) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Simular publicação
    setTimeout(() => {
      setIsUploading(false);
      alert('🎉 Conteúdo publicado com sucesso!');
      // Reset form
      setFormData({
        title: '', description: '', category: '', genre: '', tags: [], file: null,
        thumbnail: null, visibility: 'public', allowComments: true,
        allowDownloads: false, monetization: false, price: '',
        collaborators: [], scheduledDate: '', location: ''
      });
      setPreview(null);
      setActiveStep(1);
    }, 2000);
  };

  const nextStep = () => {
    if (activeStep < 3) setActiveStep(activeStep + 1);
  };

  const prevStep = () => {
    if (activeStep > 1) setActiveStep(activeStep - 1);
  };

  return (
    <div className="home-layout">
      <Sidebar />
      <main className="main-content">
        <div className="publish-header">
          <div className="header-content">
            <h2 className="page-title">✨ Publicar Conteúdo</h2>
            <p className="page-subtitle">Compartilhe sua criatividade com o mundo</p>
          </div>
          <SearchBar />
        </div>

        <div className="publish-steps">
          <div className={`step ${activeStep >= 1 ? 'active' : ''} ${activeStep > 1 ? 'completed' : ''}`}>
            <div className="step-number">1</div>
            <span>Conteúdo</span>
          </div>
          <div className={`step ${activeStep >= 2 ? 'active' : ''} ${activeStep > 2 ? 'completed' : ''}`}>
            <div className="step-number">2</div>
            <span>Detalhes</span>
          </div>
          <div className={`step ${activeStep >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <span>Configurações</span>
          </div>
        </div>
        
        <div className="publish-container">
          <form onSubmit={handleSubmit} className="publish-form">
            {activeStep === 1 && (
              <div className="step-content">
                <h3>📁 Upload do Arquivo</h3>
                
                <div 
                  className={`upload-zone ${dragActive ? 'drag-active' : ''}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {preview ? (
                    <div className="preview-container">
                      {formData.file?.type.startsWith('image/') && (
                        <img src={preview} alt="Preview" className="preview-image" />
                      )}
                      {formData.file?.type.startsWith('video/') && (
                        <video src={preview} controls className="preview-video" />
                      )}
                      {formData.file?.type.startsWith('audio/') && (
                        <div className="audio-preview">
                          <div className="audio-icon">🎵</div>
                          <p>{formData.file.name}</p>
                        </div>
                      )}
                      <button type="button" className="change-file" onClick={(e) => {
                        e.stopPropagation();
                        setPreview(null);
                        setFormData(prev => ({ ...prev, file: null }));
                      }}>Alterar Arquivo</button>
                    </div>
                  ) : (
                    <div className="upload-placeholder">
                      <div className="upload-icon">📁</div>
                      <h4>Arraste seu arquivo aqui</h4>
                      <p>ou clique para selecionar</p>
                      <div className="supported-formats">
                        <span>Imagens</span> • <span>Vídeos</span> • <span>Áudios</span> • <span>Documentos</span>
                      </div>
                    </div>
                  )}
                  
                  {isUploading && (
                    <div className="upload-progress">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${uploadProgress}%` }}></div>
                      </div>
                      <span>{uploadProgress}%</span>
                    </div>
                  )}
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
                  style={{ display: 'none' }}
                />

                <div className="category-selection">
                  <h4>🎯 Selecione a Categoria</h4>
                  <div className="categories-grid">
                    {categories.map(cat => (
                      <div key={cat.id}
                        className={`category-card ${formData.category === cat.id ? 'selected' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, category: cat.id }))}
                      >
                        <div className="category-icon">{cat.icon}</div>
                        <h5>{cat.name}</h5>
                        <p>{cat.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {formData.category && (
                  <div className="genre-selection">
                    <h4>🎭 Selecione o Gênero</h4>
                    <div className="genres-grid">
                      {genresByCategory[formData.category]?.map(genre => (
                        <div 
                          key={genre}
                          className={`genre-card ${formData.genre === genre ? 'selected' : ''}`}
                          onClick={() => setFormData(prev => ({ ...prev, genre }))}
                        >
                          {genre}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeStep === 2 && (
              <div className="step-content">
                <h3>📝 Informações do Conteúdo</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="title">📌 Título *</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Digite um título atrativo"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="description">📄 Descrição</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Conte a história por trás da sua criação..."
                    rows="5"
                  />
                  <div className="char-count">{formData.description.length}/500</div>
                </div>

                <div className="form-group">
                  <label>🏷️ Tags</label>
                  <div className="tags-input">
                    <input
                      type="text"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      placeholder="Adicione tags relevantes"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <button type="button" onClick={addTag} className="add-tag-btn">Adicionar</button>
                  </div>
                  <div className="tags-list">
                    {formData.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        #{tag}
                        <button type="button" onClick={() => removeTag(tag)}>×</button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="location">📍 Localização</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Onde foi criado?"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeStep === 3 && (
              <div className="step-content">
                <h3>⚙️ Configurações de Publicação</h3>
                
                <div className="settings-grid">
                  <div className="setting-card">
                    <h4>👁️ Visibilidade</h4>
                    <div className="radio-group">
                      <label className="radio-option">
                        <input
                          type="radio"
                          name="visibility"
                          value="public"
                          checked={formData.visibility === 'public'}
                          onChange={handleInputChange}
                        />
                        <span className="radio-custom"></span>
                        <div>
                          <strong>Público</strong>
                          <p>Visível para todos</p>
                        </div>
                      </label>
                      <label className="radio-option">
                        <input
                          type="radio"
                          name="visibility"
                          value="unlisted"
                          checked={formData.visibility === 'unlisted'}
                          onChange={handleInputChange}
                        />
                        <span className="radio-custom"></span>
                        <div>
                          <strong>Não listado</strong>
                          <p>Apenas com link</p>
                        </div>
                      </label>
                      <label className="radio-option">
                        <input
                          type="radio"
                          name="visibility"
                          value="private"
                          checked={formData.visibility === 'private'}
                          onChange={handleInputChange}
                        />
                        <span className="radio-custom"></span>
                        <div>
                          <strong>Privado</strong>
                          <p>Apenas você</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="setting-card">
                    <h4>💬 Interações</h4>
                    <div className="checkbox-group">
                      <label className="checkbox-option">
                        <input
                          type="checkbox"
                          name="allowComments"
                          checked={formData.allowComments}
                          onChange={handleInputChange}
                        />
                        <span className="checkbox-custom"></span>
                        Permitir comentários
                      </label>
                      <label className="checkbox-option">
                        <input
                          type="checkbox"
                          name="allowDownloads"
                          checked={formData.allowDownloads}
                          onChange={handleInputChange}
                        />
                        <span className="checkbox-custom"></span>
                        Permitir downloads
                      </label>
                    </div>
                  </div>

                  <div className="setting-card">
                    <h4>💰 Monetização</h4>
                    <label className="checkbox-option">
                      <input
                        type="checkbox"
                        name="monetization"
                        checked={formData.monetization}
                        onChange={handleInputChange}
                      />
                      <span className="checkbox-custom"></span>
                      Conteúdo pago
                    </label>
                    {formData.monetization && (
                      <div className="price-input">
                        <label>Preço (R$)</label>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          placeholder="0,00"
                          min="0"
                          step="0.01"
                        />
                      </div>
                    )}
                  </div>

                  <div className="setting-card">
                    <h4>📅 Agendamento</h4>
                    <input
                      type="datetime-local"
                      name="scheduledDate"
                      value={formData.scheduledDate}
                      onChange={handleInputChange}
                    />
                    <p className="help-text">Deixe vazio para publicar imediatamente</p>
                  </div>
                </div>
              </div>
            )}

            <div className="form-actions">
              {activeStep > 1 && (
                <button type="button" onClick={prevStep} className="btn-secondary">
                  ← Voltar
                </button>
              )}
              
              {activeStep < 3 ? (
                <button 
                  type="button" 
                  onClick={nextStep} 
                  className="btn-primary"
                  disabled={activeStep === 1 && (!formData.file || !formData.category)}
                >
                  Próximo →
                </button>
              ) : (
                <button 
                  type="submit" 
                  className="btn-publish"
                  disabled={isUploading || !formData.title}
                >
                  {isUploading ? '🚀 Publicando...' : '🎉 Publicar Agora'}
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Publicar;