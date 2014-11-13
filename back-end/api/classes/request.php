<?php

include ('connection.php');

/**
 * Description of Request Class
 *
 * @author Ernesto La Fontaine
 */
class Request {

    private $connection;
    public $table = '';
    public $get_table = '';
    public $data;
    public $get_data;
    public $id_key = '';
    public $id_value = '';
    public $id_data;
    public $orderby = '';
    public $norequest = false;

    function Request() {
        $this->connection = new Connection();
        $this->connection->connectToDatabase();
    }

    function selectRequest() {
        $get_table = $this->get_table;
        $data = $this->data;
        $get = $this->get_data;
        if ($get_table != '') {
            $data_query = "";
            if (is_array($data)) {
                $data_query = " WHERE ";
                foreach ($data as $array) {
                    foreach ($array as $key => $value) {
                        if ($key != 'conector') {
                            if ($value == 'NULL') {
                                $data_query .= " `" . $key . "` IS NULL ";
                            } else {
                                $data_query .= " `" . $key . "` = '" . $value . "' ";
                            }
                        } else {
                            $data_query .= $value . " ";
                        }
                    }
                }
            }
            $get_str = '*';
            if (is_array($get)) {
                $get_str = implode(',', $get);
            }
            $orderby = '';
            if ($this->orderby != '') {
                $orderby = 'ORDER BY ' . $this->orderby;
            }
            //echo "SELECT {$get_str} FROM `wf_{$get_table}` {$data_query} {$orderby};";
            $request_query = mysql_query("SELECT {$get_str} FROM `wf_{$get_table}` {$data_query} {$orderby};") or die("Error: " . mysql_error());
            $request_array = array();
            while ($request_row = mysql_fetch_assoc($request_query)) {
                $request_array[] = $request_row;
            }
            return $request_array;
        } else {
            return 'NO DATA';
        }
    }

    function createRequest() {
        $table = $this->table;
        $data = $this->data;
        $data_query = "";
        if (is_array($data)) {
            $data_query_key = "";
            $data_query_values = "(";
            $i = 1;
            foreach ($data as $array) {
                foreach ($array as $key => $value) {
                    if ($i == 1) {
                        $data_query_key .= " `" . $key . "`,";
                    }
                    $data_query_values .= "'" . $value . "',";
                }
                $data_query_values = rtrim($data_query_values, ',');
                $data_query_values .= "),(";
                $i++;
            }
            $data_query_key = rtrim($data_query_key, ',');
            $data_query_values = rtrim($data_query_values, '),(');

            $data_query = "(" . $data_query_key . ") VALUES " . $data_query_values . ")";
        }
        $request_insert = mysql_query("INSERT INTO `wf_{$table}` {$data_query} ;") or die("Error: " . mysql_error());
        $this->data = '';
        if (!$this->norequest) {
            return $this->selectRequest();
        }
    }

    function updateRequest() {
        $table = $this->table;
        $id = $this->id_key;
        $id_value = $this->id_value;
        $id_data = $this->id_data;
        $data = $this->data;
        $data_query = "";
        if (is_array($data)) {
            foreach ($data as $array) {
                foreach ($array as $key => $value) {
                    if ($value == 'NULL') {
                        $data_query .= " `" . $key . "` = NULL,";
                    } else {
                        $data_query .= " `" . $key . "` = '" . $value . "',";
                    }
                }
            }
            $data_query = rtrim($data_query, ',');
            if (is_array($id_data)) {
                $id_data_query = "";
                foreach ($id_data as $key => $value) {
                    $id_data_query .= " `" . $key . "` = '" . $value . "' AND ";
                }
                $id_data_query = rtrim($id_data_query, 'AND ');
            } else {
                $id_data_query = "`{$id}` = '{$id_value}'";
            }
            $data_query = " SET " . $data_query . " WHERE " . $id_data_query;
        }
        $request_update = mysql_query("UPDATE `wf_{$table}` {$data_query} ;") or die("Error: " . mysql_error());
        $this->data = '';
        if (!$this->norequest) {
            return $this->selectRequest();
        }
    }

    function deleteRequest() {
        $table = $this->table;
        $id = $this->id_key;
        $id_value = $this->id_value;
        $id_data = $this->id_data;
        $data_query = "";
        if (is_array($id_data)) {
            foreach ($id_data as $key => $value) {
                $data_query .= " `" . $key . "` = '" . $value . "' AND ";
            }
            $data_query = rtrim($data_query, 'AND ');
        } else {
            $data_query = "`{$id}` = '{$id_value}'";
        }
        $request_delete = mysql_query("DELETE FROM `wf_{$table}` WHERE {$data_query} ;") or die("Error: " . mysql_error());
        if (!$this->norequest) {
            return $this->selectRequest();
        }
    }

    function specialQuery() {
        $data = $this->data;
        $request_special = mysql_query($data[0]) or die("Error: " . mysql_error());
    }

    function closeConnection() {
        $this->connection->closeConnection();
    }

}

?>