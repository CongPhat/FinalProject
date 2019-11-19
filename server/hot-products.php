<?php
   $servername = "localhost";
   $database = "shop";
   $username = "root";
   $password = "";
  $conn = mysqli_connect($servername, $username, $password, $database);
  if (!$conn) {
      die("Connection failed: " . mysqli_connect_error());
  }

  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: *");
  // header('Content-Type: application/json');

  $_POST = json_decode(file_get_contents("php://input"),true);
  $_nameCategoryHot = $_POST['name'];
  $sql = "";
  if($_nameCategoryHot == 'all') {
    $sql = "SELECT * FROM product ORDER BY `view` desc LIMIT 10";
    $result = $conn->query($sql);

    $dbdata = array();
    while ($row = $result->fetch_assoc()) {
      $dbdata[]=$row;
    }
    echo json_encode($dbdata);
  }

  mysqli_close($conn);
?>
