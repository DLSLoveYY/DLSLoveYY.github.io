<?php
header("Content-Type: application/json");

// 数据库连接参数
$host = 'localhost';
$db   = 'message_board';
$user = 'root';
$pass = '123456'; // 修改为你的密码
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);

    // 查询所有留言，按时间倒序排列
    $stmt = $pdo->query("SELECT name, email, message, created_at FROM comments ORDER BY created_at DESC");

    $comments = $stmt->fetchAll();
    echo json_encode(["success" => true, "comments" => $comments]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
?>
