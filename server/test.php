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
  $_nameProductCategory = $_POST['name'];
  $sql = "";
  if($_nameProductCategory == 'all') {
    $sql = "SELECT * FROM product";
  } else {
    $sql = "SELECT * FROM product p inner join productcategory pc on p.IDCategory = pc.IDCAtegory where NameProductCategory = '$_nameProductCategory' order by id desc";
  }
  $result = $conn->query($sql);

  $dbdata = array();
  while ($row = $result->fetch_assoc()) {
    $dbdata[]=$row;
}
  echo json_encode($dbdata);
  // echo '{"name": "phat"}';

  mysqli_close($conn);
?>
