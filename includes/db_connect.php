<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

$host = "turntable.proxy.rlwy.net";
$username = "root";
$password = "ZDaPkBxlSDbNSWDoSgQoFJbQCHwpGDhu";
$database = "railway";
$port = 30284;

$conn = mysqli_connect(
    $host,
    $username,
    $password,
    $database,
    $port
);

if (!$conn) {
    die("Database connection failed: " . mysqli_connect_error());
}

// echo "Database connected successfully";

?>
