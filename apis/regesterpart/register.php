<?php

// ini_set('log_errors', 1);
// ini_set('display_errors', 0);
// ini_set('error_log', '/path/to/error.log'); // مسیر فایل لاگ

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

    session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // $input = json_decode(file_get_contents('php://input'), true);
    $input = json_decode(file_get_contents('php://input'), true);
    
    // استخراج username و password
    $email  = $input['email'] ?? '';
    $password = $input['password'] ?? '';
        $first_name = $input['first_name'] ?? '';
    $last_name = $input['last_name'] ?? '';



    // بررسی اینکه ورودی‌ها خالی نباشند
    if (!empty($email) && !empty($password) && !empty($first_name) && !empty($last_name)) {
        $conn = new mysqli('localhost', 'root', '', 'shosiz');
        
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // اصلاح نام جدول
        $stmt = $conn->prepare("SELECT id FROM userss WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();

    if ($stmt->num_rows == 0) {
        $stmt->close();
        // $stmt->bind_result($stored_password);
        // $stmt->fetch();
        // $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        // $stmt->close();
            // if (password_verify($password, $hashed_password)) {
            // if ($password == $stored_password) {
                $stmt1 = $conn->prepare("INSERT INTO userss (first_name, last_name, email, password) VALUES (?, ?, ?, ?)");
                        $stmt1->bind_param("ssss", $first_name, $last_name, $email, $password);
                
                        if ($stmt1->execute()) {
                            echo json_encode(['success' => true, 'message' => 'ثبت‌نام با موفقیت انجام شد.']);
                            exit;
                        } else {
                            echo json_encode(['success' => false, 'message' => 'خطا در ثبت‌نام.']);
                            exit;
                        }
                    // }
        } else {
            echo json_encode(['success' => false, 'message' => 'این ایمیل قبلاً ثبت شده است.']);
            exit;
        }

        $stmt1->close();
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
        'message' => 'هکررر!!!!.',
    ]);
    exit;
}


// header('Access-Control-Allow-Origin: http://localhost:3001'); // یا '*' برای همه دامنه‌ها
// header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
// header('Access-Control-Allow-Headers: Content-Type, Authorization');
// header('Access-Control-Allow-Credentials: true');

// // پاسخ به درخواست OPTIONS
// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//     header('HTTP/1.1 204 No Content');
//     exit;
// }

// session_start();

// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
//     $input = json_decode(file_get_contents('php://input'), true);

//     if (!$input) {
//         echo json_encode(['success' => false, 'message' => 'Invalid JSON input.']);
//         exit;
//     }

//     $email = $input['email'] ?? '';
//     $password = $input['password'] ?? '';
//     $first_name = $input['first_name'] ?? '';
//     $last_name = $input['last_name'] ?? '';

//     // if (empty($email) || empty($password) || empty($first_name) || empty($last_name)) {
//     //     echo json_encode(['success' => false, 'message' => 'تمامی فیلدها الزامی هستند.']);
//     //     exit;
//     // }

//     // if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
//     //     echo json_encode(['success' => false, 'message' => 'ایمیل نامعتبر است.']);
//     //     exit;
//     // }

//     // $hashed_password = password_hash($password, PASSWORD_DEFAULT);

//     $conn = new mysqli('localhost', 'root', '', 'shoosiz');

//     if ($conn->connect_error) {
//         echo json_encode(['success' => false, 'message' => 'مشکلی در اتصال به سرور پیش آمده است.']);
//         exit;
//     }

//     $stmt = $conn->prepare("SELECT * FROM userss WHERE email = ?");
//     $stmt->bind_param("s", $email);
//     $stmt->execute();
//     $stmt->store_result();

//     if ($stmt->num_rows > 0) {
//         echo json_encode(['success' => false, 'message' => 'این ایمیل قبلاً ثبت شده است.']);
//     } else {
//         $stmt = $conn->prepare("INSERT INTO userss (first_name, last_name, email, password) VALUES (?, ?, ?, ?)");
//         $stmt->bind_param("ssss", $first_name, $last_name, $email, $hashed_password);

//         if ($stmt->execute()) {
//             echo json_encode(['success' => true, 'message' => 'ثبت‌نام با موفقیت انجام شد.']);
//         } else {
//             echo json_encode(['success' => false, 'message' => 'خطا در ثبت‌نام.']);
//         }
//     }

//     $stmt->close();
//     $conn->close();
// } else {
//     http_response_code(405);
//     echo json_encode([
//         'status' => 'error',
//         'message' => 'Only POST method is allowed.',
//     ]);
// }



// header('Access-Control-Allow-Origin: http://localhost:3001'); // یا '*' برای همه دامنه‌ها
// header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
// header('Access-Control-Allow-Headers: Content-Type, Authorization');
// header('Access-Control-Allow-Credentials: true');

// // اگر درخواست از نوع OPTIONS باشد، باید پاسخ بدهیم
// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//     header('HTTP/1.1 204 No Content');
//     exit;
// }

// session_start();

// // if (empty($_SESSION['csrf_token'])) {
// //     $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
// // }

// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//     $input = json_decode(file_get_contents('php://input'), true);

//     $email  = $input['email'] ?? '';
//     $password = $input['password'] ?? '';
//     $first_name = $input['first_name'] ?? '';
//     $last_name = $input['last_name'] ?? '';

//     // $confirm_password = filter_input(INPUT_POST, 'confirm_password', FILTER_SANITIZE_STRING);

//     // if (!hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'])) {
//     //     echo json_encode(['success' => false, 'message' => 'توکن CSRF نامعتبر است.']);
//     //     exit;
//     // }

//     // if ($password !== $confirm_password) {
//     //     echo json_encode(['success' => false, 'message' => 'رمز عبور و تأیید رمز عبور مطابقت ندارند.']);
//     //     exit;
//     // }

//     if (!empty($email) && !empty($password)) {
    

//     $hashed_password = password_hash($password, PASSWORD_DEFAULT);

//  $conn = new mysqli('localhost', 'root', '', 'shoosiz');

//     if ($conn->connect_error) {
//         die("Connection failed: " . $conn->connect_error);
//     }

//     $stmt = $conn->prepare("SELECT id FROM userss WHERE email = ?");
//     $stmt->bind_param("s", $email);
//     $stmt->execute();
//     $stmt->store_result();

//     if ($stmt->num_rows > 0) {
//         echo json_encode(['success' => false, 'message' => 'این نام کاربری قبلاً ثبت شده است.']);
//     } else {
//         $stmt = $conn->prepare("INSERT INTO userss (first_name,last_name,email,password) VALUES (?, ?, ?, ?)");
//         $stmt->bind_param("ssss",$first_name,$last_name, $email, $hashed_password);
//         if ($stmt->execute()) {
//             echo json_encode(['success' => true]);
//         } else {
//             echo json_encode(['success' => false, 'message' => 'خطا در ثبت نام.']);
//         }
//     }

//     $stmt->close();
//     $conn->close();
//      } else {
//         echo json_encode(['success' => false, 'message' => 'Username or password cannot be empty.']);
//     }
// }else {
//     http_response_code(405); // Method Not Allowed
//     echo json_encode([
//         'status' => 'error',
//         'message' => 'Only POST method is allowed.',
//     ]);
// }
?>
