<?php

include 'request.php';
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of auth_key
 *
 * @author Ernesto
 */
class Auth_Key { //create a class for make connection 

    function getAuth() { // create a function for connect database
        $auth = false;
        $headers = apache_request_headers();
        if (isset($headers['Auth-Key'])) {
            $site = $_SERVER['SERVER_NAME'];
            $users = new Request();
            $users->get_table = 'site';
            $users->data = array(array('key' => $headers['Auth-Key']), array('conector' => 'AND'), array('site' => $site));
            $users->get_data = array('`key`');
            $user_key = $users->selectRequest();

            if (is_array($user_key) && (!empty($user_key))) {
                if ($user_key[0]['key'] != '') {
                    $auth = true;
                }
            }
        }

        return $auth;
    }

}
