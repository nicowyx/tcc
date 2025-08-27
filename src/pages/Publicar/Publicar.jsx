import { useState } from 'react';
import './Publicar.css';
import Sidebar from '../../components/Sidebar/Sidebar';

const Publicar = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, description, category, file });
    // Aqui você faria o upload para o servidor
  };

  return (
    <div className="publicar-container">
      <Sidebar />
      <div className="publicar-content">
        <h2>Publicar Nova Obra</h2>
        
        <form onSubmit={handleSubmit} className="publicar-form">
          <div className="form-group">
            <label>Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o título da sua obra"
              required
            />
          </div>

          <div className="form-group">
            <label>Categoria</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Selecione uma categoria</option>
              <option value="musicas">Música</option>
              <option value="filmes">Filme</option>
              <option value="artes-digitais">Arte Digital</option>
              <option value="fotografias">Fotografia</option>
              <option value="obras">Obra de Arte</option>
            </select>
          </div>

          <div className="form-group">
            <label>Arquivo</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              accept="image/*,video/*,audio/*"
              required
            />
          </div>

          <div className="form-group">
            <label>Descrição</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva sua obra..."
              rows="4"
            />
          </div>

          <button type="submit" className="submit-btn">
            Publicar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Publicar;