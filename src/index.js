document.addEventListener('DOMContentLoaded', () => {
    renderLoginPage()
    getSpecies()
    renderNavBar()
})

const speciesURL = "http://localhost:3000/species"
const usersURL = "http://localhost:3000/users"

function getSpecies() {
    fetch(speciesURL)
    .then(res => res.json())
    .then(species => {
        species.forEach(s => renderSpecies(s))
    })
}

function createNewUser(e) {
    fetch(usersURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: e.target.username.value,
            email: e.target.email.value
        })
    })
    .then(res => res.json())
    .then((user) => {
        document.querySelector('.current-user').id = user.id
        let hideUser = document.querySelector('#login-container').style.visibility = "hidden"
        
    })
}

// function patchUser() {
//     fetch(`${usersURL}/${}`, {
//         method: 'PATCH',
//         headers: {
//             'Content-Type':'application/json'
//         },
//         body: JSON.stringify()
//             // username: user.username.value,
//             // email: user.email.value,
//             // description: user.description.value
//     })
//     .then(res => res.json())
//     .then(user => {
//         handleEditUser(user)
//     })
// }

function deleteUser(id) {
    fetch(`${usersURL}/${id}`, {
        method : 'DELETE'
    })
    .then(() =>  {
        document.querySelector('#login-container').style.visibility = "visible"
        document.querySelector('.input-username').value = ""
        document.querySelector('.input-email').value = ""
        let hideUser = document.querySelector('.main-account-card')
        hideUser.innerHTML = ""
    })
}

function renderLoginPage() {
    let loginDiv = document.querySelector('#login-container')
    
    let mainTitle = document.createElement('h1')
    let divForm = document.createElement('div')
    let form = document.createElement('form')
    let input = document.createElement('input')
    let inputTwo = document.createElement('input')
    let submitBtn = document.createElement('button')

    divForm.id = 'form-div'
    form.setAttribute('method', 'post')
    input.className = 'input-username'
    input.type = 'text'
    input.name = 'username'
    input.id = 'username1'
    input.placeholder = 'Username'
    inputTwo.className = 'input-email'
    inputTwo.type = 'text'
    inputTwo.name = 'email'
    inputTwo.id = 'username1'
    inputTwo.placeholder = 'Email'
    submitBtn.textContent = 'Go!'
    submitBtn.type = 'submit'
    mainTitle.textContent = 'Welcome to Bear-Hug!'

    form.append(mainTitle, input, inputTwo, submitBtn)
    divForm.appendChild(form)
    loginDiv.append(divForm)

    form.addEventListener('submit', (e) => handleNewUserSubmit(e))
}

function renderNavBar() {
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

    allSpecies.addEventListener('click', handleAllSpecies)
    // mySpecies.addEventListener('click', () => handleMySpecies)
    account.addEventListener('click', handleUserAccount)
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
    speciesImg.className = 'image-container'
    speciesImg.src = species.image_url
    h2.textContent = species.name
    h3.textContent = species.latin_name
    h4.textContent = species.status

    h2.style.textAlign = 'center'
    h3.style.textAlign = 'center'
    h3.style.fontStyle = 'italic'
    h4.style.textAlign = 'center'

    if(species.status == 'Critically Endangered') {
        h4.style.color = 'red'
    } else if(species.status == 'Endangered') {
        h4.style.color = 'orange'
    } else {
        h4.style.color = 'green'
    }

    divContainer.append(h2, speciesImg, h3, h4, br)
    speciesCard.appendChild(divContainer)

    divContainer.addEventListener('click', () => handleClick(species))
}

function handleNewUserSubmit(e) {
    e.preventDefault()
    createNewUser(e)
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
    let donateBtn = document.createElement('button')
    let btnInput = document.createElement('input')

    donateBtn.className = 'donate-btn'
    btnInput.className = 'donate-input'
    mainDivContainer.className = 'main-container'
    speciesImgMain.className = 'main-container-img'
    speciesImgMain.src = species.image_url
    mainH2.textContent = species.name
    mainH3.textContent = species.latin_name
    mainH4.textContent = species.status
    habitats.textContent = species.habitats
    population.textContent = species.population
    p.textContent = species.description
    donateBtn.textContent = 'Donate'
    btnInput.setAttribute('type', 'number')

    mainCard.innerHTML = ""
    mainDivContainer.innerHTML = ""

    mainDivContainer.append(speciesImgMain, mainH2, mainH3, mainH4, habitats, population, p, donateBtn, btnInput)
    mainCard.appendChild(mainDivContainer)
}

function handleAllSpecies() {
    let mainCard = document.querySelector('.main-species-card')
    let speciesCard = document.querySelector('.species-card')

    mainCard.innerHTML = ""
    speciesCard.innerHTML = ""
    
    getSpecies()
}

function handleUserAccount() {
    fetch(`${usersURL}/${document.querySelector('.current-user').id}`)
    .then(res => res.json())
    .then(user => {
    let userCard = document.querySelector('.main-account-card')
    
    let userDivCard = document.createElement('div')
    let userMessage = document.createElement('h1')
    let userName = document.createElement('h2')
    let userEmail = document.createElement('h3')
    let userDescription = document.createElement('p')
    let editBtn = document.createElement('button')
    let dBtn = document.createElement('button')

    userMessage.textContent = `Hello, ${user.username}!`
    userName.textContent = user.username
    userEmail.textContent = user.email
    userDescription = user.description
    editBtn.textContent = 'Edit Account'
    dBtn.textContent = 'Delete Account'

    userCard.innerHTML = ""
    userDivCard.innerHTML = ""

    userDivCard.append(userMessage, userName, userEmail, userDescription, editBtn, dBtn)
    userCard.appendChild(userDivCard)
    
    // editBtn.addEventListener('click', () => handleEditUser(user))
    dBtn.addEventListener('click', () => deleteUser(user.id))
    })
}

function handleEditUser(user) {
    let userEditDiv = document.querySelector('.user-edit-div')

    let editTitle = document.createElement('h3')
    let userEdit = document.createElement('div')
    let editForm = document.createElement('form')
    let nameInput = document.createElement('input')
    let emailInput = document.createElement('input')
    let descInput = document.createElement('input')
    let saveBtn = document.createElement('button')

    editTitle.textContent = "Edit Your Account"
    editForm.setAttribute('method', 'patch')
    nameInput.type = 'text'
    nameInput.name = 'username'
    nameInput.placeholder = 'Username'
    emailInput.type = 'text'
    emailInput.name = 'email'
    emailInput.placeholder = 'Email'
    descInput.type = 'text'
    descInput.name = 'description'
    descInput.placeholder = 'Add A Description(Optional)'
    saveBtn.textContent = 'Save'
    saveBtn.type = 'submit'

    editForm.append(nameInput, emailInput, descInput, saveBtn)
    userEdit.appendChild(editForm)
    userEditDiv.append(editTitle, userEdit)

    // saveBtn.addEventListener('submit', renderSpecies)
    
    patchUser(user)
}