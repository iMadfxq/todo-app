const root = document.querySelector('#root')
const body = document.querySelector('body')
const openPopUp = document.querySelector('.openPopUp')
const closePop = document.querySelector('.closePop')
const wrapper = document.querySelector('.wrapper')
const form = document.querySelector('form')
const input = document.querySelector('input')

function addTodo(text, date) { //I made a helper function to make the code neater.
    //I could have done it just with a innerHTML, but i'm aware of the security problems it can cause, so I just do it this way. It's practice.
    const li = document.createElement('li')
    const todoText = document.createElement('h4')
    const todoDate = document.createElement('p')
    const deleteButton = document.createElement('span')
    const completedButton = document.createElement('span')
    deleteButton.textContent = '❌'
    deleteButton.setAttribute('class', 'deleteButton')
    completedButton.textContent = '✅'
    completedButton.setAttribute('class', 'completedButton')
    todoDate.textContent = date
    todoText.textContent = text
    li.appendChild(completedButton)
    li.appendChild(todoText)
    li.appendChild(deleteButton)
    li.appendChild(todoDate)
    root.appendChild(li)
}


body.addEventListener('click', (e) => {
    e.stopPropagation
    if(e.target === openPopUp) {
        wrapper.style.opacity = '1'
        wrapper.style.zIndex = '3'
        input.focus() //This is really useful because it allows the user to start typing instantly
    }
    if(e.target === closePop || e.target === wrapper) {
        wrapper.style.opacity = '0'
        setTimeout(() => {
            wrapper.style.zIndex = '1'
        }, 500)
        input.blur() //when I close the popup I don't want the input to stay focused, because it won't allow clicks
    }
    if(e.target.className === 'deleteButton') {
        e.target.parentElement.remove()
        ToDos = ToDos.filter((todo) => {
            if(JSON.stringify(e.target.parentElement.childNodes[1].innerText) != JSON.stringify(todo.text)){
                return todo //If i'm clicking the delete button, I just want to keep the ones that have different text than the one I just clicked
            }
        })
        console.log(ToDos)
        localStorage.setItem('todos', JSON.stringify(ToDos))
    }
    if(e.target.classList.contains('completedButton')) {
        e.target.parentElement.classList.toggle('completed') //the class is to apply styles later on, and I want to style the whole todo, that's why i add it to the parent element.
        ToDos.forEach(todo => {
            if(JSON.stringify(e.target.parentElement.childNodes[1].innerText) === JSON.stringify(todo.text) && todo.completed === false){
                todo.completed = true
                console.log(ToDos)
            }else if(JSON.stringify(e.target.parentElement.childNodes[1].innerText) === JSON.stringify(todo.text) && todo.completed === true){
                todo.completed = false
                console.log(ToDos)
            }
        })
        localStorage.setItem('todos', JSON.stringify(ToDos))
    }
})


let ToDos = []
if(localStorage.getItem('todos')){
    ToDos = JSON.parse(localStorage.getItem('todos'))
    ToDos.forEach(todo => {
        addTodo(todo.text, todo.dateFrmttd)
        if(todo.completed){
            console.dir(root)
            root.childNodes.forEach((child) => {
                if(JSON.stringify(child.childNodes[1].innerText) === JSON.stringify(todo.text)){
                    child.classList.toggle('completed')
                }
            })
        }
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault() //I don't want it to reload the page
    if(input.value.trim()){ //to check that the todo is not empty
        const date = new Date
    
        const dateFrmttd = date.toDateString()
        const text = input.value
        ToDos.push({
            'dateFrmttd' : dateFrmttd, 
            'text' : text,
            'completed' : false
        })
        root.innerHTML = '' //To avoid paint of todos that are already in the page
        ToDos.forEach(todo => addTodo(todo.text, todo.dateFrmttd))
        form.reset() 
        wrapper.style.opacity = '0' //It will close the popup when there's a submit
        localStorage.setItem('todos', JSON.stringify(ToDos))
        console.log(JSON.parse(localStorage.getItem('todos')))
        input.blur() //To avoid the input to stay focused after a submit
    } else {
        alert('You cannot create an empty todo')
    }
})