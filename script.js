const taskBtn = document.querySelector("#taskBtn");
const taskList = document.querySelector("#taskList");
const taskInput = document.querySelector("#taskInput");

function addDeleteFunction(span) {
  span.addEventListener("click", function() {
    const li = span.parentElement;
    taskList.removeChild(li);
  });
}

document.querySelectorAll(".deleteSpan").forEach(span => {
  addDeleteFunction(span);
});

taskBtn.addEventListener("click", function() {
  const taskInputValue = taskInput.value.trim();
  if (taskInputValue === "") return;
  const li = document.createElement("li");
  li.textContent = taskInputValue;
  const deleteSpan = document.createElement("span");
  deleteSpan.textContent = "Excluir";
  deleteSpan.className = "deleteSpan";
  addDeleteFunction(deleteSpan);
  li.appendChild(deleteSpan);
  taskList.appendChild(li);
  taskInput.value = "";
});