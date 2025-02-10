
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
    $input = json_decode(file_get_contents('php://input'), true);
    $id  = $input['id'] ?? '';

    if (!empty($id)) {

        // اتصال به دیتابیس
        $conn = new mysqli('localhost', 'root', '', 'shosiz');

        
        if ($conn->connect_error) {
            echo json_encode(['success' => false, 'message' => 'Database connection failed']);
            exit;
        }
    }
        
// دریافت ID محصول از پارامتر GET
$product_id = $id ?? 0;


// SELECT * FROM proinfo p LEFT JOIN imagesview i ON p.productid = i.productid LIMIT 5;

if ($product_id > 0) {
    $stmt = $conn->prepare("
        SELECT *
    FROM proinfo p
    LEFT JOIN imagesview i ON p.productid = i.productid
    WHERE p.productid = ?
    ");
    $stmt->bind_param("i", $product_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $product = [];
    // $images = [];
    
    
    // echo json_encode(['success' => true, 'message' =>  $result->fetch_assoc()]);
    // exit;
    while ($row = $result->fetch_assoc())
     {
        $product [] = $row;
        // echo json_encode(['success' => true, 'message' => $row]);
    // exit;
        // if (empty($product)) {
        //     $product = [
        //         "id"          => $row["id"],
        //         "name"        => $row["namepro"],
        //         "price"       => $row["pricepro"],
        //         "offer"       => $row["offerpro"],
        //         "description" => $row["description"],
        //         "properties"  => $row["propertis"],
        //         "type"        => $row["type"],
        //         "typecumin"   => $row["typecumin"]
        //     ];
        // }
        // if (!empty($row["image_url"])) {
        //     $images[] = $row["image_url"];
        // }
    }

    if (!empty($product)) {
        // $product["images"] = $images;
        echo json_encode(["success" => true, "product" => $product]);
        exit;
    } else {
        echo json_encode(["success" => false, "message" => "Product not found"]);
        exit;
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Invalid product ID"]);
    exit;
}

$conn->close();

}

?>