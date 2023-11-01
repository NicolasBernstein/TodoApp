<?php

class repository
{
    public function register($con, $data)
    {
        $pre = mysqli_prepare($con->con, "INSERT INTO users(username, password) VALUES (?, ?)");
        $hash = password_hash($data["password"], PASSWORD_DEFAULT);
        $pre->bind_param("ss", $data["username"], $hash);
        $pre->execute();
    }
    public function CheckRegister($con, $username)
    {
        $pre = mysqli_prepare($con->con, "SELECT * FROM users WHERE username = ?");
        $pre->bind_param("s", $username);
        $pre->execute();
        $result = $pre->get_result();

        if ($result->num_rows === 0) {
            return 'Proceed';
        } else {
            return 'user already exists';
        }
    }
    public function check($con, $username, $password)
    {
        $pre = mysqli_prepare($con->con, "SELECT * FROM users WHERE username = ?");
        $pre->bind_param("s", $username);
        $pre->execute();
        $result = $pre->get_result();

        if ($result->num_rows === 0) {
            return 'Wrong username';
        } else {
            $userRow = $result->fetch_assoc();
            $HashedPassword = $userRow['password'];

            if (password_verify($password, $HashedPassword)) {
                return $userRow;
            } else {
                return 'Wrong password';
            }
        }
    }
    public function create($con, $data, $id)
    {
        $done = 0;
        $pre = mysqli_prepare($con->con, "INSERT INTO todos(title, description, category, done, userid) VALUES(?,?,?,?,?)");
        $pre->bind_param("sssii", $data['title'], $data['description'], $data['category'], $done, $id);
        $pre->execute();
    }
    public function update($con, $data)
    {
        $pre = mysqli_prepare($con->con, "UPDATE todos SET title = ?, description = ?, category = ?, done = ? WHERE id = ?");
        $pre->bind_param("sssii", $data['title'], $data['description'], $data['category'], $data['done'], $data['id']);
        $pre->execute();
        if ($pre->execute()) {
            return "Update successful";
        } else {
            return "Update failed";
        }
    }
    public function delete($con, $id)
    {
        $pre = mysqli_prepare($con->con, "DELETE FROM todos WHERE id = ?");
        $pre->bind_param("i", $id);
        $pre->execute();
    }

    public function getalltodos($con, $id)
    {
        $pre = mysqli_prepare($con->con, "SELECT * FROM todos WHERE userId = ?");
        $pre->bind_param("i", $id);
        $pre->execute();

        $result = $pre->get_result();

        if ($result) {
            $todos = [];

            while ($row = $result->fetch_assoc()) {
                $todos[] = $row;
            }
            return $todos;
        } else {
            echo "The user has no todos.";

            return [];
        }
    }
}
