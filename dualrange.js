(function($) {
  $.fn.dualrange = function(opt) {

    return this.each(function() {
      var isDragh1 = false;
      var isDragh2 = false;
      var cont = $(this);
      var id = cont.data('id');
      var step = cont.data('step');
      var minval = cont.data("min");
      var maxval = cont.data("max");
      var decimal_digits = 0;
      var x_str = step.toString().split('.')[1];
      if (x_str !== undefined) {
        decimal_digits = x_str.length;
      }

      cont.append('<input id="in_' + id + '" class="range1"  type="range" style="display:none;" min="' + minval + '" max="' + maxval + '" step="' + step + '" value="' + minval + '"><input id="out_' + id + '" class="range2" type="range" style="display:none;" min="' + minval + '" max="' + maxval + '" step="' + step + '" value="' + maxval + '"><div class="dualBar"><div  class="handle1"></div><div class="rangebg"></div><div  class="handle2" ></div></div>');

      var handle1 = cont.find('.handle1');
      var handle2 = cont.find('.handle2');
      var range1 = cont.find('.range1');
      var range2 = cont.find('.range2');

      var bg = cont.find('.rangebg');
      bg.css({
        "left": handle1.position().left,
        "right": handle2.position().left-handle2.width(),
        "width": (handle2.position().left - handle1.position().left)-(handle2.width()) + "px"
      });

      var updateh1 = function(x) {
        isDragh2 = false;

        var position = x - cont.offset().left;

        var percentage = 100 * position / (cont.width()-handle2.width());
        if (percentage < 0) {
          percentage = 0;
        }
        if (percentage > 100) {
          percentage = 100;
        }
        handle1.css({
          "left": percentage + '%'
        });
        if (handle1.offset().left >= handle2.offset().left) {
          handle2.css({
            "left": percentage + '%'
          });
        }
        var left = handle1.position().left;
        var right = handle2.position().left-handle2.width();
        bg.css({
          "left": left,
          "right": right,
          "width": (right - left) + "px"
        });

        var pc = (maxval * percentage / 100).toFixed(decimal_digits);
        range1.val(pc);
        if (Number(range1.val()) >= Number(range2.val())) {
         range2.val(Number(range1.val()));
        }

      };
      var updateh2 = function(x) {
        isDragh1 = false;

        var position = x - cont.offset().left;
 
        var percentage = 100 * position / cont.width();
        if (percentage < 0) {
          percentage = 0;
        }
        if (percentage > 100) {
          percentage = 100;
        }

        handle2.css({
          "left": percentage + '%'
        });
        if ((handle2.offset().left-handle2.width()) <= handle1.offset().left) {
          handle1.css({
            "left": percentage + '%'
          });
        }
        var left = handle1.position().left;
        var right = handle2.position().left-handle2.width();
        if (left < 0) {
          left = 0;
        }
        bg.css({
          "left": left,
          "right": right,
          "width": (right - left) + "px"
        });

        var pc = (maxval * percentage / 100).toFixed(decimal_digits);
        range2.val(pc);
        if (Number(range1.val()) >= Number(range2.val())) {
         range1.val(Number(range2.val()));
        }

      };

      handle1.on('mousedown', function(e) {
        e.preventDefault();
        isDragh1 = true;

        updateh1(e.pageX);
      });
      handle2.on('mousedown', function(e) {
        e.preventDefault();
        isDragh2 = true;

        updateh2(e.pageX);
      });
      $(document).on('mouseup', function(e) {

        if (isDragh1) {
          isDragh1 = false;
          isDragh2 = false;
          updateh1(e.pageX);
     
        }
        if (isDragh2) {
          isDragh2 = false;
          isDragh1 = false;
          updateh2(e.pageX);
        }
      });

      $(document).on('mousemove',function(e) {
        if (isDragh1) {
          updateh1(e.pageX);
   
        } else if (isDragh2) {
          updateh2(e.pageX);
        }
      });
      
            handle1.on('touchstart', function(e) {
        e.preventDefault();
        isDragh1 = true;

        updateh1(e.pageX);
      });
      handle2.on('touchstart', function(e) {
        e.preventDefault();
        isDragh2 = true;

        updateh2(e.originalEvent.touches[0].pageX);
      });
      $(document).on('touchend', function(e) {

        if (isDragh1) {
          isDragh1 = false;
          isDragh2 = false;
          updateh1(e.originalEvent.touches[0].pageX);
 
        }
        if (isDragh2) {
          isDragh2 = false;
          isDragh1 = false;
          updateh2(e.originalEvent.touches[0].pageX);
        }
      });

      $(document).on('touchmove',function(e) {
        if (isDragh1) {
          updateh1(e.originalEvent.touches[0].pageX);
       
        } else if (isDragh2) {
          updateh2(e.originalEvent.touches[0].pageX);
        }
      });

      range1.on("input change", function() {

        var val = Number(range1.val());
        var percentage = 100 * (val / maxval);
        handle1.css('left', percentage + '%');

        if (Number(range1.val()) >= Number(range2.val())) {
          range2.val(Number(range1.val()));
          handle2.css('left', percentage + '%');


        }
        var left = handle1.position().left;
        var right = handle2.position().left-handle2.width();
        if (left < 0) {
          left = 0;
        }
        bg.css({
          "left": left,
          "right": right,
          "width": (right - left) + "px"
        });
      });

      range2.on("input change", function() {
        var val = Number(range2.val());
        var percentage = 100 * (val / maxval);
        handle2.css('left', percentage + '%');

        if (Number(range1.val()) >= Number(range2.val())) {
          range1.val(Number(range2.val()));
          handle1.css('left', percentage + '%');
        }
        var left = handle1.position().left;
        var right = handle2.position().left;
        if (left < 0) {
          left = 0;
        }
        bg.css({
          "left": left,
          "right": right,
          "width": (right - left) + "px"
        });
      });

    });

  };

})(jQuery);
