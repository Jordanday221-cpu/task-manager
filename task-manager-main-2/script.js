let selectedMood = null;
let selectedMoodValue = null;

document.addEventListener("DOMContentLoaded", () => {
  const dp = document.getElementById("datePicker");
  if (dp) dp.valueAsDate = new Date();
  loadTasks();
});

// ── ADD TASK ──
function addTask() {
  const input = document.getElementById("taskInput");
  const dp = document.getElementById("taskDatePicker") || document.getElementById("datePicker");
  const value = input.value.trim();
  if (!value) return;

  const formData = new FormData();
  formData.append("task_title", value);
  formData.append("task_description", "");
  formData.append("due_date", dp ? dp.value : new Date().toISOString().split('T')[0]);

  fetch("api/add_task.php", { method: "POST", body: formData })
    .then(r => r.text())
    .then(() => { input.value = ""; loadTasks(); });
}

// ── LOAD TASKS ──
function loadTasks() {
  fetch("api/get_tasks.php")
    .then(r => r.text())
    .then(data => {
      const el = document.getElementById("taskList");
      if (el) el.innerHTML = data || '<li style="color:var(--muted);font-size:13px;padding:8px 0;">No tasks yet — add one above!</li>';
    });
}

// ── UPDATE / DELETE TASK ──
function updateTask(taskId) {
  const sel = document.getElementById("status_" + taskId);
  if (!sel) return;

  const formData = new FormData();
  formData.append("task_id", taskId);
  formData.append("status", sel.value);

  fetch("api/update_task.php", { method: "POST", body: formData })
    .then(r => r.text())
    .then(() => loadTasks());
}

function deleteTask(taskId) {
  const formData = new FormData();
  formData.append("task_id", taskId);

  fetch("api/delete_task.php", { method: "POST", body: formData })
    .then(r => r.text())
    .then(() => loadTasks());
}

// ── MOOD (emoji fix: use text content not innerHTML) ──
function setMood(mood) {
  selectedMood = mood;

  const map = {
    good:  { label: "😄 Feeling good",  value: 3, cls: "selected-good" },
    okay:  { label: "😐 Pretty okay",   value: 2, cls: "selected-okay" },
    bad:   { label: "😞 Rough day",     value: 1, cls: "selected-bad"  },
  };

  // clear all selections
  ["moodGood","moodOkay","moodBad"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.className = "mood-btn";
  });

  // apply selected class
  const btnId = mood === 'good' ? 'moodGood' : mood === 'okay' ? 'moodOkay' : 'moodBad';
  const btn = document.getElementById(btnId);
  if (btn) btn.classList.add(map[mood].cls);

  selectedMoodValue = map[mood].value;

  const display = document.getElementById("moodDisplay");
  if (display) display.textContent = map[mood].label;
}

// ── SAVE DAY ──
function saveDay() {
  const dp = document.getElementById("datePicker");
  const formData = new FormData();

  formData.append("tracking_date", dp ? dp.value : new Date().toISOString().split('T')[0]);
  formData.append("hours_slept",   document.getElementById("sleep").value    || 0);
  formData.append("study_hours",   document.getElementById("study").value    || 0);
  formData.append("daily_spending",document.getElementById("spending").value || 0);
  formData.append("notes",         "Mood: " + (selectedMood || "none"));

  fetch("api/add_tracking.php", { method: "POST", body: formData })
    .then(r => r.text())
    .then(() => {
      document.getElementById("sleep").value    = "";
      document.getElementById("study").value    = "";
      document.getElementById("spending").value = "";

      const display = document.getElementById("moodDisplay");
      if (display) display.textContent = "No mood selected";

      // clear mood buttons
      ["moodGood","moodOkay","moodBad"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.className = "mood-btn";
      });

      selectedMood = null;
      selectedMoodValue = null;
    });
}

// ── LOGOUT ──
function logout() {
  fetch("api/logout.php")
    .then(r => r.text())
    .then(() => { window.location.href = "index.html"; });
}