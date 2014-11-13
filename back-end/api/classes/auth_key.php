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

    function getLevel() { // create a function for connect database
        $headers = apache_request_headers();
        $users = new Request();
        $users->get_table = 'users';
        $users->data = array(array(key => $headers['Auth-Key']));
        $users->get_data = array('`key`', '`level`');
        $user_key = $users->selectRequest();


        //$user_level = ' 675675 ';

        if ($user_key[0]['key'] == '') {
            $user_level = 'Auth-Key is not valid';
        } else {
            $user_level = $user_key[0]['level'];
        }
        return $user_level;
    }

}
