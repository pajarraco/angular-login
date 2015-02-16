<?php

include 'request.php';
include 'variables.php';
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
class Auth_Key {

    function getAuth() {
        $variables = new Variables();
        $auth = false;
        $headers = apache_request_headers();
        if (isset($headers['Auth-Key'])) {
            $authReq = new Request();
            $authReq->get_table = 'site';
            $authReq->data = array(array('key' => $headers['Auth-Key']));
            $authReq->get_data = array('`key`');
            $site_key = $authReq->selectRequest();
            if (isset($_GET['access_token'])) {
                $authReq->get_table = 'users';
                $authReq->data = array(array('key' => $variables->cleanVariable($_GET['access_token'])));
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

