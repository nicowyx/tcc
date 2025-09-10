import { useState, useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';

function SearchBar() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  return (
    <div className={`search-bar${open ? ' open' : ''}`}> 
      <button className="search-icon" onClick={() => setOpen((v) => !v)}>
        <FaSearch />
      </button>
      {open && (
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Buscar por gêneros..."
          onBlur={() => setOpen(false)}
        />
      )}
    </div>
  );
}

export default SearchBar; 