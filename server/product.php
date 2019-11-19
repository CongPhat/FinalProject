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
  $_nameProduct = $_POST['name'];
  $statusViews = $_POST['increaseViews'];

  if($statusViews) {
    $sqlView = "UPDATE product SET `view` = `view` + 1 where NameProduct = '$_nameProduct'";
    $result = $conn->query($sqlView);
  }

  $sql = "SELECT * FROM product where NameProduct = '$_nameProduct'";
  $result = $conn->query($sql);
  $row = $result->fetch_assoc();
  echo json_encode($row);

  mysqli_close($conn);
?>
