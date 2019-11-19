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
  $account = $_POST['accountRegister'];
  $passWord = $account['password'];
  $fullName = $account['fullname'];
  $email = $account['email'];
  $phoneNumber = $account['phonenumber'];
  $address = $account['address'];


  if($email != '') {
    $sqlCheckEmail = "SELECT * FROM account WHERE email = '$email'";
    $result = mysqli_query($conn, $sqlCheckEmail);
    if ( !$result ) {
      echo 'Database Error';
    }

    if ( mysqli_num_rows($result) == 0 ) {
      $sql = "INSERT INTO account (fullname, email, password, phonenumber, address) values('$fullName', '$email', '$passWord', '$phoneNumber', '$address')";
      $result = mysqli_query($conn, $sql);

      if ( $result ) {
        $sqlAccountLogin = "SELECT * FROM account where email = '$email' && password = '$passWord'";
        $result = $conn->query($sqlAccountLogin);
        $row = $result->fetch_assoc();
        echo json_encode($row);
      } else {
        echo "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
      }
    } else {
      echo ' Username Registered';
    }
  }


  mysqli_close($conn);
?>
