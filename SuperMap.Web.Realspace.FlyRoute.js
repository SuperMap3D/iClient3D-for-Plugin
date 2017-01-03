//========================================================================== 
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.Realspace.FlyRoute
// 功能：			飞行路线类
// 最后修改时间：	
//========================================================================== 
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.FlyRoute = function () {
    SuperMap.Web.Realspace.FlyRoute.initializeBase(this);
    this._innerFlyRoute = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateFlyRoute();
};

SuperMap.Web.Realspace.FlyRoute.prototype = {

    dispose: function () {
        ///<returns type="void">析构函数</returns>
        this._innerFlyRoute = null;
    },
    _getInnerFlyRoute: function () {
        if (this._innerFlyRoute != null) {
            return this._innerFlyRoute;
        }
    },
    _setInnerFlyRoute: function (innerRoute) {
        this._innerFlyRoute = innerRoute;
    },

    /*
    *fromGeoLine3D：从 GeoLine3D对象初始化线路
     */
    fromGeoLine3D: function (valGeoLine3d) {
        /// <summary>路线名称</summary>
        ///<value type="String">路线名称</value>
        if ((typeof (this._innerFlyRoute) != "object") || (this._innerFlyRoute == null) || !SuperMap.Web.Core.GeoLine3D.isInstanceOfType(valGeoLine3d)) {
            return;
        }
        var geoline = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(valGeoLine3d);

        return this._innerFlyRoute.FromGeoLine3D(geoline);
    },

    /*
    *toGeoLine3D：返回路线的 GeoLine3D对象
     */
    toGeoLine3D: function () {
        /// <summary>路线名称</summary>
        ///<value type="String">路线名称</value>
        if ((typeof (this._innerFlyRoute) != "object") || (this._innerFlyRoute == null)) {
            return;
        }
        return this._innerFlyRoute.ToGeoLine3D(); //转化成脚本的geoline3d
    },

    /*
    *toXML：返回表示该路线对象的XML描述信息
     */
    toXML: function () {
        if ((typeof (this._innerFlyRoute) != "object") || (this._innerFlyRoute == null)) {
            return;
        }
        return this._innerFlyRoute.ToXML();
    },

    /*
    *fromXML：从XML字符串中导入对象
     */
    fromXML: function (str) {
        if ((typeof (this._innerFlyRoute) != "object") || (this._innerFlyRoute == null)) {
            return;
        }
        return this._innerFlyRoute.FromXML(str);
    },

    /*
    *name：获取或设置路线的名称
     */
    get_name: function () {
        /// <summary>路线名称</summary>
        ///<value type="String">路线名称</value>
        if ((this._innerFlyRoute == null)) {
            return;
        }
        return this._innerFlyRoute.Name;
    },
    set_name: function (name) {
        if ((this._innerFlyRoute == null)) {
            return;
        }
        this._innerFlyRoute.Name = name;
    },

    /*
    *isStopsVisible：获取或设置站点是否可见
     */
    get_isStopsVisible: function () {
        /// <summary>站点是否可见</summary>
        ///<value type="boolean"></value>
        if ((this._innerFlyRoute == null)) {
            return;
        }
        return this._innerFlyRoute.IsStopsVisible;
    },
    set_isStopsVisible: function (visible) {
        if (typeof (visible) != "boolean" || (this._innerFlyRoute == null)) {
            return;
        }
        this._innerFlyRoute.IsStopsVisible = visible;
        /*        if(this._innerFlyManager)
         {
         this._innerFlyManager.Update();
         }*/  //在插件层做
    },

    /*
    *isLinesVisible：获取或设置线路是否可见
     */
    get_isLinesVisible: function () {
        /// <summary>路线是否可见</summary>
        ///<value type="boolean"></value>
        if ((this._innerFlyRoute == null)) {
            return;
        }
        return this._innerFlyRoute.IsLinesVisible;
    },
    set_isLinesVisible: function (visible) {
        if (typeof (visible) != "boolean" || (this._innerFlyRoute == null)) {
            return;
        }
        this._innerFlyRoute.IsLinesVisible = visible;
        /*        if(this._innerFlyManager)
         {
         this._innerFlyManager.Update();
         }*/ //在插件层做
    },

    /*
    *isAltitudeFixed：获取或设置是否锁定高程
     */
    get_isAltitudeFixed: function () {
        /// <summary>高度是否固定</summary>
        ///<value type="boolean"></value>
        if ((this._innerFlyRoute == null)) {
            return;
        }
        return this._innerFlyRoute.IsAltitudeFixed;
    },
    set_isAltitudeFixed: function (fixed) {
        if (typeof (fixed) != "boolean" || (this._innerFlyRoute == null)) {
            return;
        }
        this._innerFlyRoute.IsAltitudeFixed = fixed;
    },

    /*
    *isHeadingFixed：获取或设置是否锁定方位角
     */
    get_isHeadingFixed: function () {
        /// <summary>仰角是否固定</summary>
        ///<value type="boolean"></value>
        if ((this._innerFlyRoute == null)) {
            return;
        }
        return this._innerFlyRoute.IsHeadingFixed;
    },
    set_isHeadingFixed: function (fixed) {
        if (typeof (fixed) != "boolean" || (this._innerFlyRoute == null)) {
            return;
        }
        this._innerFlyRoute.IsHeadingFixed = fixed;
    },

    /*
    *isTiltFixed：获取或设置是否锁定俯仰角
     */
    get_isTiltFixed: function () {
        /// <summary>倾斜角是否固定</summary>
        ///<value type="boolean"></value>
        if ((this._innerFlyRoute == null)) {
            return;
        }
        return this._innerFlyRoute.IsTiltFixed;
    },
    set_isTiltFixed: function (fixed) {
        if (typeof (fixed) != "boolean" || (this._innerFlyRoute == null)) {
            return;
        }
        this._innerFlyRoute.IsTiltFixed = fixed;
    },

    /*
    *isFlyingLoop：获取或设置是否循环飞行
     */
    get_isFlyingLoop: function () {
        /// <summary>是否循环飞行</summary>
        ///<value type="boolean"></value>
        if ((this._innerFlyRoute == null)) {
            return;
        }
        return this._innerFlyRoute.IsFlyingLoop;
    },
    set_isFlyingLoop: function (isFlyingLoop) {
        if (typeof (isFlyingLoop) != "boolean" || (this._innerFlyRoute == null)) {
            return;
        }
        this._innerFlyRoute.IsFlyingLoop = isFlyingLoop;
    },

    /*
    *isFlyAlongTheRoute：获取或设置是否沿线飞行
     */
    get_isFlyAlongTheRoute: function () {
        /// <summary>是否沿线飞行</summary>
        ///<value type="boolean"></value>
        if ((this._innerFlyRoute == null)) {
            return;
        }
        return this._innerFlyRoute.IsFlyAlongTheRoute;
    },
    set_isFlyAlongTheRoute: function (isFlyAlong) {
        if (typeof (isFlyAlong) != "boolean" || (this._innerFlyRoute == null)) {
            return;
        }
        this._innerFlyRoute.IsFlyAlongTheRoute = isFlyAlong;
    },

    /*
    *speed：获取或设置该飞行路线的速度，若用户没有为某个站点设置飞行速度，则此站点的飞行速度为此速度。
     */
    get_speed: function () {
        /// <summary>路线的速度</summary>
        ///<value type="Number"></value>
        if ((this._innerFlyRoute == null)) {
            return;
        }
        return this._innerFlyRoute.Speed;
    },
    set_speed: function (speed) {
        if ((this._innerFlyRoute == null)) {
            return;
        }
        var n_speed = parseFloat(speed);
        if (!isNaN(n_speed)) {
            this._innerFlyRoute.Speed = n_speed;
        }
    },

    /*
    *routeStops：获取或设置路线站点集合
     */
    get_routeStops: function () {
        /// <summary>路线的站点</summary>
        ///<value type="SuperMap.Web.Realspace.RouteStops"></value>
        if ((this._innerFlyRoute == null)) {
            return;
        }
        var innerRouteStops = this._innerFlyRoute.RouteStops;
        if (innerRouteStops) {
            var routeStops = new SuperMap.Web.Realspace.RouteStops();
            routeStops._setInnerRouteStops(innerRouteStops);
            return routeStops;
        }
        else {
            return;
        }
    },
    set_routeStops: function (routeStops) {
        if ((this._innerFlyRoute == null)) {
            return;
        }
        var innerRouteStops = routeStops._getInnerRouteStops();
        if (innerRouteStops) {
            this._innerFlyRoute.RouteStops = innerRouteStops;
        }
        else {
            return;
        }
    },


    /*
    *defaultStyle：获取或设置默认显示风格
     */
    get_defaultStyle: function () {
        /// <summary>默认风格</summary>
        ///<value type="boolean"></value>
        if ((this._innerFlyRoute == null)) {
            return;
        }
        var style3d = new SuperMap.Web.Core.Style3D();
        style3d._set_innerStyle3D(this._innerFlyRoute.DefaultStyle);
        return style3d;
    },
    set_defaultStyle: function (style) {
        if (typeof (style) != "object" || (this._innerFlyRoute == null)) {
            return;
        }
        this._innerFlyRoute.DefaultStyle = style._get_innerStyle3D();
    }
};
SuperMap.Web.Realspace.FlyRoute.registerClass('SuperMap.Web.Realspace.FlyRoute', Sys.Component, Sys.IDisposable);