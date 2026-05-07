<?php
session_start();
include "../includes/db_connect.php";

if (!isset($_SESSION["user_id"])) {
    echo "Please log in first";
    exit();
}

$user_id = $_SESSION["user_id"];
$task_title = $_POST["task_title"];
$task_description = $_POST["task_description"];
$due_date = $_POST["due_date"];
$status = "Pending";

$sql = "INSERT INTO tasks (user_id, task_title, task_description, due_date, status)
        VALUES (?, ?, ?, ?, ?)";

$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "issss", $user_id, $task_title, $task_description, $due_date, $status);

if (mysqli_stmt_execute($stmt)) {
    echo "Task added successfully";
} else {
    echo "Error: " . mysqli_error($conn);
}
?>