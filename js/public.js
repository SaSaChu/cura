/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2017 OA Wu Design
 * @license     http://creativecommons.org/licenses/by-nc/2.0/tw/
 */

$(function () {

  $('._ic').imgLiquid ({ verticalAlign:'center' });
  $('.banner_boxs').each (function () {
    var $that = $(this);
    var $pagination = $(this).find ('.pagination').empty ();

    $pagination.append ($('<div />').append (Array.apply (null, Array ($(this).find ('>.bbox').length)).map (function (_t, i) {
      return $('<a />').click (function () {
        $(this).addClass ('a').siblings ().removeClass ('a');
        $that.attr ('class', 'banner_boxs b' + $(this).index ());
      });
    })));

    $pagination.find ('a').first ().click ();
  });
  
});