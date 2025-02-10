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

    $headers = getallheaders();
    $user_id = $headers['Authorization'] ?? '';

    if (!$user_id) {
        echo json_encode(['success' => false, 'message' => 'User ID is required']);
        exit;
    }

    // دریافت محصولاتی که کاربر خریده به همراه تعداد خرید (orderconte)
    $sql = "
        SELECT p.productid, p.namepro, p.pricepro, p.offerpro, p.pointpro, p.description, 
               p.propertis, p.type, p.typecumin, 
               i.frontimg, i.backimg, i.topimg, i.rightimg,
               o.orderconte
        FROM orders o
        JOIN proinfo p ON o.proid = p.productid
        LEFT JOIN imagesview i ON p.productid = i.productid
        WHERE o.userid = ?
    ";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $products = [];
    while ($row = $result->fetch_assoc()) {
        $id = $row['productid'];

        if (!isset($products[$id])) {
            $products[$id] = [
                "productid" => $row["productid"],
                "namepro" => $row["namepro"],
                "pricepro" => $row["pricepro"],
                "offerpro" => $row["offerpro"],
                "pointpro" => $row["pointpro"],
                "description" => $row["description"],
                "propertis" => $row["propertis"],
                "type" => $row["type"],
                "typecumin" => $row["typecumin"],
                "orderconte" => $row["orderconte"], // تعداد خرید اضافه شد
                "images" => []
            ];
        }

        if ($row["frontimg"] || $row["backimg"] || $row["topimg"] || $row["rightimg"]) {
            $products[$id]["images"][] = [
                "frontimg" => $row["frontimg"],
                "backimg" => $row["backimg"],
                "topimg" => $row["topimg"],
                "rightimg" => $row["rightimg"]
            ];
        }
    }

    $stmt->close();
    $conn->close();

    if (!empty($products)) {
        echo json_encode(["success" => true, "products" => array_values($products)]);
    } else {
        echo json_encode(["success" => false, "message" => "No purchased products found"]);
    }
}


// if ($_SERVER['REQUEST_METHOD'] === 'GET') {
//     $conn = new mysqli('localhost', 'root', '', 'shosiz');
 
//     if ($conn->connect_error) {
//         echo json_encode(['success' => false, 'message' => 'Database connection failed']);
//         exit;
//     }

//     $headers = getallheaders();
// $product_id = $headers['Authorization'] ?? '';

//     // دریافت `id` از فرانت‌اند
//     // $headers = getallheaders();
//     // $product_id = $headers['id'] ?? null;
//     // echo json_encode(['success' => false, 'message' => $product_id]);
//     // exit;
//     $sql = "
//         SELECT p.productid, p.namepro, p.pricepro, p.offerpro, p.pointpro, p.description, 
//                p.propertis, p.type, p.typecumin, 
//                i.frontimg, i.backimg, i.topimg, i.rightimg
//         FROM proinfo p
//         LEFT JOIN imagesview i ON p.productid = i.productid
//     ";

//     // اضافه کردن شرط `WHERE` اگر `id` ارسال شده باشد
//     if ($product_id) {
//         $sql .= " WHERE p.productid = ?";
//     }

//     $stmt = $conn->prepare($sql);

//     if ($product_id) {
//         $stmt->bind_param("i", $product_id);
//     }

//     $stmt->execute();
//     $result = $stmt->get_result();

//     $products = [];
//     while ($row = $result->fetch_assoc()) {
//         $id = $row['productid'];

//         // اگر محصول قبلاً اضافه نشده بود، اضافه کن
//         if (!isset($products[$id])) {
//             $products[$id] = [
//                 "productid" => $row["productid"],
//                 "namepro" => $row["namepro"],
//                 "pricepro" => $row["pricepro"],
//                 "offerpro" => $row["offerpro"],
//                 "pointpro" => $row["pointpro"],
//                 "description" => $row["description"],
//                 "propertis" => $row["propertis"],
//                 "type" => $row["type"],
//                 "typecumin" => $row["typecumin"],
//                 "images" => [] // لیست تصاویر
//             ];
//         }

//         // اگر تصویری وجود داشت، اضافه کن
//         if ($row["frontimg"] || $row["backimg"] || $row["topimg"] || $row["rightimg"]) {
//             $products[$id]["images"][] = [
//                 "frontimg" => $row["frontimg"],
//                 "backimg" => $row["backimg"],
//                 "topimg" => $row["topimg"],
//                 "rightimg" => $row["rightimg"]
//             ];
//         }
//     }

//     $stmt->close();
//     $conn->close();

//     if (!empty($products)) {
//         echo json_encode(["success" => true, "product" => array_values($products)]);
//     } else {
//         echo json_encode(["success" => false, "message" => "Product not found"]);
//     }
// }

// if ($_SERVER['REQUEST_METHOD'] === 'GET') {
//     $conn = new mysqli('localhost', 'root', '', 'shosiz');

//     if ($conn->connect_error) {
//         echo json_encode(['success' => false, 'message' => 'Database connection failed']);
//         exit;
//     }

//     $headers = getallheaders();
//     $user_id = $headers['Authorization'] ?? '';

//     if (!$user_id) {
//         echo json_encode(['success' => false, 'message' => 'User ID is required']);
//         exit;
//     }

//     // دریافت محصولاتی که کاربر خریده
//     $sql = "
//         SELECT p.productid, p.namepro, p.pricepro, p.offerpro, p.pointpro, p.description, 
//                p.propertis, p.type, p.typecumin, 
//                i.frontimg, i.backimg, i.topimg, i.rightimg
//         FROM orders o
//         JOIN proinfo p ON o.proid = p.productid
//         LEFT JOIN imagesview i ON p.productid = i.productid
//         WHERE o.userid = ?
//     ";

//     $stmt = $conn->prepare($sql);
//     $stmt->bind_param("i", $user_id);
//     $stmt->execute();
//     $result = $stmt->get_result();

//     $products = [];
//     while ($row = $result->fetch_assoc()) {
//         $id = $row['productid'];

//         if (!isset($products[$id])) {
//             $products[$id] = [
//                 "productid" => $row["productid"],
//                 "namepro" => $row["namepro"],
//                 "pricepro" => $row["pricepro"],
//                 "offerpro" => $row["offerpro"],
//                 "pointpro" => $row["pointpro"],
//                 "description" => $row["description"],
//                 "propertis" => $row["propertis"],
//                 "type" => $row["type"],
//                 "typecumin" => $row["typecumin"],
//                 "images" => []
//             ];
//         }

//         if ($row["frontimg"] || $row["backimg"] || $row["topimg"] || $row["rightimg"]) {
//             $products[$id]["images"][] = [
//                 "frontimg" => $row["frontimg"],
//                 "backimg" => $row["backimg"],
//                 "topimg" => $row["topimg"],
//                 "rightimg" => $row["rightimg"]
//             ];
//         }
//     }

//     $stmt->close();
//     $conn->close();

//     if (!empty($products)) {
//         echo json_encode(["success" => true, "products" => array_values($products)]);
//     } else {
//         echo json_encode(["success" => false, "message" => "No purchased products found"]);
//     }
// }

?>