<?php
header("Access-Control-Allow-Origin: https://nicolasbernsteintodoapp.000webhostapp.com/");
header("Access-Control-Allow-Methods: GET, POST, SET, DELETE, PUT, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
require_once 'db.php';
require_once 'repository.php';
require_once 'session.php';
$db = new dbConnect;
$db->connect();
$session = new Session;

$repository = new repository;

//update todo


if ($_SERVER["REQUEST_METHOD"] === "PUT") {
    $ReceivedData = file_get_contents("php://input");
    $data = json_decode($ReceivedData, true);
    if ($data['done'] === true) {
        $data['done'] = 1;
    } else {
        $data['done'] = 0;
    }
    $retrieve = $repository->update($db, $data);
    echo json_encode($retrieve);
}

if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    $id = isset($_GET['id']) ? $_GET['id'] : null;
    $repository->delete($db, $id);
    if ($id !== null) {
        echo "Received id: " . $id;
    } else {
        echo "No id received";
    }
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    //create new user
    if ($_POST['datatype'] === "register") {
        if (strlen($_POST['username']) >= 5) { //check if has atleast 5 characters
        } else {
            echo json_encode("Username must be at least 5 characters.");
            return;
        }
        if (strlen($_POST['password']) >= 5) {
        } else {
            echo json_encode("Password must be at least 5 characters.");
            return;
        }
        $proceed = $repository->CheckRegister($db, $_POST['username']); //check if there's a user already registered with that name
        if ($proceed === 'Proceed') {
            echo json_encode("login");
            $repository->register($db, $_POST);
        } else {
            echo json_encode("This user already exists.");
        }

        //create new todo
    } else if ($_POST['datatype'] === "create") {
        if ($_SESSION['id']) {
            $repository->create($db, $_POST, $_SESSION['id']);
            $repository->getalltodos($db, $_SESSION['id']);
        }
    } else if ($_POST['datatype'] === 'DELETE') { //for 000webhost
        $id = isset($_POST['id']) ? $_POST['id'] : null;
        $repository->delete($db, $id);
        if ($id !== null) {
            echo "Received id: " . $id;
        } else {
            echo "No id received";
        }
    } else if ($_POST['datatype'] === "PUT") { //for 000webhost
        $data = $_POST;
        if ($data['done'] === "true") {
            echo json_encode($data['done']);
            $data['done'] = 1;
        } else {
            echo json_encode($data['done']);
            $data['done'] = 0;
        }
        $retrieve = $repository->update($db, $data);
        echo json_encode($retrieve);
    }
}

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    //get login data
    if (isset($_GET["datatype"]) && $_GET["datatype"] === "login") {
        $username = $_GET["username"];
        $password = $_GET["password"];

        $getid = $repository->check($db, $username, $password);
        if ($getid === "Wrong password" || $getid === "Wrong username") {
            echo json_encode($getid);
        } else {
            $session = new Session;
            $session->login($getid['id']);
        }
    } else if (isset($_GET["datatype"]) && $_GET["datatype"] === "checksession") { //check if player has a session
        if ($session->isUserLogged()) {
            echo json_encode("Logged in");
        } else {
            echo json_encode("Not logged");
        }
    } else if (isset($_GET["datatype"]) && $_GET["datatype"] === "logout") { //logout session
        $session->logout();
        echo json_encode("logout");
    } else if (isset($_GET["datatype"]) && $_GET["datatype"] === "gettodos") { // get all todos
        if ($_SESSION['id']) {
            $data = $repository->getalltodos($db, $_SESSION['id']);
            echo json_encode($data);
        }
    }
}
