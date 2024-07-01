<?php
    $CN = mysqli_connect("localhost", "root", "");
    $DB = mysqli_select_db($CN, "account");

    $EncodedData = file_get_contents('php://input');
    $DecodedData = json_decode($EncodedData, true);

    $email = $DecodedData['email'];
    $fullname = $DecodedData['fullname'];
    $age = $DecodedData['age'];
    $password = md5($DecodedData['password']);

    $insertMemberData = "insert into accountdata(email, fullname, age, password) values ('$email', '$fullname', '$age', '$password')";

    $register = mysqli_query($CN, $insertMemberData);

    if ($register) 
        $Message = "Member has been registered successfully";
    else 
        $Message = "Server Error... please try latter";

    $Response[] = array("Message" => $Message);
    echo json_encode($Response);
?>