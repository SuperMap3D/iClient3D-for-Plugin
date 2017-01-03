//========================================================================== 
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.Realspace.Atmosphere
// 功能：			 大气类
// 最后修改时间：	
//========================================================================== 
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.Atmosphere = function () {
    /// <summary>大气对象</summary>
    SuperMap.Web.Realspace.Atmosphere.initializeBase(this);
    this._innerAtmosphere = null;
};

SuperMap.Web.Realspace.Atmosphere.prototype = {
    /*
    *SwipeRegion属性
    */
    get_swipeRegion: function () {
        ///<return type="SuperMap.Bounds">返回卷帘范围</value>
        if (this._innerAtmosphere != null) {
            area = this._innerAtmosphere.SwipeRegion;
            return new SuperMap.Bounds(area.Left, area.Bottom, area.Right, area.Top);
        }
    },
    set_swipeRegion: function (rec2d) {
        ///<summary>设置卷帘范围</summary>
        ///<param name="rec2d" type="SuperMap.Bounds">卷帘范围</param>
        if (this._innerAtmosphere != null) {
            var recInner = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(rec2d);
            this._innerAtmosphere.SwipeRegion = recInner;
        }
    },

    /*
    *是否开启卷帘效果
    */
    get_swipeEnabled: function () {
        ///<return type="Boolean">返回图层是否开启卷帘效果</value>
        if (this._innerAtmosphere != null) {
            return this._innerAtmosphere.SwipeEnabled;
        }
    },
    set_swipeEnabled: function (isswipeEnabled) {
        ///<summary>设置图层是否开启卷帘</summary>
        ///<param name="isswipeEnabled" type="Boolean">是否开启卷帘</param>
        if (this._innerAtmosphere != null) {
            this._innerAtmosphere.SwipeEnabled = isswipeEnabled;
        }
    }
};
SuperMap.Web.Realspace.Atmosphere.registerClass('SuperMap.Web.Realspace.Atmosphere', Sys.Component, Sys.IDisposable);