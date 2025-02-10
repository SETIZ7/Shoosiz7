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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    // استخراج username و password
    $email  = $input['email'] ?? '';
    // $password = $input['password'] ?? '';
    // $email = filter_var($input['email'], FILTER_SANITIZE_EMAIL)?? '';
    // $password = filter_var($input['password'], FILTER_SANITIZE_STRING)?? '';


    // بررسی اینکه ورودی‌ها خالی نباشند
    if (!empty($email)) {
        $conn = new mysqli('localhost', 'root', '', 'shosiz');
        
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // اصلاح نام جدول
        $stmt = $conn->prepare("SELECT id FROM userss WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows == 1) {
        //     // $stmt->bind_result($hashed_password);
        //     // $stmt->bind_result($stored_password);
        //     $stmt->fetch();

        //     // // if (password_verify($password, $hashed_password)) {
        //     // if ($password == $stored_password) {
        //     //     $_SESSION['email'] = $email ;
        //     //     echo json_encode(['success' => true, 'message' => 'ورود موفقیت امیز بود!']);
        //     // } else {
        //     //     echo json_encode(['success' => false, 'message' => 'رمز عبور نادرست است.']);
        //     // }
        // } else {
        //     echo json_encode(['success' => false, 'message' => 'کاربر پیدا نشد.']);
        // }
        $node_url = 'http://localhost:3001/apis/findEmailpart/sendEmail'; // آدرس Endpoint سرور Node.js

        $data = ['email' => $email]; // داده‌ای که به Node.js می‌فرستیم

        // درخواست POST به Node.js
        $ch = curl_init($node_url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

        $response = curl_exec($ch);
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        if ($http_code === 200) {
            $result = json_decode($response, true);
            if ($result['success']) {
                // echo json_encode(['success' => false, 'message' => $stmt ]);
                // exit;
                // ذخیره کد در دیتابیس
                $code = $result['code']; // کدی که Node.js تولید کرده
                $stmt = $conn->prepare("UPDATE userss SET verificationcode = ? WHERE email = ?");
                $stmt->bind_param("ss", $code, $email);

                if ($stmt->execute()) {
                    echo json_encode(['success' => true, 'message' => 'کد ارسال شد و ذخیره شد.' , 'code'=>$code]);
            exit;
                } else {
                    echo json_encode(['success' => false, 'message' => 'خطا در ذخیره‌سازی کد.']);
            exit;
                }

                $stmt->close();
            } else {
                echo json_encode(['success' => false, 'message' => 'خطا در ارسال ایمیل: ' . $result['message']]);
            exit;
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'خطا در ارتباط با سرور Node.js.']);
            exit;
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'کاربر پیدا نشد.']);
            exit;
    }


        $stmt->close();
        $conn->close();
    } else {
        echo json_encode(['success' => false, 'message' => ' اطلاعات باید کامل پر شده باشند! ']);
        exit;
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode([
        'status' => 'error',
        'message' => 'Only POST method is allowed.',
    ]);
}


?>
