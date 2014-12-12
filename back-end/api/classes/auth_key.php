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
        echo $_GET['auth'];
        echo 'eee';
        if (isset($headers['Auth-Key'])) {
            $authReq = new Request();
            $authReq->get_table = 'site';
            $authReq->data = array(array('key' => $headers['Auth-Key']));
            $authReq->get_data = array('`key`');
            $site_key = $authReq->selectRequest();
            $getAuth = '';
            if (isset($_GET['auth'])) {
                $getAuth = $_GET['auth'];
            }
            echo $getAuth;
            if (($getAuth != 'client') && (isset($_GET['access_token']))) {
                $authReq->get_table = 'users';
                $authReq->data = array(array('key' => $_GET['access_token']));
                $authReq->get_data = array('`key`');
                $user_key = $authReq->selectRequest();
            } else {
                if ($_SERVER['REQUEST_METHOD'] == 'GET') {
                    $user_key[0]['key'] = 'auth';
                }
            }
            if ((is_array($user_key)) && (!empty($user_key)) && (is_array($site_key)) && (!empty($site_key))) {
                if (($user_key[0]['key'] != '') && ($site_key[0]['key'] != '')) {
                    $auth = true;
                }
            }
        }
        return $auth;
    }

}
