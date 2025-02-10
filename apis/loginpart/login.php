<?php
    
    //     header('Content-Type: application/json');
    // header('Access-Control-Allow-Origin: *');
    // header('Access-Control-Allow-Methods: GET, POST');
    // header('Access-Control-Allow-Headers: Content-Type');
/*
    header('Access-Control-Allow-Origin: http://localhost:3001'); // یا '*' برای همه دامنه‌ها
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

// اگر درخواست از نوع OPTIONS باشد، باید پاسخ بدهیم
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('HTTP/1.1 204 No Content');
    exit;
}

    session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    // استخراج username و password
    $email  = $input['email'] ?? '';
    $password = $input['password'] ?? '';
    // $email = filter_var($input['email'], FILTER_SANITIZE_EMAIL)?? '';
    // $password = filter_var($input['password'], FILTER_SANITIZE_STRING)?? '';


    // بررسی اینکه ورودی‌ها خالی نباشند
    if (!empty($email) && !empty($password)) {
        $conn = new mysqli('localhost', 'root', '', 'shosiz');
        
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // اصلاح نام جدول
        $stmt = $conn->prepare("SELECT password FROM userss WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            // $stmt->bind_result($hashed_password);
            $stmt->bind_result($stored_password);
            $stmt->fetch();

            // if (password_verify($password, $hashed_password)) {
            if ($password == $stored_password) {
                $_SESSION['email'] = $email ;
                echo json_encode(['success' => true, 'message' => 'ورود موفقیت امیز بود!']);
            } else {
                echo json_encode(['success' => false, 'message' => 'رمز عبور نادرست است.']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'کاربر پیدا نشد.']);
        }

        $stmt->close();
        $conn->close();
    } else {
        echo json_encode(['success' => false, 'message' => ' اطلاعات باید کامل پر شده باشند! ']);
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode([
        'status' => 'error',
        'message' => 'Only POST method is allowed.',
    ]);
}

*/



require_once '../includes/JWT.php';
use Firebase\JWT\JWT;

// header("Access-Control-Allow-Origin: *");

// header('Access-Control-Allow-Origin: http://localhost:3001'); // یا '*' برای همه دامنه‌ها
// header("Access-Control-Allow-Origin: http://192.168.107.250:3001");

// $allowed_origins = [
//     "http://192.168.107.250:3001",
//     "http://localhost:3001"
// ];

// if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
//     header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
// }

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}

header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

// اگر درخواست از نوع OPTIONS باشد، باید پاسخ بدهیم
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('HTTP/1.1 204 No Content');
    exit;
}

// echo json_encode(['success' => false, 'message' => 'ورود موفقیت امیز بود!']);
// exit;

$secret_key = "my_secret_key";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $email  = $input['email'] ?? '';
    $password = $input['password'] ?? '';

    if (!empty($email) && !empty($password)) {
        $conn = new mysqli('localhost', 'root', '', 'shosiz');
        
        if ($conn->connect_error) {
            die(json_encode(["success" => false, "message" => "خطا در اتصال به دیتابیس"]));
        }

        $stmt = $conn->prepare("SELECT first_name,id, password FROM userss WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            $stmt->bind_result($first_name,$user_id, $stored_password);
            $stmt->fetch();

            if ($password == $stored_password) {
                // ایجاد JWT
                $payload = [
                    "first_name" => $first_name,
                    "user_id" => $user_id,
                    "email" => $email,
                    "exp" => time() + (60 * 60 * 24 * 7) // انقضا در 7 *24 ساعت
                ];
                $jwt = JWT::encode($payload, $secret_key, 'HS256');
                // $decoded = JWT::decode($token, $secret_key, ['HS256']);

                echo json_encode(["success" => true,  'message' => 'ورود موفقیت امیز بود!' ,"token" => $jwt]);
            } else {
                echo json_encode(["success" => false, "message" => "رمز عبور اشتباه است"]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "کاربر یافت نشد"]);
        }

        $stmt->close();
        $conn->close();
    } else {
        echo json_encode(["success" => false, "message" => "ایمیل و رمز عبور الزامی هستند"]);
    }
}
?>
