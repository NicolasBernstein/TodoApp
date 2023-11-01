<?php
class dbConnect
{
    public $con;

    private $server = 'localhost';
    private $dbname = 'id21469953_usersdata';
    private $user = 'id21469953_userdata';
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
