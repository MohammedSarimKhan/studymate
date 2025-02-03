// POMODORO TIMER
let timer;
let timeLeft = 1500; // 25 minutes
const timerDisplay = document.getElementById("timer");

document.getElementById("start-timer").addEventListener("click", () => {
    if (!timer) {
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timer);
                timer = null;
                alert("Time's up! Take a break.");
            }
        }, 1000);
    }
});

document.getElementById("reset-timer").addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
    timeLeft = 1500;
    updateTimerDisplay();
});

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// TASK MANAGER
document.getElementById("add-task").addEventListener("click", () => {
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    if (taskInput.value.trim() !== "") {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `${taskInput.value} <button onclick="removeTask(this)">?</button>`;
        taskList.appendChild(taskItem);
        updateProgress();
        taskInput.value = "";
    }
});

function removeTask(button) {
    button.parentElement.remove();
    updateProgress();
}

// FOCUS SOUNDS
const soundSelect = document.getElementById("sound-select");
const audio = new Audio();

document.getElementById("play-sound").addEventListener("click", () => {
    audio.src = `sounds/${soundSelect.value}`;
    audio.loop = true;
    audio.play();
});

document.getElementById("stop-sound").addEventListener("click", () => {
    audio.pause();
});

// PROGRESS TRACKER
function updateProgress() {
    document.getElementById("tasks-completed").textContent = document.getElementById("task-list").children.length;
}

// THEME TOGGLE
document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
