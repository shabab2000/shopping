<?php
 
include 'connect.php';
 
 $json = file_get_contents('php://input');
 
 $obj = json_decode($json,true);

$img = $_POST['img'];


if(isset($img)){
    
    $folderPath = 'profile/';
$json = file_get_contents('php://input');
$obj = json_decode($json,true);
$id = $_POST['id'];
$name = $_POST['name'];
$tel = $_POST['tel'];

$file_tmp = $_FILES['photo']['tmp_name'];
$file_ext = strtolower(end(explode('.',$_FILES['photo']['name'])));
$file = $folderPath . uniqid() . '.'.$file_ext;
$move =  move_uploaded_file($file_tmp, $file);

$sql = "UPDATE users SET name ='$name',telephone ='$tel', img='$file' WHERE id = $id";
$query = mysqli_query($dbcon, $sql);

if($query){
    $MSG = 'อัปเดทโปรไฟล์สำเร็จ' ;
 
    echo json_encode($MSG);
}else{
    $MSG = $dbcon->error ;
 
    echo json_encode($MSG);
}

} else {
    $id = $obj['id'];
    $name = $obj['name'];
$tel = $obj['tel'];

    $Sql_Query = "UPDATE user SET name='$name',telephone='$tel' WHERE id = '$id'";
    $querys = mysqli_query($dbcon, $Sql_Query);
    if($querys){
 
        $MSG = 'อัปเดทโปรไฟล์สำเร็จ' ;
         
        $json = json_encode($MSG);
         
        echo $json ;
        
    }
 
 else{
 
$InvalidMSG = $dbcon->error ;
 
$InvalidMSGJSon = json_encode($InvalidMSG);
 
 echo $InvalidMSGJSon ;
 
 }
}
 
 mysqli_close($dbcon);
?>