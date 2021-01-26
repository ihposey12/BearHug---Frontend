const speciesURL = "http://localhost:3000/species"
const usersURL = "http://localhost:3000/users"

getSpecies()

function getSpecies() {
    fetch(speciesURL)
    .then(res => res.json())
    .then(species => {
        species.forEach(species => renderSpecies(species))
    })
}

function renderSpecies(species) {
    let speciesCard = document.querySelector('.species-card')
    
    let divContainer = document.createElement('div')
    let speciesImg = document.createElement('img')
    let h2 = document.createElement('h2')
    let h3 = document.createElement('h3')
    let h4 = document.createElement('h4')
    let br = document.createElement('br')

    divContainer.className = 'container'
    speciesImg.src = species.image_url
    h2.textContent = species.name
    h3.textContent = species.latin_name
    h4.textContent = species.status

    divContainer.append(h2, speciesImg, h3, h4, br)
    speciesCard.appendChild(divContainer)

    divContainer.addEventListener('click', () => handleClick(species))
}

function handleClick(species) {
    let mainCard = document.querySelector('.main-species-card')
    
    let mainDivContainer = document.createElement('div')
    let speciesImgMain = document.createElement('img')
    let mainH2 = document.createElement('h2')
    let mainH3 = document.createElement('h3')
    let mainH4 = document.createElement('h4')
    let habitats = document.createElement('h4')
    let population = document.createElement('h4')
    let p = document.createElement('p')

    mainDivContainer.className = 'main-container'
    speciesImgMain.src = species.image_url
    mainH2.textContent = species.name
    mainH3.textContent = species.latin_name
    mainH4.textContent = species.status
    habitats.textContent = species.habitats
    population.textContent = species.population
    p.textContent = species.description

    mainCard.innerHTML = ""

    mainDivContainer.append(speciesImgMain, mainH2, mainH3, mainH4, habitats, population, p)
    mainCard.appendChild(mainDivContainer)
}