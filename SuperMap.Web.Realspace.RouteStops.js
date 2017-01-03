//========================================================================== 
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2011。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.Realspace.RouteStops
// 功能：			某一飞行路线的站点集合类
// 最后修改时间：	
//========================================================================== 
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.RouteStops = function () {
    ///<returns type="SuperMap.Web.Realspace.RouteStops"></returns>
    SuperMap.Web.Realspace.RouteStops.initializeBase(this);
    this._innerRouteStops = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateRouteStops();
};

SuperMap.Web.Realspace.RouteStops.prototype = {

    dispose: function () {
        ///<returns type="void">析构函数</returns>
        this._innerRouteStops = null;
    },

    _getInnerRouteStops: function () {
        if (this._innerRouteStops != null) {
            return this._innerRouteStops;
        }
    },
    _setInnerRouteStops: function (innerStops) {
        this._innerRouteStops = innerStops;
    },

    /*
    *add：向站点集合中添加一个站点
     */
    add: function (routeStop) {
        if (typeof (this._innerRouteStops) != "object" || (this._innerRouteStops == null)) {
            return null;
        }
        return this._innerRouteStops.Add(routeStop._getInnerRouteStop());
    },

    /*
    *insert：在站点集合指定位置添加一个站点对象
     */
    insert: function (index, routeStop) {
        if (typeof (this._innerRouteStops) != "object" || (this._innerRouteStops == null)) {
            return null;
        }
        return this._innerRouteStops.Insert(index, routeStop._getInnerRouteStop());
    },

    /*
    *remove：删除指定索引位置的站点对象
     */
    remove: function (index) {
        if (typeof (this._innerRouteStops) != "object" || (this._innerRouteStops == null)) {
            return null;
        }
        return this._innerRouteStops.Remove(index);
    },

    /*
    *clear：清除站点集合中的所有站点
     */
    clear: function () {
        if (typeof (this._innerRouteStops) != "object" || (this._innerRouteStops == null)) {
            return null;
        }
        this._innerRouteStops.Clear();
    },

    /*
    *set_stop：重新设置指定索引处的站点
     */
    set_stop: function (index, value) {
        if (typeof (this._innerRouteStops) != "object" || (this._innerRouteStops == null) || !SuperMap.Web.Realspace.RouteStop.isInstanceOfType(value)) {
            return;
        }
        this._innerRouteStops.SetItem(index, value._getInnerRouteStop());
    },

    /*
    *get_stop：获取或设置指定索引处的站点对象
     */
    get_stop: function (nIndex) {
        ///<param name="nIndex" type="Number" integer="true"></param>
        ///<value type="SuperMap.Web.Realspace.RouteStop"></value>
        if ((this._innerRouteStops == null) || isNaN(nIndex)) {
            return null;
        }
        var innerRouteStop = this._innerRouteStops.GetItem(nIndex);
        if (innerRouteStop) {
            var routeStop = new SuperMap.Web.Realspace.RouteStop();
            routeStop._setInnerRouteStop(innerRouteStop);
            return routeStop;
        }
        else {
            return null;
        }
    },

    /*
    *count：获取站点集合中站点的个数
     */
    get_count: function () {

        ///<value type="Number" integer="true"></value>
        if ((this._innerRouteStops == null)) {
            return null;
        }
        return this._innerRouteStops.Count;
    },

    /*
    *isContains：获得站点集合中是否包含指定名称的站点
     */
    isContains: function (strName) {
        ///<param name="strName" type="String">站点名称</param>
        ///<returns type="Boolean"></returns>
        if ((this._innerRouteStops == null)) {
            return false;
        }
        return this._innerRouteStops.IsContains(strName);
    },

    /*
    *getIndexByName：获取指定名字的站点索引
     */
    getIndexByName: function (strName) {
        ///<param name="strName" type="String"></param>
        ///<returns type="Number" integer="true"></returns>
        if ((this._innerRouteStops == null)) {
            return null;
        }
        return this._innerRouteStops.GetIndexByName(strName);
    }
};
SuperMap.Web.Realspace.RouteStops.registerClass('SuperMap.Web.Realspace.RouteStops', Sys.Component, Sys.IDisposable);