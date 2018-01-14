/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2017 OA Wu Design
 * @license     http://creativecommons.org/licenses/by-nc/2.0/tw/
 */

$(function () {
  if (typeof imgLiquid !== 'undefined') $('._ic').imgLiquid ({ verticalAlign:'center' });

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

  $('.feature_boxs').each (function () {
    var $features = $(this).find ('.features');

    $(this).find ('.tag_boxs > div').click (function () {
      $features.attr ('class', 'features n' + $(this).index ());
      $(this).addClass ('tag_ac').siblings ().removeClass ('tag_ac');
    });
  });
  $('.left2select').each (function () {
    $('<div />').addClass ('select').append ($('<select />').append ($(this).find ('>a').map (function () {
      return $('<option />').text ($(this).text ()).val ($(this).attr ('href')).prop ('selected', $(this).hasClass ('type_ac'));
    }).toArray ()).change (function () {
      window.location.assign ($(this).val ());
    })).prependTo ($(this));

    
  });
  
});