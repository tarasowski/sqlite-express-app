// Die Funktion renderTodos() benutzt eine Liste von Todos, um mithilfe von 
// js DOM neue listenelemente in unsere HTML anzeige der todoListe einzufügen
function renderTodos(todos){
    const todoList = document.getElementById("todoList")
    todoList.innerHTML = ''
    todos.forEach(todoItem => {
        const newListElement = document.createElement("li")
        newListElement.innerText = todoItem
        todoList.appendChild(newListElement)
    });
}

// -------------- HTTP anfragen ---------------
// getTodos sendet eine GET request
function getTodos(){
    fetch("/todos")
        .then(response => response.json())
        .then(todos => renderTodos(todos))
        .catch(error => console.error("Es gab einen Fehler mit getTodos:", error))
}

// addTodo() sendet eine POST request (mitstringifiziertem json objekt im Body)
function addTodo(todo) {
    fetch("/todos", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        //`{"todoText": "${todo}"}`
        body: JSON.stringify({todoText: todo})
    })
    .then(response => response.json())
    .then(todos => renderTodos(todos))
    .catch(error => console.error("Es gabe einen fehler bei addTodo:", error))
}

// deleteTodos sendet eine DELETE request
function deleteTodos(){
    fetch("/todos", {
        method: "DELETE"
    })
    .then(response => response.json())
    .then(todos => renderTodos(todos))
    .catch(error => console.error("Es gabe einen fehler bei deleteTodos:", error))
}

// -----------------------------------------------------------------------
// Die event listener für die beiden buttons: 
document.getElementById("addButton").addEventListener('click', () => {
    const todoInput = document.getElementById("todoInput")
    const todoText = todoInput.value

    if (todoText) {
        addTodo(todoText);
        todoInput.value = '';
    }
})

document.getElementById("deleteButton").addEventListener('click', () => {
    deleteTodos()
})


// Beim laden der Website löse einmal direkt getTodos aus, um die
// aktuelle todoliste vom server abzufragen
getTodos()

