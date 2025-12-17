import { typeRelations } from "./type-relations.js"

let typesOwned = []
document.querySelector('.selector').addEventListener('click', (event) => {
    let type = event.target.closest('.type')
    if (type) {
        type.classList.toggle('active')
        if (type.classList.contains('active')) {
            typesOwned.push(type.dataset.typeId)
        } else {
            let index = typesOwned.indexOf(type.dataset.typeId)
            typesOwned.splice(index, 1)
        }
        let typesCovered = calculateTypesCovered()
        showTypesCovered(typesCovered)
    }
})

document.querySelector('.reset-types.button').addEventListener('click', (event) => {
    console.log("reset types")
    typesOwned = []
    document.querySelectorAll('.types-container.selector .type').forEach(type => {
      if (type.classList.contains('active')) {
        type.classList.remove('active')
      }  
    })
    let typesCovered = calculateTypesCovered()
    showTypesCovered(typesCovered)
})

function calculateTypesCovered () {
    let typesCovered = []
    for (let i = 0; i < typesOwned.length; i++) {
        typesCovered = typesCovered.concat(typeRelations[typesOwned[i]].effectiveAgainst)
    }
    typesCovered = typesCovered.filter((item, index) => typesCovered.indexOf(item) === index);
    return typesCovered
}

function showTypesCovered (typesCovered) {
    document.querySelectorAll('.covered .type').forEach(typeElement => {
        typeElement.classList.remove('active')
    })
    typesCovered.forEach(type => {
        document.querySelector(`.covered .${type}`).classList.add('active')
    })
}

function calculateTypesToInclude() {
    let typesToInclude = []
    let typesCovered = calculateTypesCovered()
    // let typesCovered = []
}