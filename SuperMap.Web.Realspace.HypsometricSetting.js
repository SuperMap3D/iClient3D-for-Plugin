//==========================================================================
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。
// 作者：			SuperMap WebClient Team
// 修改：
// 文件名：			SuperMap.Web.Realspace.HypsometricSetting
// 功能：			 分层设色类
// 最后修改时间：
//==========================================================================
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.HypsometricSetting = function () {
    /// <summary>分层设色对象</summary>
    SuperMap.Web.Realspace.HypsometricSetting.initializeBase(this);
    this._innerHypsometricSetting = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateHypsometricSetting();
};

SuperMap.Web.Realspace.HypsometricSetting.prototype = {
    /*
    * 线的间隔
    */
    get_interval: function () {
        ///<return type="number"></value>
        if(this._innerHypsometricSetting !== null){
            return this._innerHypsometricSetting.Interval;
        }
    },
    set_interval: function (value) {
        ///<param name="value" type="number"></param>
        if(this._innerHypsometricSetting !== null && typeof value === "number"){
            this._innerHypsometricSetting.Interval = value;
        }
    },

    /*
    * 获取/设置线的不透明度,1是完全不透明,0完全透明
    */
    get_opacity: function () {
        ///<return type="number"></value>
        if(this._innerHypsometricSetting !== null){
            return this._innerHypsometricSetting.Opacity;
        }
    },
    set_opacity: function (value) {
        ///<param name="value" type="number"></param>
        if(this._innerHypsometricSetting !== null && 0 <= value <= 1){
            this._innerHypsometricSetting.Opacity = value;
        }
    },

    /*
    * 获取/设置最小可见值
    */
    get_minVisibleValue: function () {
        ///<return type="number"></value>
        if(this._innerHypsometricSetting !== null){
            return this._innerHypsometricSetting.MinVisibleValue;
        }
    },
    set_minVisibleValue: function (value) {
        ///<param name="value" type="number"></param>
        if(this._innerHypsometricSetting !== null && typeof value === "number"){
            this._innerHypsometricSetting.MinVisibleValue = value;
        }
    },

    /*
    * 获取/设置最大可见值
    */
    get_maxVisibleValue: function () {
        ///<return type="number"></value>
        if(this._innerHypsometricSetting !== null){
            return this._innerHypsometricSetting.MaxVisibleValue;
        }
    },
    set_maxVisibleValue: function (value) {
        ///<param name="value" type="number"></param>
        if(this._innerHypsometricSetting !== null && typeof value === "number"){
            this._innerHypsometricSetting.MaxVisibleValue = value;
        }
    },

    /*
    * 获取/设置显示风格
    */
    get_displayMode: function () {
        ///<return type="SuperMap.Web.Realspace.HypsometricSettingDisplayMode"></value>
        if(this._innerHypsometricSetting !== null){
            return this._innerHypsometricSetting.DisplayMode;
        }
    },
    set_displayMode: function (value) {
        ///<param name="value" type="SuperMap.Web.Realspace.HypsometricSettingDisplayMode"></param>
        if(this._innerHypsometricSetting !== null && typeof value === "number"){
            this._innerHypsometricSetting.DisplayMode = value;
        }
    },

    /*
    * 获取/设置线的颜色
    */
    get_lineColor: function () {
        ///<return type="SuperMap.Web.Core.Color"></value>
        if(this._innerHypsometricSetting !== null){
            var color =new SuperMap.Web.Core.Color();
            color.fromLongABGR(this._innerHypsometricSetting.LineColor);
            return color;
        }
    },
    set_lineColor: function (color) {
        ///<param name="color" type="SuperMap.Web.Core.Color"></param>
        if(this._innerHypsometricSetting !== null && color instanceof SuperMap.Web.Core.Color){
            this._innerHypsometricSetting.LineColor = color.toLongABGR();
        }
    },

    /*
    * 获取颜色对照表
    */
    getColorTable: function () {
        ///<return type="array"></value>
        if(this._innerHypsometricSetting !== null){
            var intColors = this._innerHypsometricSetting.GetColorDictTable();
            return SuperMap.Web.Core.Conversion.ConvertLongToColors(intColors);
        }
    },

    /*
    * 设置颜色对照表
    */
    setColorTable: function (keys,colors) {
        ///<param name="keys" type="array"></param>
        ///<param name="colors" type="array"></param>
        if(this._innerHypsometricSetting !== null && keys instanceof Array && colors instanceof Array){
            var intColors = new Array();
            for (i = 0; i < colors.length; i++) {
                var intColor = colors[i].toLongABGR();
                intColors[i] = intColor;
            }

            this._innerHypsometricSetting.SetColorDictTable(keys,intColors);
        }
    }
};
SuperMap.Web.Realspace.HypsometricSetting.registerClass('SuperMap.Web.Realspace.HypsometricSetting', Sys.Component, Sys.IDisposable);
