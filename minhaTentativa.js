const formAddToDo = document.querySelector('.form-add-todo')
const inputSearch = document.querySelector('.form-control')
const ulTodo = document.querySelector('.todos-container')

const addTodo = (inputValue) => {
    if(inputValue.length){
        ulTodo.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center" data-todo="${inputValue}">
                <span>${inputValue}</span>
                <i class="far fa-trash-alt" data-trash="${inputValue}"></i>
            </li>
        `
    }
}

const removeTodo = trashValue => {
    const liTodo = document.querySelector(`[data-todo="${trashValue}"]`)

    if(trashValue){
        liTodo.remove()
    }
}

const hideTodos = (todos, inputValue) => {
    const todosToHide = filterTodos(todos, inputValue, false)
    manipulateClasses(todosToHide, 'hidden', 'd-flex')    
}


const showTodos = (todos, inputValue) => {
    const todosToShow = filterTodos(todos, inputValue, true)
    manipulateClasses(todosToShow, 'd-flex', 'hidden')
}

const manipulateClasses = (todos, add, remove) => {
    todos.forEach(todo => {
        todo.classList.add(add)
        todo.classList.remove(remove)
    })
}

const filterTodos = (todos, inputValue, returnMatchTodos) => todos
    .filter(todo => {
        const matchedTodos = todo.textContent.toLowerCase().includes(inputValue)
        return returnMatchTodos ? matchedTodos : !matchedTodos
    })


formAddToDo.addEventListener('submit', event => {
    event.preventDefault()
    const inputValue = event.target.add.value.trim()

    addTodo(inputValue)
    event.target.reset()
    
})    

ulTodo.addEventListener('click', event => {
    const trashValue = event.target.dataset.trash
    removeTodo(trashValue)
})

inputSearch.addEventListener('input', event => {
    const inputValue = event.target.value.trim().toLowerCase()
    const todos = Array.from(ulTodo.children)
    
    hideTodos(todos, inputValue)
    showTodos(todos, inputValue)
})
