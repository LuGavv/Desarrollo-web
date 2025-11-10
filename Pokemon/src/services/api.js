const BASE_URL = 'https://pokeapi.co/api/v2';

// Fetch lista de Pokemon con paginación
export async function fetchPokemons(limit = 20, offset = 0) {
  try {
    const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
    if (!response.ok) throw new Error('Error al cargar Pokémon');
    const data = await response.json();
    
    // Obtener detalles de cada Pokémon
    const pokemonDetails = await Promise.all(
      data.results.map(async (pokemon) => {
        const details = await fetchPokemonDetails(pokemon.name);
        return details;
      })
    );

    return {
      pokemons: pokemonDetails,
      next: data.next,
      previous: data.previous,
      count: data.count
    };
  } catch (error) {
    console.error('Error fetching pokemon list:', error);
    throw error;
  }
}

// Fetch detalles de un Pokemon específico
export async function fetchPokemonDetails(nameOrId) {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
    if (!response.ok) throw new Error(`Error al cargar detalles de ${nameOrId}`);
    const data = await response.json();
    
    const modelUrl = `/models/${data.name}.glb`;

    // Intentar verificar si el archivo existe en /public/models usando HEAD
    let hasModel = false;
    try {
      const head = await fetch(modelUrl, { method: 'HEAD' });
      hasModel = head && head.ok;
    } catch (err) {
      // Si HEAD falla (algunos servidores no permiten), intentar un GET rápido
      try {
        const get = await fetch(modelUrl, { method: 'GET' });
        hasModel = get && get.ok;
      } catch (err2) {
        hasModel = false;
      }
    }

    return {
      id: data.id,
      name: data.name,
      image: data.sprites.other['official-artwork'].front_default,
      types: data.types.map(type => type.type.name),
      stats: data.stats.map(stat => ({
        name: stat.stat.name,
        value: stat.base_stat
      })),
      height: data.height,
      weight: data.weight,
      model: modelUrl,
      hasModel
    };
  } catch (error) {
    console.error(`Error fetching pokemon ${nameOrId}:`, error);
    throw error;
  }
}

// Fetch tipos de Pokemon para filtros
export async function fetchPokemonTypes() {
  try {
    const response = await fetch(`${BASE_URL}/type`);
    if (!response.ok) throw new Error('Error al cargar tipos de Pokémon');
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching pokemon types:', error);
    throw error;
  }
}
