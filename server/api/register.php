<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Exit file if not POST
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit();

// MongoDB connection
require_once '../config/db.php';

// Decodes from JSON to PHP array
$data = json_decode(file_get_contents('php://input'), true);

// Checks if email and password is filled out
if (!$data['email'] || !$data['password']) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing email or password']);
    exit;
}

// Duplicate user check
$existingUser = $users->findOne(['email' => $data['email']]);
if ($existingUser) {
    echo json_encode(['success' => false, 'message' => 'User already exists']);
    exit;
}

// Hash password
$hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);

// Insert registered user into database
try {
    $users->insertOne([
        'email' => $data['email'],
        'password' => $hashedPassword,
        'role' => 'user'
    ]);
    echo json_encode(['success' => true, 'message' => 'User registered successfully']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Registration failed']);
}
?>
