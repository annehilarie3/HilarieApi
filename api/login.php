<?php
$conn = mysqli_connect('localhost', 'root', ''); 
$database = mysqli_select_db($conn, 'account');

$encodedData = file_get_contents('php://input');  // take data from react native fetch API
$decodedData = json_decode($encodedData, true);

$UserEmail = $decodedData['email'];
$UserPW = ($decodedData['password']); //password is hashed

$SQL = "SELECT * FROM accountdata WHERE email = '$UserEmail'";
$exeSQL = mysqli_query($conn, $SQL);
$checkEmail =  mysqli_num_rows($exeSQL);
if ($checkEmail != 0) {
    $arrayu = mysqli_fetch_array($exeSQL);
    $hashedPasswordFromDB = $arrayu['Password'];
    if (password_verify($UserPW, $hashedPasswordFromDB)) {
        $Message = "pw WRONG";
    } else {
        $Message = "Success";
    }
} else {
    $Message = "No account yet";
}
$response[] = array("Message" => $Message);
echo json_encode($response);