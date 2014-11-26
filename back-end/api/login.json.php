<?php

include 'classes/request.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];
$input_data = json_decode(file_get_contents("php://input"), true);

function destroySession($uid) {
    $users = new Request();
    $users->table = 'users';
    $users->id_key = 'username';
    $users->id_value = $uid;
    $users->data = array(array('key' => ''));
    $users->updateRequest();
    $out = array(0 => 'logout');
    return $out;
}

if (isset($method)) {
    $users = new Request();
    $users->table = 'users';
    $users->get_table = 'users';

    switch ($method) {
        case 'GET':
            switch ($_GET['type']) {
                case 'login':
                    $username = $_GET['username'];
                    $password = md5($_GET['password']);
                    $data = array(array('username' => $username), array('conector' => 'AND'), array('password' => $password), array('conector' => 'AND'), array('status' => '1'));
                    $get_data = array('username', 'level');
                    $users->data = $data;
                    $users->get_data = $get_data;
                    $user_array = $users->selectRequest();
                    if ((is_array($user_array)) && (!empty($user_array))) {
                        if ($user_array[0]['username'] != '') {
                            $uid = $user_array[0]['username'];
                            $level = $user_array[0]['level'];
                            $suid = uniqid('session_' . $uid . "_");
                            $auth_key = md5($suid);
                            $users->id_key = 'username';
                            $users->id_value = $uid;
                            $users->data = array(array('key' => $auth_key));
                            $users->updateRequest();
                            $user_array = array($suid, $auth_key, $level);
                        }
                    } else {
                        $user_array = destroySession($username);
                    }
                    echo json_encode($user_array);
                    break;

                default:
                    break;
            }
            break;

        case 'POST': // check is logged
            $uid = md5($input_data['uid']);
            $users->data = array(array('key' => $uid), array('conector' => 'AND'), array('status' => '1'));
            $users->get_data = array('`key`');
            $user_key_array = $users->selectRequest();
            $ukey = $user_key_array[0]['key'];
            if ((isset($ukey)) && ($ukey == $uid)) {
                $user_array = array('authentified');
            } else {
                $user_array = array('');
            }
            echo json_encode($user_array);
            break;

        case 'DELETE':
            echo json_encode(destroySession($_GET['uid']));
            break;

        default:
            break;
    }
    $users->closeConnection();
}
?>