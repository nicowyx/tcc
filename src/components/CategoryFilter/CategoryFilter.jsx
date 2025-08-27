import { useState } from 'react';
import './CategoryFilter.css';

const CategoryFilter = ({ categories, onCategoryChange, categoryColors = {} }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    onCategoryChange(category);
  };

  return (
    <div className="category-filter">
      <button
        className={`category-btn ${activeCategory === 'all' ? 'active' : ''}`}
        onClick={() => handleCategoryClick('all')}
      >
        Todos
      </button>
      {categories.map(category => (
        <button
          key={category}
          className={`category-btn ${activeCategory === category ? 'active' : ''}`}
          onClick={() => handleCategoryClick(category)}
          style={activeCategory === category && categoryColors[category] ? {
            background: categoryColors[category],
            borderColor: categoryColors[category]
          } : {}}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;