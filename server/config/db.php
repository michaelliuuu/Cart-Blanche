<?php
    header('Content-Type: application/json');

    require __DIR__ . '/../vendor/autoload.php';

    // Loads .env
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . "/..");
    $dotenv->load();

    try {
        // Connect to MongoDB
        $dbPassword = $_ENV['DB_PASSWORD'];  
        $dbUser = $_ENV['DB_USERNAME'];    
        $dbCluster = $_ENV['CLUSTER_NAME'];
        $client = new MongoDB\Client("mongodb+srv://$dbUser:$dbPassword@cluster0.3ysjqoh.mongodb.net/?retryWrites=true&w=majority&appName=$dbCluster");
        
        // Database
        $db = $client->cartBlanche;

        // Collections
        $users = $db->users;
        $products = $db->products;
    } catch (Exception $e) {
        echo "Error connecting to MongoDB.\n";
        printf($e->getMessage());
    }

    try {
        // Send a ping to confirm a successful connection
        $client->selectDatabase('admin')->command(['ping' => 1]);
        // echo "Pinged your deployment. You successfully connected to MongoDB!\n";
    } catch (Exception $e) {
        printf($e->getMessage());
    }
?>
