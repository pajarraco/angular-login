<?php

include 'classes/auth_key.php';
include 'classes/variables.php';
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
    $users->norequest = false;
    $level = 0;

    $variables = new Variables();
    $type = '';
    if (isset($_GET['type'])) {
        $type = $variables->cleanVariable($_GET['type']);
    }
    switch ($method) {
        case 'GET':
            switch ($type) {
                case 'unique':
                    $data = array(array('username' => $variables->cleanVariable($_GET['username'])));
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
            $data = array(array('fullname' => $variables->cleanVariable($input_data['fullname']), 'username' => $variables->cleanVariable($input_data['username']), 'password' => md5($variables->cleanVariable($input_data['password'])), 'level' => $variables->cleanVariable($input_data['level']), 'status' => $variables->cleanVariable($input_data['status']), 'key' => ''));
            $users->data = $data;
            $user_array = $users->createRequest();
            echo json_encode($user_array);
            break;

        case 'PUT':
            if (($level > 1) && ($level != 4)) {
                break;
            }
            switch ($input_data['type']) {
                case 'status':
                    $data = array(array('status' => $variables->cleanVariable($input_data['status'])));
                    $users->norequest = true;
                    break;
                case 'nopassword':
                    $data = array(array('fullname' => $variables->cleanVariable($input_data['fullname']), 'level' => $variables->cleanVariable($input_data['level']), 'status' => $variables->cleanVariable($input_data['status'])));
                    break;
                case 'full':
                    $data = array(array('fullname' => $variables->cleanVariable($input_data['fullname']), 'password' => md5($variables->cleanVariable($input_data['password'])), 'level' => $variables->cleanVariable($input_data['level']), 'status' => $variables->cleanVariable($input_data['status'])));
                    break;
            }
            if ((isset($input_data['username'])) && ($input_data['username'] != '')) {
                $users->data = $data;
                $users->id_key = 'username';
                $users->id_value = $variables->cleanVariable($input_data['username']);
                if (!$users->norequest) {
                    $user_array = $users->updateRequest();
                    echo json_encode($user_array);
                } else {
                    $users->updateRequest();
                }
            }
            break;

        case 'DELETE':
            if (($level > 1) && ($level != 4)) {
                break;
            }
            if ((isset($_GET['username'])) && ($_GET['username'] != '')) {
                $users->id_key = 'username';
                $users->id_value = $variables->cleanVariable($_GET['username']);
                $users->norequest = true;
                $users->deleteRequest();
            }
            break;

        default:
            break;
    }
    $users->closeConnection();
}
?>