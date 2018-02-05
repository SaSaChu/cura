/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2017 OA Wu Design
 * @license     http://creativecommons.org/licenses/by-nc/2.0/tw/
 */

function getStorage (key) { return (typeof Storage !== 'undefined') && (value = localStorage.getItem (key)) && (value = JSON.parse (value)) ? value : undefined; }
function setStorage (key, data) { try { if (typeof Storage === 'undefined') return false; localStorage.setItem (key, JSON.stringify (data)); return true; } catch (err) { console.error ('設定 storage 失敗！', error); return false; } }

window.storage = {};
window.storage.country = {
  cacheTime: 1000 * 60, //每分鐘
  storageKey: 'cura.country',
  set: function (val) { return setStorage (this.storageKey, { t: new Date ().getTime (), v: val }); },
  get: function (d4) { var tmp = getStorage (this.storageKey); return (typeof tmp !== 'undefined' && typeof tmp.t !== 'undefined' && typeof tmp.v !== 'undefined' && tmp.t + this.cacheTime > new Date ().getTime () && (tmp.v === 'jp' || tmp.v === 'tc' || tmp.v === 'en')) ? tmp.v : (typeof d4 === 'undefined' ? '' : d4); },
};

$(function () {
  $('#cholang select').each (function () {
    $(this).change (function () {
      var pathnames = location.pathname.split ('/').filter (function (t) {return t.length;});
      var val = $(this).val ().replace (/^\//, "");
      if (val.split ('/')[0] == 'jp' || val.split ('/')[0] == 'tc' || val.split ('/')[0] == 'en')
        window.storage.country.set (val.split ('/')[0]);
      else
        window.storage.country.set ('en');

      window.location.assign ((pathnames[0] === 'cura' ? '/cura' : '') + '/' + val);
    });
  });
  

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
    
    setInterval (function () {
      if ($pagination.find ('a.a').next ().length)
        $pagination.find ('a.a').next ().click ();
      else
        $pagination.find ('a').first ().click ();
    }, 7 * 1000);
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
  
  $('.oa-min-pic').each (function () {
    var $bigImg = $(this).prev ().find ('img');
    $(this).find ('a').click (function () {
      $(this).addClass ('s_pic_ac').siblings ().removeClass ('s_pic_ac');
      $bigImg.attr ('src', $(this).find ('img').attr('src'));
    });
  });
  
});