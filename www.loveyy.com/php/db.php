<?php
$host = 'localhost';
$db   = 'message_board';
$user = 'root';
$pass = '123456'; // 你自己设的密码
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
    echo "✅ 数据库连接成功";
} catch (PDOException $e) {
    echo "❌ 数据库连接失败：" . $e->getMessage();
}
?>
