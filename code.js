// Ensure DOM is loaded before running scripts
document.addEventListener("DOMContentLoaded", function () {
    setupNavigation();
    setupPomodoro();
    setupTaskManager();
    setupFocusSounds();
    setupProgressTracker();
    setupAuth();
});

// 🔹 1. NAVIGATION SYSTEM (Handles page links)
function setupNavigation() {
    document.querySelectorAll(".feature-card").forEach((card) => {
        card.addEventListener("click", function () {
            const feature = this.getAttribute("data-feature");
            window.location.href = `${feature}.html`;
        });
    });
}

// 🔹 2. POMODORO TIMER
function setupPomodoro() {
    if (!document.getElementById("timer")) return;

    let timer, timeLeft = 1500; // 25 min default
    const timerDisplay = document.getElementById("timer");
    const startButton = document.getElementById("start-timer");
    const resetButton = document.getElementById("reset-timer");

    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    startButton.addEventListener("click", () => {
        if (!timer) {
            timer = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateTimer();
                } else {
                    clearInterval(timer);
                    timer = null;
                    alert("Time's up! Take a break.");
                }
            }, 1000);
        }
    });

    resetButton.addEventListener("click", () => {
        clearInterval(timer);
        timer = null;
        timeLeft = 1500;
        updateTimer();
    });

    updateTimer();
}

// 🔹 3. TASK MANAGER (Add, Remove & Save Tasks)
function setupTaskManager() {
    if (!document.getElementById("task-input")) return;

    const taskInput = document.getElementById("task-input");
    const addTaskButton = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach((task) => addTask(task));
    }

    function saveTasks() {
        const tasks = Array.from(document.querySelectorAll("#task-list li")).map((li) => li.textContent.replace("✔", "").trim());
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function addTask(text) {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `${text} <button class="remove-task">✔</button>`;
        taskItem.querySelector(".remove-task").addEventListener("click", () => {
            taskItem.remove();
            saveTasks();
        });
        taskList.appendChild(taskItem);
    }

    addTaskButton.addEventListener("click", () => {
        if (taskInput.value.trim() !== "") {
            addTask(taskInput.value);
            saveTasks();
            taskInput.value = "";
        }
    });

    loadTasks();
}

// 🔹 4. FOCUS SOUNDS
function setupFocusSounds() {
    if (!document.getElementById("sound-select")) return;

    const soundSelect = document.getElementById("sound-select");
    const playButton = document.getElementById("play-sound");
    const stopButton = document.getElementById("stop-sound");
    const audio = new Audio();

    playButton.addEventListener("click", () => {
        if (soundSelect.value) {
            audio.src = `sounds/${soundSelect.value}`;
            audio.loop = true;
            audio.play();
        }
    });

    stopButton.addEventListener("click", () => {
        audio.pause();
    });
}

// 🔹 5. PROGRESS TRACKER (Save Study Data)
function setupProgressTracker() {
    if (!document.getElementById("study-time")) return;

    let studyTime = localStorage.getItem("studyTime") || 0;
    let tasksCompleted = localStorage.getItem("tasksCompleted") || 0;

    document.getElementById("study-time").textContent = studyTime;
    document.getElementById("tasks-completed").textContent = tasksCompleted;
    <script src="script.js" defer></script>

}               
    });
}
