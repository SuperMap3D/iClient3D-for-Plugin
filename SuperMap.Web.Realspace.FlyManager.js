//==========================================================================
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。
// 作者：			SuperMap WebClient Team
// 修改：
// 文件名：			SuperMap.Web.Realspace.FlyManager
// 功能：			 飞行操作类
// 最后修改时间：
//==========================================================================
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.FlyManager = function (scenecontrol) {
    /// <summary>飞行操作对象</summary>
    SuperMap.Web.Realspace.FlyManager.initializeBase(this);
    this._innerFlyManager = scenecontrol._get_innerSceneControl().Scene.FlyManager;
    flystatus = null;
};

SuperMap.Web.Realspace.FlyManager.prototype = {
    dispose: function () {
        ///<returns type="void">析构函数</returns>
        this._innerFlyManager = null;
    },
    /*
    *FlyStatusChange：飞行状态改变回调函数
     */
    FlyStatusChange: function (flystatus, stopEvent, pauseEvent, flyEvent) {
        /// <param name="_flystatus" type="SuperMap.Web.Realspace.FlyStatus">飞行状态</param>
        /// <param name="stopEvent" type="function">停止回调函数</param>
        /// <param name="pauseEvent" type="function">暂停回调函数</param>
        /// <param name="flyEvent" type="function">飞行回调函数</param>
        switch (flystatus) {
            case 0:
                stopEvent();
                break;
            case 1:
                pauseEvent();
                break;
            case 2:
                flyEvent();
                break;
            default:
        }
    },

    /*
    *routes：获取路线集合
     */
    get_routes: function () {
        /// <summary>获取飞行路线对象</summary>
        ///<value type="SuperMap.Web.Realspace.FlyRoutes">飞行路线对象</value>
        if ((this._innerFlyManager == null)) {
            return;
        }
        var innerRoutes = this._innerFlyManager.Routes;
        if (innerRoutes) {
            var routes = new SuperMap.Web.Realspace.FlyRoutes();
            routes._set_innerRoutes(innerRoutes);
            return routes;
        }
        else {
            return;
        }
    },

    /*
    *play：按照返回的路线集合（Routes）指定的路线开始飞行，或继续进行中断的飞行。
     */
    play: function () {
        /// <summary>沿路线飞行</summary>
        ///<returns type="void"></returns>
        if ((this._innerFlyManager == null)) {
            return;
        }
        this._innerFlyManager.Play();

        flyManager.set_flystatus(SuperMap.Web.Realspace.FlyStatus.FPLAY, flyManager.FlyStatusChange);
    },

    /*
    *pause：暂停当前飞行
     */
    pause: function () {
        /// <summary>暂停飞行</summary>
        ///<returns type="void"></returns>
        if ((this._innerFlyManager == null)) {
            return;
        }
        this._innerFlyManager.Pause();
        flyManager.set_flystatus(SuperMap.Web.Realspace.FlyStatus.FPAUSE, flyManager.FlyStatusChange);
    },

    isArrivedNewStop: function () {
        /// <summary>是否到达新站点</summary>
        ///<value type="Boolean"></value>
        if ((this._innerFlyManager == null)) {
            return;
        }
        return this._innerFlyManager.IsArrivedNewStop();

    },
    /*
    *Stop： 停止当前飞行。
     */
    stop: function () {
        /// <summary>停止飞行</summary>
        ///<returns type="void"></returns>
        if ((this._innerFlyManager == null)) {
            return;
        }
        this._innerFlyManager.Stop();
        flyManager.set_flystatus(SuperMap.Web.Realspace.FlyStatus.FSTOP, flyManager.FlyStatusChange);
    },

    /*
    *flyStatus：获取当前的飞行状态（停止，暂停，飞行中）
     */
    get_flyStatus: function () {
        /// <summary>获取飞行状态</summary>
        ///<value type="SuperMap.Web.Realspace.FlyStatus">飞行状态</value>
        if ((this._innerFlyManager == null)) {
            return;
        }
        return this._innerFlyManager.FlyStatus;
    },

    /*
    *duration：获取或设置本次飞行（即当前整个路线）需要的总时间，单位为秒
     */
    get_duration: function () {
        /// <summary>飞行需要的时间</summary>
        ///<value type="Number">飞行需要的时间</value>
        if ((this._innerFlyManager == null)) {
            return;
        }
        return this._innerFlyManager.Duration;
    },
    set_duration: function (time) {
        if ((this._innerFlyManager == null)) {
            return;
        }
        var n_time = parseFloat(time);
        if (!isNaN(n_time)) {
            this._innerFlyManager.Duration = n_time;
            if (this._innerFlyManager) {//飞行时改变状态需要Update
                if (this._innerFlyManager.FlyStatus == 2) {
                    this._innerFlyManager.Update();
                }
            }
        }
    },

    /*
    *progress：获取或设置本次飞行的当前进度，单位为秒
     */
    get_progress: function () {
        /// <summary>飞行进度</summary>
        ///<value type="Number">飞行进度</value>
        if ((this._innerFlyManager == null)) {
            return;
        }
        return this._innerFlyManager.Progress;
    },
    set_progress: function (progress) {
        if ((this._innerFlyManager == null)) {
            return;
        }
        var f_progress = parseFloat(progress);
        if (!isNaN(f_progress)) {
            this._innerFlyManager.Progress = f_progress;
        }
    },

    /*
    *playRate：获取或设置播放速率。该属性值的范围为0-100，
    * 当大于1.0时，则沿飞行路径快速飞行，小于1.0时，表示沿飞行路径慢速飞行
     */
    get_playRate: function () {
        /// <summary>飞行速率</summary>
        ///<value type="Number">飞行速率</value>
        if ((this._innerFlyManager == null)) {
            return;
        }
        return this._innerFlyManager.PlayRate;
    },
    set_playRate: function (rate) {
        if ((this._innerFlyManager == null)) {
            return;
        }
        var f_rate = parseFloat(rate);
        if (!isNaN(f_rate)) {
            this._innerFlyManager.PlayRate = f_rate;
        }
    },

    /*
    *currentStopIndex：获取或设置当前飞行所到的站点
     */
    get_currentStopIndex: function () {
        if ((this._innerFlyManager == null)) {
            return;
        }
        return this._innerFlyManager.CurrentStopIndex;
    },
    set_currentStopIndex: function (index) {
        if ((this._innerFlyManager == null)) {
            return;
        }
        var n_index = parseInt(index);
        if (!isNaN(n_index)) {
            this._innerFlyManager.CurrentStopIndex = n_index;
        }
    },

    /*
    *update：更新飞行管理的内部计算
     */
    update: function(){
        if ((this._innerFlyManager != null)) {
            this._innerFlyManager.Update();
        }
    },
    /*
    *set_flystatus：设置飞行状态
     */
    set_flystatus: function (_flystatus, FlyStatusChange) {
        /// <param name="_flystatus" type="SuperMap.Web.Realspace.FlyStatus">飞行状态</param>
        /// <param name="FlyStatusChange" type="function">回调函数</param>
        if (flystatus != _flystatus){
            flystatus = _flystatus;
        if (typeof(stopEvent) === "undefined"){
          stopEvent = function(){};
        }
        if (typeof(pauseEvent) === "undefined"){
          pauseEvent = function(){};
        }
        if (typeof(flyEvent) === "undefined"){
          flyEvent = function(){};
        }
        FlyStatusChange(flystatus,stopEvent,pauseEvent,flyEvent);
      }
    }
};
SuperMap.Web.Realspace.FlyManager.registerClass('SuperMap.Web.Realspace.FlyManager', Sys.Component, Sys.IDisposable);
