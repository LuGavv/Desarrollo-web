import React from 'react';
import PropTypes from 'prop-types';

const PokemonDetail = ({ pokemon, onInvoke, isInvoked }) => {
  return (
    <div className="pokemon-detail">
      <div className="pokemon-preview">
        <img 
          src={pokemon.image} 
          alt={pokemon.name}
          className="pokemon-image"
        />
      </div>

      <div className="pokemon-info">
        <div className="info-header">
          <div className="pokemon-id">#{String(pokemon.id).padStart(3, '0')}</div>
          <div className="pokemon-types">
            {pokemon.types.map(type => (
              <span key={type} className={`type-badge ${type}`}>
                {type}
              </span>
            ))}
          </div>
        </div>

        <div className="stats-grid">
          {pokemon.stats.map(stat => (
            <div key={stat.name} className="stat-item">
              <div className="stat-label">{stat.name}</div>
              <div className="stat-bar-container">
                <div 
                  className="stat-bar"
                  style={{ width: `${(stat.value / 255) * 100}%` }}
                >
                  <span className="stat-value">{stat.value}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pokemon-attributes">
          <div className="attribute">
            <span className="attribute-label">Altura</span>
            <span className="attribute-value">{pokemon.height / 10}m</span>
          </div>
          <div className="attribute">
            <span className="attribute-label">Peso</span>
            <span className="attribute-value">{pokemon.weight / 10}kg</span>
          </div>
        </div>

        <button
          className={`invoke-button ${isInvoked ? 'invoked' : ''} ${!pokemon.model ? 'disabled' : ''}`}
          onClick={() => onInvoke(pokemon)}
          disabled={isInvoked || !pokemon.model}
        >
          {!pokemon.model ? 'Modelo 3D no disponible' :
           isInvoked ? '¡Ya invocado!' : '¡Invocar!'}
        </button>
      </div>
    </div>
  );
};

PokemonDetail.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
    stats: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    })).isRequired,
    height: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired,
    model: PropTypes.string
  }).isRequired,
  onInvoke: PropTypes.func.isRequired,
  isInvoked: PropTypes.bool.isRequired
};

export default PokemonDetail;