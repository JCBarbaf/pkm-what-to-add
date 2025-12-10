import { typeRelations } from "./type-relations.js"

let typesOwned = [1, 11]
document.querySelector('.selector').addEventListener('click', (event) => {
    let type = event.target.closest('.type')
    if (type) {
        type.classList.toggle('active')
        alert(type.dataset.typeID)
    }
})

calculateTypesCovered()

function calculateTypesCovered () {
    let typesCovered = []
    for (let i = 0; i < typesOwned.length; i++) {
        console.log(typeRelations[typesOwned[i]].effectiveAgainst)
        typesCovered = typesCovered.concat(typeRelations[typesOwned[i]].effectiveAgainst)
    }
    typesCovered = typesCovered.filter((item, index) => typesCovered.indexOf(item) === index);
    showTypesCovered(typesCovered)
}

function showTypesCovered (typesCovered) {
    typesCovered.forEach(type => {
        console.log(type)
    })
}