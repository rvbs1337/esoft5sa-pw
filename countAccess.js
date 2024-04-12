function saveAccess() {
    if (!localStorage.getItem("acessos")) {
        var acessos = {
            quant : 1,
            ultimoAcesso : getDataAtual()
        }

        localStorage.setItem("acessos", JSON.stringify(acessos))
    } else {
        var acessos = JSON.parse(localStorage.getItem("acessos"))
        acessos.quant += 1;
        acessos.ultimoAcesso = getDataAtual()
        localStorage.setItem("acessos", JSON.stringify(acessos))
    }
}

function getDataAtual(){
    var date = new Date()

    const data = new Intl.DateTimeFormat("pt-BR", {
        day: "numeric", 
        month: "numeric" , 
        year: "numeric" , 
        hour: "numeric" ,
        minute: "numeric"
    }).format(date);

    return data;
}

function adicionarTagP(){
    var acessos = JSON.parse(localStorage.getItem("acessos"))
    const p = document.createElement('p')
    p.id = "info-quant-label"
    p.textContent = `Esta página foi visitada ${acessos.quant} vezes. A última visita foi: ${acessos.ultimoAcesso}`
  
    const section = document.querySelector('footer')
  
    section.appendChild(p)
}

document.addEventListener('DOMContentLoaded', function () {
    saveAccess()
    adicionarTagP()
})