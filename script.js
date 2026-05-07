let selectedMood = null;
let selectedMoodValue = null;

// alert("script loaded");

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("datePicker").valueAsDate = new Date();
  loadTasks();
  loadHistory();
});

function addTask() {
  const input = document.getElementById("taskInput");
  const value = input.value;

  if (!value.trim()) return;

  const formData = new FormData();
  formData.append("task_title", value);
  formData.append("task_description", "");
  formData.append("due_date", document.getElementById("datePicker").value);

  fetch("api/add_task.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      input.value = "";
      loadTasks();
    });
}

function loadTasks() {
  fetch("api/get_tasks.php")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("taskList").innerHTML = data;
    });
}

function updateTask(taskId) {
  const status = document.getElementById("status_" + taskId).value;

  const formData = new FormData();
  formData.append("task_id", taskId);
  formData.append("status", status);

  fetch("api/update_task.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      loadTasks();
    });
}

function deleteTask(taskId) {
  const formData = new FormData();
  formData.append("task_id", taskId);

  fetch("api/delete_task.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      loadTasks();
    });
}

function setMood(mood) {
  selectedMood = mood;

  const map = {
    good: { text: "😊 Good", value: 3 },
    okay: { text: "😐 Okay", value: 2 },
    bad: { text: "😞 Bad", value: 1 },
  };

  document.getElementById("moodDisplay").innerText = "Mood: " + map[mood].text;

  selectedMoodValue = map[mood].value;
}

function saveDay() {
  const formData = new FormData();

  formData.append("tracking_date", document.getElementById("datePicker").value);
  formData.append("hours_slept", document.getElementById("sleep").value);
  formData.append("study_hours", document.getElementById("study").value);
  formData.append("daily_spending", document.getElementById("spending").value);
  formData.append("notes", "Mood: " + (selectedMood || "none"));

  fetch("api/add_tracking.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("sleep").value = "";
      document.getElementById("study").value = "";
      document.getElementById("spending").value = "";
      document.getElementById("moodDisplay").innerText = "Mood: —";

      selectedMood = null;
      selectedMoodValue = null;

      loadHistory();
    });
}

function loadHistory() {
  fetch("api/get_tracking.php")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("history").innerHTML = data;
    });
}

function logout() {
  fetch("api/logout.php")
    .then((response) => response.text())
    .then((data) => {
      window.location.href = "index.html";
    });
}
