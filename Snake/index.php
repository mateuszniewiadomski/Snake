<?php

    session_start();

    require_once "connect.php";

?>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Snake</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="game.css">
    <script src="game.js" defer type="module"></script>
    <script src="comment.js" defer type="module"></script>
</head>
<body>
    <div id="web-layout">
        <div id="board-and-scores">
            <div id="game">
                <div id="game-info">
                    <div id="game-title">SNAKE
                        <button style="float: right;" id="turn-on-ai">Turn on AI</button>
                    </div>
                    <div id="current-time">Time: 0m 0s</div>
                    <div id="current-score">Score: 0 points</div>
                </div>
                <div id="game-board"></div>
                <div id="game-board-border"></div>
                <div id="menu">
                </div>
            </div>
            <div id="high-scores">
                <div id="high-scores-title">High scores:</div>
                <table id="high-scores-table">
                    <tr>
                        <th></th>
                        <th>SCORE</th>
                        <th>TIME</th>
                        <th>NAME</th>
                        <th>DATE</th>
                    </tr>
                    <?php

                    $connect = new mysqli($host, $db_user, $db_password, $db_name);

                    if ($connect->connect_error) {
                        die("Connection failed: " . $conn->connect_error);
                    }
                    
                    $sql = "SELECT * FROM scoreshistory ORDER BY Score DESC LIMIT 15";
                    $result = $connect->query($sql);

                    if ($result->num_rows > 0) {

                        $tmpCount = 1;

                        while ($row = $result->fetch_assoc()) {
                            echo "<tr>";
                            echo "<td>".$tmpCount.".</td>";
                            echo "<td>".$row["Score"]."</td>";
                            echo "<td>".$row["PlayTime"]."</td>";
                            echo "<td>".$row["NickName"]."</td>";
                            echo "<td>".date("m-d-Y", strtotime($row["ScoreDate"]))."</td>";
                            echo "</tr>";

                            $tmpCount ++;
                        }
                    }

                    $connect->close();

                    ?>
                </table>
            </div>
    </div>
    <div id="rates-and-comments">
        <?php

            $connect = new mysqli($host, $db_user, $db_password, $db_name);

            if ($connect->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }
                    
            $sql = "SELECT CAST(AVG(Rate) AS DECIMAL(10,1)) AS 'Rate', COUNT(*) AS 'Count' FROM rating";
            $result = $connect->query($sql);
            
            $row = $result->fetch_assoc();
            
            echo '<div id="rates-and-comments-title">Comments ('.$row["Count"].')
            <span style="margin-left: 30vw;"></span>
            <span style="color: orange; font-size: 4vmin;"> ★ </span>'.$row["Rate"].'/10</div>';

            echo '<div id="rates-and-comments-new"></div>';
            $sql = "SELECT * FROM rating";
            $result = $connect->query($sql);

            if ($result->num_rows > 0) {

                while ($row = $result->fetch_assoc()) {

                    echo '<div id="rates-and-comments-block">';
                    echo '<div id="rates-and-comments-block-info">';
                    echo '<div id="rates-and-comments-block-date">'.date("l, M d, Y \a\\t H:i:s", strtotime($row["RatingDate"])).'</div>';
                    echo '<div id="rates-and-comments-block-author">'.$row["NickName"].'</div>';
                    echo '</div>';
                    echo '<div id="rates-and-comments-block-data">';
                    echo '<div id="rates-and-comments-block-rate">';
                    
                    $tmpRate = $row["Rate"];
                    for ($i=0; $i < $tmpRate; $i++) { 
                        echo '<span style="color: orange; font-size: 4vmin;">★</span>';
                    }

                    for ($i=0; $i < 10-$tmpRate; $i++) { 
                        echo '<span style="color: black; font-size: 4vmin;">☆</span>';
                    }
                    echo '</div>';
                    echo '<div id="rates-and-comments-block-comment">'.$row["Comment"].'</div>';
                    echo '</div>';
                    echo '</div>';
                }
            }

        $connect->close();

        ?>
        </div>
    </div>
</body>
</html>