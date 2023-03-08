const todosContainer = document.querySelector('.todos-container');
const submitButton = document.querySelector('.submit-button')
const submitInput = document.querySelector('.submit-container input')
let missions = []
let missionsStorage = JSON.parse(localStorage.getItem('missions'))
let submit = false;

const render = (mission) => {
    const todo = document.createElement('div')
    todo.classList.add('to-do')
    todo.innerHTML = `<div class="mission">${mission}</div><i class="checked fa-solid fa-xmark"></i>`
    todosContainer.insertBefore(todo, todosContainer.firstChild)
    const cross = Array.from(document.querySelectorAll('.to-do i'))
    cross.forEach(cross => cross.addEventListener('click', removeItem))
    console.log(missions)
}

if(missionsStorage){
    missions = missionsStorage
    missions.forEach(mission => render(mission))
}

function newItem() {
    
    if(submitInput.value){
        render(submitInput.value)
        missions.push(submitInput.value)
        submitInput.value = ''
        localStorage.setItem("missions", JSON.stringify(missions))
    } 

}
submitButton.addEventListener('click', newItem)
document.addEventListener('keypress', (e) => {
    if(e.key == 'Enter') newItem()
})

function removeItem() {
    console.log(this.parentElement)
    this.parentElement.classList.add('deleted')
    setTimeout(() => {
        this.parentElement.remove()  
        missions.splice(missions.indexOf(this.parentElement.innerHTML),1)
        localStorage.setItem('missions',JSON.stringify(missions))} , 500)
}

function deleteAll() {
    localStorage.clear()
    missions = []
    const allItems = Array.from(document.querySelectorAll('.to-do i'))
    allItems.forEach(item => {
        item.parentElement.classList.add('deleted')
        setTimeout(() => item.parentElement.remove(), 1000)
    })
}
submitButton.addEventListener('dblclick', deleteAll)






