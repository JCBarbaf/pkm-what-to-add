import { typeRelations } from "./type-relations.js"

let typesOwned = []
let modal = document.querySelector('.modal-background')
let filter = document.querySelector('.filter')

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
    typesOwned = []
    document.querySelectorAll('.types-container.selector .type').forEach(type => {
      if (type.classList.contains('active')) {
        type.classList.remove('active')
      }  
    })
    let typesCovered = calculateTypesCovered()
    showTypesCovered(typesCovered)
})

document.querySelector('.recomend-types.button').addEventListener('click', (event) => {
    calculateTypesToInclude()
    modal.classList.add('active')
})


modal.addEventListener('click', (event) => {
    if(!event.target.closest('.modal') || event.target.closest('.close-modal-button')) {
        modal.classList.remove('active')
    }
})

filter.addEventListener('change', (event) => {
    calculateTypesToInclude()
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
    let filterValue = filter.value
    console.log(filter)
    let typesToInclude = []
    let typesCovered = calculateTypesCovered()
    console.log(typesCovered)
    typeRelations.forEach(type => {
        // console.log(`${type.type} ${typesCovered.includes(type.type) ? '' : 'not '}covered`)
        if (!typesCovered.includes(type.type)) {
            typesToInclude.push(...type.weakTo)  
        }
    })
    if (filterValue == 'highly') {
        typesToInclude = typesToInclude.filter((item, index) => typesToInclude.indexOf(item) !== index)
        if (!typesCovered.includes('electric') && !typesToInclude.includes('ground')) {
            typesToInclude.push('ground')
        }
        if (!typesCovered.includes('normal') && !typesToInclude.includes('fighting')) {
            typesToInclude.push('fighting')
        }
    } else {
        typesToInclude = typesToInclude.filter((item, pos) => typesToInclude.indexOf(item) == pos)
    }
    showTypesToInclude(typesToInclude)
}

function showTypesToInclude(typesToInclude) {
    document.querySelectorAll('.to-include .type').forEach(typeElement => {
        typeElement.classList.remove('active')
    })
    typesToInclude.forEach(type => {
        document.querySelector(`.to-include .${type}`).classList.add('active')
    })
}