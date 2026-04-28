const taskBtn = document.querySelector("#taskBtn");
const taskList = document.querySelector("#taskList");
const taskInput = document.querySelector("#taskInput");
const clearAllBtn = document.querySelector("#clearAllBtn");
const clearCompletedBtn = document.querySelector("#clearCompletedBtn");
const taskCounter = document.querySelector("#taskCounter");

// 4) e 5) Atualiza o contador de tarefas e concluídas
function updateCounter() {
    const total = taskList.querySelectorAll("li").length;
    const completed = taskList.querySelectorAll(".completed").length;

    if (total === 0) {
        taskCounter.textContent = "0 tarefas";
    } else {
        taskCounter.textContent = `${completed} de ${total} tarefas concluídas`;
    }
}

function createSpan(taskInputValue) {
    const span = document.createElement("span");
    span.textContent = taskInputValue;
    span.addEventListener("click", function () {
        span.classList.toggle("completed");
        updateCounter(); // 5) atualiza ao concluir/desconcluir
    });
    return span;
}

function createDeleteButton(li) {
    const button = document.createElement("button");
    button.textContent = "Excluir";
    button.classList.add("btn-delete");
    button.addEventListener("click", function () {
        li.remove();
        updateCounter(); // 4) atualiza ao excluir
    });
    return button;
}

// 7) Botão de editar
function createEditButton(span) {
    const button = document.createElement("button");
    button.textContent = "Editar";
    button.classList.add("btn-edit");
    button.addEventListener("click", function () {
        const newValue = prompt("Editar tarefa:", span.textContent);
        if (newValue !== null && newValue.trim() !== "") {
            span.textContent = newValue.trim();
        }
    });
    return button;
}

function addTask() {
    const taskInputValue = taskInput.value.trim();
    if (taskInputValue === "") return;

    const li = document.createElement("li");
    const span = createSpan(taskInputValue);
    const editButton = createEditButton(span);
    const deleteButton = createDeleteButton(li);

    li.appendChild(span);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);

    // 1) Limpa o input após adicionar
    taskInput.value = "";
    taskInput.focus();

    updateCounter(); // 4) atualiza ao adicionar
}

// 2) Adicionar tarefa ao pressionar Enter
taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

taskBtn.addEventListener("click", addTask);

// 3) Botão Limpar — remove todas as tarefas
clearAllBtn.addEventListener("click", function () {
    taskList.innerHTML = "";
    updateCounter();
});

// 6) Botão para limpar SOMENTE tarefas concluídas
clearCompletedBtn.addEventListener("click", function () {
    const completed = taskList.querySelectorAll(".completed");
    completed.forEach(function (span) {
        span.closest("li").remove();
    });
    updateCounter();
});