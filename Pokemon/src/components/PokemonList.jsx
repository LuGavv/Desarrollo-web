import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PokemonCard from './PokemonCard';
import { fetchPokemons, fetchPokemonTypes } from '../services/api';

const PokemonList = ({ onPokemonSelect, onPokemonInvoke, invokedIds = [] }) => {
  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState('');
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);

  const LIMIT = 12;

  useEffect(() => {
    loadPokemons();
    loadTypes();
  }, [page, selectedType]);

  const loadPokemons = async () => {
    try {
      setLoading(true);
      setError(null);
      const offset = page * LIMIT;
      const data = await fetchPokemons(LIMIT, offset);
      setPokemons(prev => [...prev, ...data.pokemons]);
      setHasMore(!!data.next);
    } catch (err) {
      setError('Error al cargar Pokémon. ¡Inténtalo de nuevo!');
    } finally {
      setLoading(false);
    }
  };

  const loadTypes = async () => {
    try {
      const typeData = await fetchPokemonTypes();
      setTypes(typeData);
    } catch (err) {
      console.error('Error loading types:', err);
    }
  };

  const handleSelect = (pokemon) => {
    setSelectedPokemonId(pokemon.id);
    if (onPokemonSelect) onPokemonSelect(pokemon);
  };

  const handleInvoke = (pokemon) => {
    if (onPokemonInvoke) onPokemonInvoke(pokemon);
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="pokemon-container">
      <div className="filters">
        <select 
          value={selectedType} 
          onChange={(e) => setSelectedType(e.target.value)}
          className="type-filter"
        >
          <option value="">Todos los tipos</option>
          {types.map(type => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <div className="pokemon-grid">
        {pokemons.map(pokemon => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onSelect={handleSelect}
            onInvoke={handleInvoke}
            isSelected={pokemon.id === selectedPokemonId}
            isInvoked={Array.isArray(invokedIds) ? invokedIds.includes(pokemon.id) : false}
          />
        ))}
      </div>

      {loading && <div className="loading">Cargando Pokémon...</div>}
      
      {!loading && hasMore && (
        <button 
          onClick={loadMore}
          className="load-more disponible"
        >
          Cargar más Pokémon
        </button>
      )}
    </div>
  );
};

PokemonList.propTypes = {
  onPokemonSelect: PropTypes.func,
  onPokemonInvoke: PropTypes.func,
  invokedIds: PropTypes.arrayOf(PropTypes.number),
};

export default PokemonList;