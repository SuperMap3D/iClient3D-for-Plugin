//==========================================================================
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。
// 作者：			SuperMap WebClient Team
// 修改：
// 文件名：			SuperMap.Web.Realspace.ViewShed3D
// 功能：			  可视域分析类，设置可视域分析的各参数
// 最后修改时间：
//==========================================================================
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.ViewShed3D = function() {

    SuperMap.Web.Realspace.ViewShed3D.initializeBase(this);
    this._innerViewShew3D = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateViewShed3D();
};


SuperMap.Web.Realspace.ViewShed3D.prototype ={
     /*
     *visibleAreaColor属性：分析结果的可见区域颜色
     */
    get_visibleAreaColor:function()
    {
        ///<value type="SuperMap.Web.Core.Color"></value>
        if(this._innerViewShew3D != null)
        {
            var color = new SuperMap.Web.Core.Color();
            color.fromLongABGR(this._innerViewShew3D.VisibleAreaColor);
            return color;
        }
    },
    set_visibleAreaColor:function(color)
    {
        if(this._innerViewShew3D != null)
        {
            this._innerViewShew3D.VisibleAreaColor = color.toLongABGR();
        }
    },

    /*
     *HiddenAreaColor属性:分析结果中的不可见区域颜色
     */
    get_hiddenAreaColor:function()
    {
        ///<value type="SuperMap.Web.Core.Color"></value>
        if(this._innerViewShew3D != null)
        {
            var color =new SuperMap.Web.Core.Color();
            color.fromLongABGR(this._innerViewShew3D.HiddenAreaColor);
            return color;
        }
    },
    set_hiddenAreaColor:function(color)
    {
        ///<value type="void"></value>
        if(this._innerViewShew3D != null)
        {
            this._innerViewShew3D.HiddenAreaColor = color.toLongABGR();
        }
    },

    /*
     *ViewerPosition:可视域分析的观察点
     */
    get_viewerPosition:function()
    {
        ///<value type="SuperMap.Web.Core.Point3D"></value>
        if(this._innerViewShew3D != null)
        {
            var point =new SuperMap.Web.Core.Point3D();
            var pointInner =this._innerViewShew3D.ViewerPosition;

            point.x =pointInner.X;
            point.y =pointInner.Y;
            point.z =pointInner.Z;
            return point;
        }
    },
    set_viewerPosition:function(pt3d)
    {
        ///<value type="void"></value>
        if(this._innerViewShew3D != null)
        {
            var pointInner =this._innerViewShew3D.ViewerPosition;

            pointInner.X =pt3d.x;
            pointInner.Y =pt3d.y;
            pointInner.Z =pt3d.z;
            this._innerViewShew3D.ViewerPosition = pointInner;
        }
    },

    /*
     *Quality属性:分析质量
     */
    get_quality:function()
    {
        ///<value  type="Number"></value>
        if(this._innerViewShew3D != null)
        {
            return this._innerViewShew3D.Quality;
        }
    },
    set_quality:function(value)
    {
        ///<value type="void"></value>
        if(this._innerViewShew3D != null)
        {
            this._innerViewShew3D.Quality = value;
        }
    },

    /*
     *HintLineColor:分析结果中的不可见区域颜色
     */
    get_hintLineColor:function()
    {
        ///<value type="SuperMap.Web.Core.Color"></value>
        if(this._innerViewShew3D != null)
        {
            var color =new SuperMap.Web.Core.Color();
            color.fromLongABGR(this._innerViewShew3D.HintLineColor());
            return color;
        }
    },
    set_hintLineColor:function(color)
    {
        ///<value type="void"></value>
        if(this._innerViewShew3D != null)
        {
            this._innerViewShew3D.HintLineColor = color.toLongABGR();
        }
    },

    /*
    *set_targetPoint:通过目标点计算距离、方向(设置距离、方向的一种辅助手段)
     */
    set_targetPoint:function(pt3d)
    {
        if(this._innerViewShew3D != null)
        {
            var ptInner = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(pt3d);
            this._innerViewShew3D.SetDistDirByPoint(ptInner);
        }
    },
    /*
     *Direction属性:可视域分析视域的方向角
     */
    get_direction:function()
    {
        ///<value  type="Number"></value>
        if(this._innerViewShew3D != null)
        {
            return this._innerViewShew3D.Direction;
        }
    },
    set_direction:function(value)
    {
        ///<value type="void"></value>
        if(this._innerViewShew3D != null)
        {
            this._innerViewShew3D.Direction = value;
        }
    },

    /*
     *Pitch属性:可视域分析视域的俯仰角
     */
    get_pitch:function()
    {
        ///<value type="Number"></value>
        if(this._innerViewShew3D != null)
        {
            return this._innerViewShew3D.Pitch;
        }
    },
    set_pitch:function(value)
    {
        ///<value type="void"></value>
        if(this._innerViewShew3D != null)
        {
            this._innerViewShew3D.Pitch = value;
        }
    },

    /*
     *HorizontalFov属性:可视域分析视域的水平夹角
     */
    get_horizontalFov:function()
    {
        ///<value type="Number"></value>
        if(this._innerViewShew3D != null)
        {
            return this._innerViewShew3D.HorizontalFov;
        }
    },
    set_horizontalFov:function(value)
    {
        ///<value type="void"></value>
        if(this._innerViewShew3D != null)
        {
            this._innerViewShew3D.HorizontalFov = value;
        }
    },

    /*
     *VerticalFov属性:可视域分析视域的垂直夹角
     */
    get_verticalFov:function()
    {
        ///<value type="Number"></value>
        if(this._innerViewShew3D != null)
        {
            return this._innerViewShew3D.VerticalFov;
        }
    },
    set_verticalFov:function(value)
    {
        ///<value type="Number"></value>
        if(this._innerViewShew3D != null)
        {
            this._innerViewShew3D.VerticalFov = value;
        }
    },

    /*
     *Distance属性：可视域分析视域的半径距离
     */
    get_distance:function()
    {
        ///<value type="Number"></value>
        if(this._innerViewShew3D != null)
        {
            return this._innerViewShew3D.Distance;
        }
    },

    /*
    *setTargetPoint:通过目标点计算距离、方向(设置距离、方向的一种辅助手段
     */
    setTargetPoint:function(pt3d)
    {
        var ptInner = SuperMap.Web.Conversion._ConvertObject2SRObject(pt3d);
        if(this._innerViewShew3D != null){
            this._innerViewShew3D.SetDistDirByPoint(ptInner);
        }
    },

    set_distance:function(value)
    {
        ///<value type="void"></value>
        if(this._innerViewShew3D != null)
        {
            this._innerViewShew3D.Distance =value;
        }
    },

    setDistDirByPoint:function(pt)
    {
        if(this._innerViewShew3D != null && SuperMap.Web.Core.Point3D.isInstanceOfType(pt)){
            var ptInner = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(pt);
            this._innerViewShew3D.SetDistDirByPoint(ptInner);
        }
    },

    /*
     *Build方法：分析并显示结果
     */
    build:function()
    {
        if(this._innerViewShew3D != null)
        {
            this._innerViewShew3D.Build();
        }
    },
    /*
     *Clear方法：清除分析结果
     */
    clear:function()
    {
        if(this._innerViewShew3D != null)
        {
            this._innerViewShew3D.Clear();
        }
    },
    /*
     *分析基于的视口
     */
    get_inViewport: function () {
        /// <summary>获取基于的视口</summary>
        /// <returns type="Number"></returns>
        if (this._innerViewShew3D != null) {
            return this._innerViewShew3D.InViewport;
        }
    },
    set_inViewport: function (value) {
        /// <summary>设置视口的索引</summary>
        ///<param name="value" type="Number"></param>
        if (this._innerViewShew3D != null) {
            this._innerViewShew3D.InViewport = value;
        }
    }
 };
SuperMap.Web.Realspace.ViewShed3D.registerClass('SuperMap.Web.Realspace.ViewShed3D', Sys.Component, Sys.IDisposable);
