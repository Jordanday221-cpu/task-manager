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
    $status = htmlspecialchars($row["status"]);
    $taskId = $row["task_id"];

    $badgeClass = "status-pending";
    if ($status === "In Progress") $badgeClass = "status-progress";
    if ($status === "Completed")   $badgeClass = "status-done";

    echo "<li class='task-item'>";
    echo "<span class='task-name'>" . htmlspecialchars($row["task_title"]) . "</span>";
    echo "<div class='task-actions'>";
    echo "<select id='status_{$taskId}' style='width:130px;padding:6px 10px;font-size:12px;'>";
    echo "<option value='Pending'"     . ($status == "Pending"     ? " selected" : "") . ">Pending</option>";
    echo "<option value='In Progress'" . ($status == "In Progress" ? " selected" : "") . ">In Progress</option>";
    echo "<option value='Completed'"   . ($status == "Completed"   ? " selected" : "") . ">Completed</option>";
    echo "</select>";
    echo "<button class='btn btn-ghost btn-sm' onclick='updateTask({$taskId})'>Save</button>";
    echo "<button class='btn btn-danger btn-sm' onclick='deleteTask({$taskId})'>✕</button>";
    echo "</div>";
    echo "</li>";
}
?>