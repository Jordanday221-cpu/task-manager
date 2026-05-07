<?php
session_start();
include "../includes/db_connect.php";

$name = $_POST["name"];
$email = $_POST["email"];
$password = password_hash($_POST["password"], PASSWORD_DEFAULT);

$sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
$stmt = mysqli_prepare($conn, $sql);

mysqli_stmt_bind_param($stmt, "sss", $name, $email, $password);

if (mysqli_stmt_execute($stmt)) {
    echo "Registration successful";
} else {
    echo "Error: " . mysqli_error($conn);
}
?>