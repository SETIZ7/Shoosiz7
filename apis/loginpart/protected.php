<?php

require_once '../includes/JWK.php';
require_once '../includes/JWT.php';
require_once '../includes/Key.php';
use Firebase\JWT\JWT;
use Firebase\JWT\JWK;
use Firebase\JWT\Key;

// header('Access-Control-Allow-Origin: http://localhost:3001');
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}

header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('HTTP/1.1 204 No Content');
    exit;
}

$secret_key = "my_secret_key";



$headers = getallheaders();
$authHeader = $headers['Authorization'] ?? '';
        

        
if (!$authHeader) {
    echo json_encode(["success" => false, "message" => "هدر Authorization ارسال نشده است"]);
    exit;
}

// بررسی فرمت توکن
if (!preg_match('/^Bearer\s*(.+)$/i', $authHeader, $matches)) {
    echo json_encode(["success" => false, "message" => "فرمت توکن صحیح نیست"]);
    exit;
}

$jwt = $matches[1];

        // echo json_encode(["success" => false, "message" => $jwt]);
        // exit;

try {
    $decoded = JWT::decode($jwt, new Key($secret_key, 'HS256'));
    // $decoded = JWT::decode($jwt, $secret_key);
    
    echo json_encode([
        "success" => true, 
        "first_name" => $decoded->first_name,  
        "message" => "دسترسی مجاز",  
        "user_id" => $decoded->user_id, 
        "email" => $decoded->email
    ]);

} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "توکن نامعتبر است: " . $e->getMessage()]);
    exit;
}



// require_once '../includes/JWT.php';
// use Firebase\JWT\JWT;
// use Firebase\JWT\Key;

// header('Access-Control-Allow-Origin: http://localhost:3001');
// header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
// header('Access-Control-Allow-Headers: Content-Type, Authorization');
// header('Access-Control-Allow-Credentials: true');

// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//     header('HTTP/1.1 204 No Content');
//     exit;
// }
// $secret_key = "my_secret_key";

// // $headers = getallheaders();
// // $authHeader = $headers['Authorization'] ?? '';

// // if (!$authHeader || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
// //     echo json_encode(["success" => false, "message" => "توکن ارائه نشده است"]);
// //     exit;
// // }

// // $jwt = $matches[1];

// $headers = getallheaders();
// $authHeader = $headers['Authorization'] ?? null;

// if (!$authHeader) {
//     echo json_encode(["success" => false, "message" => "هدر Authorization ارسال نشده است"]);
//     exit;
// }

// if (!preg_match('/^Bearer\s+(.+)$/i', $authHeader, $matches)) {
//     echo json_encode(["success" => false, "message" => "فرمت توکن صحیح نیست"]);
//     exit;
// }

// $jwt = $matches[1];


// // echo json_encode(["success" => false, "message" => $authHeader]);
// // exit;
// try {
//     $decoded = JWT::decode($jwt, new Key($secret_key, 'HS256'));
//     echo json_encode(["success" => true, "message" => "دسترسی مجاز", "user_id" => $decoded->user_id, "email" => $decoded->email]);
// } catch (Exception $e) {
//     echo json_encode(["success" => false, "message" => "توکن نامعتبر است"]);
//     exit;
// }


?>
