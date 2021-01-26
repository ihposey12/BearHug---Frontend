const speciesURL = "http://localhost:3000/species"
const usersURL = "http://localhost:3000/users"

getSpecies()
renderNavBar()

function getSpecies() {
    fetch(speciesURL)
    .then(res => res.json())
    .then(species => {
        species.forEach(species => renderSpecies(species))
    })
}

function getOneUser() {
    // fetch(usersURL)
    // .then(res => res.json())
    // .then(users => )
}

function postUser() {

}

function patchUser() {

}

function deleteUser() {

}

function getUserSpecies() {

}

function renderNavBar(species) {
    let divNav = document.querySelector('.navbar')

    let navBar = document.createElement('nav')
    let allSpecies = document.createElement('h3')
    let mySpecies = document.createElement('h3')
    let account = document.createElement('h3')

    allSpecies.textContent = "All Species"
    mySpecies.textContent = "My Species"
    account.textContent = "Account"

    navBar.append(allSpecies, mySpecies, account)
    divNav.appendChild(navBar)

    allSpecies.addEventListener('click', renderSpecies)
}

function renderSpecies(species) {
    let speciesCard = document.querySelector('.species-card')
    
    let divContainer = document.createElement('div')
    let speciesImg = document.createElement('img')
    let h2 = document.createElement('h2')
    let h3 = document.createElement('h3')
    let h4 = document.createElement('h4')
    let br = document.createElement('br')

    divContainer.id = species.id
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