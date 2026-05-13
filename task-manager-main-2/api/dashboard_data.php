<?php
session_start();
include "../includes/db_connect.php";

if (!isset($_SESSION["user_id"])) {
    echo "Please log in first";
    exit();
}

$user_id = $_SESSION["user_id"];

echo "<h2>Dashboard Summary</h2>";

$sql_tasks = "SELECT COUNT(*) AS total_tasks FROM tasks WHERE user_id = ?";
$stmt_tasks = mysqli_prepare($conn, $sql_tasks);
mysqli_stmt_bind_param($stmt_tasks, "i", $user_id);
mysqli_stmt_execute($stmt_tasks);
$result_tasks = mysqli_stmt_get_result($stmt_tasks);
$tasks = mysqli_fetch_assoc($result_tasks);

echo "Total Tasks: " . $tasks["total_tasks"] . "<br>";

$sql_completed = "SELECT COUNT(*) AS completed_tasks FROM tasks WHERE user_id = ? AND status = 'Completed'";
$stmt_completed = mysqli_prepare($conn, $sql_completed);
mysqli_stmt_bind_param($stmt_completed, "i", $user_id);
mysqli_stmt_execute($stmt_completed);
$result_completed = mysqli_stmt_get_result($stmt_completed);
$completed = mysqli_fetch_assoc($result_completed);

echo "Completed Tasks: " . $completed["completed_tasks"] . "<br>";

$sql_tracking = "SELECT 
                    AVG(hours_slept) AS avg_sleep,
                    SUM(study_hours) AS total_study,
                    SUM(daily_spending) AS total_spending
                 FROM daily_tracking
                 WHERE user_id = ?";

$stmt_tracking = mysqli_prepare($conn, $sql_tracking);
mysqli_stmt_bind_param($stmt_tracking, "i", $user_id);
mysqli_stmt_execute($stmt_tracking);
$result_tracking = mysqli_stmt_get_result($stmt_tracking);
$tracking = mysqli_fetch_assoc($result_tracking);

echo "Average Sleep: " . round($tracking["avg_sleep"], 2) . " hours<br>";
echo "Total Study Time: " . round($tracking["total_study"], 2) . " hours<br>";
echo "Total Spending: $" . round($tracking["total_spending"], 2) . "<br>";
?>