const checkbox = document.getElementById("toggleCheckbox");
const todoStatus = document.querySelector(".todo-status");
const title = document.getElementById("todo-title");
const container = document.querySelector(".container");
const deleteBtn = document.querySelector(".delete-btn");
const editBtn = document.querySelector(".edit-btn");
const timer = document.getElementById("timer");
const dueDate = document.getElementById("due-date");
let timeRemaining = "";
const now = new Date();

function calculateTime() {
  console.log("him");
  const dueDate = new Date("2026-04-30T11:59:00");
  const timeMs = dueDate - now;
  console.log(timeMs);
  const minutes = Math.floor(timeMs / (1000 * 60));
  const hours = Math.floor(timeMs / (1000 * 60 * 60));
  const days = Math.floor(timeMs / (1000 * 60 * 60 * 24));
  timer.classList.remove("time-almost-up");
  if (timeMs <= 0) {
    timer.classList.add("time-almost-up");
    return `Time's up!`;
  }
  if (days > 1) {
    return `Due in ${days} days`;
  } else if (days === 1) {
    timer.classList.add("time-almost-up");
    return `Due tomorrow!`;
  } else if (days < 1 && hours >= 1) {
    timer.classList.add("time-almost-up");
    return `Due in ${hours} hour(s)`;
  } else if (days < 1 && hours < 1 && minutes >= 0) {
    timer.classList.add("time-almost-up");
    return `Due in ${minutes} minutes`;
  }
}

setInterval(() => {
  timeRemaining = calculateTime();
  timer.textContent = timeRemaining;
}, 60000);
timeRemaining = calculateTime();
timer.textContent = timeRemaining;

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    todoStatus.textContent = "Done";
    todoStatus.classList.add("done");
    title.classList.add("done");
  } else {
    todoStatus.classList.remove("done");
    todoStatus.textContent = "In Progress";
    title.classList.remove("done");
  }
});

deleteBtn.addEventListener("click", () => {
  container.remove();
});

editBtn.addEventListener("click", () => {
  setTimeout(() => {
    alert("Nothing to edit here...");
  }, 500);
});
