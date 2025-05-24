<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Exit file if not POST
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit();

// MongoDB connection
require_once '../config/db.php';

// Reads POST and decodes from JSON to PHP array
$data = json_decode(file_get_contents('php://input'), true);

// Checks if email and password is filled out
if (!$data['email'] || !$data['password']) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing email or password']);
    exit;
}

// Checks to see if password matches email, then logs user in
$user = $users->findOne(['email' => $data['email']]);
if ($user && password_verify($data['password'], $user['password'])) {
    $response = [
        'success' => true,
        'user' => [
            'id' => (string)$user['_id'],
            'role' => $user['role'],
            'email' => $user['email'],
        ], 
        'token' => bin2hex(random_bytes(16)),
        'message' => 'Login successful'
    ];
    echo json_encode($response);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
}
?>
