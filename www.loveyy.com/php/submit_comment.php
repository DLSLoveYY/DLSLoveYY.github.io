<?php
$host = 'localhost';
$db   = 'message_board';
$user = 'root';
$pass = '123456';
$charset = 'utf8mb4';
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);

    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $message = $_POST['message'] ?? '';
    $imagePath = null;

    // 上传图片处理
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
        $targetDir = "../uploads/";
        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0777, true);
        }
        $filename = uniqid() . '.' . $ext;
        $targetFile = $targetDir . $filename;

        if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
            $imagePath = "uploads/" . $filename;
        }
    }

    if ($name && $message) {
        $stmt = $pdo->prepare("INSERT INTO comments (name, email, message, image_path) VALUES (?, ?, ?, ?)");
        $stmt->execute([$name, $email, $message, $imagePath]);
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => "请填写昵称和留言内容"]);
    }

} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
?>
