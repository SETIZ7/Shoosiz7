<?php
    
    //     header('Content-Type: application/json');
    // header('Access-Control-Allow-Origin: *');
    // header('Access-Control-Allow-Methods: GET, POST');
    // header('Access-Control-Allow-Headers: Content-Type');
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
    }
    // header('Access-Control-Allow-Origin: http://localhost:3001'); // یا '*' برای همه دامنه‌ها
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

// اگر درخواست از نوع OPTIONS باشد، باید پاسخ بدهیم
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('HTTP/1.1 204 No Content');
    exit;
}

    // session_start();

// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//     $input = json_decode(file_get_contents('php://input'), true);
    
//     // استخراج username و password
//     $email  = $input['email'] ?? '';
//     $password = $input['password'] ?? '';
    // $email = filter_var($input['email'], FILTER_SANITIZE_EMAIL)?? '';
    // $password = filter_var($input['password'], FILTER_SANITIZE_STRING)?? '';


    // بررسی اینکه ورودی‌ها خالی نباشند
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        
        // استخراج email و new_password
        $email  = $input['email'] ?? '';
        $new_password = $input['password'] ?? '';
    
        // بررسی اینکه ورودی‌ها خالی نباشند
        if (!empty($email) && !empty($new_password)) {
            $conn = new mysqli('localhost', 'root', '', 'shosiz');
            
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }
    
            // بررسی اینکه کاربر با ایمیل وارد شده وجود دارد
            $stmt = $conn->prepare("SELECT id FROM userss WHERE email = ?");
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $stmt->store_result();
    
            if ($stmt->num_rows > 0) {
                // بروزرسانی رمز عبور در دیتابیس
                $update_stmt = $conn->prepare("UPDATE userss SET password = ? WHERE email = ?");
                $update_stmt->bind_param("ss", $new_password, $email);
                
                if ($update_stmt->execute()) {
                    echo json_encode(['success' => true, 'message' => 'رمز عبور با موفقیت تغییر کرد.']);
                } else {
                    echo json_encode(['success' => false, 'message' => 'خطا در تغییر رمز عبور.']);
                }
                
                $update_stmt->close();
            } else {
                echo json_encode(['success' => false, 'message' => 'کاربر با این ایمیل پیدا نشد.']);
            }
    
            $stmt->close();
            $conn->close();
        } else {
            echo json_encode(['success' => false, 'message' => 'اطلاعات باید کامل پر شده باشند!']);
        }
    } else {
        http_response_code(405); // Method Not Allowed
        echo json_encode([
            'status' => 'error',
            'message' => 'Only POST method is allowed.',
        ]);
    }

?>
