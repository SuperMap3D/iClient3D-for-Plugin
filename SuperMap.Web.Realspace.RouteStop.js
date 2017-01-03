//========================================================================== 
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2011。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.Realspace.RouteStop
// 功能：			飞行路线站点类
// 最后修改时间：	
//========================================================================== 
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.RouteStop = function () {
    ///<summary>飞行路线站点对象</summary>
    SuperMap.Web.Realspace.RouteStop.initializeBase(this);
    this._innerRouteStop = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateRouteStop();
};

SuperMap.Web.Realspace.RouteStop.prototype = {

    dispose: function () {
        ///<returns type="void">析构函数</returns>
        this._innerRouteStop = null;
    },

    _getInnerRouteStop: function () {
        if (this._innerRouteStop != null) {
            return this._innerRouteStop;
        }
    },
    _setInnerRouteStop: function (innerStop) {
        this._innerRouteStop = innerStop;
    },
    /*
    *style: 获取或设置路线站点显示风格. 设置此属性后，需要调用 FlyManager.Update()
     */
    set_style: function (style) {
        if ((typeof (this._innerRouteStop) != "object") || (this._innerRouteStop == null)) {
            return;
        }
        this._innerRouteStop.Style = style._get_innerStyle3D();
    },
    get_style: function () {
        if ((typeof (this._innerRouteStop) != "object") || (this._innerRouteStop == null)) {
            return;
        }
        var style3d = new SuperMap.Web.Core.Style3D();
        style3d._set_innerStyle3D(this._innerRouteStop.Style);
        return style3d;
    },

    /*
    *camera: 获取或设置路线站点相机。设置此属性后，需要调用 FlyManager.Update()
     */
    set_camera: function (camera) {
        if ((typeof (this._innerRouteStop) != "object") || (this._innerRouteStop == null)) {
            return;
        }
        this._innerRouteStop.Camera = camera._get_innerCamera();
    },
    get_camera: function () {
        if ((typeof (this._innerRouteStop) != "object") || (this._innerRouteStop == null)) {
            return;
        }
        var camera = new SuperMap.Web.Realspace.Camera();
        camera._set_innerCamera(this._innerRouteStop.Camera);
        return camera;
    },

    /*
    *waitTime:获取或设置站点处停留时间,单位为秒。设置此属性后，需要调用 FlyManager.Update()
     */
    set_waitTime: function (waitTime) {
        if ((typeof (this._innerRouteStop) != "object") || (this._innerRouteStop == null)) {
            return;
        }
        this._innerRouteStop.WaitTime = waitTime;
    },
    get_waitTime: function () {
        if ((typeof (this._innerRouteStop) != "object") || (this._innerRouteStop == null)) {
            return;
        }
        return this._innerRouteStop.WaitTime;
    },

    /*
    *duration:获取或设置从站点出发到下一站点飞行的持续时间。 单位为秒
                    设置此属性后，需要调用 FlyManager.Update()
   */
    set_duration: function (duration) {
        if ((typeof (this._innerRouteStop) != "object") || (this._innerRouteStop == null)) {
            return;
        }
        this._innerRouteStop.Duration = duration;
    },
    get_duration: function () {
        if ((typeof (this._innerRouteStop) != "object") || (this._innerRouteStop == null)) {
            return;
        }
        return this._innerRouteStop.Duration;
    },
    //暂时不开放
/*    get_rotationDuration: function () {
        if ((typeof (this._innerRouteStop) != "object") || (this._innerRouteStop == null)) {
            return;
        }
        return this._innerRouteStop.RotationDuration;
    },*/

    /*
    *isExcluded：获取或设置飞行中本站点是否被排除。 设置此属性后，需要调用 FlyManager.Update()
     */
    set_isExcluded: function (x) {
        if ((typeof (this._innerRouteStop) != "object") || (this._innerRouteStop == null)) {
            return;
        }
        this._innerRouteStop.IsExcluded = x;
    },
    get_isExcluded: function () {
        if ((typeof (this._innerRouteStop) != "object") || (this._innerRouteStop == null)) {
            return;
        }
        return this._innerRouteStop.IsExcluded;
    },

    /*
    *turnTime：获取或设置飞行过程中到抵达下个站点时的转弯时间，单位为秒，可设置最小值为0.1
     *  设置此属性后，需要调用 FlyManager.Update()
     */
    set_turnTime: function (turnTime) {
        if ((typeof (this._innerRouteStop) != "object") || (this._innerRouteStop == null)) {
            return;
        }
        this._innerRouteStop.TurnTime = turnTime;
    },
    get_turnTime: function () {
        if ((typeof (this._innerRouteStop) != "object") || (this._innerRouteStop == null)) {
            return;
        }
        return this._innerRouteStop.TurnTime;
    },

    /*
    *isSlowTurning：获取或设置抵达下个站点时是否慢速转弯。
     *  设置此属性后，需要调用 FlyManager.Update()。
    */
    set_isSlowTurning: function (x) {
        if ((typeof (this._innerRouteStop) != "object") || (this._innerRouteStop == null)) {
            return;
        }
        this._innerRouteStop.IsSlowTurning = x;
    },
    get_isSlowTurning: function () {
        if ((typeof (this._innerRouteStop) != "object") || (this._innerRouteStop == null)) {
            return;
        }
        return this._innerRouteStop.IsSlowTurning;
    },
/*    set_angularSpeed: function (angularSpeed) {
        if ((typeof (this._innerRouteStop) != "object") || (this._innerRouteStop == null)) {
            return;
        }
        this._innerRouteStop.AngularSpeed = angularSpeed;
    },
    get_angularSpeed: function () {
        if ((typeof (this._innerRouteStop) != "object") || (this._innerRouteStop == null)) {
            return;
        }
        return this._innerRouteStop.AngularSpeed;
    },*/

    /*
    *name：获取或设置路线站点的名称。
    * 设置此属性后，需要调用 FlyManager.Update()
    */
    set_name: function (name) {
        if ((typeof (this._innerRouteStop) != "object") || (this._innerRouteStop == null)) {
            return;
        }
        this._innerRouteStop.Name = name;
    },
    get_name: function () {
        /// <summary>路线名称</summary>
        ///<value type="String">路线名称</value>
        if ((this._innerRouteStop == null)) {
            return;
        }
        return this._innerRouteStop.Name;
    },

    /*
    *distanceToNextStop：获取当前站点到下一个站点的距离
     */
    get_distanceToNextStop: function () {
        ///<summary>到下一个站点的距离<summary>
        ///<value type="Number" integer="false"></value>
        if ((this._innerRouteStop == null)) {
            return;
        }
        return this._innerRouteStop.DistanceToNextStop;
    },

    /*
     *durationToNextStop：获取当前站点到下一个站点的时间
     */
    get_durationToNextStop: function () {
        ///<summary>到下一个站点需要的时间<summary>
        ///<value type="Number" integer="false"></value>
        if ((this._innerRouteStop == null)) {
            return;
        }
        return this._innerRouteStop.DurationToNextStop;
    },

    /*
    *speed：获取或设置从站点出发到下一站点飞行的速度。
     *  设置此属性后，需要调用 FlyManager.Update()
     */
    set_speed: function (speed) {
        if ((typeof (this._innerRouteStop) != "object") || (this._innerRouteStop == null)) {
            return;
        }
        this._innerRouteStop.Speed = speed;
    },
    get_speed: function () {
        ///<summary>站点的飞行速度<summary>
        ///<value type="Number" integer="false"></value>
        if ((this._innerRouteStop == null)) {
            return;
        }
        return this._innerRouteStop.Speed;
    },

    /*
    *toXML：获得XML描述信息
     */
    toXML: function () {
        if ((typeof (this._innerRouteStop) != "object") || (this._innerRouteStop == null)) {
            return;
        }
        return this._innerRouteStop.ToXML();
    },

    /*
    *fromXML：从XML字符串中导入站点对象
     */
    fromXML: function (str) {
        if ((typeof (this._innerRouteStop) != "object") || (this._innerRouteStop == null)) {
            return;
        }
        return this._innerRouteStop.FromXML(str);
    }
//    get_completeRouteTurnBegin:function(){
//       ///<summary>到该站点视角转换开始时已经完成的路线长度<summary>
//       ///<value type="Number" integer="false"></value> 
//        if ((this._innerRouteStop == null)) 
//        {
//           return;
//        }
//        return this._innerRouteStop.CompleteRouteTurnBegin;
//    },
//    get_completeRouteTurnEnd:function(){
//       ///<summary>到该站点视角转换开始时已经完成的路线长度<summary>
//       ///<value type="Number" integer="false"></value> 
//        if ((this._innerRouteStop == null)) 
//        {
//           return;
//        }
//        return this._innerRouteStop.CompleteRouteTurnEnd;
//    }
};
SuperMap.Web.Realspace.RouteStop.registerClass('SuperMap.Web.Realspace.RouteStop', Sys.Component, Sys.IDisposable);