//==========================================================================
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。
// 作者：			SuperMap WebClient Team
// 修改：
// 文件名：			SuperMap.Web.Realspace.Sightline
// 功能：			  通视分析类，设置通视分析的各参数
// 最后修改时间：
//==========================================================================
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.Sightline = function() {

    SuperMap.Web.Realspace.Sightline.initializeBase(this);
    this._innerSightline = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateSightline();
};

SuperMap.Web.Realspace.Sightline.prototype ={
    /*
     *-ViewerPosition:通视分析的观察点
     */
    get_viewerPosition:function()
    {
        ///<value type="void"></value>
        if(this._innerSightline != null)
        {
            var point =new SuperMap.Web.Core.Point3D();
            var pointInner =this._innerSightline.ViewerPosition;

            point.x =pointInner.X;
            point.y =pointInner.Y;
            point.z =pointInner.Z;
            return point;
        }
    },
    set_viewerPosition:function(pt3d)
    {
        ///<value type="SuperMap.Web.Core.Point3D"></value>
        if(this._innerSightline != null)
        {
            var pointInner =this._innerSightline.ViewerPosition;

            pointInner.X =pt3d.x;
            pointInner.Y =pt3d.y;
            pointInner.Z =pt3d.z;
            this._innerSightline.ViewerPosition = pointInner;
        }
    },

    /*
     *VisibleColor:通视分析的可见线颜色
     */
    get_visibleColor:function()
    {
        ///<value type="void"></value>
        if(this._innerSightline != null)
        {
            var color =new SuperMap.Web.Core.Color();
            color.fromLongABGR(this._innerSightline.VisibleColor);
            return color;
        }
    },
    set_visibleColor:function(color)
    {
        ///<value type="SuperMap.Web.Core.Point3D"></value>
        if(this._innerSightline != null)
        {
            this._innerSightline.VisibleColor = color.toLongABGR();
        }
    },

    /*
     *HiddenColor:通视分析的不可见线颜色
     */
    get_hiddenColor:function()
    {
        ///<value type="void"></value>
        if(this._innerSightline != null)
        {
            var color =new SuperMap.Web.Core.Color();
            color.fromLongABGR(this._innerSightline.HiddenColor);
            return color;
        }
    },
    set_hiddenColor:function(color)
    {
        if(this._innerSightline != null)
        {
            this._innerSightline.HiddenColor = color.toLongABGR();
        }
    },

    /*
     *getVisibleResult:返回指定索引通视线的分析结果
     */
    getVisibleResult:function(index){
        if(this._innerSightline != null)
        {
            var result = this._innerSightline.GetSightlineResult(index);
            return new SuperMap.Web.Realspace.SightlineResult(result);
        }
    },

    /*
     *TargetPointCount属性:通视分析目标点个数
     */
    get_targetPointCount:function()
    {
        ///<return type="number" integer="true">目标点个数</return>
        if(this._innerSightline != null)
        {
            return this._innerSightline.TargetPointCount;
        }
    },

    /*
     *AddTargetPoint:通视分析添加目标点
     */
    addTargetPoint:function(pt3d)
    {
        ///<value type="Number"></value>
        if(this._innerSightline != null)
        {
            var ptInner = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(pt3d)
            return this._innerSightline.AddTargetPoint(ptInner);
        }
    },

    /*
     *GetTargetPoint:通视分析获取指定索引的目标点
     */
    getTargetPoint:function(index)
    {
        ///<value type="Number"></value>
        if(this._innerSightline != null)
        {
            var point =new SuperMap.Web.Core.Point3D();
            var pointInner = this._innerSightline.GetTargetPoint(index);
            point.x = pointInner.X;
            point.y = pointInner.Y;
            point.z = pointInner.Z;
            return point ;
        }
    },

    /*
     *SetTargetPoint:通视分析设置目标点
     */
    setTargetPoint:function(index,pt3d)
    {
        ///<value type="Number"></value>
        if(this._innerSightline != null)
        {
            var ptInner = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(pt3d);
            return this._innerSightline.SetTargetPoint(index,ptInner);
        }
    },

    /*
     *RemoveTargetPoint：通视分析移除指定索引目标点
     */
    removeTargetPoint:function(index)
    {
        ///<value type="Number"></value>
        if(this._innerSightline != null)
        {
            this._innerSightline.RemoveTargetPoint(index);
        }
    },

    /*
     *RemoveAllTargetPoints:通视分析移除所有目标点
     */
    removeAllTargetPoints:function()
    {
        if(this._innerSightline!=null)
        {
            this._innerSightline.RemoveAllTargetPoints;
        }
    },


    /*
     *Build方法：分析并显示结果
     */
    build:function()
    {
        if(this._innerSightline != null)
        {
            this._innerSightline.Build();
        }
    },
    /*
     *Clear方法：清除分析结果
     */
    clear:function()
    {
        if(this._innerSightline != null)
        {
            this._innerSightline.Clear();
        }
    },
    /*
     *分析基于的视口
     */
    get_inViewport: function () {
        /// <summary>获取基于的视口</summary>
        /// <returns type="Number"></returns>
        if (this._innerSightline != null) {
            return this._innerSightline.InViewport;
        }
    },
    set_inViewport: function (value) {
        /// <summary>设置视口的索引</summary>
        ///<param name="value" type="Number"></param>
        if (this._innerSightline != null) {
            this._innerSightline.InViewport = value;
        }
    }
};
SuperMap.Web.Realspace.Sightline.registerClass('SuperMap.Web.Realspace.Sightline', Sys.Component, Sys.IDisposable);

SuperMap.Web.Realspace.SightlineResult = function(visibleResult) {
    this._visibleResult = visibleResult;

    //SuperMap.Web.Realspace.SightlineResult.initializeBase(this);
    //this._innerSightlineResult = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateSightlineResult();
};


SuperMap.Web.Realspace.SightlineResult.prototype ={
    /*
     *-ViewerPosition:通视分析的观察点
     */
    get_viewerPosition:function()
    {
        ///<value type="void"></value>
        if(this._visibleResult != null)
        {
            var point =new SuperMap.Web.Core.Point3D();
            var pointInner =this._visibleResult.ViewerPosition;

            point.x =pointInner.X;
            point.y =pointInner.Y;
            point.z =pointInner.Z;
            return point;
        }
    },
    /*
     *TargetPoint;:通视分析的观察点
     */
    get_targetPoint:function()
    {
        ///<value type="void"></value>
        if(this._visibleResult != null)
        {
            var point =new SuperMap.Web.Core.Point3D();
            var pointInner =this._visibleResult.TargetPoint;

            point.x =pointInner.X;
            point.y =pointInner.Y;
            point.z =pointInner.Z;
            return point;
        }
    },

    /*
     *-BarrierPoint;:通视分析的观察点
     */
    get_barrierPoint:function()
    {
        ///<value type="void"></value>
        if(this._visibleResult != null)
        {
            var point =new SuperMap.Web.Core.Point3D();
            var pointInner =this._visibleResult.BarrierPoint;

            point.x =pointInner.X;
            point.y =pointInner.Y;
            point.z =pointInner.Z;
            return point;
        }
    },
    /*
     *-Visible;:通视分析的观察点
     */
    get_isVisible:function()
    {
        ///<value type="void"></value>
        if(this._visibleResult != null)
        {
            return this._visibleResult.Visible;
        }
    }
};
SuperMap.Web.Realspace.SightlineResult.registerClass('SuperMap.Web.Realspace.SightlineResult', Sys.Component, Sys.IDisposable);
