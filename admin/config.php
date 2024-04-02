<?php
// config.php
define('DB_HOST', 'localhost');
define('DB_NAME', 'root');
define('DB_USER', 'webbanhang');
define('DB_PASS', '::1');

$mysqli = new mysqli('localhost', 'root', '', 'webbanhang');

if ($mysqli->connect_errno) {
    echo "Kết nối không thành công: " . $mysqli->connect_errno;
    exit();
}
