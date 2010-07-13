function SimpleSuggest(i, input, settings) {
  $(input).css('border', '1px solid red');
}

(function($) {
  $.fn.simpleSuggest = function (options) {
      
    // Setup default settings
    var settings = jQuery.extend({
      }, options);

    return this.each(function(i, e) {
      new SimpleSuggest(i, $(this), settings);

      return $(this);
    });

  };

})(jQuery);
