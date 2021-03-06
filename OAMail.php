<?php

/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2017 OA Wu Design
 * @license     http://creativecommons.org/licenses/by-nc/2.0/tw/
 */

require_once 'lib' . DIRECTORY_SEPARATOR . 'PHPMailer-5.2.21' . DIRECTORY_SEPARATOR . 'class.phpmailer.php';
require_once 'lib' . DIRECTORY_SEPARATOR . 'PHPMailer-5.2.21' . DIRECTORY_SEPARATOR . 'class.smtp.php';

class OAMail extends PHPMailer {

  public function __construct () {
    parent::__construct ();

    $this->isSMTP ();
    $this->SMTPAuth = true;
    $this->isHTML (true);
    $this->WordWrap = 50;

    $config = include ('config.php');
    foreach ($config as $key => $value)
      $this->$key = $value;
  }

  public function addTo ($address, $name = '') {
    $this->addAddress ($address, $name);
    return $this;
  }
  public function addCC ($address, $name = '') {
    parent::addCC ($address, $name);
    return $this;
  }
  public function addBCC ($address, $name = '') {
    parent::addBCC ($address, $name);
    return $this;
  }
  public function addFile ($path, $name = '') {
    $this->addAttachment ($path, $name);
    return $this;
  }
  public function setSubject ($subject) {
    $this->Subject = $subject;
    return $this;
  }
  
  public function setBody ($body) {
    $this->Body = $body;
    return $this;
  }

  public function setFrom ($address, $name = '', $auto = true) {
    parent::setFrom ($address, $name, $auto);
    return $this;
  }

  public static function create () {
    return new self ();
  }
}