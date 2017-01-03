//==========================================================================
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。
// 作者：			SuperMap WebClient Team
// 修改：
// 文件名：			SuperMap.Web.Realspace.ShadowQuery
// 功能：			  可视域分析类，设置可视域分析的各参数
// 最后修改时间：
//==========================================================================
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.ShadowQuery = function() {

    SuperMap.Web.Realspace.ShadowQuery.initializeBase(this);
    this._innerShadow = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateShadowQuery();
};


SuperMap.Web.Realspace.ShadowQuery.prototype ={
    /*
     *间距
     */
    get_spacing:function()
    {
        if(this._innerShadow != null)
        {
            return this._innerShadow.Spacing;
        }
    },
    set_spacing:function(dSpacing)
    {
        if(this._innerShadow != null)
        {
            this._innerShadow.Spacing = dSpacing;
        }
    },

    /*
     *时区偏移
     */
    get_baseUtcOffset:function()
    {
        if(this._innerShadow != null)
        {
            return this._innerShadow.BaseUtcOffset;
        }
    },
    set_baseUtcOffset:function(nUtcOffset)
    {
        if(this._innerShadow != null)
        {
            this._innerShadow.BaseUtcOffset = nUtcOffset;
        }
    },

    /*
     *分析的开始时间
     */
    get_startTime:function()
    {
        if(this._innerShadow != null)
        {
            return SuperMap.Web.Realspace.Utility.convertDoubleToDate(this._innerShadow.StartTime);
        }
    },
    set_startTime:function(dDataTime)
    {
        if(this._innerShadow != null)
        {
            this._innerShadow.StartTime = SuperMap.Web.Realspace.Utility.convertDateToDouble(dDataTime);
        }
    },

    /*
     *分析的结束时间
     */
    get_endTime:function()
    {
        if(this._innerShadow != null)
        {
            return SuperMap.Web.Realspace.Utility.convertDoubleToDate(this._innerShadow.EndTime);
        }
    },
    set_endTime:function(dDataTime)
    {
        if(this._innerShadow != null)
        {
            this._innerShadow.EndTime = SuperMap.Web.Realspace.Utility.convertDateToDouble(dDataTime);
        }
    },

    /*
     *时间间隔
     */
    get_timeInterval:function()
    {
        if(this._innerShadow != null)
        {
            return this._innerShadow.TimeInterval;
        }
    },
    set_timeInterval:function(nInterval)
    {
        if(this._innerShadow != null)
        {
            this._innerShadow.TimeInterval = nInterval;
        }
    },


    /*
     *颜色表
     */
    getColorTable: function () {
        if (this._innerShadow != null) {
            var intColors = this._innerShadow.GetColorTable();
            return SuperMap.Web.Core.Conversion.ConvertLongToColors(intColors);
        }
    },
    getRatioValues: function () {
        if (this._innerShadow != null) {
            return this._innerShadow.GetRatioValues();
        }
    },
    setColorDictionary: function (keys,colors) {
        if (this._innerShadow != null) {
            //var intColors = SuperMap.Web.Core.Conversion.ConvertColorsToRGBLong(colors);
            var intColors = new Array();
            for (i = 0; i < colors.length; i++) {
                var intColor = colors[i].toLongABGR();
                intColors[i] = intColor;
            }

            this._innerShadow.SetColorDictionary(keys,intColors);
        }
    },

    /*
     *分析区域
     */
    get_queryRegion:function()
    {
        if(this._innerShadow != null)
        {
            return this._innerShadow.QueryRegion;
        }
    },
    set_queryRegion:function(feature3d)
    {
        if (this._innerShadow == null) {
            return null;
        }
        if (SuperMap.Web.Core.Feature3D.isInstanceOfType(feature3d)) {
            if (feature3d.get_geometry() == null) {
                return null;
            }
            var innerGeometry = feature3d.get_geometry()._get_innerGeometry();
            if (innerGeometry == null) {
                return;
            }
            this._innerShadow.QueryRegion = innerGeometry;
        }
    },

    /*
    *
     */
    getShadowRatio:function(point){
      if(this._innerShadow != null){
          var innerPt = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(point);
          return this._innerShadow.GetShadowRatio(innerPt);
      }
    },

    /*
     *Build方法：分析并显示结果
     */
    build:function()
    {
        if(this._innerShadow != null)
        {
            this._innerShadow.Build();
        }
    },
    /*
     *Clear方法：清除分析结果
     */
    clear:function()
    {
        if(this._innerShadow != null)
        {
            this._innerShadow.Clear();
        }
    },
    /*
     *分析基于的视口
     */
    get_inViewport:function()
    {
     /// <summary>获取基于的视口</summary>
     /// <returns type="Number"></returns>
        if(this._innerShadow != null)
        {
            return this._innerShadow.InViewport;
        }
    },
    set_inViewport:function(value)
    {
     /// <summary>设置视口的索引</summary>
     ///<param name="value" type="Number"></param>
        if (this._innerShadow != null)
        {
            this._innerShadow.InViewport = value;
        }
    }
 };
SuperMap.Web.Realspace.ShadowQuery.registerClass('SuperMap.Web.Realspace.ShadowQuery', Sys.Component, Sys.IDisposable);
