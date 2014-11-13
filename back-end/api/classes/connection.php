<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of connect
 *
 * @author Ernesto
 */
class Connection {//create a class for make connection

	var $host = "localhost";
	var $username = "xxxx";// specify the sever details for mysql
	Var $password = "xxxx";
	var $database = "xxx";
	var $myconn;

	function connectToDatabase() {// create a function for connect database
		$conn = mysql_connect($this->host, $this->username, $this->password);

		if (!$conn) {// testing the connection
			die("Cannot connect to the database");
		} else {
			$this->myconn = $conn;
			//echo "Connection established";
		}

		mysql_select_db($this->database);//use php inbuild functions for select database

		if (mysql_error()) {// if error occured display the error message
			echo "Cannot find the database " . $this->database;
		}

		return $this->myconn;
	}

	function closeConnection() {// close the connection
		mysql_close($this->myconn);
		//echo "Connection closed";
	}

}
