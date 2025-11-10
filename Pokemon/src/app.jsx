import React, { useState } from "react";
import PokemonList from "./components/PokemonList";
import "./styles.css";

export default function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  // Keep full invoked pokemon objects so we can render them in a separate section
  const [invokedPokemons, setInvokedPokemons] = useState([]);

  const handleSelect = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleInvoke = (pokemon) => {
    // Toggle invocation: add full object if not present, remove by id if present
    setInvokedPokemons(prev => {
      if (prev.some(p => p.id === pokemon.id)) {
        return prev.filter(p => p.id !== pokemon.id);
      }
      return [...prev, pokemon];
    });
  };

  return (
  <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Pokémon Invocator</h1>
          {selectedPokemon && (
            <div className="selected-info">
              <h2 className="pokemon-name">{selectedPokemon.name}</h2>
              <p className="pokemon-description">#{String(selectedPokemon.id).padStart(3, '0')} — {selectedPokemon.types.join(' / ')}</p>
            </div>
          )}
        </div>
      </header>

      <main className="main-content">
        <section className="pokemon-section">
          <PokemonList onPokemonSelect={handleSelect} onPokemonInvoke={handleInvoke} invokedIds={invokedPokemons.map(p => p.id)} />
        </section>

        <aside className="detail-section">
          {selectedPokemon ? (
            <div className="pokemon-detail">
              <img src={selectedPokemon.image} alt={selectedPokemon.name} className="pokemon-image" />
              <div className="pokemon-info">
                <div className="type-badges">
                  {selectedPokemon.types.map(t => <span key={t} className={`type-badge ${t}`}>{t}</span>)}
                </div>
                <div className="pokemon-attributes">
                  <div className="attribute"><span className="attribute-label">Altura</span><span className="attribute-value">{selectedPokemon.height/10}m</span></div>
                  <div className="attribute"><span className="attribute-label">Peso</span><span className="attribute-value">{selectedPokemon.weight/10}kg</span></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="pokemon-detail empty">Selecciona una carta para ver detalles</div>
          )}
        </aside>
      </main>

      <section className="invoked-section">
        <h3 className="section-title">Cartas invocadas</h3>
        <div className="invoked-grid">
          {invokedPokemons.length === 0 ? (
            <p className="muted">Aún no has invocado ninguna carta.</p>
          ) : (
            invokedPokemons.map(p => (
              <div key={p.id} className="invoked-card">
                {p.hasModel ? (
                  <model-viewer
                    src={p.model}
                    alt={`Modelo 3D de ${p.name}`}
                    auto-rotate
                    camera-controls
                    interaction-prompt="auto"
                    style={{ width: '220px', height: '160px' }}
                  />
                ) : (
                  <img src={p.image} alt={p.name} className="invoked-thumb" />
                )}
                <div className="invoked-name">{p.name}</div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
