<?php
$conn = mysqli_connect('localhost', 'root', '', 'employees');

if (!$conn) {
  die('Connection failed: ' . mysqli_connect_error());
}
?>