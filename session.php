<?php
class Session
{
    public function __construct()
    {
        session_start();
    }

    public function login($user_id)
    {
        $_SESSION['id'] = $user_id;
    }

    public function logout()
    {
        session_unset();
        session_destroy();
    }

    public function isUserLogged()
    {
        return isset($_SESSION['id']);
    }
}
