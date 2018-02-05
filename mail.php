<?php

/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2013 - 2018, OACI
 * @link        https://www.ioa.tw/
 */

if (!function_exists ('validIp')) {
  function validIp ($ip, $which = '') {
    switch (strtolower ($which)) {
      case 'ipv4':
        $which = FILTER_FLAG_IPV4;
        break;

      case 'ipv6':
        $which = FILTER_FLAG_IPV6;
        break;

      default:
        $which = null;
        break;
    }

    return (bool)filter_var ($ip, FILTER_VALIDATE_IP, $which);
  }
}
if (!function_exists ('ip')) {
  function ip () {
    static $ip;
    if ($ip !== null)
      return $ip;

    $ip = $_SERVER['REMOTE_ADDR'];

    return $ip = validIp ($ip) ? $ip : '0.0.0.0';
  }
}
if (!function_exists ('request_is_ajax')) {
  function request_is_ajax () {
    return isset ($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower ($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';
  }
}

// if (!request_is_ajax ()) {
//   header ('HTTP/1.1 500 Internal Server Error', true, 500);
//   echo "<title>500 Internal Server Error</title><body>500 Internal Server Error.Not Ajax.</body>";
//   exit;
// }

$allow = array ('http://dev.case.ioa.tw', 'http://www.curatech.jp', 'https://sasachu.github.io', 'http://sasachu.github.io');
isset ($_SERVER['HTTP_ORIGIN']) && in_array ($_SERVER['HTTP_ORIGIN'], $allow) || $_SERVER['HTTP_ORIGIN'] = 'dev.case.ioa.tw';

header ("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
header ('HTTP/1.1 200 OK', true, 200);
header ('Content-Type: application/json; charset=UTF-8', true);

$name = isset ($_POST['name']) ? $_POST['name'] : '沒有填寫';
$phone = isset ($_POST['phone']) ? $_POST['phone'] : '沒有填寫';
$email = isset ($_POST['email']) ? $_POST['email'] : '';
$content = isset ($_POST['content']) ? $_POST['content'] : '';

if (!($email && $content)) {
  echo json_encode (array ('status' => false));
  exit;
}

$to = "support@curatech.jp"; //收件者
$to = "teresa@zeusdesign.com.tw"; //收件者

$subject = "=?UTF-8?B?" . base64_encode ('Cura Contact') . "?=";//信件標題，解決亂碼問題

$headers = "From:" . "=?UTF-8?B?" . base64_encode ($name) . "?=" . " <" . $email . ">"; //寄件者名稱和信箱

$msg = '';
$msg .= 'Name：' . $name . "\n\n";
$msg .= 'Phone：' . $phone . "\n\n";
$msg .= 'Email：' . $email . "\n\n";
$msg .= "Message：\n\n" . $content . "\n";

$success = mail ($to, $subject, $msg, $headers);

if (!$success) {
  echo json_encode (array ('status' => false));
  exit;
}
echo json_encode (array ('status' => true));
exit;
