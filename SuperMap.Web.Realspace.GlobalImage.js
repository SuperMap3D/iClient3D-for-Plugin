//==========================================================================
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。
// 作者：			SuperMap WebClient Team
// 修改：
// 文件名：			SuperMap.Web.Realspace.GlobalImage
// 功能：			 全球底图类
// 最后修改时间：
//==========================================================================
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.GlobalImage = function()
{
	/// <summary>全球底图对象</summary>
	SuperMap.Web.Realspace.GlobalImage.initializeBase(this);
	this._innerGlobalImage =  null;
};

SuperMap.Web.Realspace.GlobalImage.prototype = {

	dispose: function() {
     ///<returns type="void">析构函数</returns>
     this._innerGlobalImage = null;
    },

    /*
    *透明度范围 [0,1]，0代表不透明，1代表全透明
     */
    get_transparency: function()
    {
        /// <summary>获取透明度</summary>
        ///<value type="number"></value>
        if ((this._innerGlobalImage == null))
        {
            return;
        }
        return this._innerGlobalImage.Transparency;
    },
    set_transparency: function(transparency)
    {
        if ((this._innerGlobalImage == null))
        {
            return;
        }
        if((transparency<=1)&&(transparency>=0))
        {
            this._innerGlobalImage.Transparency =(1- transparency);
        }
    },

    get_excavationRegionCount: function()
    {
        ///<summary>获取开挖区域个数</summary>
        ///<value type="Number" integer="true">开挖区域个数</value>
        if ((this._innerGlobalImage == null))
        {
            return;
        }
        return this._innerGlobalImage.ExcavationRegionCount;
    },

    /*
     *SwipeRegion属性
     */
    get_swipeRegion: function()
    {
        ///<value type="SuperMap.Bounds">返回卷帘范围</value>
        if (this._innerGlobalImage != null )
        {
            var area = this._innerGlobalImage.SwipeRegion;
            return new SuperMap.Bounds(area.Left, area.Bottom, area.Right, area.Top);
        }
    },
    set_swipeRegion: function(rec2d)
    {
        ///<summary>设置卷帘范围</summary>
        ///<param name="rec2d" type="SuperMap.Bounds">卷帘范围</param>
        if (this._innerGlobalImage != null) {
            var recInner = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(rec2d);
            this._innerGlobalImage.SwipeRegion = recInner;
        }
    },
		 /*
		*是否开启卷帘效果
		*/
		get_swipeEnabled: function() {
		    ///<value type="Boolean">返回图层是否开启卷帘效果</value>
		    if (this._innerGlobalImage != null) {
		        return this._innerGlobalImage.SwipeEnabled;
		    }
		},

		set_swipeEnabled: function(isswipeEnabled) {
		    ///<summary>设置图层是否开启卷帘</summary>
		    if (this._innerGlobalImage != null) {
		        this._innerGlobalImage.SwipeEnabled = isswipeEnabled;
		    }

		},

		/*
		*可见性控制
		*/
		get_isVisible: function() {
				///<returns type="Boolean">返回图层是否可见</value>
				if (this._innerGlobalImage != null) {
						return this._innerGlobalImage.Visible;
				}
		},

		set_isVisible: function(visible) {
				///<param name="visible" type="Boolean"></param>
				if (this._innerGlobalImage != null) {
						this._innerGlobalImage.Visible = visible;
				}
		},


		addExcavationRegion: function(region3D, tag)
    {
        ///<summary>设置渲染到模板缓存的数据(用于地下开挖)</summary>
        ///<param name="region3D" type="SuperMap.Web.Core.GeoRegion3D"></param>
        ///<param name="tag" type="String"></param>
        ///<returns type="Number" integer="true">索引</returns>
        if ((this._innerGlobalImage == null))
        {
            return;
        }
		if(SuperMap.Web.Core.GeoModel.isInstanceOfType(region3D)){
			return this._innerGlobalImage.AddExcavationModel(region3D._innerGeometry,tag);
		}
        return this._innerGlobalImage.AddExcavationRegion(region3D._innerGeometry,tag);
    },

    clearExcavationRegions: function()
    {
        ///<summary>删除渲染到模板缓存的数据</summary>
        if ((this._innerGlobalImage == null))
        {
            return;
        }
        return this._innerGlobalImage.ClearExcavationRegions();
    },

    getExcavationRegion: function(index)
    {
        ///<summary>获得指定开挖区域</summary>
        ///<param name="index" type="Number" integer="true">索引</param>
        ///<returns type="SuperMap.Web.Core.GeoRegion3D">开挖区域</returns>
        if ((this._innerGlobalImage == null))
        {
            return;
        }
        var innerRegion3d = this._innerGlobalImage.GetExcavationRegion(index);
        return SuperMap.Web.Core.Conversion._CreateObjectBySRObject(innerRegion3d,"Geometry");
    },

    getExcavationRegionTag: function(index)
    {
        ///<summary>获得指定开挖区域的标签</summary>
        ///<param name="index" type="Number" integer="true">索引</param>
        ///<returns type="String">标签</returns>
        if ((this._innerGlobalImage == null))
        {
            return;
        }
        return this._innerGlobalImage.GetExcavationRegionTag(index);
    },

    indexOfExcavationRegion: function(tag)
    {
        ///<summary>获得指定开挖区域的索引</summary>
        ///<param name="tag" type="String" >标签</param>
        ///<returns type="Number" integer="true">索引</returns>
        if ((this._innerGlobalImage == null))
        {
            return;
        }
        return this._innerGlobalImage.IndexOfExcavationRegion(tag);
    },

    removeExcavationRegion: function(index)
    {
        ///<summary>删除指定的开挖区域</summary>
        ///<param name="index" type="Number" integer="true">索引</param>
        ///<returns type="Boolean">是否成功</returns>
        if ((this._innerGlobalImage == null))
        {
            return;
        }
        return this._innerGlobalImage.RemoveExcavationRegion(index);
    },

    setExcavationRegionTag: function(index, tag)
    {
        ///<summary>设置指定开挖区域的标签</summary>
        ///<param name="index" type="Number" integer="true">索引</param>
        ///<param name="tag" type="String" >标签</param>
        ///<returns type="Boolean">是否成功</returns>
        if ((this._innerGlobalImage == null))
        {
            return;
        }
        return this._innerGlobalImage.SetExcavationRegionTag(index, tag);
    }
};
SuperMap.Web.Realspace.GlobalImage.registerClass('SuperMap.Web.Realspace.GlobalImage', Sys.Component, Sys.IDisposable);
