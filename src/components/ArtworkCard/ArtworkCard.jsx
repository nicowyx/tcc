import './ArtworkCard.css';

function ArtworkCard({ cover, title, artist }) {
  return (
    <div className="artwork-card">
      <img src={cover} alt={title} className="artwork-cover" />
      <div className="artwork-info">
        <span className="artwork-title">{title}</span>
        {artist && <span className="artwork-artist">{artist}</span>}
      </div>
    </div>
  );
}

export default ArtworkCard; 