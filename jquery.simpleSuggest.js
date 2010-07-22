const SS_ID = "SimpleSuggest_";

var callback_jsonReceived = function(data, textStatus, ss) {
  var list = "<ul>\n";

  for (var i = 0; i < data.length; i++) {
    list += "\t<li>" + data[i]['name'] + "<input type='hidden' value='" + data[i]['value'] + "' />" + "</li>\n";
  }

  console.log(list + "</ul>");
}

function searchChanged(e, ss) {
  var params = new Array();

  params[ss.settings.query_param] = ss.search_input.val();

  if (ss.search_input.val().length >= ss.settings.minChars) {
    $.getJSON(ss.settings.url, params, function (data, textStatus) {
      ss.settings.callback_jsonReceived(data, textStatus, ss);
    });
  }
}


/*
 * Convert a basic text input into a suggestion input
 */
function SimpleSuggest(i, input, settings) {
  var j_input = $(input);

  var ss = this;
  
  ss.settings = settings;

  ss.parent_form = j_input.parent('form');
  ss.search_input = j_input.clone();
  ss.hidden_input = j_input.clone();


  /*
   * Create the settings
   */
  if (ss.settings.url == null) {
    ss.settings.url = ss.parent_form.attr('action');
  }


  /*
   * Configure the inputs
   */
  ss.search_input.attr('name', SS_ID + ss.search_input.attr('name'));
  ss.search_input.attr('id', SS_ID + ss.hidden_input.attr('id'));

  ss.hidden_input.attr('type', 'hidden');

  ss.search_input.bind('keyup focusin focusout', function (e) {
    searchChanged(e, ss);
  });


  /*
   * Replace the existing input with our special ones
   */
  $(input).replaceWith(ss.search_input)
  ss.search_input.after(ss.hidden_input);
}



/*
 * jQuery Plugin Functionality
 */
(function($) {
  $.fn.simpleSuggest = function (options) {
      
    // Setup default settings
    var settings = jQuery.extend({
      'callback_jsonReceived' : callback_jsonReceived,
      'json_displayParam' : 'display',
      'json_valueParam' : 'value',

      'minChars'   : 1,

      'query_param' : 'q'
    }, options);

    return this.each(function(i, e) {
      new SimpleSuggest(i, $(this), settings);

      return $(this);
    });

  };

})(jQuery);
