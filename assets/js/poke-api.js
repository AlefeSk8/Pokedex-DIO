const pokeApi = {};

function convertResponseToPokemonDetail(pokeDetail) {
  const pokemon = {
    number: pokeDetail.id,
    name: pokeDetail.name,
    photo: pokeDetail.sprites.other.dream_world.front_default,
    types: pokeDetail.types.map((typeSlot) => typeSlot.type.name),
    type: pokeDetail.types[0].type.name,
    skills: pokeDetail.abilities.map((skillsSlot) => skillsSlot.ability.name),
    stats: {
      hp: pokeDetail.stats[0].base_stat,
      atk: pokeDetail.stats[1].base_stat,
      def: pokeDetail.stats[2].base_stat,
      satk: pokeDetail.stats[3].base_stat,
      sdef: pokeDetail.stats[4].base_stat,
      spd: pokeDetail.stats[5].base_stat,
    },
  };

  [pokemon.skill1, pokemon.skill2] = pokemon.skills;
  [
    pokemon.statValueHp,
    pokemon.statValueAtk,
    pokemon.statValueDef,
    pokemon.statValueSatk,
    pokemon.statValueSdef,
    pokemon.statValueSpd,
  ] = Object.values(pokemon.stats);

  return pokemon;
}

pokeApi.getPokemons = async (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  const res = await fetch(url);
  const { results: pokemons } = await res.json();
  
  const detailRequests = pokemons.map(pokeApi.getPokemonDetail);
  const pokemonsDetailsArray = await Promise.all(detailRequests);
  return pokemonsDetailsArray;
};

pokeApi.getPokemonDetail = async (pokemon) => {
  const response = await fetch(pokemon.url);
  const pokeDetail = await response.json();
  return convertResponseToPokemonDetail(pokeDetail);
};

pokeApi.getPokemonDetailsForModal = async (pokemonNumber) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/`;
  const response = await fetch(url);
  const pokeDetail = await response.json();
  const pokemonDetail = convertResponseToPokemonDetail(pokeDetail);

  openModal();

  return pokemonDetail;
};
