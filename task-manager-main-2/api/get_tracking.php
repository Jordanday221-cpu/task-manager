<?php
session_start();
include "../includes/db_connect.php";

if (!isset($_SESSION["user_id"])) {
    echo "Please log in first";
    exit();
}

$user_id = $_SESSION["user_id"];

$sql = "SELECT * FROM daily_tracking WHERE user_id = ? ORDER BY tracking_date DESC";
$stmt = mysqli_prepare($conn, $sql);

mysqli_stmt_bind_param($stmt, "i", $user_id);
mysqli_stmt_execute($stmt);

$result = mysqli_stmt_get_result($stmt);

while ($row = mysqli_fetch_assoc($result)) {
    echo "Date: " . $row["tracking_date"] . "<br>";
    echo "Hours Slept: " . $row["hours_slept"] . "<br>";
    echo "Study Hours: " . $row["study_hours"] . "<br>";
    echo "Daily Spending: $" . $row["daily_spending"] . "<br>";
    echo "Notes: " . $row["notes"] . "<br><br>";
}
?>