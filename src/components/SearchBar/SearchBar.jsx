import { useState, useRef, useEffect } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch, placeholder = "Buscar..." }) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className={`search-bar${open ? ' open' : ''}`}> 
      <button className="search-icon" onClick={() => setOpen((v) => !v)}>
        🔍
      </button>
      {open && (
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder={placeholder}
            value={searchTerm}
            onChange={handleInputChange}
            onBlur={() => setTimeout(() => setOpen(false), 200)}
          />
        </form>
      )}
    </div>
  );
}

export default SearchBar; 