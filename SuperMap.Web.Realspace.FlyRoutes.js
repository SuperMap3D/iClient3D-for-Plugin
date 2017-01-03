//========================================================================== 
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.Realspace.FlyRoutes
// 功能：			飞行路线集合类
// 最后修改时间：	
//========================================================================== 
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.FlyRoutes = function () {
    SuperMap.Web.Realspace.FlyRoutes.initializeBase(this);
    this._innerFlyRoutes = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateFlyRoutes();
};

SuperMap.Web.Realspace.FlyRoutes.prototype = {

    dispose: function () {
        ///<returns type="void">析构函数</returns>
        this._innerFlyRoutes = null;
    },

    _get_innerRoutes: function () {
        return this._innerFlyRoutes;
    },
    _set_innerRoutes: function (routes) {
        this._innerFlyRoutes = routes;
    },

    /*
    *add：向路线集合中添加一个指定的路线对象
     */
    add: function (flyRoute) {
        if (typeof(this._innerFlyRoutes) != "object" || this._innerFlyRoutes == null || !SuperMap.Web.Realspace.FlyRoute.isInstanceOfType(flyRoute)) {
            return false
        }
        return this._innerFlyRoutes.Add(flyRoute._getInnerFlyRoute());
    },

    /*
    *remove：从路线集合中移除给定索引值处的路线对象
     */
    remove: function (strIndex) {
        if (typeof(this._innerFlyRoutes) != "object" || this._innerFlyRoutes == null || strIndex == null) {
            return false
        }
        return this._innerFlyRoutes.Remove(strIndex);
    },

    /*
    *clear：清除路线集合中所有路线
     */
    clear: function () {
        if (typeof(this._innerFlyRoutes) != "object" || this._innerFlyRoutes == null) {
            return false
        }
        this._innerFlyRoutes.Clear();
    },

    /*
    *indexOf：返回指定名称的路线的序号
     */
    indexOf: function (strName) {
        if (typeof(this._innerFlyRoutes) != "object" || this._innerFlyRoutes == null || strName == null) {
            return false
        }
        return this._innerFlyRoutes.IndexOf(strName);
    },

    /*
    *contains：返回是否包含指定名称的路线
     */
    contains: function (strName) {
        if (typeof(this._innerFlyRoutes) != "object" || this._innerFlyRoutes == null || strName == null) {
            return false
        }
        return this._innerFlyRoutes.Contains(strName);
    },

    /*
    *toXML：获得表示路线集合的XML描述信息
     */
    toXML: function () {
        if (typeof(this._innerFlyRoutes) != "object" || this._innerFlyRoutes == null) {
            return false
        }
        return this._innerFlyRoutes.ToXML();
    },

    /*
    *fromXML：从XML字符串中导入路线集合对象
     */
    fromXML: function (strXML) {
        if (typeof(this._innerFlyRoutes) != "object" || this._innerFlyRoutes == null || strXML == null) {
            return false
        }
        return this._innerFlyRoutes.FromXML(strXML);
    },

    /*
    *toFile：将路线集合对象输出成xml文件
     */
    toFile: function (strFileName) {
        if (typeof(this._innerFlyRoutes) != "object" || this._innerFlyRoutes == null || strFileName == null) {
            return false
        }
        this._innerFlyRoutes.ToFile(strFileName);
    },

    /*
    *fromFile：从指定的文件中导入路线集合对象
     */
    fromFile: function (strPathURL) {
        ///<param name="strPathURL" type="String"></param>
        ///<value type="Boolean"></value>
        /// <summary>由文件获取飞行路线</summary>
        if (typeof (this._innerFlyRoutes) != "object" || this._innerFlyRoutes == null || strPathURL == null || strPathURL == "") {
            return false
        }
        return this._innerFlyRoutes.FromFile(strPathURL);
    },

    /*
    *cameraDistanceX：获取或设置飞行时相机与模型的 X 轴方向的距离
     */
    get_cameraDistanceX: function () {
        /// <summary>相机距离-X</summary>
        ///<value type="Number">相机距离-X</value>
        if ((typeof (this._innerFlyRoutes) != "object") || (this._innerFlyRoutes == null)) {
            return;
        }
        return this._innerFlyRoutes.CameraDistanceX;
    },
    set_cameraDistanceX: function (x) {
        if ((typeof (this._innerFlyRoutes) != "object") || (this._innerFlyRoutes == null)) {
            return;
        }
        var n_x = parseFloat(x);
        if (!isNaN(n_x)) {
            this._innerFlyRoutes.CameraDistanceX = n_x;
        }
    },

    /*
    *cameraDistanceY：获取或设置飞行时相机与模型的 Y 轴方向的距离
     */
    get_cameraDistanceY: function () {
        /// <summary>相机距离-Y</summary>
        ///<value type="Number">相机距离-Y</value>
        if ((typeof (this._innerFlyRoutes) != "object") || (this._innerFlyRoutes == null)) {
            return;
        }
        return this._innerFlyRoutes.CameraDistanceY;
    },
    set_cameraDistanceY: function (y) {
        if ((typeof (this._innerFlyRoutes) != "object") || (this._innerFlyRoutes == null)) {
            return;
        }
        var n_y = parseFloat(y);
        if (!isNaN(n_y)) {
            this._innerFlyRoutes.CameraDistanceY = n_y;
        }
    },

    /*
    *cameraDistanceZ：
     */
    get_cameraDistanceZ: function () {
        /// <summary>相机距离-Z</summary>
        ///<value type="Number">相机距离-Z</value>
        if ((typeof (this._innerFlyRoutes) != "object") || (this._innerFlyRoutes == null)) {
            return;
        }
        return this._innerFlyRoutes.CameraDistanceZ;
    },
    set_cameraDistanceZ: function (z) {
        if ((typeof (this._innerFlyRoutes) != "object") || (this._innerFlyRoutes == null)) {
            return;
        }
        var n_z = parseFloat(z);
        if (!isNaN(n_z)) {
            this._innerFlyRoutes.CameraDistanceZ = n_z;
        }
    },

    /*
    *currentRouteIndex：获取或设置当前选中的路线，默认没有Route时为-1，添加Route后则不再是非法值
     */
    get_currentRouteIndex: function () {
        /// <summary>当前飞行路线序号</summary>
        ///<value type="Number">当前飞行路线序号</value>
        if ((typeof (this._innerFlyRoutes) != "object") || (this._innerFlyRoutes == null)) {
            return;
        }
        return this._innerFlyRoutes.CurrentRouteIndex;
    },
    set_currentRouteIndex: function (index) {
        if ((typeof (this._innerFlyRoutes) != "object") || (this._innerFlyRoutes == null)) {
            return;
        }
        var n_index = parseInt(index);
        if (!isNaN(n_index)) {
            this._innerFlyRoutes.CurrentRouteIndex = n_index;
        }
    },

    /*
    *count：获取路线集合中路线的个数
     */
    get_count: function () {
        /// <summary>当前飞行路线总数</summary>
        ///<value type="Number">当前飞行路线总数</value>
        if ((typeof (this._innerFlyRoutes) != "object") || (this._innerFlyRoutes == null)) {
            return;
        }
        return this._innerFlyRoutes.Count;
    },

    /*
    *currentRoute：获取当前的飞行路线，没有飞行路线返回NULL
     */
    get_currentRoute: function () {
        /// <summary>获取当前飞行路线</summary>
        ///<value type="SuperMap.Web.Realspace.FlyRoute">飞行路线对象</value>
        if ((typeof (this._innerFlyRoutes) != "object") || (this._innerFlyRoutes == null)) {
            return;
        }
        var innerRoute = this._innerFlyRoutes.CurrentRoute;
        if (innerRoute) {
            var route = new SuperMap.Web.Realspace.FlyRoute();
            route._setInnerFlyRoute(innerRoute);
            //route._innerFlyManager = this._innerFlyManager;
            return route;
        }
        else {
            return;
        }
    },

    /*
    *get_item：获取或设置路线集合指定索引处的项
     */
    get_item: function (nIndex) {
        var innerRoute = this._innerFlyRoutes.GetItem(nIndex);
        if (innerRoute) {
            var route = new SuperMap.Web.Realspace.FlyRoute();
            route._setInnerFlyRoute(innerRoute);
            return route;
        }
    },
    /*
    *set_item：设置路线集合指定索引处的项
     */
    set_item:function(nIndex, route){
        var innerRoute = route._getInnerFlyRoute();
        if(innerRoute){
            this._innerFlyRoutes.SetItem(nIndex, innerRoute);
        }
    }
};
SuperMap.Web.Realspace.FlyRoutes.registerClass('SuperMap.Web.Realspace.FlyRoutes', Sys.Component, Sys.IDisposable);