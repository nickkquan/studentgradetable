<?php

$servername = "127.0.0.1";
$username = "root";
$password = "root";
$dbname = "DB NAME";

// Configure MYSQL credentials

$connection = new mysqli($servername, $username, $password, $dbname);

if ($connection->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$truncateSQL = "TRUNCATE TABLE students";
$truncateResult = $connection->query($truncateSQL);

$reinsertSQL = "INSERT INTO `students` (`student_id`, `name`, `course`, `grade`) VALUES
(18, 'Brandon', 'Algebra', 99),
(19, 'Emily', 'Sociology', 100),
(20, 'Curtis', 'History', 95),
(21, 'Oliver', 'Machine Shop', 98),
(22, 'Timothy', 'Physical Education', 99),
(23, 'Joshua', 'Korean', 100),
(24, 'George', 'Chemistry', 96),
(25, 'Michael', 'Finance', 99),
(26, 'Jessica', 'Criminology', 98),
(27, 'Justin', 'Economics', 95),
(28, 'Matthew', 'Statistics', 75),
(29, 'Nicole', 'Writing Composition', 85),
(30, 'Christina', 'Geometry', 88),
(31, 'Rachel', 'Physics', 92),
(32, 'Robert', 'Earth Sciences', 77),
(33, 'Keith', 'Algebra II', 84);";
$reinsertResult = $connection->query($reinsertSQL);

$connection->close();

?>