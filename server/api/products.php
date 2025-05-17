<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Exit file if not POST, GET, etc
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit();

// MongoDB connection
require_once '../config/db.php';

// Decodes from JSON to PHP array
$data = json_decode(file_get_contents('php://input'), true);

// Switch case for CRUD of products on admin dashboard
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        // Get all products
        $products = $db->products->find()->toArray();
        echo json_encode($products);
        break;

    // Add product
    case 'POST':
        // Checks if all fields are filled out
        if (!$data['name'] || !$data['price'] || !$data['category']) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Missing fields']);
            exit;
        }

        // Insert product into database
        try {
            $newProduct = $db->products->insertOne([
                'name' => $data['name'],
                'price' => (float)$data['price'],
                'category' => $data['category'],
            ]);
            echo json_encode(['success' => true, 'id' => (string)$newProduct->getInsertedId(), 'message' => 'Insertion of product successful']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Insertion of product failed']);
        }
        break;
    
    // // Editing product    
    // case 'PUT':
    //     // Check if all required fields are present
    //     if (!$data['id'] || !$data['name'] || !$data['price'] || !$data['category']) {
    //         http_response_code(400);
    //         echo json_encode(['success' => false, 'message' => 'Missing fields']);
    //         exit;
    //     }
    
    //     try {
    //         $result = $db->products->updateOne(
    //             ['_id' => $data['id']],
    //             ['$set' => [
    //                 'name' => $data['name'],
    //                 'price' => (float)$data['price'],
    //                 'category' => $data['category']
    //             ]]
    //         );
            
    //         if ($result->getModifiedCount() > 0) {
    //             echo json_encode(['success' => true, 'message' => 'Product updated']);
    //         } else {
    //             echo json_encode(['success' => false, 'message' => 'No changes made']);
    //         }
    //     } catch (Exception $e) {
    //         http_response_code(500);
    //         echo json_encode(['success' => false, 'message' => 'Update failed']);
    //     }
    //     break;

    // case 'DELETE':
    //     // Delete product
    //     $data = getJsonInput();
    //     if (!$data['id']) {
    //         http_response_code(400);
    //         echo json_encode(['success' => false, 'message' => 'Missing ID']);
    //         exit;
    //     }
    //     $deleteResult = $db->products->deleteOne(['_id' => new MongoDB\BSON\ObjectId($data['id'])]);
    //     echo json_encode(['success' => true, 'deletedCount' => $deleteResult->getDeletedCount()]);
    //     break;

    // case 'DELETE':
    //     // Get the ID from query parameters
    //     $id = $_GET['id'] ?? null;
        
    //     if (!$id) {
    //         http_response_code(400);
    //         echo json_encode(['success' => false, 'message' => 'Missing product ID']);
    //         exit;
    //     }
    
    //     try {
    //         $filter = ['_id' => $id];
            
    //         $result = $db->products->deleteOne($filter);
            
    //         if ($result->getDeletedCount() > 0) {
    //             echo json_encode(['success' => true, 'message' => 'Product deleted']);
    //         } else {
    //             echo json_encode(['success' => false, 'message' => 'Product not found']);
    //         }
    //     } catch (Exception $e) {
    //         http_response_code(500);
    //         echo json_encode(['success' => false, 'message' => 'Delete failed: ' . $e->getMessage()]);
    //     }
    //     break;

    // case 'PUT':
    //     // Update product (optional)
    //     $data = getJsonInput();
    //     if (!$data['id'] || !$data['updates']) {
    //         http_response_code(400);
    //         echo json_encode(['success' => false, 'message' => 'Missing ID or update data']);
    //         exit;
    //     }
    //     $updateResult = $db->products->updateOne(
    //         ['_id' => new MongoDB\BSON\ObjectId($data['id'])],
    //         ['$set' => $data['updates']]
    //     );
    //     echo json_encode(['success' => true, 'modifiedCount' => $updateResult->getModifiedCount()]);
    //     break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
        break;
}
?>
