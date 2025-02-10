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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $conn = new mysqli('localhost', 'root', '', 'shosiz');

    if ($conn->connect_error) {
        echo json_encode(['success' => false, 'message' => 'Database connection failed']);
        exit;
    }

    $data = json_decode(file_get_contents("php://input"), true);
    $user_id = $data['userid'] ?? null;
    $products = $data['products'] ?? [];

    if (!$user_id || empty($products)) {
        echo json_encode(['success' => false, 'message' => 'Missing required fields']);
        exit;
    }

    // بررسی وجود کاربر
    $stmt_user = $conn->prepare("SELECT COUNT(*) FROM userss WHERE id = ?");
    $stmt_user->bind_param("i", $user_id);
    $stmt_user->execute();
    $stmt_user->bind_result($user_exists);
    $stmt_user->fetch();
    $stmt_user->close();

    if (!$user_exists) {
        echo json_encode(['success' => false, 'message' => 'Invalid user ID']);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO orders (userid, proid, ordername, orderconte, statos, orderOffer) VALUES (?, ?, ?, ?, ?, ?)");
    if (!$stmt) {
        echo json_encode(['success' => false, 'message' => 'Statement preparation failed: ' . $conn->error]);
        exit;
    }

    foreach ($products as $product) {
        $product_id = $product['productid'] ?? null;
        $order_name = $product['ordername'] ?? 'بدون نام';
        $order_count = $product['orderconte'] ?? 1;
        $status = $product['statos'] ?? 0;
        $order_offer = $product['orderOffer'] ?? 0;

        if (!$product_id || $order_count <= 0) {
            continue;
        }

        // بررسی وجود محصول
        $stmt_product = $conn->prepare("SELECT COUNT(*) FROM proinfo WHERE productid = ?");
        $stmt_product->bind_param("i", $product_id);
        $stmt_product->execute();
        $stmt_product->bind_result($product_exists);
        $stmt_product->fetch();
        $stmt_product->close();

        if (!$product_exists) {
            continue;
        }

        $stmt->bind_param("iisiii", $user_id, $product_id, $order_name, $order_count, $status, $order_offer);
        if (!$stmt->execute()) {
            echo json_encode(['success' => false, 'message' => 'محصول خریداری نشد: ' . $stmt->error]);
            exit;
        }
    }

    $stmt->close();
    $conn->close();

    echo json_encode(['success' => true, 'message' => ' خرید شما موفقیت آمیز بود ']);
}


// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//     $conn = new mysqli('localhost', 'root', '', 'shosiz');

//     if ($conn->connect_error) {
//         echo json_encode(['success' => false, 'message' => 'Database connection failed']);
//         exit;
//     }

//     // دریافت داده‌های ارسالی از فرانت‌اند
//     $data = json_decode(file_get_contents("php://input"), true);

//     $user_id = $data['userid'] ?? null;
//     $products = $data['products'] ?? []; // لیست محصولات

//     if (!$user_id || empty($products)) {
//         echo json_encode(['success' => false, 'message' => 'Missing required fields']);
//         exit;
//     }

//     // بررسی وجود کاربر
//     $stmt_user = $conn->prepare("SELECT COUNT(*) FROM userss WHERE id = ?");
//     $stmt_user->bind_param("i", $user_id);
//     $stmt_user->execute();
//     $stmt_user->bind_result($user_exists);
//     $stmt_user->fetch();
//     $stmt_user->close();

//     if (!$user_exists) {
//         echo json_encode(['success' => false, 'message' => 'Invalid user ID']);
//         exit;
//     }

//     $stmt = $conn->prepare("INSERT INTO orders (userid, proid, ordername, orderconte, statos, orderOffer) VALUES (?, ?, ?, ?, ?, ?)");

//     foreach ($products as $product) {
//         $product_id = $product['productid'] ?? null;
//         $order_name = $product['ordername'] ?? 'بدون نام';
//         $order_count = $product['orderconte'] ?? 1;
//         $status = $product['statos'] ?? 0;
//         $order_offer = $product['orderOffer'] ?? 0;

//         if (!$product_id || $order_count <= 0) {
//             continue; // اگر آیدی محصول وجود نداشت یا تعداد خرید نامعتبر بود، آن را رد می‌کنیم
//         }

//         // بررسی وجود محصول
//         $stmt_product = $conn->prepare("SELECT COUNT(*) FROM proinfo WHERE productid = ?");
//         $stmt_product->bind_param("i", $product_id);
//         $stmt_product->execute();
//         $stmt_product->bind_result($product_exists);
//         $stmt_product->fetch();
//         $stmt_product->close();

//         if (!$product_exists) {
//             continue; // اگر محصولی با این آیدی پیدا نشد، از ثبت جلوگیری می‌شود
//         }

//         // ثبت سفارش
//         $stmt->bind_param("iisiii", $user_id, $product_id, $order_name, $order_count, $status, $order_offer);
//         $stmt->execute();
//     }

//     $stmt->close();
//     $conn->close();

//     echo json_encode(['success' => true, 'message' => 'Order placed successfully']);
// }

// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//     $conn = new mysqli('localhost', 'root', '', 'shosiz');

//     if ($conn->connect_error) {
//         echo json_encode(['success' => false, 'message' => 'Database connection failed']);
//         exit;
//     }

//     // دریافت داده‌های ارسالی از فرانت‌اند
//     $data = json_decode(file_get_contents("php://input"), true);

//     $user_id = $data['userid'] ?? null;
//     $products = $data['products'] ?? []; // لیست محصولات

//     if (!$user_id || empty($products)) {
//         echo json_encode(['success' => false, 'message' => 'Missing required fields']);
//         exit;
//     }

//     $stmt = $conn->prepare("INSERT INTO orders (userid, proid, ordername, orderconte, statos, orderOffer) VALUES (?, ?, ?, ?, ?, ?)");

    
//     foreach ($products as $product) {
//         $product_id = $product['productid'] ?? null;
//         $order_name = $product['ordername'] ?? 'بدون نام';
//         $order_count = $product['orderconte'] ?? 1;
//         $status = $product['statos'] ?? 0;
//         $order_offer = $product['orderOffer'] ?? 0;

//         if (!$product_id) continue;

//         $stmt->bind_param("iisiii", $user_id, $product_id, $order_name, $order_count, $status, $order_offer);
//         $stmt->execute();
//     }
    

//     $stmt->close();
//     $conn->close();

//     echo json_encode(['success' => true, 'message' => 'Order placed successfully']);
// }

?>