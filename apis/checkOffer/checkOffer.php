<?php

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}
// header('Access-Control-Allow-Origin: http://localhost:3001');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('HTTP/1.1 204 No Content');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $conn = new mysqli('localhost', 'root', '', 'shosiz');

    if ($conn->connect_error) {
        echo json_encode(['success' => false, 'message' => 'Database connection failed']);
        exit;
    }

    // دریافت کد تخفیف از GET
    $discount_code = $_GET['discount_code'] ?? '';
    

    if (empty($discount_code)) {
        echo json_encode(['success' => false, 'message' => 'Discount code is required']);
        exit;
    }

    // بررسی کد تخفیف در دیتابیس
    $stmt = $conn->prepare("SELECT Offerpersen FROM offercodes WHERE OfferCode1 = ?");
    $stmt->bind_param("s", $discount_code);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        echo json_encode([
            'success' => true,
            'Offerpersen' => (float)$row['Offerpersen']
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid discount code']);
    }

    $stmt->close();
    $conn->close();
}

?>