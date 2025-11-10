import React from 'react';
import PropTypes from 'prop-types';
import { playPokemonSound } from '../utils/sounds';

const PokemonCard = ({ pokemon, onSelect, onInvoke, isSelected, isInvoked }) => {
  const typeColors = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC'
  };

  return (
    <div 
      className={`pokemon-card ${isSelected ? 'selected' : ''} ${pokemon.hasModel ? 'with-model' : ''}`}
      onClick={() => onSelect(pokemon)}
      role="button"
      tabIndex={0}
    >
      <img 
        src={pokemon.image} 
        alt={`Pokémon ${pokemon.name}`}
        className="pokemon-image"
      />
      <h3 className="pokemon-name">{pokemon.name}</h3>
      <div className="type-badges">
        {pokemon.types.map((type) => (
          <span
            key={type}
            className="type-badge"
            style={{ backgroundColor: typeColors[type] || '#777' }}
          >
            {type}
          </span>
        ))}
      </div>

      <button
        className={`invoke-button${isInvoked ? ' invoked' : ''}`}
        onClick={(e) => { e.stopPropagation(); if (!isInvoked) playPokemonSound(pokemon); onInvoke(pokemon); }}
        style={isInvoked ? { background: 'linear-gradient(135deg, #cc0000, #ff4444)', color: 'white' } : {}}
        disabled={false}
      >
        {isInvoked ? 'Invocado' : 'Invocar'}
      </button>
    </div>
  );
};

PokemonCard.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
    stats: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired
      })
    ).isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  onInvoke: PropTypes.func,
  isSelected: PropTypes.bool,
  isInvoked: PropTypes.bool
};

export default PokemonCard;