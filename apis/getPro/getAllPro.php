
<?php

// header('Access-Control-Allow-Origin: http://localhost:3001');
// header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
// header('Access-Control-Allow-Headers: Content-Type, Authorization');
// header('Access-Control-Allow-Credentials: true');
// header('Content-Type: application/json');

// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//     header('HTTP/1.1 204 No Content');
//     exit;
// }


// if ($_SERVER['REQUEST_METHOD'] === 'GET') {


//         // اتصال به دیتابیس
//         $conn = new mysqli('localhost', 'root', '', 'shosiz');

        
//         if ($conn->connect_error) {
//             echo json_encode(['success' => false, 'message' => 'Database connection failed']);
//             exit;
//         }

//     $stmt = $conn->prepare("
//         SELECT *
//     FROM proinfo p
//     LEFT JOIN imagesview i ON p.productid = i.productid
//     ");
//     $stmt->execute();
//     $result = $stmt->get_result();
    
//     $product = [];

//     while ($row = $result->fetch_assoc())
//      {
//         $product [] = $row;
 
//     }

//     if (!empty($product)) {
//         echo json_encode(["success" => true, "product" => $product]);
//         exit;
//     } else {
//         echo json_encode(["success" => false, "message" => "Product not found"]);
//         exit;
//     }

//     $stmt->close();


// $conn->close();

// }

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

    // دریافت `id`ها از فرانت‌اند (اگر چند مقدار ارسال شده باشد)
    $product_ids = $_GET['id'] ?? null;

    // اگر `id` وجود داشته باشد، آن را به آرایه تبدیل می‌کنیم
    if ($product_ids) {
        $idsArray = explode(',', $product_ids); // تبدیل `1,2,3` به [1,2,3]
        $placeholders = implode(',', array_fill(0, count($idsArray), '?')); // ساخت ?,?,? برای `IN`
    }

    $sql = "
        SELECT p.productid, p.namepro, p.pricepro, p.offerpro, p.pointpro, p.description, 
               p.propertis, p.type, p.typecumin, 
               i.frontimg, i.backimg, i.topimg, i.rightimg
        FROM proinfo p
        LEFT JOIN imagesview i ON p.productid = i.productid
    ";

    // اضافه کردن شرط `WHERE` برای دریافت محصولات خاص
    if ($product_ids) {
        $sql .= " WHERE p.productid IN ($placeholders)";
    }

    $stmt = $conn->prepare($sql);

    // **بایند کردن مقدارهای `id` در `IN` (جهت امنیت بیشتر)**
    if ($product_ids) {
        $stmt->bind_param(str_repeat('i', count($idsArray)), ...$idsArray);
    }

    $stmt->execute();
    $result = $stmt->get_result();

    $products = [];
    while ($row = $result->fetch_assoc()) {
        $id = $row['productid'];

        // اگر محصول قبلاً اضافه نشده بود، اضافه کن
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
                "images" => [] // لیست تصاویر
            ];
        }

        // اگر تصویری وجود داشت، اضافه کن
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
        echo json_encode(["success" => false, "message" => "Products not found"]);
    }
}

// if ($_SERVER['REQUEST_METHOD'] === 'GET') {
//     $conn = new mysqli('localhost', 'root', '', 'shosiz');

//     if ($conn->connect_error) {
//         echo json_encode(['success' => false, 'message' => 'Database connection failed']);
//         exit;
//     }

//     // دریافت `id` از فرانت‌اند
//     $product_id = $_GET['id'] ?? null;

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
?>