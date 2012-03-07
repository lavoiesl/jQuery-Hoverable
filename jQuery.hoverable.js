(function($){
  var plugin = {
    name: 'hoverable'
  };

  var default_settings = {
    overEvent: 'mouseenter',               // jQuery event to register on
    outEvent: 'mouseleave',                 // Idem
    overClass: 'hoverable-over',          // Class to be added when the item is hovered
    outClass: 'hoverable-out'             // Idem
  };

  function trigger_event(wrapper, event, options) {
    wrapper.trigger(plugin.name + '.' + event, options);
  }

  function toggle_over(is_over) {
    var settings = this.data(plugin.name).settings;
    this
      .toggleClass(settings.overClass, is_over)
      .toggleClass(settings.outClass, !is_over);

    trigger_event(this, is_over ? 'over' : 'out');
  }

  var methods = {
    init: function(options) {
      var settings = $.extend(options, default_settings);
      var data = {
        settings: settings
      };

      this.data(plugin.name, data);
      methods.bind.call(this);
    },

    bind: function() {
      // In case init is called multiple times
      methods.unbind.call(this);

      var settings = this.data(plugin.name).settings;

      this
        .removeClass(settings.overClass)
        .addClass(settings.outClass)
        .bind(settings.overEvent, methods.over)
        .bind(settings.outEvent, methods.out);
    },

    unbind: function() {
      var settings = this.data(plugin.name).settings;
      
      this
        .removeClass(settings.overClass)
        .removeClass(settings.outClass)
        .unbind(settings.overEvent, methods.over)
        .unbind(settings.outEvent, methods.out);
    },

    destroy: function() {
      methods.unbind.call(this);
      this.removeData(plugin.name);
      this.off(plugin.name);
    },

    over: function() {
      toggle_over.call($(this), true);
    },

    out: function() {
      toggle_over.call($(this), false);
    }
  };

  $.fn[plugin.name] = function(method) {

    var args = false;
    if ( typeof method === 'object' || ! method ) {
      // Constructor, method will hold its options
      args = [method];
      method = 'init';
    } else if ( methods[method] ) {
      // Method, shift method name to get its arguments
      args = Array.prototype.slice.call(arguments, 1);
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.' + plugin.name );
      return this;
    }
    return this.each(function(){
      methods[method].apply($(this), args);
    });
  };
})(jQuery);
