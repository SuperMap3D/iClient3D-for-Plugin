//==========================================================================
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。
// 作者：			SuperMap WebClient Team
// 修改：
// 文件名：			SuperMap.Web.Realspace.Skyline
// 功能：			  天际线分析类，设置天际线分析的各参数
// 最后修改时间：
//==========================================================================
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.Skyline = function() {
    SuperMap.Web.Realspace.Skyline.initializeBase(this);
    this._innerSkyline = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateSkyline();
};


SuperMap.Web.Realspace.Skyline.prototype ={
    /*
     *ViewerPosition:天际线分析的观察点
     */
    get_viewerPosition:function()
    {
        ///<value type="void"></value>
        if(this._innerSkyline != null)
        {
            var point =new SuperMap.Web.Core.Point3D();
            var pointInner =this._innerSkyline.ViewerPosition;

            point.x =pointInner.X;
            point.y =pointInner.Y;
            point.z =pointInner.Z;
            return point;
        }
    },
    set_viewerPosition:function(pt3d)
    {
        ///<value type="SuperMap.Web.Core.Point3D"></value>
        if(this._innerSkyline != null)
        {
            var pointInner =this._innerSkyline.ViewerPosition;

            pointInner.X =pt3d.x;
            pointInner.Y =pt3d.y;
            pointInner.Z =pt3d.z;
            this._innerSkyline.ViewerPosition = pointInner;
        }
    },

    /*
    *Color属性：天际线颜色
     */
    get_color:function()
    {
        if(this._innerSkyline != null)
        {
            var color = new SuperMap.Web.Core.Color();
            color.fromLongABGR(this._innerSkyline.Color);
            return color;
        }
    },
    set_color:function(value)
    {
        if(this._innerSkyline != null)
        {
            this._innerSkyline.Color = value.toLongABGR();
        }
    },

    /*
     *Direction属性:天际线分析视点的方向角
     */
    get_direction:function()
    {
        ///<value  type="Number"></value>
        if(this._innerSkyline != null)
        {
            return this._innerSkyline.Direction;
        }
    },
    set_direction:function(value)
    {
        ///<value type="void"></value>
        if(this._innerSkyline != null)
        {
            this._innerSkyline.Direction = value;
        }
    },

    /*
     *Pitch属性:天际线分析视点的俯仰角
     */
    get_pitch:function()
    {
        ///<value type="Number"></value>
        if(this._innerSkyline != null)
        {
            return this._innerSkyline.Pitch;
        }
    },
    set_pitch:function(value)
    {
        ///<value type="void"></value>
        if(this._innerSkyline != null)
        {
            this._innerSkyline.Pitch = value;
        }
    },

    /*
     *Quality属性:天际线的分析质量
     */
    get_quality:function()
    {
        ///<value  type="Number"></value>
        if(this._innerSkyline != null)
        {
            return this._innerSkyline.Quality;
        }
    },
    set_quality:function(value)
    {
        ///<value type="void"></value>
        if(this._innerSkyline != null)
        {
            this._innerSkyline.Quality = value;
        }
    },


    /*
     *DisplayStyle:天际线的显示模式
     */
    get_displayStyle:function()
    {
        ///<value  type="Number"></value>
        if(this._innerSkyline != null)
        {
            return this._innerSkyline.DisplayStyle;
        }
    },
    set_displayStyle:function(value)
    {
        ///<value type="void"></value>
        if(this._innerSkyline != null)
        {
            this._innerSkyline.DisplayStyle = value;
        }
    },
    /*
     *AddLimitBody:天际线分析添加限高对象
     */
    addLimitBody:function(feature3d)
    {
        ///<value type="Number"></value>
        if(this._innerSkyline == null)
        {
            /*var regInner = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(region3D);
            return this._innerSkyline.AddLimitBody(regInner);*/
            return;
        }

        if (SuperMap.Web.Core.Feature3D.isInstanceOfType(feature3d)) {
            if (feature3d.get_geometry() == null) {
                return null;
            }
            var innerGeometry = feature3d.get_geometry()._get_innerGeometry();
            if (innerGeometry == null) {
                return;
            }
            this._innerSkyline.AddLimitBody(innerGeometry);
        }
    },

    /*
     *GetLimitBody:天际线分析获取限高对象
     */
    getLimitBody:function(index)
    {
        ///<value type="Number"></value>
        if(this._innerSkyline != null)
        {
            var  regInner = this._innerSkyline.GetLimitBody(index);
            var geoRegion3d = SuperMap.Web.Core.Conversion._CreateObjectBySRObject(regInner,"Geometry");
            return geoRegion3d;
        }
    },

    /*
     *setLimitBody:设置指定索引的限高体区域
     */
    setLimitBody:function( index, geoRegion)
    {
        ///<value type="Number"></value>
        if(this._innerSkyline != null)
        {
            var geoRegion3d = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(geoRegion);
            this._innerSkyline.SetLimitBody(index,geoRegion3d);
        }
    },

    /*
     *LocateToViewerPosition:相机定位到观察者的位置
     */
    locateToViewerPosition:function()
    {
        ///<value type="Number"></value>
        if(this._innerSkyline != null)
        {
            this._innerSkyline.LocateToViewerPosition();
        }
    },

    /*
     *GetLimitModel:返回指定索引值的限制体的顶点，法线和索引的网格数据
     */
    getLimitModel:function(index)
    {
        ///<value type="Number"></value>
        if(this._innerSkyline != null)
        {
           var model =  this._innerSkyline.GetLimitModel(index);
            return SuperMap.Web.Core.Conversion._CreateObjectBySRObject(model,"Geometry");
        }
    },

    /*
     *GetSkyline:获取天际线
     */
    getSkyline:function()
    {
        ///<value type="Number"></value>
        if(this._innerSkyline != null)
        {
            var lineInner = this._innerSkyline.GetSkyline();
            return SuperMap.Web.Core.Conversion._ConvertSRObject2Object(lineInner,"GeoLine3D");
        }
    },

    /*
    *GetLimitBodyCount:获取限高体的个数
     */
    getLimitBodyCount:function()
    {
        if(this._innerSkyline != null)
        {
            return this._innerSkyline.GetLimitBodyCount();
        }
    },

    /*
     *RemoveLimitBody:天际线分析移除指定索引限高对象
     */
    removeLimitBody:function(index)
    {
        ///<value type="Number"></value>
        if(this._innerSkyline != null)
        {
            return this._innerSkyline.RemoveLimitBody(index);
        }
    },

    /*
     *RemoveAllLimitBodies：天际线分析移除所有限高对象
     */
    removeAllLimitBodies:function()
    {
        ///<value type="Number"></value>
        if(this._innerSkyline != null)
        {
            this._innerSkyline.RemoveAllLimitBodies();
        }
    },

    /*
     *Build方法：分析并显示结果
     */
    build:function()
    {
        if(this._innerSkyline != null)
        {
            this._innerSkyline.Build();
        }
    },
    /*
     *Clear方法：清除分析结果
     */
    clear:function()
    {
        if(this._innerSkyline != null)
        {
            this._innerSkyline.Clear();
        }
    },
    /*
     *分析基于的视口
     */
    get_inViewport: function () {
        /// <summary>获取基于的视口</summary>
        /// <returns type="Number"></returns>
        if (this._innerSkyline != null) {
            return this._innerSkyline.InViewport;
        }
    },
    set_inViewport: function (value) {
        /// <summary>设置视口的索引</summary>
        ///<param name="value" type="Number"></param>
        if (this._innerSkyline != null) {
            this._innerSkyline.InViewport = value;
        }
    }
};
SuperMap.Web.Realspace.Skyline.registerClass('SuperMap.Web.Realspace.Skyline', Sys.Component, Sys.IDisposable);
