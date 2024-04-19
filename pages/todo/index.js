const input = document.querySelector("#textToDo")
const button = document.querySelector("button")

var lista = []

button.addEventListener("click",(e)=>{
    e.preventDefault()

    if(input.value != ""){
        lista.push(input.value)
        const p = document.createElement('p')
        p.textContent = `${lista.length} - ${input.value}`
    
        const section = document.querySelector('#lista')
    
        section.appendChild(p)
    
        localStorage.setItem("toDoList", JSON.stringify(lista))
    
        input.value = ""
    }else{
        alert("VAI FAZER NADA??? FICOU LOUCO?")
    }

})

function carregaLista(){
    if (localStorage.getItem("toDoList")) {
        lista = JSON.parse(localStorage.getItem("toDoList"))

        for (let i = 0; i < lista.length ; i++){
            
            const p = document.createElement('p')
            p.textContent = `${i + 1} - ${lista[i]}`

            const section = document.querySelector('#lista')

            section.appendChild(p)
            
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    carregaLista()
})