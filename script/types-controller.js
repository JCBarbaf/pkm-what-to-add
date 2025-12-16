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

function calculateTypesCovered () {
    let typesCovered = []
    for (let i = 0; i < typesOwned.length; i++) {
        console.log(typeRelations[typesOwned[i]].effectiveAgainst)
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
        console.log(type)
        document.querySelector(`.covered .${type}`).classList.add('active')
    })
}

function calculateTypesToInclude() {
    let typesToInclude = [];
    let typesCovered = calculateTypesCovered()
    console.log(typesCovered)
    // let typesCovered = []
}