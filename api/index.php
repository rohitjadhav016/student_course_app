<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DBConnect.php';

$dbObj = new DBConnect;
$connObj = $dbObj->connect();
$reqMethod = $_SERVER['REQUEST_METHOD'];

if($connObj){
    $response = [];
    switch($reqMethod){
        case 'POST':
            $studData = json_decode(file_get_contents('php://input'));
            if($studData->request == 'login'){
                $sql = "SELECT * FROM students WHERE email = :email";
                $stmt = $connObj->prepare($sql);
                $stmt->bindParam(':email', $studData->email);
                $stmt->execute();
                $studentData = $stmt->fetchAll(PDO::FETCH_ASSOC);

                //check if user exists and verify password
                if($studentData){
                    //checking the password against the hashed password
                    if (password_verify($studData->password, $studentData[0]['password'])) {
                        $response = ['status' => 3, 'message' => 'User verified successfully', 'user_id' => $studentData[0]['student_id']];
                    } else {
                        $response = ['status' => 4, 'message' => 'Invalid password'];
                    }
                }else{
                    $response = ['status' => 5, 'message' => 'Invalid Username and Password'];
                }
            }else{
                $sql = "INSERT INTO students(student_id,name,email,password,created_at) VALUES (null,:name,:email,:password,:created_at)";
                $stmt = $connObj->prepare($sql);
                
                $createAt = date('Y-m-d');
                $stmt->bindParam(':name', $studData->name);
                $stmt->bindParam(':email', $studData->email);
                $stmt->bindParam(':password', password_hash($studData->password, PASSWORD_DEFAULT));
                $stmt->bindParam(':created_at', $createAt);
        
                if($stmt->execute()){
                    $response = ['status' => 1, 'message' => 'Record Added Successfully'];
                }else{
                    $response = ['status' => 0, 'message' => 'Failed to Add Record'];
                }
            }
        echo json_encode($response);
        break;

        case "GET":
            $sql = "SELECT * FROM courses";
            $path = explode('/', $_SERVER['REQUEST_URI']);
            if(isset($path[3])) {
                $sql .= " WHERE id = :id";
                $stmt = $connObj->prepare($sql);
                $stmt->bindParam(':id', $path[3]);
                $stmt->execute();
                $studentData = $stmt->fetch(PDO::FETCH_ASSOC);
            } else {
                $stmt = $connObj->prepare($sql);
                $stmt->execute();
                $studentData = $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
            if(!empty($studentData)){
                echo json_encode($studentData);
            }else{
                $response = ['status' => 6, 'message' => 'No Data Found'];
                echo json_encode($response);
            }
            break;

        case "DELETE":
            $path = explode('/', $_SERVER['REQUEST_URI']);
            $sql = "DELETE FROM courses WHERE id = :id";
            $stmt = $connObj->prepare($sql);
            $stmt->bindParam(':id', $path[2]);
    
            if($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to delete record.'];
            }
            echo json_encode($response);
            break;  
    }
}else{
    $response = ['status' => 2, 'message' => 'Failed to Connect Database'];
    echo json_encode($response);
}
