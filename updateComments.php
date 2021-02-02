<?php

    require_once "connect.php";

    $connect = @new mysqli($host, $db_user, $db_password, $db_name);

    if($connect->connect_errno!=0) {
        echo "Error: ", $connect->connect_errno;
    } else {

    }

    $nick = mysqli_real_escape_string($connect, $_POST['nick']);
    $date = date("Y-m-d H:i:s");
    $rate = mysqli_real_escape_string($connect, $_POST['rate']);
    $comment = mysqli_real_escape_string($connect, $_POST['comment']);

    $sql =  "INSERT INTO rating (`RatingDate`, `NickName`, `Rate`, `Comment`) 
            VALUES ('$date', '$nick', $rate, '$comment')";
    
    if ($connect->query($sql) === TRUE) {
        echo "New record created successfully";
      } else {
        echo "Error: " . $sql . "<br>" . $connect->error;
      }
    
    $connect->close();

    header('Location: .');

?>