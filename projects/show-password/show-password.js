/*
 * show-password : A jQuery plugin to change a password field to a regular text input field and vice versa
 * http://github.com/mtodd/show-password/
 *
 * Copyright (C) 2009 Matt Todd
 * Licensed under the MIT licenses.
 */

(function($){
  $.fn.extend({
    showPasswordToggle: function(fields, options) {
      if(options == undefined) options = {};
      
      var obj = $(this);
      
      // $.each(fields, function(i) { alert(typeof fields[i]); })
      
      if(options.reveal != undefined) {
        $("#"+options.reveal).show();
      }
      
      return this.each(function() {
        
        obj.each(function(e) {
          obj.bind('change', function(e) {
            $.each(fields, function(i) {
              field = $("#"+fields[i]);
              if(field.attr('type') == "text"){ new_type = "password"; } else { new_type = "text"; }
              new_field = field.clone();
              new_field.attr("id", fields[i]);
              new_field.attr("type", new_type);
              field.replaceWith(new_field);
            });
          });
        });
        
      });
    }
  });
})(jQuery);
