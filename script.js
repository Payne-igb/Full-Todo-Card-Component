const checkbox = document.getElementById("toggleCheckbox");
const toggleExpandCollapseContainer = document.querySelector(
  ".expand-collapse-container"
);
const priorityIndicator = document.querySelector(".priority-indicator");
const expandCollapseButton = document.querySelector(
  ".expand-collapse-toggle-button"
);
const todoStatus = document.querySelector(".todo-status");
const statusControl = document.getElementById("status-control");
const title = document.getElementById("todo-title");
const description = document.querySelector(".description");
const descriptionContainer = document.querySelector(".description-container");
const container = document.querySelector(".container");
const miniContainer = document.querySelector(".mini-container");
const form = document.getElementById("edit-form");
const editTitle = document.getElementById("edit-title");
const editDescription = document.getElementById("edit-description");
const priority = document.querySelector(".todo-priority");
const editPriority = document.getElementById("edit-priority");
const editDueDate = document.getElementById("edit-due-date");
const deleteBtn = document.querySelector(".delete-btn");
const editBtn = document.querySelector(".edit-btn");
const saveBtn = document.querySelector(".save-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const timer = document.getElementById("timer");
const overdueTimer = document.querySelector(".overdue-timer");
const dueDate = document.getElementById("due-date");
const error = document.querySelector(".error");

const states = JSON.parse(localStorage.getItem("states")) || {
  title: title.textContent,
  description: description.textContent,
  dueDate: "2026-04-30T11:59",
  priority: "High Priority",
  select: statusControl.value,
  checked: false,
};

function checkPriority(priorityType) {
  priority.classList.remove("low", "medium", "high");
  priorityIndicator.classList.remove("low", "medium", "high");
  if (priorityType === "High Priority") {
    priority.classList.add("high");
    priorityIndicator.classList.add("high");
  } else if (priorityType === "Medium Priority") {
    priority.classList.add("medium");
    priorityIndicator.classList.add("medium");
  } else {
    priority.classList.add("low");
    priorityIndicator.classList.add("low");
  }
}

function saveStates() {
  states.title = editTitle.value;
  states.description = editDescription.value;
  states.dueDate = editDueDate.value;
  states.priority = editPriority.value;
  states.select = statusControl.value;
  localStorage.setItem("states", JSON.stringify(states));
}

function renderPage() {
  checkPriority(states.priority);

  title.textContent = states.title;
  description.textContent = states.description;
  dueDate.textContent = formatDate(states.dueDate);
  priority.textContent = states.priority;

  statusControl.value = states.select;
  checkbox.checked = states.checked;

  if (states.select === "Done") {
    timer.textContent = "Completed!";
    clearInterval(interValId);
  } else {
    timer.textContent = calculateTime(states.dueDate);
  }
}

function expandCollapse() {
  if (description.offsetHeight > 80) {
    toggleExpandCollapseContainer.classList.remove("hidden");
  } else {
    toggleExpandCollapseContainer.classList.add("hidden");
  }
}

function formatDate(isoString) {
  const date = new Date(isoString);
  const day = date.getDate();
  const year = date.getFullYear();
  const month = date.toLocaleString("en-US", { month: "long" });
  return `${month} ${day}, ${year}`;
}
function checkStatus() {
  todoStatus.classList.remove("progress", "pending", "done");
  title.classList.remove("done");
  checkbox.checked = states.checked;
  if (statusControl.value === "Pending") {
    todoStatus.textContent = "Pending";
    todoStatus.classList.add("pending");
    checkbox.checked = false;
  } else if (statusControl.value === "In Progress") {
    todoStatus.textContent = "In Progress";
    todoStatus.classList.add("progress");
    checkbox.checked = false;
  } else {
    todoStatus.textContent = "Done";
    todoStatus.classList.add("done");
    title.classList.add("done");
    checkbox.checked = true;
    timer.textContent = "Completed!";
  }
}

function calculateTime(time) {
  const now = new Date();
  const dueDate = new Date(time);
  const timeMs = dueDate - now;

  timer.classList.remove("time-almost-up", "hidden");

  if (timeMs < 0) {
    const absTime = Math.abs(timeMs);

    const days = Math.floor(absTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((absTime / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((absTime / (1000 * 60)) % 60);

    overdueTimer.classList.add("visible");
    timer.classList.add("hidden");

    if (days > 0) {
      overdueTimer.textContent = `Due ${days} day(s) ago`;
    } else if (hours > 0) {
      overdueTimer.textContent = `Due ${hours} hour(s) ago`;
    } else {
      overdueTimer.textContent = `Due ${minutes} minute(s) ago`;
    }

    return;
  }
  overdueTimer.classList.remove("visible");

  const days = Math.floor(timeMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeMs / (1000 * 60)) % 60);

  if (days > 1) {
    return `Due in ${days} days`;
  } else if (days === 1) {
    return `Due in 1 day, ${hours} hour(s)`;
  } else if (hours >= 1) {
    timer.classList.add("time-almost-up");
    return `Due in ${hours} hour(s)`;
  } else {
    timer.classList.add("time-almost-up");
    return `Due in ${minutes} minute(s)`;
  }
}

let interValId = setInterval(() => {
  timer.textContent = calculateTime(states.dueDate);
}, 60000);
timer.textContent = calculateTime(states.dueDate);
renderPage();
checkStatus();
expandCollapse();

checkbox.addEventListener("change", () => {
  states.checked = checkbox.checked;
  states.select = checkbox.checked ? "Done" : "In Progress";

  // if (checkbox.checked) {
  //   todoStatus.textContent = "Done";
  //   todoStatus.classList.add("done");
  //   title.classList.add("done");
  //   statusControl.value = "Done";
  //   timer.classList.remove("hidden");
  //   clearInterval(interValId);
  //   timer.textContent = "Completed!";
  //   overdueTimer.classList.remove("visible");
  // } else {
  //   todoStatus.classList.remove("done");
  //   todoStatus.textContent = "In Progress";
  //   todoStatus.classList.add("progress");
  //   title.classList.remove("done");
  //   statusControl.value = "In Progress";
  //   timer.textContent = calculateTime(states.dueDate);
  // }
  if (checkbox.checked) {
    statusControl.value = "Done";
    clearInterval(interValId);
    timer.textContent = "Completed!";
    overdueTimer.classList.remove("visible");
  } else {
    statusControl.value = "In Progress";
    timer.textContent = calculateTime(states.dueDate);
  }
  localStorage.setItem("states", JSON.stringify(states));
  checkStatus();
});

deleteBtn.addEventListener("click", () => {
  container.remove();
});

editBtn.addEventListener("click", () => {
  setTimeout(() => {
    miniContainer.classList.add("hidden");
    form.classList.remove("hidden");
  }, 500);
});

saveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (editTitle.value && editDescription.value && editDueDate.value) {
    error.classList.add("hidden");
    title.textContent = editTitle.value;
    description.textContent = editDescription.value;
    miniContainer.classList.remove("hidden");
    form.classList.add("hidden");
    checkPriority(editPriority.value);
    priority.textContent = editPriority.value;
    dueDate.textContent = formatDate(editDueDate.value);

    clearInterval(interValId);
    timer.textContent = calculateTime(editDueDate.value);
    interValId = setInterval(() => {
      timer.textContent = calculateTime(editDueDate.value);
    }, 60000);
    saveStates();
  } else {
    document.querySelectorAll(".form-input").forEach((input) => {
      if (!input.value) {
        input.classList.add("mistake");
      }
    });
    error.classList.remove("hidden");
  }
  expandCollapse();
});

cancelBtn.addEventListener("click", () => {
  miniContainer.classList.remove("hidden");
  form.classList.add("hidden");
});

document.querySelectorAll(".form-input").forEach((input) => {
  input.addEventListener("focus", () => {
    input.classList.remove("mistake");
    error.classList.add("hidden");
  });
});

expandCollapseButton.addEventListener("click", () => {
  if (expandCollapseButton.textContent === "Expand") {
    descriptionContainer.classList.remove("collapsible");
    expandCollapseButton.textContent = "Collapse";
    expandCollapseButton.setAttribute("aria-expanded", "true");
  } else {
    descriptionContainer.classList.add("collapsible");
    expandCollapseButton.textContent = "Expand";
    expandCollapseButton.setAttribute("aria-expanded", "false");
  }
});

statusControl.addEventListener("change", () => {
  states.select = statusControl.value;
  states.checked = statusControl.value === "Done";

  localStorage.setItem("states", JSON.stringify(states));
  checkStatus();
});
