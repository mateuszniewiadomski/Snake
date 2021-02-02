<?php

    require_once "connect.php";

    $connect = @new mysqli($host, $db_user, $db_password, $db_name);

    if($connect->connect_errno!=0) {
        echo "Error: ", $connect->connect_errno;
    } else {

    }

    $nick = mysqli_real_escape_string($connect, $_POST['nick']);
    $date = date("Y-m-d H:i:s");
    $time = mysqli_real_escape_string($connect, $_POST['time']);
    $score = mysqli_real_escape_string($connect, $_POST['score']);

    $sql =  "INSERT INTO scoreshistory (`NickName`, `ScoreDate`, `Score`, `PlayTime`) 
            VALUES ('$nick', '$date', $score, '$time')";
    
    if ($connect->query($sql) === TRUE) {
        echo "New record created successfully";
      } else {
        echo "Error: " . $sql . "<br>" . $connect->error;
      }
    
    $connect->close();

    header('Location: .');
?>

2020-09-29 19:16:48