const searchParams = new URLSearchParams(location.search);

const pokemonUrl = searchParams.get("evolucao");

document.getElementById("nomePoke").innerText = pokemonUrl
document.querySelector("title").innerText = `Pagina do ${pokemonUrl}`

const pokemonApi = fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonUrl}`)
.then(data=>{
    return data.json()
})
.then(data=>{
    const isShiny = Math.floor(Math.random()*100);
    console.log(isShiny)
    if(isShiny == 42){
        document.getElementById("imgPoke").innerHTML = `<img id="${pokemonUrl}" src="${data.sprites.front_shiny}" alt="${pokemonUrl}">`
    }else{
        document.getElementById("imgPoke").innerHTML = `<img id="${pokemonUrl}" src="${data.sprites.front_default}" alt="${pokemonUrl}">`
    }
}
);
