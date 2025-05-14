<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../config/db.php';

// Helper: parse JSON body
function getJsonInput() {
    return json_decode(file_get_contents('php://input'), true);
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Get all products
        $products = $db->products->find()->toArray();
        echo json_encode($products);
        break;

    case 'POST':
        // Add product
        $data = getJsonInput();
        if (!$data['name'] || !$data['price'] || !$data['category']) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Missing fields']);
            exit;
        }
        $result = $db->products->insertOne([
            'name' => $data['name'],
            'price' => (float)$data['price'],
            'category' => $data['category']
        ]);
        echo json_encode(['success' => true, 'id' => (string)$result->getInsertedId()]);
        break;

    case 'DELETE':
        // Delete product
        $data = getJsonInput();
        if (!$data['id']) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Missing ID']);
            exit;
        }
        $deleteResult = $db->products->deleteOne(['_id' => new MongoDB\BSON\ObjectId($data['id'])]);
        echo json_encode(['success' => true, 'deletedCount' => $deleteResult->getDeletedCount()]);
        break;

    case 'PUT':
        // Update product (optional)
        $data = getJsonInput();
        if (!$data['id'] || !$data['updates']) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Missing ID or update data']);
            exit;
        }
        $updateResult = $db->products->updateOne(
            ['_id' => new MongoDB\BSON\ObjectId($data['id'])],
            ['$set' => $data['updates']]
        );
        echo json_encode(['success' => true, 'modifiedCount' => $updateResult->getModifiedCount()]);
        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
        break;
}
?>
