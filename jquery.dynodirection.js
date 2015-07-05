(function($, window, document, undefined){

    function DynoDirection(element, options){
        this.$element = $(element);
        this.options = options;
        this.code = 0;
        this.isAscii = true;

        this.check();
        this.$element.keyup($.proxy(function(){ this.check(); }, this));
    }
    DynoDirection.prototype = {
        check:function(){
            this.string = this.$element.val();
            // TODO : don't go into the loop immediately, check to see if the "determinative letter" has changed
            for(var i=0; i<this.string.length; i++){ // Ignore non-letter chars, loop up to the first letter
                this.code = this.string.charCodeAt(i);
                if((this.code>=65 && this.code<=90)      || // A - Z
                    (this.code>=97 && this.code<=122)     || // a - z
                    (this.code>=192 && this.code<=214)    || // À - Ö
                    (this.code>=216 && this.code<=246)    || // Ø - ö
                    (this.code>=248 && this.code<=687)    || // ø - ԓ
                    (this.code>=884 && this.code<=1309)   || // ʹ - ԝ
                    (this.code>=7424 && this.code<=7615)  || // ᴀ - ᶿ
                    (this.code>=7680 && this.code<=8190)  || // Ḁ - ῾
                    (this.code>=11360 && this.code<=11383)|| // Ⱡ - ⱷ
                    (this.code>=64257 && this.code<=64258)   // ﬁ - ﬂ
                    ){
                    this.isAscii = true;
                    break;
                }else if((this.code>=591 && this.code<=1901)   || // ֑ - ݭ
                    (this.code>=64285 && this.code<=65276)   // יִ - ﻼ
                    ){
                    this.isAscii = false;
                    break;
                }
            }
            if( this.isAscii ){
                this.$element.css({direction: "ltr", 'text-align': 'left'});
            }else{
                this.$element.css({direction: "rtl", 'text-align': 'right'});
            }
        }
    };

    // Plugin Definition //
    $.fn.dynodirection = function(options){

        if( typeof options == 'string'){
            var plugin = this.data('dynodirection');
            if(plugin) plugin[options].apply(plugin, Array.prototype.slice.call( arguments, 1 ) );
            return this
        }

        options = $.extend({}, $.fn.dynodirection.defaults, options);

        return this.each(function(){
            var plugin = $.data(this, 'dynodirection');
            if( ! plugin ){
                plugin = new DynoDirection(this, options);
                $.data(this, 'dynodirection', plugin);
            }
        });
    };
})(jQuery, window, document);
