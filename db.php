<?php
class dbConnect
{
    public $con;

    private $server = 'localhost';
    private $dbname = 'id21487704_tododatabase';
    private $user = 'id21487704_usersdata';
    private $pass = 'Userdata1!';

    /*
    private $server = 'localhost';
    private $dbname = 'todo';
    private $user = 'root';
    private $pass = '';
*/
    public function connect()
    {
        $this->con = mysqli_connect($this->server, $this->user, $this->pass, $this->dbname);
    }
}
