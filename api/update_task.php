<?php
session_start();
include "../includes/db_connect.php";

if (!isset($_SESSION["user_id"])) {
    echo "Please log in first";
    exit();
}

$user_id = $_SESSION["user_id"];
$task_id = $_POST["task_id"];
$status = $_POST["status"];

$sql = "UPDATE tasks SET status = ? WHERE task_id = ? AND user_id = ?";
$stmt = mysqli_prepare($conn, $sql);

mysqli_stmt_bind_param($stmt, "sii", $status, $task_id, $user_id);

if (mysqli_stmt_execute($stmt)) {
    echo "Task updated successfully";
} else {
    echo "Error: " . mysqli_error($conn);
}
?>