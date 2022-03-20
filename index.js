const root = document.querySelector('#root')
const body = document.querySelector('body')
const openPopUp = document.querySelector('.openPopUp')
const wrapper = document.querySelector('.wrapper')
const form = document.querySelector('form')
const input = document.querySelector('input')

function addTodo(text, date) {
    const li = document.createElement('li')
    li.textContent = text
    const span = document.createElement('span')
    span.textContent = date
    li.appendChild(span)
    root.appendChild(li)   
}


body.addEventListener('click', (e) => {
    e.stopPropagation
    if(e.target === openPopUp) {
        wrapper.style.display = 'flex'
        input.focus()
    }
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const date = new Date
    const text = input.value
    addTodo(text, date)
    form.reset()
    wrapper.style.display = 'none'
})