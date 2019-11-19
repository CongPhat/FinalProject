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
  $dataSend = $_POST['dataSend'];
  $email = $dataSend['email'];
  $fullname = $dataSend['fullname'];
  $phonenumber = $dataSend['phonenumber'];
  $address = $dataSend['address'];


  $sql = "UPDATE account SET fullname='$fullname', phonenumber='$phonenumber', address='$address' WHERE email = '$email'";
  if(mysqli_query($conn, $sql)) {
    $sql = "SELECT * FROM account where email = '$email'";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    echo json_encode($row);
  } else {
    echo "ERROR: Could not able to execute $sql. "  . mysqli_error($conn);
  }

  mysqli_close($conn);
?>
