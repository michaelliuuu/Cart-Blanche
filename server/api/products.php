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
    // Get Products
    case 'GET':
        $products = $db->products->find()->toArray();
        // Transform MongoDB _id to id for frontend
        $transformedProducts = array_map(function($product) {
            return [
                'id' => (string)$product['_id'],
                'name' => $product['name'],
                'price' => $product['price'],
                'category' => $product['category']
            ];
        }, $products);
        echo json_encode($transformedProducts);
        break;

    // Add Products
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
    
    // Edit Product    
    case 'PUT':
        // Check if all required fields are present
        if (!$data['name'] || !$data['price'] || !$data['category']) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Missing fields']);
            exit;
        }
    
        try {
            // Updates the product
            $result = $db->products->updateOne(
                // FIX THIS!!!!!!!! Need to change this to filter id instead, if changing name it won't work
                ['name' => $data['name']], 
                ['$set' => [
                    'name' => $data['name'],
                    'price' => (float)$data['price'],
                    'category' => $data['category']
                ]]
            );
            
            echo json_encode(['success' => true, 'message' => 'Product updated']);
        } catch (Exception $e) {
            // Error response if failed
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Update failed']);
        }
        break;

    // Delete Product
    case 'DELETE':
        // $id = $_GET['id'] ?? null;
        try {
            // FIXX!!!! Deletes first item in database
            $deleteResult = $db->products->deleteOne([['id' => $data['id']]]); 
            echo json_encode(['success' => true, 'message' => 'Product deleted']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Deletion failed', 'error' => $e->getMessage()]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
        break;
}
?>
