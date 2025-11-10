// Mapeo de tipos de Pokémon a efectos de sonido (fallback por tipo)
const TYPE_SOUNDS = {
  normal: '/sounds/normal.mp3',
  fire: '/sounds/fire.mp3',
  water: '/sounds/water.mp3',
  electric: '/sounds/electric.mp3',
  grass: '/sounds/grass.mp3',
  ice: '/sounds/ice.mp3',
  fighting: '/sounds/fighting.mp3',
  poison: '/sounds/poison.mp3',
  ground: '/sounds/ground.mp3',
  flying: '/sounds/flying.mp3',
  psychic: '/sounds/psychic.mp3',
  bug: '/sounds/bug.mp3',
  rock: '/sounds/rock.mp3',
  ghost: '/sounds/ghost.mp3',
  dragon: '/sounds/dragon.mp3',
  dark: '/sounds/dark.mp3',
  steel: '/sounds/steel.mp3',
  fairy: '/sounds/fairy.mp3',
};

// Reproduce un sonido específico para el Pokémon si existe (/sounds/<name>.mp3).
// Si no existe, usa el sonido por tipo. Si todo falla, intenta /sounds/summon.mp3.
export const playPokemonSound = (pokemon) => {
  if (!pokemon) return;
  const name = (pokemon.name || '').toLowerCase();
  const primaryType = (pokemon.types && pokemon.types[0]) || 'normal';

  const nameSound = `/sounds/${name}.mp3`;
  const typeSound = TYPE_SOUNDS[primaryType] || '/sounds/normal.mp3';
  const summonSound = '/sounds/summon.mp3';

  // Helper to attempt playing a sound and fallback on failure
  const tryPlay = (src) => {
    return new Promise((resolve, reject) => {
      const audio = new Audio(src);
      audio.volume = 0.8;
      // On success resolve
      audio.oncanplaythrough = () => {
        audio.play().then(resolve).catch(reject);
      };
      audio.onerror = () => reject(new Error(`Audio load error: ${src}`));
      // Start loading
      audio.load();
    });
  };

  // Try name-specific sound first, then type, then summon fallback
  tryPlay(nameSound)
    .catch(() => tryPlay(typeSound))
    .catch(() => tryPlay(summonSound))
    .catch((err) => {
      // Final silent failure: log for debugging
      console.warn('No se pudo reproducir ningún sonido de invocación:', err);
    });
};