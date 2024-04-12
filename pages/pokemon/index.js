var array = [];
let atual = 0;

function changePageTitle(title) {
  document.title = title
}

function generateInfoSection(src, pokemonName) {
  const h2 = document.createElement('h2')
  h2.id = "info-pokemon-label"
  h2.textContent = `Informações sobre ${pokemonName}`

  const img = document.querySelector('img')
  img.src = src
  img.alt = `Imagem do pokemon ${pokemonName}`

  const section = document.querySelector('#info-pokemon')

  section.appendChild(h2)
  section.appendChild(img)
}

async function getPokemonData(name) {
  try {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)

    const jsonData = await data.json()

    array = Object.values(jsonData.sprites).filter((word) => typeof word == "string")

    generateInfoSection(array[0], name)

  } catch (error) {
    console.error(error)
  }
}

function getSearchParams() {
  if (!location.search) {
    return
  }

  const urlSearchParams = new URLSearchParams(location.search)

  const pokemonName = urlSearchParams.get('name')

  changePageTitle(`Pagina do ${pokemonName}`)
  getPokemonData(pokemonName)
}

document.addEventListener('DOMContentLoaded', function () {
  getSearchParams()
})


const img = document.querySelector('img');
img.addEventListener('click', () => {
    atual = (atual + 1) % array.length;
    img.src = array[atual];
});