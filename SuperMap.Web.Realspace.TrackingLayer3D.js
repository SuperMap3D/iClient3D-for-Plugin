//========================================================================== 
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.Realspace.TrackingLayer3D.js
// 功能：			 三维屏幕图层类
// 最后修改时间：	
//========================================================================== 
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.TrackingLayer3D = function (scenecontrol)
{	
	/// <summary>3D跟踪图层对象</summary>
	
  	SuperMap.Web.Realspace.TrackingLayer3D.initializeBase(this);

  	this._innerTrackingLayer3D = scenecontrol._get_innerSceneControl().Scene.TrackingLayer3D;
    this._feature3Dlist = [];

};

SuperMap.Web.Realspace.TrackingLayer3D.prototype = {

    dispose: function() {
        ///<returns type="void">析构函数</returns>
        this._innerTrackingLayer3D = null;
        Array.clear(this._feature3Dlist);
        this._feature3Dlist = [];
    },

    /*
    *图层可见性属性
    */
    get_isVisible: function() {
        ///<value type="Boolean">返回图层是否可见</value>
        if (this._innerTrackingLayer3D == null) {
            return null;
        }
        return this._innerTrackingLayer3D.IsVisible;
    },

    set_isVisible: function(isVisible) {
        ///<summary>设置图层可见性</summary>
        if (this._innerTrackingLayer3D == null) {
            return null;
        }

        this._innerTrackingLayer3D.IsVisible = isVisible;
    },

    /*
     *图层可选择性属性
     */
	 /*底层未实现暂不对外开放*/
    get_isSelectable: function() {
        ///<value type="Boolean">返回图层是否可选择</value>
        if (this._innerTrackingLayer3D == null) {
            return null;
        }
        return this._innerTrackingLayer3D.IsSelectable;
    },

    set_isSelectable: function(isSelectable) {
        ///<summary>设置图层可见性</summary>
        if (this._innerTrackingLayer3D == null) {
            return null;
        }

        this._innerTrackingLayer3D.IsSelectable= isSelectable;
    },


    /*
     *图层可编辑性属性
     */
    get_isEditable: function() {
        ///<value type="Boolean">返回图层是否可编辑</value>
        if (this._innerTrackingLayer3D == null) {
            return null;
        }
        return this._innerTrackingLayer3D.IsEditable;
    },

    set_isEditable: function(isEditable) {
        ///<summary>设置图层可见性</summary>
        if (this._innerTrackingLayer3D == null) {
            return null;
        }

        this._innerTrackingLayer3D.IsEditable= isEditable;
    },


    /*
    *几何对象的数量
    */
    get_count: function() {
        ///<value type="Number" integer="true">几何对象的数量</value>
        return this._feature3Dlist.length;
    },

    get_item: function(index) {
        ///<param name="index" type="String" type="Number"></param>
        ///<value type="SuperMap.Web.Core.Feature3D"></value>

        if (this._innerTrackingLayer3D == null) {
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

        return this._feature3Dlist[nIndex];
    },

    set_item: function(index, feature3D) {

        if (this._innerTrackingLayer3D == null) {
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
            // 这里不必像add一样再做处理，因为是替换就应该保持队列中的feature3d也被对应替换，
            // 其实应该是直接替换feature3d中的geometry就可以了，但是在这个体系里，牢记加进去的其实只是geometry。
            if (nIndex >= 0 && nIndex < this.get_count()) {
                var innerGeometry = feature3D.get_geometry()._get_innerGeometry();
                if (innerGeometry == null) {
                    return;
                }
                this._innerTrackingLayer3D.set_Item(nIndex,innerGeometry);
                this._feature3Dlist[nIndex] = feature3D;
                feature3D._innerTrackingLayer3D = this._innerTrackingLayer3D;
                feature3D._nIndex = nIndex;
            }
        }
    },

    add: function(feature3d, tag) {
        ///<param name="feature3D" type="SuperMap.Web.Core.Feature3D"></param>
        ///<param name="tag" type="String"></param>
        ///<returns type="Number" integer="true"></returns>
        if (this._innerTrackingLayer3D == null) {
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
            if (typeof (tag) != "string") {
                var count = this._innerTrackingLayer3D.Count;
                tag = "Feature" + count.toString(10);
            }
            var index = this._innerTrackingLayer3D.Add(innerGeometry, tag);
            feature3d._innerTrackingLayer3D = this._innerTrackingLayer3D;
            feature3d.set_name(tag);
			feature3d._nIndex = index;
            if (index >= 0 && index == this._feature3Dlist.length) {
                var pos = this._isAlreadyHaveOne(feature3d);
                if (pos >= 0) {
                    var innergeometry = this._innerTrackingLayer3D.get_Item(pos);
                    var featurecopy = new SuperMap.Web.Core.Feature3D();
                    featurecopy._make(innergeometry);
                    this._feature3Dlist[pos] = null;
                    this._feature3Dlist[pos] = feature3d;

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
        if (this._innerTrackingLayer3D == null) {
            return null;
        }
        if (typeof (tag) == "string") {
            return this._innerTrackingLayer3D.IndexOf(tag);
        }
        return -1;
    },

    removeAll: function() {
        ///<returns type="void"></returns>
        if (this._innerTrackingLayer3D == null) {
            return null;
        }
        this._innerTrackingLayer3D.RemoveAll();
        Array.clear(this._feature3Dlist);
    },

    removeAt: function(index) {
        ///<param name="index" type="Number" integer="true"></param>
        ///<returns type="Boolean"></returns>
        if (this._innerTrackingLayer3D == null) {
            return null;
        }
        if ((index != null) && (!isNaN(index) || typeof (index) == "string")) {
            var feature3d = this.get_item(index);
            if (feature3d != null) {
                Array.remove(this._feature3Dlist, feature3d);
                return this._innerTrackingLayer3D.RemoveAt(index);
            }

        }
        return false;

    },

    /*
    *获取几何对象的标签
    */
    getTag: function(index) {
        /// <summary>获取指定序号的几何对象的标签</summary>
        ///<param name="index" type="Number" integer="true">几何对象序号</param>
        ///<returns type="String">返回几何对象的标签</returns>
        if (this._innerTrackingLayer3D == null) {
            return null;
        }
        var n_index = parseInt(index);
        if (!isNaN(n_index)) {
            return this._innerTrackingLayer3D.GetTag(n_index);
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
        ///<returns type="void"></returns>

        if (this._innerTrackingLayer3D == null) {
            return;
        }
        var n_index = parseInt(index);
        if (!isNaN(n_index)) {
            this._innerTrackingLayer3D.SetTag(n_index, tag);
        }



    },
    
    
    refresh: function() 
    {

        if (this._innerTrackingLayer3D == null) {
            return null;
        }

        this._innerTrackingLayer3D.Refresh();
    },
    
    hitTest: function(hitPoint) 
    {
		///<param name="hitPoint" type="SuperMap.Web.Core.Point"></param>
        ///<returns type="SuperMap.Web.Core.Feature3D"></returns>
        if (this._innerTrackingLayer3D == null) {
            return null;
        }
        if(SuperMap.Pixel.isInstanceOfType(hitPoint))
        {
            var pnt = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(hitPoint);
            var id = this._innerTrackingLayer3D.HitTest(pnt);
            
            if(id < 0)
            {
                 return null;
            }
            
            return this._feature3Dlist[id];
        }
    }


};
SuperMap.Web.Realspace.TrackingLayer3D.registerClass('SuperMap.Web.Realspace.TrackingLayer3D', Sys.Component);
