import React from 'react';
import PropTypes from 'prop-types';

const InvokedPokemon = ({ pokemon }) => {
  return (
    <div className="invoked-pokemon">
      <h2 className="section-title">Pokémon Invocado</h2>
      <div className="model-container">
        <div className="model-card">
          <h3 className="model-title">{pokemon.name}</h3>
          <model-viewer
            src={pokemon.model}
            alt={`Modelo 3D de ${pokemon.name}`}
            auto-rotate
            camera-controls
            ar
            ar-modes="webxr scene-viewer quick-look"
            environment-image="neutral"
            shadow-intensity="1"
            camera-orbit="45deg 55deg 2.5m"
            exposure="0.8"
            interaction-prompt="auto"
            class="pokemon-model"
          ></model-viewer>
        </div>
      </div>
    </div>
  );
};

InvokedPokemon.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired
  }).isRequired
};

export default InvokedPokemon;