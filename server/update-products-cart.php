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
  $_cartUpdate = $_POST['cart'];
  $idProductInTheCart = $_cartUpdate['idProductInTheCart'];
  $valueId = $_cartUpdate['ID'];
  $valueIdConvert = (int)$valueId;
  $price = $_cartUpdate['Price'];
  $sql = "SELECT * FROM product where ID = '$valueIdConvert' and Price != '$price'";
  $result = $conn->query($sql);
  $row = $result->fetch_assoc();
  $row['idProductInTheCart'] = $idProductInTheCart;
  echo json_encode($row);


  mysqli_close($conn);
?>
