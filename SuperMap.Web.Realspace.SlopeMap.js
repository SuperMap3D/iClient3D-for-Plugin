//==========================================================================
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。
// 作者：			SuperMap WebClient Team
// 修改：
// 文件名：			SuperMap.Web.Realspace.SlopeMap
// 功能：			  坡度分析类，设置坡度分析的各参数
// 最后修改时间：
//==========================================================================
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.SlopeMap = function() {

    SuperMap.Web.Realspace.SlopeMap.initializeBase(this);
    this._innerSlopeMap= SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateSlopeMap();
};


SuperMap.Web.Realspace.SlopeMap.prototype ={
    /*
     *DisplayStyle属性:坡度分析显示风格
     */
    get_displayStyle: function () {
        ///<value  type="Number"></value>
        if (this._innerSlopeMap != null) {
            return this._innerSlopeMap.DisplayStyle;
        }
    },
    set_displayStyle: function (mode) {
        ///<value type="void"></value>
        if (this._innerSlopeMap != null) {
            //var nMode = parseInt(mode);
            this._innerSlopeMap.DisplayStyle = mode;
        }
    },

    /*
     *CoverageArea属性：设置坡度分析区域
     */
    get_coverageArea: function () {
        ///<value type="SuperMap.Web.Core.Color"></value>
        if (this._innerSlopeMap != null) {
            var recInner = this._innerSlopeMap.CoverageArea;
            return SuperMap.Web.Core.Conversion._ConvertSRObject2Object(recInner, "Rectangle2D");
        }
    },
    set_coverageArea: function (rec2d) {
        if (this._innerSlopeMap != null) {
            var recInner = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(rec2d);
            this._innerSlopeMap.CoverageArea = recInner;
        }
    },

    /*
     *Opacity：坡度分析结果显示的透明度
     */
    get_opacity: function () {
        if (this._innerSlopeMap != null) {
            return this._innerSlopeMap.Opacity;
        }
    },
    set_opacity: function (value) {
        if (this._innerSlopeMap != null) {
            this._innerSlopeMap.Opacity = value;
        }
    },

    /*
     *MinVisibleSlope：最小可见坡度
     */
    get_minVisibleSlope: function () {
        if (this._innerSlopeMap != null) {
            return this._innerSlopeMap.MinVisibleSlope;
        }
    },
    set_minVisibleSlope: function (value) {
        if (this._innerSlopeMap != null) {
            this._innerSlopeMap.MinVisibleSlope = value;
        }
    },

    /*
     *MaxVisibleSlope：最大可见坡度
     */
    get_maxVisibleSlope: function () {
        if (this._innerSlopeMap != null) {
            return this._innerSlopeMap.MaxVisibleSlope;
        }
    },
    set_maxVisibleSlope: function (value) {
        if (this._innerSlopeMap != null) {
            this._innerSlopeMap.MaxVisibleSlope = value;
        }
    },

    /*
     *BorderColor:分析区域边框的颜色
     */
    get_borderColor:function()
    {
        ///<value type="void"></value>
        if(this._innerSlopeMap != null)
        {
            var color =new SuperMap.Web.Core.Color();
            color.fromLongABGR(this._innerSlopeMap.BorderColor);
            return color;
        }
    },
    set_borderColor:function(color)
    {
        if(this._innerSlopeMap != null)
        {
            this._innerSlopeMap.BorderColor = color.toLongABGR();
        }
    },

    /*
     *BorderVisible:分析区域边框的可见性
     */
    get_isBorderVisible:function(){
        if (this._innerSlopeMap != null) {
            return this._innerSlopeMap.BorderVisible;
        }
    },
    set_isBorderVisible:function(isVisible){
        if (this._innerSlopeMap != null) {
            this._innerSlopeMap.BorderVisible = isVisible;
        }
    },

    /*
     *GetSlopeValue:获得坡度值,大小在0~90之间,单位是度
     */
    getSlopeValue:function(pt3d){
        if (this._innerSlopeMap != null) {
            var ptInner = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(pt3d);
            return this._innerSlopeMap.GetSlopeValue(ptInner);
        }
    },

    /*
     *GetSlopeDirectionValue:获得坡向值,大小在0~360之间，单位是度
     */
    getSlopeDirectionValue:function(pt3d){
        if (this._innerSlopeMap != null) {
            var ptInner = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(pt3d);
            return this._innerSlopeMap.GetSlopeDirectionValue(ptInner);
        }
    },

    /*
     *颜色表
     */
    getColorTable: function () {
        if (this._innerSlopeMap != null) {
            var intColors = this._innerSlopeMap.GetColorTable();
            return SuperMap.Web.Core.Conversion.ConvertLongToColors(intColors);
        }
    },
    getSlopValues: function () {
        if (this._innerSlopeMap != null) {
            return this._innerSlopeMap.GetSlopValues();
        }
    },
    setColorDictionary: function (keys,colors) {
        if (this._innerSlopeMap != null) {
            var intColors = SuperMap.Web.Core.Conversion.ConvertColorsToRGBLong(colors);
            this._innerSlopeMap.SetColorDictionary(keys,intColors);
        }
    },

    /*
     *Build方法：分析并显示结果
     */
    build: function () {
        if (this._innerSlopeMap != null) {
            this._innerSlopeMap.Build();
        }
    },
    /*
     *Clear方法：清除分析结果
     */
    clear: function () {
        if (this._innerSlopeMap != null) {
            this._innerSlopeMap.Clear();
        }
    }
};
SuperMap.Web.Realspace.SlopeMap.registerClass('SuperMap.Web.Realspace.SlopeMap', Sys.Component, Sys.IDisposable);
