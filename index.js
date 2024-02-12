const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");
let todo = []; 
fetch('http://localhost:3003/todos')
    .then(response => response.json())
    .then(data => {
        todo = data;
        displayTasks();
    })
    .catch(error => {
        console.error('Error fetching todos:', error);
    });



document.addEventListener("DOMContentLoaded", function () {
  addButton.addEventListener("click", addTask);
  todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); 
      addTask();
    }
  });
  deleteButton.addEventListener("click", deleteAllTasks);
  displayTasks();
});

function addTask() {
  const newTask = todoInput.value.trim();
  if (newTask !== "") {
    todo.push({ todo: newTask, disabled: false });
    fetch('http://localhost:3003/todos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ todo: newTask, disabled: false }),
})
  .then(response => response.json())
  .then(data => {
    todoInput.value = '';
    displayTasks();
  })
  .catch(error => console.error('Error adding task:', error));
  }
}
function deleteAllTasks() {
  fetch('http://localhost:3003/todos', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return response.json();
      } else {
        return null; 
      }
    })
    .then(() => {
      todo = [];
      saveToLocalStorage();
      displayTasks();
    })
    .catch(error => console.error('Error deleting tasks:', error));
}



function displayTasks() {
  todoList.innerHTML = "";
  console.log(todo);
  todo.forEach((item, index) => {
    const p = document.createElement("li");
    p.innerHTML = `
      <div class="todo-container">
        <div class='text-wrapper'>
          <input type="checkbox" class="todo-checkbox" id="input-${index}" ${
            item.disabled ? "checked" : ""}>
          <p id="todo-${index}" class="${
            item.disabled ? "disabled" : ""}" >${item.todo}</p>
            <div class = 'buttons-wrapper'> 
            <button class="delbutton" onclick="deleteTask(${index})">Delete</button>
            <button class="editbtn" onclick="editTask(${index})">Edit</button>
          </div>
        </div>
      </div>
    `;
    p.querySelector(".todo-checkbox").addEventListener("change", () =>
      toggleTask(index)
    );
    todoList.appendChild(p);
  });
  todoCount.textContent = todo.length;
}
function deleteTask(index) {
  const taskId = todo[index]._id; 

  fetch(`http://localhost:3003/todos/${taskId}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(() => {
      todo.splice(index, 1);
      console.log('Task deleted from server');
      saveToLocalStorage();
      displayTasks();
    })
    .catch(error => {
      console.error('Error deleting task:', error);
    });
}

function editTask(index) {
  const todoItem = document.getElementById(`todo-${index}`);
  const existingText = todo[index].todo;
  const inputElement = document.createElement("input");
  inputElement.classList.add("edit-todo"); 
  inputElement.value = existingText;
  todoItem.replaceWith(inputElement);
  inputElement.focus();

  inputElement.addEventListener("blur", async function () {
    const updatedText = inputElement.value.trim();
    if (updatedText) {
      todo[index].text = updatedText;
      const taskId = todo[index]._id; 
      try {
        const response = await fetch(`http://localhost:3003/todos/${taskId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ todo: updatedText, disabled: todo[index].disabled }),
        });
        console.log(response.ok,"respons.ok");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const updatedTask = await response.json();
        todo[index].todo = updatedTask.todo; 
        saveToLocalStorage();
        displayTasks();
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  });
}

async function toggleTask(index) {
  const taskId = todo[index]._id; 
  let disabledd = !todo[index].disabled;
  try {
    const response = await fetch(`http://localhost:3003/todos/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({todo: todo[index].todo, disabled: disabledd }), 
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const updatedTask = await response.json();
    todo[index] = updatedTask; // Update the task in your local todo array
    saveToLocalStorage();
    displayTasks();
  } catch (error) {
    console.error("Error toggling task:", error);
  }
}






function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}