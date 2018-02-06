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
$content = isset ($_POST['content']) ? $_POST['content'] : '沒有填寫';

if (!$email) {
  echo json_encode (array ('status' => false));
  exit;
}

$msg = '';
$msg .= 'Name：' . $name . "<hr/>";
$msg .= 'Phone：' . $phone . "<hr/>";
$msg .= 'Email：' . $email . "<hr/>";
$msg .= "Message：<br/>" . $content;

include 'OAMail.php';

$mail = OAMail::create ();
$mail->addTo ('support@curatech.jp', 'Support');
$mail->addBCC ('comdan66@gmail.com', 'OA');
$mail->setSubject ('Cura Contact');
$mail->setBody ($msg);

if ($mail->send ())
  echo json_encode (array ('status' => true));
else
  echo json_encode (array ('status' => false));
