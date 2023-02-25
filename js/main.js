const formulario = document.querySelector("#novoItem")

const itens = document.querySelector("#lista")

const itens_lista = JSON.parse(localStorage.getItem("item")) || []

itens_lista.forEach((iten) => {
  adicionarElemento(iten)
})

formulario.addEventListener("submit", (elemento) => {
    elemento.preventDefault()
    
    const item = elemento.target[0]
    const quantidade = elemento.target[1]

    const existe = itens_lista.find( elemento => elemento.Item === item.value)
    
    const infs = {  
        'Item': item.value,
        'Quantidade': quantidade.value,
    }

    if (existe){
        infs.id = existe.id
        atualizaElemento(infs)
        itens_lista[itens_lista.findIndex(elemento => elemento.id === existe.id)] = infs
    }

    else {
        infs.id = itens_lista[itens_lista.length - 1] ? itens_lista[itens_lista.length-1].id + 1 : 0
        adicionarElemento(infs)
        itens_lista.push(infs)
    }


    item.value = ''
    quantidade.value = ''

    localStorage.setItem('item', JSON.stringify(itens_lista))
})

function adicionarElemento (item) {
    const lista = document.createElement("li")
    
    lista.classList.add("item")

    const strong = document.createElement("strong")
    
    strong.dataset.id = item.id

    strong.innerHTML += item["Quantidade"]  

    lista.appendChild(strong)

    lista.innerHTML += item["Item"]
    
    lista.appendChild(botaoRemove(item.id))

    itens.appendChild(lista)
}

function atualizaElemento(inf){
    document.querySelector("[data-id='"+inf.id+"']").innerHTML = inf.Quantidade
}

function botaoRemove(id){
    const but = document.createElement("button")
    but.innerHTML = "X"

    but.addEventListener("click", function(tag){
        deletaElemento(this.parentNode, id)
    })
    
    return but
}

function deletaElemento(tag, id){
    tag.remove()
    itens_lista.splice(itens_lista.findIndex(elemento => elemento.id === id),1)
    localStorage.setItem("item", JSON.stringify(itens_lista))
}