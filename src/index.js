document.addEventListener('DOMContentLoaded', () => {
    renderLoginPage()
    renderTotalDonations()
    getSpecies()
    renderNavBar()
})

function renderTotalDonations() {
    fetch(donationURL)
    .then(res => res.json())
    .then(donations => {
        donations.forEach(donation => {
            console.log(donation)
            newDiv = donationDivBuilder()
            newNewDiv = addDetailsToDonation(donation, newDiv)
            let divContainer = document.querySelector('.user-species-donations')
            divContainer.appendChild(newNewDiv)
        })
    })
}

function addDetailsToDonation(details, div) {
    div.textContent = `Donation to: ${details.name}. Amount: ${details.total}`
    return div
}

function donationDivBuilder() {
    const div = document.createElement('div')
    return div
}

const speciesURL = "http://localhost:3000/species"
const usersURL = "http://localhost:3000/users"
const donationURL = "http://localhost:3000/donations"

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

function patchUser(id, e) {
    fetch(`${usersURL}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            username: e.target.username.value,
            email: e.target.email.value,
            description: e.target.description.value
        })
    })
    .then(res => res.json())
    .then(user => {
        const mainContainer = document.querySelector('.main-account-card') 
        newNameSpot = mainContainer.querySelector('h1')
        newNameSpot.textContent = user.username
        const newEmailSpot = mainContainer.querySelector('h2')
        newEmailSpot.textContent = user.email
        const newDescSpot = mainContainer.querySelector('p')
        newDescSpot.textContent = user.description
        document.querySelector('.user-edit-div').style.visibility = "hidden"
    })
}

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
    let account = document.createElement('h3')

    allSpecies.textContent = "All Species"
    account.textContent = "Account"

    navBar.append(allSpecies, account)
    divNav.appendChild(navBar)

    allSpecies.addEventListener('click', handleAllSpecies)
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
    mainCard.id = species.id

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
    let donateForm = document.createElement('form')

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

    donateForm.append(btnInput, donateBtn)
    mainDivContainer.append(speciesImgMain, mainH2, mainH3, mainH4, habitats, population, p, donateForm)
    mainCard.appendChild(mainDivContainer)

    donateForm.addEventListener('submit', (e) => userSpeciesDonation(e))
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
    userCard.id = user.id
    
    let userDivCard = document.createElement('div')
    let userMessage = document.createElement('h1')
    let userName = document.createElement('h2')
    let userEmail = document.createElement('h3')
    let userDescription = document.createElement('p')
    let editBtn = document.createElement('button')
    let dBtn = document.createElement('button')

    userMessage.textContent = `Hello, ${user.username}!`
    userName.textContent = `Username: ${user.username}`
    userEmail.textContent = `Email: ${user.email}`
    userDescription.textContent = `About You(optional): ${user.description}`

    editBtn.textContent = 'Edit Account'
    dBtn.textContent = 'Delete Account'

    userCard.innerHTML = ""
    userDivCard.innerHTML = ""
    
    userDivCard.append(userMessage, userName, userEmail, userDescription, editBtn, dBtn)
    userCard.appendChild(userDivCard)
    
    editBtn.addEventListener('click', () => handleEditUser())
    dBtn.addEventListener('click', () => deleteUser(user.id))
    })
}

function handleEditUser(user) {
    let userEditDiv = document.querySelector('.user-edit-div')
    userEditDiv.style.visibility = "visible"
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
    if(userEditDiv.children.length == 0) {
        userEditDiv.append(editTitle, userEdit)
    }

    editForm.addEventListener('submit', (e) => handleEditSubmit(e))
}

function handleEditSubmit(e) {
    e.preventDefault()
    const id = document.querySelector('.current-user').id
    patchUser(id, e)
}

function userSpeciesDonation(e) {
    e.preventDefault()
    let userCard = document.querySelector('.main-account-card')
    let formData = {
        species_id: parseInt(e.target.parentElement.parentElement.id),
        user_id: parseInt(userCard.id),
        amount: parseFloat(e.target[0].value)
    }

    fetch(donationURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data =>  {
        let userSpecies = document.querySelector('.user-species-donations')
        let donationContainer = document.createElement('div')
        let h3 = document.createElement('h3')

        h3.textContent = `Donation to: ${data[2].name} Amount: $${data[0].amount}`

        donationContainer.appendChild(h3)
        userSpecies.appendChild(donationContainer)
    })
}