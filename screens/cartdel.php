<?php
 
include 'connect.php';
 
 $json = file_get_contents('php://input');
 
 $obj = json_decode($json,true);
 
$cid = $obj['cid'];
                   $sqd = "DELETE FROM cart WHERE id = '$cid';                   ";
                   $qued = mysqli_query($dbcon, $sqd);
                   if ($qued){
                    echo json_encode('ลบสินค้าสำเร็จ');
                    //header('refresh:1;');
                } else {
                    echo json_encode('ขออภัย! ไม่สามารถลบสินค้าได้');
                }
 mysqli_close($dbcon);
?>