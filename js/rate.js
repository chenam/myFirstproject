/**
 * 
 * @module: rate
 * @version: 1.0.0
 * @compatibility: modern browsers and IE>=8
 * @author: amin
 * @date: 2016-03-04
 *
 */
 /*
*1,在代码开始之前，加一个分号，可以防止没有正常关闭的插件
*2,所有代码用自调用匿名函数包裹,防止污染命名空间和与其他JS库冲突
 */
;(function (win, $, JQ,undefined) {//undefined:为了得到没有被修改的undefined

    var body = $(win.document.body);

    // 面向对象的插件开发，更方便管理代码
    // 定义Star的构造函数
    function Star(ele,opt){
        this.$element = ele,
        this.defaults = {// Rate的默认设置
            number:5,
            ons:0,
            staron:'staron',
            staroff:'staroff',
            starover:'starover',
            readonly:false
        },
        this.opts = $.extend({},this.defaults,opt);//将空对象作为第一个参数，可以保护插件的默认值

    };
    Star.prototype = {
        _init:function(){
            console.log(this.opts);
            this._createRate();
            if(!this.opts.readonly){
                this._event();
            };
        },
        //星星初始化
        _createRate:function(){
            var _opt = this.opts,
                $ele = this.$element,
                num = _opt.number,//星星个数
                onnum = _opt.ons,//已点亮的个数
                staron = _opt.staron,//点亮的class
                imghtml = '<span></span>';

            for(var i=0 ;i<num ;i++){
                $ele.append(imghtml);
            };
            if(onnum > num){
                onnum = num;
            };
            for(var i=0; i<onnum; i++){
                $ele.children().eq(i).addClass(staron);
            };
       
            $ele.append('<input type="hidden"/>');
        },
        _event:function(){
            var self = this;
            var _this = this.$element;
            var _opts = this.opts;

            //鼠标划过
            _this.on('mouseover', 'span', function(event) {
                var ind = $(this).index();
                    num = _opts.number;
                    staroff = _opts.staroff;
                    starover = _opts.starover;
                    console.log(_this.children());
                    // _this.children("span").addClass(staroff).removeClass(starover);

                for(var i=0; i<num; i++){

                    if(i <= ind){
                        _this.children().eq(i).removeClass(staroff).addClass(starover)
                    }else{
                        _this.children().eq(i).addClass(staroff);
                    }
                };
            });

            //鼠标离开
            _this.on('mouseleave', function(event) {
                $(this).children().removeClass(starover);
            });
            //鼠标点击
            _this.on('click', 'span', function(event) {
                var ind =$(this).index();
                var staron = _opts.staron;
                _this.children().removeClass(staron);
                for(var i=0; i<=ind; i++){
                    _this.children().eq(i).addClass(staron);
                };
            });
        }


    };
  
    $.fn.rate = function(options){

        // console.log(this);//this是绑定元素

        // 创建star实体
        var star = new Star(this,options);
        return star._init();

    };
     

})(window, jQuery, window["JQ"] || (window["JQ"] = {}));
