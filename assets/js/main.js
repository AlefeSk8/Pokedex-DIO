const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const detailsModal = document.getElementById("pokemonListDetails");

const maxRecords = 151;
const limit = 10;
let offset = 0;

function loadPokemonItems(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    pokemonList.innerHTML += pokemons
      .map(
        (pokemon) => `
            <li class="pokemon ${
              pokemon.type
            }" ontouch="requestPokemonDetail(${
          pokemon.number
        })" onclick='requestPokemonDetail(${pokemon.number})'>
                <div class="pokemonIdentity">
                  <span class="name">${pokemon.name}</span>
                  <span class="number">#${pokemon.number}</span>
                </div>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types
                          .map(
                            (type) => `<li class="type ${type}">${type}</li>`
                          )
                          .join("")}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">       
                </div>
            </li>
        `
      )
      .join("");
  });
}

function requestPokemonDetail(number) {
  pokeApi.getPokemonDetailsForModal(number).then((pokemonDetail = []) => {
    detailsModal.innerHTML = `
        <li class="pokemonOpen ${pokemonDetail.type}">
            <span class="nameOpen">${pokemonDetail.name}</span>
            <div id="divCloseButton">
                <span>#${pokemonDetail.number}</span>
                <button class="closeButton" onclick="closeModal()" ontouch="closeModal()">X</button>
            </div>

            <div class="typesContainer">
                <div class="types">
                <span>Types:</span>
                ${pokemonDetail.types
                  .map(
                    (type) => `<span class="openType ${type}">${type}</span>`
                  )
                  .join("")}
                </span>
                </div>
            </div>
        
            <div class="divSkills">
                <div class="skills"> 
                    <span>Skills:</span>                
                    <span class="skillOpen ${pokemonDetail.type}">${
                    pokemonDetail.skill1
                    }</span>
                    <span class="skillOpen ${pokemonDetail.type}">${
                    pokemonDetail.skill2
                    }</span>
                </div>
            </div>

            <div class="pokemonImageOpenContainer">
                <img class="pokemonImage" src="${pokemonDetail.photo}" 
                alt="${pokemonDetail.name}" />
            </div>

            <div class="attributesContainer">
                <h3 class="attributesHeader">Attributes:</h3>
                <div class="attributesDiv">
                <div class="innerAttribute">
                    <span>Hp:</span>
                    <span>${pokemonDetail.statValueHp}</span>
                </div>

                <div class="innerAttribute">
                    <span>ATK:</span>
                    <span>${pokemonDetail.statValueAtk}</span>
                </div>

                <div class="innerAttribute">
                    <span>DEF:</span>
                    <span>${pokemonDetail.statValueDef}</span>
                </div>

                <div class="innerAttribute">
                    <span>Special-ATK:</span>
                    <span>${pokemonDetail.statValueSatk}</span>
                </div>

                <div class="innerAttribute">
                    <span>Special-DEF:</span>
                    <span>${pokemonDetail.statValueSdef}</span>
                </div>

                <div class="innerAttribute">
                    <span>Speed:</span>
                    <span>${pokemonDetail.statValueSpd}</span>
                </div>
                </div>
            </div>
        </li>
        `;
  });
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordNextPage = offset + limit;

  if (qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItems(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItems(offset, limit);
  }
});
