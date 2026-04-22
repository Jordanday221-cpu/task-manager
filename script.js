let selectedMood = null;
let selectedMoodValue = null;
let history = [];

// INIT
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("datePicker").valueAsDate = new Date();

  // teammate preloaded tasks
  const tasks = [
    "CSC 350: Design project proposal",
    "CSC 350: Create database schema",
    "CSC 350: Implement frontend interface",
    "CSC 350: Test application functionality"
  ];

  tasks.forEach(task => addTask(task));
});

// TASKS
function addTask(preloadedTask = null) {
  const input = document.getElementById("taskInput");
  const value = preloadedTask || input.value;

  if (!value.trim()) return;

  const li = document.createElement("li");

  li.innerHTML = `
    ${value}
    <button class="delete-btn" onclick="this.parentElement.remove()">Delete</button>
  `;

  document.getElementById("taskList").appendChild(li);
  input.value = "";
}

// MOOD
function setMood(mood) {
  selectedMood = mood;

  const map = {
    good: { text: "😊 Good", value: 3 },
    okay: { text: "😐 Okay", value: 2 },
    bad: { text: "😞 Bad", value: 1 }
  };

  document.getElementById("moodDisplay").innerText =
    "Mood: " + map[mood].text;

  selectedMoodValue = map[mood].value;
}

// SAVE DAY
function saveDay() {
  const date = document.getElementById("datePicker").value;
  const sleep = document.getElementById("sleep").value;
  const study = document.getElementById("study").value;
  const spending = document.getElementById("spending").value;

  const tasks = [...document.querySelectorAll("#taskList li")]
    .map(li => li.childNodes[0].textContent.trim());

  const entry = {
    date,
    sleep: Number(sleep),
    study: Number(study),
    spending: Number(spending),
    mood: {
      label: selectedMood,
      value: selectedMoodValue
    },
    tasks
  };

  history.push(entry);

  renderHistory();

  // reset UI
  document.getElementById("taskList").innerHTML = "";
  document.getElementById("sleep").value = "";
  document.getElementById("study").value = "";
  document.getElementById("spending").value = "";
  document.getElementById("moodDisplay").innerText = "Mood: —";
  selectedMood = null;
  selectedMoodValue = null;
}

// HISTORY
function renderHistory() {
  const container = document.getElementById("history");
  container.innerHTML = "";

  history.forEach(h => {
    const div = document.createElement("div");
    div.style.marginBottom = "10px";

    div.innerHTML = `
      <b>${h.date}</b><br/>
      Sleep: ${h.sleep} | Study: ${h.study} | Spend: $${h.spending}<br/>
      Mood: ${h.mood?.label || "—"}
    `;

    container.appendChild(div);
  });
}