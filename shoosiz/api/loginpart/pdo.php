<?php
// علی شرحان
//داش ستیز اینجا به دیتا بیس وصل شو و همه جا ازش استفاده کن
$host = 'localhost';
$db = 'Shosiz';
$user = 'root';
$pass = '';
try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("خطا در اتصال به دیتابیس: " . $e->getMessage());
}
?>
