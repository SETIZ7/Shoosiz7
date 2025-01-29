<?php
    
    //     header('Content-Type: application/json');
    // header('Access-Control-Allow-Origin: *');
    // header('Access-Control-Allow-Methods: GET, POST');
    // header('Access-Control-Allow-Headers: Content-Type');

    // header('Access-Control-Allow-Origin: *');
    // header('Access-Control-Allow-Origin: http://localhost:3001'); // اجازه دسترسی از Node.js
    // header('Access-Control-Allow-Methods: GET, POST, OPTIONS'); // متدهای مجاز
    // header('Access-Control-Allow-Headers: Content-Type, Authorization'); // هدرهای مجاز
    

//     header('Access-Control-Allow-Origin: http://localhost:3001'); // یا '*'
// header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
// header('Access-Control-Allow-Headers: Content-Type, Authorization');
// header('Access-Control-Allow-Credentials: true'); // در صورت نیاز

// header('Access-Control-Allow-Origin: http://localhost:3001'); // یا '*'
// header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
// header('Access-Control-Allow-Headers: Content-Type, Authorization');
// header('Access-Control-Allow-Credentials: true');

//     پاسخ به درخواست OPTIONS
//     if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//         // header('HTTP/1.1 204 No Content');
//         http_response_code(204); // No Content
//         exit;
//     }

// هدرهای CORS
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
                echo json_encode(['success' => true, 'message' => 'Login successful!']);
            } else {
                echo json_encode(['success' => false, 'message' => 'رمز عبور نادرست است.']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'کاربر پیدا نشد.']);
        }

        $stmt->close();
        $conn->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Username or password cannot be empty.']);
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode([
        'status' => 'error',
        'message' => 'Only POST method is allowed.',
    ]);
}



    // header('Content-Type: application/json');
    // header('Access-Control-Allow-Origin: *');
    // header('Access-Control-Allow-Methods: GET, POST');
    // header('Access-Control-Allow-Headers: Content-Type');
    
    // if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    //     $input = json_decode(file_get_contents('php://input'), true);
    //     $username = $input['username'];
    //     $password = $input['password'];
        
    //     if (!empty($input['username']) && !empty($input['password'])) {



    //         $conn = new mysqli('localhost', 'root', '', 'shosiz');

    //         if ($conn->connect_error) {
    //             die("Connection failed: " . $conn->connect_error);
    //         }
        
    //         $stmt = $conn->prepare("SELECT password FROM userss WHERE username = ?");
    //         $stmt->bind_param("s", $username);
    //         $stmt->execute();
    //         $stmt->store_result();
        
    //         if ($stmt->num_rows > 0) {
    //             $stmt->bind_result($hashed_password);
    //             $stmt->fetch();
        
    //             if (password_verify($password, $hashed_password)) {
    //                 $_SESSION['username'] = $username;
    //                 echo json_encode(['success' => true]);
    //             } else {
    //                 echo json_encode(['success' => false, 'message' => 'رمز عبور نادرست است.']);
    //             }
    //         } else {
    //             echo json_encode(['success' => false, 'message' => ' کاربر پیدا نشد.']);
    //         }
        
    //         $stmt->close();
    //         $conn->close();
    //     }
        




    //         // echo json_encode([
    //         //     'status' => 'successFool',
    //         //     'message' => 'Login successful!',
    //         //     'user' => $input['username'],
    //         // ]);

    // } else {
    //     http_response_code(405); // Method Not Allowed
    //     echo json_encode([
    //         'status' => 'error',
    //         'message' => 'Only POST method is allowed.',
    //     ]);
    // }
    




// تنظیم هدر برای پاسخ JSON
// header('Access-Control-Allow-Origin: *'); // اجازه دسترسی از همه دامنه‌ها
// header('Access-Control-Allow-Methods: GET, POST'); // متدهای مجاز
// header('Access-Control-Allow-Headers: Content-Type'); // هدرهای مجاز

// echo json_encode([
//     'status' => 'success',
//     'message' => 'Login successful!',
// ]);
// بررسی نوع درخواست

// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//     // دریافت داده‌های JSON ارسال‌شده از جاوااسکریپت
//     $json = file_get_contents('php://input');
//     $data = json_decode($json, true);

//     // داده‌های ارسال‌شده را بررسی کنید
//     $username = $data['username'] ?? '';
//     $password = $data['password'] ?? '';

//     // نمونه‌ای از اعتبارسنجی ساده
//     if ($username === 'user123' && $password === 'mypassword') {
//         // پاسخ موفقیت‌آمیز
//         echo json_encode([
//             'status' => 'success',
//             'message' => 'Login successful!',
//         ]);
//     } else {
//         // پاسخ با خطا
//         echo json_encode([
//             'status' => 'error',
//             'message' => 'Invalid username or password!',
//         ]);
//     }
// } else {
//     // پاسخ برای درخواست‌های غیر POST
//     echo json_encode([
//         'status' => 'error',
//         'message' => 'Invalid request method!',
//     ]);
// }






// echo('fghfghfgh');
// require 'pdo.php';

// if ($_SERVER["REQUEST_METHOD"] == "POST") {
//     $username = $_POST['username'];
//     $password = $_POST['password'];

//     if (empty($username) || empty($password)) {
//         echo "لطفاً تمام فیلدها را پر کنید.";
//     } else {
//         $sql = "SELECT * FROM users WHERE username = :username";
//         $stmt = $pdo->prepare($sql);
//         $stmt->bindParam(':username', $username);
//         $stmt->execute();
//         $user = $stmt->fetch(PDO::FETCH_ASSOC);

//         if ($user && password_verify($password, $user['password'])) {
//             echo "ورود با موفقیت انجام شد.";
//         } else {
//             echo "نام کاربری یا رمز عبور اشتباه است.";
//         }
//     }
// }
?>
