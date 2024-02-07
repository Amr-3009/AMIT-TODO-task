const textInput = document.getElementsByClassName(
  "todo-container_add-item_input"
)[0];

const addButton = document.getElementsByClassName(
  "todo-container_add-item_button"
)[0];

let todoList = document.getElementsByClassName(
  "todo-container_display-item_list"
)[0];

const unorderedList = document.getElementsByTagName("ul")[0];

const searchInputContainer = document.getElementsByClassName(
  "todo-container_search"
)[0];

const searchInput = document.getElementsByClassName(
  "todo-container_search_input"
)[0];

const searchButton = document.getElementsByClassName(
  "todo-container_search_button"
)[0];
searchButton.addEventListener("click", () => {
  const searchValue = searchInput.value.toLowerCase();
  const filteredList = todoArray.filter((item) =>
    item.toLowerCase().includes(searchValue)
  );
  todoList.innerHTML = "";
  for (let item of filteredList) {
    todoList.innerHTML += `<li class="todo-container_display-item_list_item">${item}</li>`;
  }
});

const clearSearchButton = document.getElementById("search-clear");
clearSearchButton.addEventListener("click", () => {
  restoreList();
  clearSearchBar();
});

const remainingTasks = document.getElementsByClassName(
  "todo-container_options_button--hidden-by-default"
)[0];

const clearLocalStorageButton = document.getElementById("clear_local_storage");
clearLocalStorageButton.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

let removeButtons;
let checkboxes;
let editButtons;
let todoArray = [];

addButton.addEventListener("click", () => {
  todoList.innerHTML += `<li class="todo-container_display-item_list_item">
  <div>
    <input
      type="checkbox"
      class="todo-container_display-item_list_item_checkbox"
    />
    <span class="todo-container_display-item_list_item_text"
      >${textInput.value}</span
    >
  </div>
  <div>
  <button class="todo-container_display-item_list_edit_button">
    🖋
  </button>
  <button class="todo-container_display-item_list_remove_button">
    ✖
  </button>
  </div>
</li>`;
  todoArray.push(textInput.value);
  localStorage.setItem("arrayLength", todoArray.length);

  for (let i = 0; i < todoArray.length; i++) {
    if (localStorage.getItem("arrayLength") == "0") {
      todoArray = [];
      localStorage.removeItem("arrayLength");
    }
  }

  textInput.value = "";
  searchInputContainer.style.display = "block";
  remainingTasks.style.display = "block";
  remainingTasks.innerText = `${localStorage.getItem(
    "arrayLength"
  )} task(s) remaining مش عارف اضبطها`;
  removeButtons = document.getElementsByClassName(
    "todo-container_display-item_list_remove_button"
  );
  for (let button of removeButtons) {
    button.addEventListener("click", removeItem);
  }
  checkboxes = document.getElementsByClassName(
    "todo-container_display-item_list_item_checkbox"
  );
  for (let checkbox of checkboxes) {
    checkbox.addEventListener("click", disableItem);
  }
  editButtons = document.getElementsByClassName(
    "todo-container_display-item_list_edit_button"
  );
  for (let button of editButtons) {
    button.addEventListener("click", editItem);
  }
  localStorage.setItem("todoList", todoList.innerHTML);
  reattachEventListeners();
});

document.addEventListener("DOMContentLoaded", restoreList);

function removeItem(e) {
  e.target.parentElement.parentElement.remove();
  localStorage.setItem("todoList", todoList.innerHTML);
  arrayLength = localStorage.getItem("arrayLength");
  arrayLength--;
  localStorage.setItem("arrayLength", arrayLength);
  remainingTasks.innerText = `${localStorage.getItem(
    "arrayLength"
  )} task(s) remaining`;
}

function disableItem(e) {
  if (e.target.checked) {
    e.target.nextElementSibling.style.textDecoration = "line-through";
    e.target.setAttribute("disabled", "true");
    e.target.parentElement.nextElementSibling.firstElementChild.style.backgroundColor =
      "#fff";
    e.target.parentElement.nextElementSibling.lastElementChild.style.backgroundColor =
      "#fff";
    e.target.parentElement.parentElement.style.backgroundColor = "#BABDBF";
    localStorage.setItem("todoList", todoList.innerHTML);
  }
}

function editItem(e) {
  if (
    e.target.parentElement.previousElementSibling.firstElementChild.hasAttribute(
      "disabled"
    )
  ) {
    alert("Task is done, cannot be edited!");
    return;
  } else {
    let taskName =
      e.target.parentElement.previousElementSibling.lastElementChild.innerText;
    let newTaskName = prompt("Edit task", taskName);
    if (newTaskName === null) {
      return;
    } else if (newTaskName === "") {
      alert("Task name cannot be empty");
      return;
    } else {
      e.target.parentElement.previousElementSibling.lastElementChild.innerText =
        newTaskName;
      localStorage.setItem("todoList", todoList.innerHTML);
    }
  }
}

function reattachEventListeners() {
  removeButtons = document.getElementsByClassName(
    "todo-container_display-item_list_remove_button"
  );
  for (let button of removeButtons) {
    button.addEventListener("click", removeItem);
  }
  checkboxes = document.getElementsByClassName(
    "todo-container_display-item_list_item_checkbox"
  );
  for (let checkbox of checkboxes) {
    checkbox.addEventListener("click", disableItem);
  }
  editButtons = document.getElementsByClassName(
    "todo-container_display-item_list_edit_button"
  );
  for (let button of editButtons) {
    button.addEventListener("click", editItem);
  }
}

function restoreList() {
  const savedList = localStorage.getItem("todoList");
  if (savedList) {
    todoList.innerHTML = savedList;
    reattachEventListeners();
  }
}

function clearSearchBar() {
  searchInput.value = "";
}
