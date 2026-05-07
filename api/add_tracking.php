<?php
session_start();
include "../includes/db_connect.php";

if (!isset($_SESSION["user_id"])) {
    echo "Please log in first";
    exit();
}

$user_id = $_SESSION["user_id"];
$tracking_date = $_POST["tracking_date"];
$hours_slept = $_POST["hours_slept"];
$study_hours = $_POST["study_hours"];
$daily_spending = $_POST["daily_spending"];
$notes = $_POST["notes"];

$sql = "INSERT INTO daily_tracking 
        (user_id, tracking_date, hours_slept, study_hours, daily_spending, notes)
        VALUES (?, ?, ?, ?, ?, ?)";

$stmt = mysqli_prepare($conn, $sql);

mysqli_stmt_bind_param(
    $stmt,
    "isddds",
    $user_id,
    $tracking_date,
    $hours_slept,
    $study_hours,
    $daily_spending,
    $notes
);

if (mysqli_stmt_execute($stmt)) {
    echo "Tracking data added successfully";
} else {
    echo "Error: " . mysqli_error($conn);
}
?>