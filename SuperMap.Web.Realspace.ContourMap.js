//==========================================================================
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。
// 作者：			SuperMap WebClient Team
// 修改：
// 文件名：			SuperMap.Web.Realspace.ContourMap
// 功能：			  等高线分析类，设置天际线分析的各参数
// 最后修改时间：
//==========================================================================
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.ContourMap = function() {

    SuperMap.Web.Realspace.ContourMap.initializeBase(this);
    this._innerContourMap= SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateContourMap();
};


SuperMap.Web.Realspace.ContourMap.prototype ={

    /*
     *DisplayStyle属性:等高线分析显示风格
     */
    get_displayStyle: function () {
        ///<value  type="Number"></value>
        if (this._innerContourMap != null) {
            return this._innerContourMap.DisplayStyle;
        }
    },
    set_displayStyle: function (value) {
        ///<value type="void"></value>
        if (this._innerContourMap != null) {
            this._innerContourMap.DisplayStyle = value;
        }
    },

    /*
     *Interval属性:等高线的间隔
     */
    get_interval: function () {
        ///<value type="Number"></value>
        if (this._innerContourMap != null) {
            return this._innerContourMap.Interval;
        }
    },
    set_interval: function (value) {
        ///<value type="void"></value>
        if (this._innerContourMap != null) {
            this._innerContourMap.Interval = value;
        }
    },

    /*
     *ContourColor属性：分析结果的可见区域颜色
     */
    get_contourColor: function () {
        ///<value type="SuperMap.Web.Core.Color"></value>
        if (this._innerContourMap != null) {
            var color = new SuperMap.Web.Core.Color();
            color.fromLongABGR(this._innerContourMap.ContourColor);
            return color;
        }
    },
    set_contourColor: function (color) {
        if (this._innerContourMap != null) {
            this._innerContourMap.ContourColor = color.toLongABGR();
        }
    },

    /*
     *CoverageArea属性：设置等高线分析区域
     */
    get_coverageArea: function () {
        ///<value type="SuperMap.Web.Core.Color"></value>
        if (this._innerContourMap != null) {
            var area = new SuperMap.Web.Core.GeoRegion3D();
            area = this._innerContourMap.CoverageArea;
            return area;
        }
    },
    set_coverageArea: function (rec2d) {
        if (this._innerContourMap != null) {
            var recInner = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(rec2d);
            this._innerContourMap.CoverageArea = recInner;
        }
    },


    /*
     *CoverageRegion属性：设置等高线分析区域
     */
    get_coverageRegion: function () {
        ///<value type="SuperMap.Web.Core.Color"></value>
        if (this._innerContourMap != null) {
            var region = new SuperMap.Web.Core.GeoRegion3D();
            region = this._innerContourMap.CoverageRegion;
            return region;
        }
    },
    set_coverageRegion: function (region) {
        if (this._innerContourMap != null) {
            var region = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(region);
            this._innerContourMap.CoverageRegion = region;
        }
    },


    /*
     *Opacity：等高线显示的透明度
     */
    get_opacity: function () {
        if (this._innerContourMap != null) {
            return this._innerContourMap.Opacity;
        }
    },
    set_opacity: function (value) {
        if (this._innerContourMap != null) {
            this._innerContourMap.Opacity = value;
        }
    },

    /*
    *MinVisibleAltitude:等高线分析的最小可见高度
     */
    get_minVisibleAltitude:function(){
        if (this._innerContourMap != null) {
            return this._innerContourMap.MinVisibleAltitude;
        }
    },
    set_minVisibleAltitude:function(value){
        if (this._innerContourMap != null) {
            this._innerContourMap.MinVisibleAltitude = value;
        }
    },

    /*
     *MaxVisibleAltitude:等高线分析的最大可见高度
     */
    get_maxVisibleAltitude:function(){
        if (this._innerContourMap != null) {
            return this._innerContourMap.MaxVisibleAltitude;
        }
    },
    set_maxVisibleAltitude:function(value){
        if (this._innerContourMap != null) {
            this._innerContourMap.MaxVisibleAltitude = value;
        }
    },

    /*
     *BorderColor:分析区域边框的颜色
     */
    get_borderColor:function(){
        if (this._innerContourMap != null) {
            var color =new SuperMap.Web.Core.Color();
            color.fromLongABGR(this._innerContourMap.BorderColor);
            return color;
        }
    },
    set_borderColor:function(color){
        if (this._innerContourMap != null) {
            this._innerContourMap.BorderColor = color.toLongABGR();
        }
    },

    /*
     *BorderVisible:分析区域边框的可见性
     */
    get_isBorderVisible:function(){
        if (this._innerContourMap != null) {
            return this._innerContourMap.BorderVisible;
        }
    },
    set_isBorderVisible:function(isVisible){
        if (this._innerContourMap != null) {
            this._innerContourMap.BorderVisible = isVisible;
        }
    },

    /*
     *颜色表
     */
    getContourValues: function () {
        if (this._innerContourMap != null) {
            var intColors = this._innerContourMap.GetContourValues();
            return SuperMap.Web.Core.Conversion.ConvertLongToColors(intColors);
        }
    },
    getColorTable: function () {
        if (this._innerContourMap != null) {
            return this._innerContourMap.GetColorTable();
        }
    },
    setColorDictionary: function (keys,colors) {
        if (this._innerContourMap != null) {
            var intColors = SuperMap.Web.Core.Conversion.ConvertColorsToRGBLong(colors);
            this._innerContourMap.SetColorDictionary(keys,intColors);
        }
    },

     /*
     *Build方法：分析并显示结果
     */
    build: function () {
        if (this._innerContourMap != null) {
            this._innerContourMap.Build();
        }
    },
    /*
     *Clear方法：清除分析结果
     */
    clear: function () {
        if (this._innerContourMap != null) {
            this._innerContourMap.Clear();
        }
    }
};
SuperMap.Web.Realspace.ContourMap.registerClass('SuperMap.Web.Realspace.ContourMap', Sys.Component, Sys.IDisposable);
