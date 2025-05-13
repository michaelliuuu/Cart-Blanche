<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit();

require_once '../config/db.php';

$data = json_decode(file_get_contents('php://input'), true);

// Makes sure email or password is filled out
if (!$data['email'] || !$data['password']) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing email or password']);
    exit;
}

// Checks if user's email exists
$existingUser = $users->findOne(['email' => $data['email']]);
if ($existingUser) {
    echo json_encode(['success' => false, 'message' => 'User already exists']);
    exit;
}

// Hash password
$hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);

// Checks that it is inserted correctly
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
