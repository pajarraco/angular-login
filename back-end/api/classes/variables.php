<?php

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
class Variables { //create a class for make connection 

    function cleanVariable($v) {
        $r = addslashes(mysql_real_escape_string(strip_tags($v)));
        return $r;
    }

}
