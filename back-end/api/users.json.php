<?php

include 'classes/auth_key.php';
header('Content-Type: application/json');

$site = new Auth_Key();
$auth_site = $site->getAuth();
if (!$auth_site) {
    die(json_encode(array('Auth-Key is not valid')));
}

$method = $_SERVER['REQUEST_METHOD'];
$input_data = json_decode(file_get_contents("php://input"), true);

if (isset($method)) {
    $users = new Request();
    $users->table = 'users';
    $users->get_table = 'users';
    $users->get_data = array('username', 'fullname', 'level', 'status', 'created_date');
    $users->norequest = true;
    $level = 0;

    switch ($method) {
        case 'GET':
            switch ($_GET['type']) {
                case 'unique':
                    $data = array(array('username' => $_GET['username']));
                    $users->get_data = array('username');
                    break;

                case 'content':
                    $data = array(array('level' => '0'), array('conector' => 'OR'), array('level' => '1'), array('conector' => 'OR'), array('level' => '2'), array('conector' => 'OR'), array('level' => '3'));
                    $users->get_data = array('username', 'fullname');
                    break;

                case 'all':
                    if ($level > 1) {
                        $data = array(array('level' => '4'), array('conector' => 'OR'), array('level' => '5'));
                    } else {
                        $data = '';
                    }
                default:
                    break;
            }
            $users->data = $data;
            $user_array = $users->selectRequest();
            echo json_encode($user_array);
            break;

        case 'POST':
            if (($level > 1) && ($level != 4)) {
                break;
            }
            $data = array(array('fullname' => $input_data['fullname'], 'username' => $input_data['username'], 'password' => md5($input_data['password']), 'level' => $input_data['level'], 'status' => $input_data['status'], 'key' => ''));
            $users->data = $data;
            $users->createRequest();
            break;

        case 'PUT':
            if (($level > 1) && ($level != 4)) {
                break;
            }
            switch ($input_data['type']) {
                case 'status':
                    $data = array(array('status' => $input_data['status']));
                    break;
                case 'nopassword':
                    $data = array(array('fullname' => $input_data['fullname'], 'level' => $input_data['level'], 'status' => $input_data['status']));
                    break;
                case 'full':
                    $data = array(array('fullname' => $input_data['fullname'], 'password' => md5($input_data['password']), 'level' => $input_data['level'], 'status' => $input_data['status']));
                    break;
            }
            if ((isset($input_data['username'])) && ($input_data['username'] != '')) {
                $users->data = $data;
                $users->id_key = 'username';
                $users->id_value = $input_data['username'];
                $users->updateRequest();
            }
            break;

        case 'DELETE':
            if (($level > 1) && ($level != 4)) {
                break;
            }
            if ((isset($_GET['username'])) && ($_GET['username'] != '')) {
                $users->id_key = 'username';
                $users->id_value = $_GET['username'];
                $users->deleteRequest();
            }
            break;

        default:
            break;
    }
    $users->closeConnection();
}
?>