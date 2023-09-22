const formAddToDo = document.querySelector('.form-add-todo')
const todosContainer = document.querySelector('.todos-container')
const inputSearch = document.querySelector('.form-search input')

const addTodo = inputValue => {
    if(inputValue.length){
        todosContainer.innerHTML += 
        `<li class="list-group-item d-flex justify-content-between align-items-center" data-todo="${inputValue}">
            <span>${inputValue}</span>
            <i class="far fa-trash-alt" data-trash="${inputValue}"></i>
        </li>`
    }
}

const filterTodos = (todos, inputValue, returnMatchTodos) => todos
    .filter(todo => {
        const matchedTodos = todo.textContent.toLowerCase().includes(inputValue) 
        return returnMatchTodos ? matchedTodos : !matchedTodos
    }) 

const manipulateClasses = (todos, toAdd, toRemove) => {
    todos.forEach(todo => {
        todo.classList.remove(toRemove)
        todo.classList.add(toAdd)
    })
}

const hideTodos = (todos, inputValue) => {
    const todosToHide = filterTodos(todos, inputValue, false)
    manipulateClasses(todosToHide, 'hidden', 'd-flex')    
}

const showTodos = (todos, inputValue) => {
    const todosToShow = filterTodos(todos, inputValue, true)
    manipulateClasses(todosToShow, 'd-flex', 'hidden')
}

const removeTodo = clickedElement => {
    const trashDataValue = clickedElement.dataset.trash
    const todo = document.querySelector(`[data-todo="${trashDataValue}"]`)

    if(trashDataValue){
        todo.remove()
    }
}

inputSearch.addEventListener('input', event => {
    const inputValue = event.target.value.trim().toLowerCase()
    const todos = Array.from(todosContainer.children)
    
    hideTodos(todos, inputValue)
    showTodos(todos, inputValue)
})

todosContainer.addEventListener('click', event => {
    const clickedElement = event.target
    removeTodo(clickedElement)
})


formAddToDo.addEventListener('submit', event => {
    event.preventDefault()
    const inputValue = event.target.add.value.trim()
    
    addTodo(inputValue)
    event.target.reset()
})
