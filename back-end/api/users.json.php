<?php

include 'classes/auth_key.php';
header('Content-Type: application/json');

$user_level = new Auth_Key();
$level = $user_level->getLevel();
if ($level == 'Auth-Key is not valid') {
    die(json_encode(array($level)));
}

$method = $_SERVER['REQUEST_METHOD'];
$input_data = json_decode(file_get_contents("php://input"), true);

if (isset($method)) {
    $users = new Request();
    $users->table = 'users';
    $users->get_table = 'users';
    $users->get_data = array('username', 'company_id', 'fullname', 'level', 'state', 'created_date');
    $users->norequest = true;

    switch ($method) {
        case 'GET':
            switch ($_GET['type']) {
                case 'unique':
                    $data = array(array(username => $_GET['username']));
                    $users->get_data = array('username');
                    break;
                
                case 'content':
                    $data = array(array(level => '0'), array(conector => 'OR'), array(level => '1'), array(conector => 'OR'), array(level => '2'), array(conector => 'OR'), array(level => '3'), array(conector => 'OR'), array(company_id => $_GET['company_id']));
                    $users->get_data = array('username', 'fullname');
                    break;

                default:
                    if ($level > 1) {
                        $data = array(array(level => '4'), array(conector => 'OR'), array(level => '5'));
                    } else {
                        $data = '';
                    }
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
            if (is_array($input_data['company_id'])) {
                $company_id = '';
                foreach ($input_data['company_id'] as $value) {
                    $company_id .= $value['company_id'] . ',';
                }
                $company_id = rtrim($company_id, ',');
            } else {
                $company_id = $input_data['company_id'];
            }
            $data = array(array(company_id => $company_id, fullname => $input_data['fullname'], username => $input_data['username'], password => md5($input_data['password']), level => $input_data['level'], state => $input_data['state'], key => ''));
            $users->data = $data;
            $users->createRequest();
            break;

        case 'PUT':
            if (($level > 1) && ($level != 4)) {
                break;
            }

            if (is_array($input_data['company_id'])) {
                $company_id = '';
                foreach ($input_data['company_id'] as $value) {
                    $company_id .= $value['company_id'] . ',';
                }
                $company_id = rtrim($company_id, ',');
            } else {
                $company_id = $input_data['company_id'];
            }

            switch ($input_data['type']) {
                case 'state':
                    $data = array(array(state => $input_data['state']));
                    break;
                case 'nopassword':
                    $data = array(array(company_id => $company_id, fullname => $input_data['fullname'], level => $input_data['level'], state => $input_data['state']));
                    break;
                case 'full':
                    $data = array(array(company_id => $company_id, fullname => $input_data['fullname'], password => md5($input_data['password']), level => $input_data['level'], state => $input_data['state']));
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