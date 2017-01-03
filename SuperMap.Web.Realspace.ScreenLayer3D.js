//========================================================================== 
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.Realspace.ScreenLayer3D.js
// 功能：			 三维屏幕图层类
// 最后修改时间：	
//========================================================================== 
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.ScreenLayer3D = function (scenecontrol)
{	
	/// <summary>3D屏幕图层对象</summary>
  	SuperMap.Web.Realspace.ScreenLayer3D.initializeBase(this);

  	this._innerScreenLayer3D = scenecontrol._get_innerSceneControl().Scene.ScreenLayer3D;
    this._feature3Dlist = [];
};

SuperMap.Web.Realspace.ScreenLayer3D.prototype = {

    dispose: function() {
        ///<returns type="void">析构函数</returns>
        this._innerScreenLayer3D = null;
        Array.clear(this._feature3Dlist);
        this._feature3Dlist = [];
    },

    /*
    *图层可见性属性
    */
    get_isVisible: function() {
        ///<value type="Boolean">返回图层是否可见</value>
        if (this._innerScreenLayer3D == null) {
            return null;
        }
        return this._innerScreenLayer3D.IsVisible;
    },

    set_isVisible: function(isVisible) {
        if (this._innerScreenLayer3D == null) {
            return null;
        }

        this._innerScreenLayer3D.IsVisible = isVisible;
    },

    /*
    *几何对象的数量
    */
    get_count: function() {
        ///<value type="Number" integer="true">几何对象的数量</value>
        if (this._innerScreenLayer3D == null) {
            return null;
        }
        return this._innerScreenLayer3D.Count;
    },


    /*
    *屏幕图层X轴方向的坐标单位类型
    */
    get_xUnit: function() {
        ///<value type="SuperMap.Web.Realspace.ScreenCoordinateUnit">获取屏幕图层X轴方向的坐标单位类型</value>
        if (this._innerScreenLayer3D == null) {
            return null;
        }
        return this._innerScreenLayer3D.xUnit;
    },

    set_xUnit: function(xUnit) {
        if (this._innerScreenLayer3D == null) {
            return null;
        }
        var n_xUnit = parseInt(xUnit);
        if (!isNaN(n_xUnit)) {
            this._innerScreenLayer3D.XUnit = n_xUnit;
        }

    },

    /*
    *屏幕图层Y轴方向的坐标单位类型
    */
    get_yUnit: function() {
        ///<value type="SuperMap.Web.Realspace.ScreenCoordinateUnit">获取屏幕图层Y轴方向的坐标单位类型</value>
        if (this._innerScreenLayer3D == null) {
            return null;
        }
        return this._innerScreenLayer3D.yUnit;
    },

    set_yUnit: function(yUnit) {

        if (this._innerScreenLayer3D == null) {
            return null;
        }
        var n_yUnit = parseInt(yUnit);
        if (!isNaN(n_yUnit)) {
            this._innerScreenLayer3D.YUnit = n_yUnit;
        }

    },

    get_item: function(index) {
        ///<param name="index" type="String" type="Number"></param>
        ///<value type="SuperMap.Web.Core.Feature3D"></value>
        if (this._innerScreenLayer3D == null) {
            return null;
        }
        var nIndex = -1;
        if ((index != null) && !isNaN(index) && (index !== "")) {
            nIndex = index;
        }
        else if (typeof (index) == "string") {
            nIndex = this.indexOf(index);
        }
        if (nIndex < 0 || nIndex >= this._feature3Dlist.length) {
            return null;
        }
        var innerGeometry = this._innerScreenLayer3D.get_Item(nIndex);
        if (innerGeometry != null) {
            return this._feature3Dlist[nIndex];
        }

        return null;
    },

    set_item: function(index, feature3D) {
        if (this._innerScreenLayer3D == null) {
            return;
        }
        if (SuperMap.Web.Core.Feature3D.isInstanceOfType(feature3D)) {
           if (feature3D.get_geometry() == null) {
               return ;
           }
            var nIndex = null;
            if (typeof (index) == "string") {
                nIndex = this.indexOf(index);
            }
            else if ((index != null) && !isNaN(index) && (index !== "")) {
                nIndex = index;
            }
            if (nIndex >= 0 && nIndex < this.get_count()) {
                var innerGeometry = feature3D.get_geometry()._get_innerGeometry();
                if (innerGeometry == null) {
                    return;
                }
                this._innerScreenLayer3D.set_Item(nIndex,innerGeometry);
                this._feature3Dlist[nIndex] = feature3D;
            }
        }
    },

    add: function(feature3d, tag) {
        ///<param name="feature3D" type="SuperMap.Web.Core.Feature3D"></param>
        ///<param name="tag" type="String"></param>
        ///<returns type="Number" integer="true"></returns>
        if (this._innerScreenLayer3D == null) {
            return null;
        }
        if (SuperMap.Web.Core.Feature3D.isInstanceOfType(feature3d)) {
           if (feature3d.get_geometry() == null) {
               return null;
           }
            var innerGeometry = feature3d.get_geometry()._get_innerGeometry();
            if (innerGeometry == null) {
                return -1;
            }
            if (typeof (tag) != "string") {
                var count = this._innerScreenLayer3D.Count;
                tag = "Feature" + count.toString(10);
            }
            var index = this._innerScreenLayer3D.Add(innerGeometry, tag);
            if (index >= 0 && index == this._feature3Dlist.length) {
                var pos = this._isAlreadyHaveOne(feature3d);
                if (pos >= 0) {
                    var innergeometry = this._innerTrackingLayer3D.get_Item(pos);
                    var featurecopy = new SuperMap.Web.Core.Feature3D();
                    featurecopy._make(innergeometry);
                    this._feature3Dlist[pos] = null;
                    this._feature3Dlist[pos] = featurecopy;

                }
                this._feature3Dlist.push(feature3d);
                return index;
            }
        }
        return -1;
    },

    _isAlreadyHaveOne: function(feature3d) {
        var featureinlist = null;
        for (var i = 0; i < this._feature3Dlist.length; i++) {
            featureinlist = this._feature3Dlist[i];
            if (feature3d._get_innerFeature3D() == featureinlist._get_innerFeature3D()) {
                return i;
            }
        }
        return -1;
    },

    indexOf: function(tag) {
        ///<param name="tag" type="String"></param>
        ///<returns type="Number" integer="true"></returns>
        if (this._innerScreenLayer3D == null) {
            return null;
        }
        if (typeof (tag) == "string") {
            return this._innerScreenLayer3D.IndexOf(tag);
        }
        return -1;
    },

    removeAll: function() {
        ///<returns type="void"></returns>
        if (this._innerScreenLayer3D == null) {
            return null;
        }
        this._innerScreenLayer3D.RemoveAll();
        Array.clear(this._feature3Dlist);
    },

    removeAt: function(index) {
        ///<param name="index" type="Number" integer="true"></param>
        ///<returns type="Boolean"></returns>

        if (this._innerScreenLayer3D == null) {
            return null;
        }
        if ((index != null) && (!isNaN(index) || typeof (index) == "string")) {
            var feature3d = this.get_item(index);
            if (feature3d != null) {
                Array.remove(this._feature3Dlist, feature3d);
                return this._innerScreenLayer3D.RemoveAt(index);
            }

        }
        return false;

    },

    /*
    *获取几何对象的标签
    */
    getTag: function(index) {
        /// <summary>获取指定序号的几何对象的标签</summary>
        ///<param name="index" type="Number">几何对象序号</param>
        ///<returns type="String">返回几何对象的标签</returns>
        if (this._innerScreenLayer3D == null) {
            return null;
        }
        var n_index = parseInt(index);
        if (!isNaN(n_index)) {
            return this._innerScreenLayer3D.GetTag(n_index);
        }
        return null;

    },

    /*
    *设置几何对象的标签
    */
    setTag: function(index, tag) {

        /// <summary>设置指定序号的几何对象的标签</summary>
        ///<param name="index" type="Number">几何对象的序号</param>
        ///<param name="tag" type="String">几何对象的标签</param>
        if (this._innerScreenLayer3D == null) {

            return;
        }
        var n_index = parseInt(index);
        if (!isNaN(n_index)) {
            this._innerScreenLayer3D.SetTag(n_index, tag);
        }

    },


    /*
    *设置指定索引处的对象是否为选中状态。
    */
    setSelected: function(index, isSelected) {
        ///<param name="index" type="Number" type="String" integer="true">指定的索引</param> 
        ///<param name="isSelected" type="Boolean">是否为选中状态。</param> 
        ///<returns type="void"></returns>

        if (this._innerScreenLayer3D == null) {
            return;
        }
        if ((index != null) && (!isNaN(index) || typeof (index) == "string")) {
            this._innerScreenLayer3D.SetSelected(index, isSelected);
        }
    },

    isSelected: function(index) {
        ///<param name="index" type="Number" integer="true"></param>
        ///<returns type="Boolean"></returns>

        if (this._innerScreenLayer3D == null) {
            return null;
        }
        if ((index != null) && (!isNaN(index) || typeof (index) == "string")) {
            return this._innerScreenLayer3D.IsSelected(index);
        }
        return null;
    },
    
    refresh: function() 
    {

        if (this._innerScreenLayer3D == null) {
            return null;
        }

        this._innerScreenLayer3D.Refresh();
    },
    SetObjsVisibleInViewport:function(objectIds, bVisible,viewPortIndex) {
        ///<param name="objectIds" type="Array" elementType="Number" integer="true">对象Id数组</param>
        ///<param name="bVisible" type="Boolean">是否可见</param>
        ///<param name="viewPortIndex" type="Number">对应的视口</param>


        if (bVisible != null && viewPortIndex  != null ) {
            return this._innerScreenLayer3D.SetObjsVisibleInViewport(objectIds, bVisible,viewPortIndex);
        }

    },
//获得某个对象在指定视口的可见性

GetObjVisibleInViewport:function(objectId ,viewPortIndex) {
        ///<param name="objectIds" type="Array" elementType="Number" integer="true">对象Id数组</param>

        ///<param name="viewPortIndex" type="Number">对应的视口</param>

    if (this._innerScreenLayer3D == null) {

        return;
    }

    if (bVisible != null && viewPortIndex  != null ) {
        return  this._innerScreenLayer3D.GetObjVisibleInViewport(objectId, viewPortIndex);
    }

    }
};
SuperMap.Web.Realspace.ScreenLayer3D.registerClass('SuperMap.Web.Realspace.ScreenLayer3D', Sys.Component);
