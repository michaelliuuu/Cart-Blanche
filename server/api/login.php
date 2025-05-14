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

// Checks to see if password matches email and logs user in
$user = $users->findOne(['email' => $data['email']]);
if ($user && password_verify($data['password'], $user['password'])) {
    $response = [
        'success' => true,
        'user' => [
            'id' => (string)$user['_id'],
            'role' => $user['role'],
            'email' => $user['email']
        ], 
        'message' => 'Login successful'
    ];
    echo json_encode($response);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
}
?>
