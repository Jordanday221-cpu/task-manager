function addTask() {
  const input = document.getElementById("task");

  if (input.value === "") return;

  const li = document.createElement("li");

  li.innerHTML = `
    ${input.value}
    <button onclick="this.parentElement.remove()">Delete</button>
  `;

  document.getElementById("list").appendChild(li);
  input.value = "";
}

// CSC 350 PRELOADED TASKS
window.onload = function () {
  const tasks = [
    "CSC 350: Design project proposal",
    "CSC 350: Create database schema",
    "CSC 350: Implement frontend interface",
    "CSC 350: Test application functionality"
  ];

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${task}
      <button onclick="this.parentElement.remove()">Delete</button>
    `;
    document.getElementById("list").appendChild(li);
  });
};
