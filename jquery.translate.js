/**
 * @file jquery.translate.js
 * @brief jQuery plugin to translate text in the client side.
 * @author Manuel Fernandes
 * @site
 * @version 0.9
 * @license MIT license <http://www.opensource.org/licenses/MIT>
 *
 * translate.js is a jQuery plugin to translate text in the client side.
 *
 */

(function($){
  $.fn.translate = function(options) {

    var that = this; //a reference to ourselves

    var userLang = navigator.language || navigator.userLanguage;

    if (userLang.indexOf('-') > 0) {
      userLang = userLang.substring(0, userLang.indexOf('-'));
    }

    var settings = {
      css: "trn",
      lang: [userLang, 'en']/*,
      t: {
        "translate": {
          pt: "tradução",
          br: "tradução"
        }
      }*/
    };
    settings = $.extend(settings, options || {});
    if (settings.css.lastIndexOf(".", 0) !== 0)   //doesn't start with '.'
      settings.css = "." + settings.css;

    var t = settings.t;

    //public methods
    this.lang = function(l) {
      if (l) {
        settings.lang = l;
        this.translate(settings);  //translate everything
      }

      return settings.lang;
    };


    this.get = function(index) {
      var res = index;

      if (Array.isArray(settings.lang)) {
        for (var i=0; i<settings.lang.length; i++) {
          try {
            res = t[index][settings.lang[i]];
            if (res) {
              break;
            }
          } catch (e) {
          }
        }
      } else {
        try {
          res = t[index][settings.lang];
        }
        catch (err) {
          return index;
        }
      }

      if (res)
        return res;
      else
        return index;
    };

    this.g = this.get;



    //main
    this.find(settings.css).each(function(i) {
      var $this = $(this);

      var trn_key = $this.attr("data-trn-key");
      if (!trn_key) {
        trn_key = $this.html();
        $this.attr("data-trn-key", trn_key);   //store key for next time
      }

      $this.html(that.get(trn_key));
    });


		return this;



  };
})(jQuery);
