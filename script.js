function addTask() {
  const input = document.getElementById("task");
  const li = document.createElement("li");
  li.textContent = input.value;

  document.getElementById("list").appendChild(li);
  input.value = "";
}
