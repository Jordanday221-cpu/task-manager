<?php
session_start();
include "../includes/db_connect.php";

if (!isset($_SESSION["user_id"])) {
    echo "Please log in first";
    exit();
}

$user_id = $_SESSION["user_id"];

$sql = "SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC";
$stmt = mysqli_prepare($conn, $sql);

mysqli_stmt_bind_param($stmt, "i", $user_id);
mysqli_stmt_execute($stmt);

$result = mysqli_stmt_get_result($stmt);

while ($row = mysqli_fetch_assoc($result)) {
    echo "<li>";
    echo "<strong>" . htmlspecialchars($row["task_title"]) . "</strong>";
    echo " - Status: " . htmlspecialchars($row["status"]);

    echo "<br>";

    echo "<select id='status_" . $row["task_id"] . "'>";
    echo "<option value='Pending' " . ($row["status"] == "Pending" ? "selected" : "") . ">Pending</option>";
    echo "<option value='In Progress' " . ($row["status"] == "In Progress" ? "selected" : "") . ">In Progress</option>";
    echo "<option value='Completed' " . ($row["status"] == "Completed" ? "selected" : "") . ">Completed</option>";
    echo "</select>";

    echo " <button onclick='updateTask(" . $row["task_id"] . ")'>Update</button>";
    echo " <button class='delete-btn' onclick='deleteTask(" . $row["task_id"] . ")'>Delete</button>";

    echo "</li>";
}
?>