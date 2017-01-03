//==========================================================================
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。
// 作者：			SuperMap WebClient Team
// 修改：
// 文件名：			SuperMap.Web.Realspace.Profile
// 功能：			  可视域分析类，设置可视域分析的各参数
// 最后修改时间：
//==========================================================================
Type.registerNamespace('SuperMap.Web.Realspace');

SuperMap.Web.Realspace.Profile = function() {

    SuperMap.Web.Realspace.Profile.initializeBase(this);
    this._innerProfile = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateProfile();
};


SuperMap.Web.Realspace.Profile.prototype ={
    /*
     *剖面线分析的起点
     */
    get_startPoint:function()
    {
        ///<value type="SuperMap.Web.Core.Point3D"></value>
        if(this._innerProfile != null)
        {
            var point =new SuperMap.Web.Core.Point3D();
            var pointInner =this._innerProfile.StartPoint;

            point.x =pointInner.X;
            point.y =pointInner.Y;
            point.z =pointInner.Z;
            return point;
        }
    },
    set_startPoint:function(pt3d)
    {
        ///<value type="void"></value>
        if(this._innerProfile != null)
        {
            var pointInner =this._innerProfile.StartPoint;

            pointInner.X =pt3d.x;
            pointInner.Y =pt3d.y;
            pointInner.Z =pt3d.z;
            this._innerProfile.StartPoint = pointInner;
        }
    },

    /*
     *剖面线分析的终点
     */
    get_endPoint:function()
    {
        ///<value type="SuperMap.Web.Core.Point3D"></value>
        if(this._innerProfile != null)
        {
            var point =new SuperMap.Web.Core.Point3D();
            var pointInner =this._innerProfile.EndPoint;

            point.x =pointInner.X;
            point.y =pointInner.Y;
            point.z =pointInner.Z;
            return point;
        }
    },
    set_endPoint:function(pt3d)
    {
        ///<value type="void"></value>
        if(this._innerProfile != null)
        {
            var pointInner =this._innerProfile.EndPoint;

            pointInner.X =pt3d.x;
            pointInner.Y =pt3d.y;
            pointInner.Z =pt3d.z;
            this._innerProfile.EndPoint = pointInner;
        }
    },

    /*
     *剖面分析时的高度。。。。默认值剖面图的宽高相等
     */
    get_extendHeight:function()
    {
        ///<value type="Number"></value>
        if(this._innerProfile != null)
        {
            return this._innerProfile.ExtendHeight;
        }
    },
    set_extendHeight:function(dExtendHeight){
        if(this._innerProfile != null){
            this._innerProfile.ExtendHeight = dExtendHeight;
        }
    },

    /*
     *返回剖面线纹理中左上角点对应的三维空间位置
     */
    getLeftTopPosition:function()
    {
        if(this._innerProfile != null)
        {
           var ptInner = this._innerProfile.GetLeftTopPosition();
            return SuperMap.Web.Core.Conversion._ConvertSRObject2Object(ptInner,"Point3D");
        }
    },
    /*
     *返回剖面线纹理中右下角点对应的三维空间位置
     */
    getRightBottomPosition:function()
    {
        if(this._innerProfile != null)
        {
            var ptInner = this._innerProfile.GetRightBottomPosition();
            return SuperMap.Web.Core.Conversion._ConvertSRObject2Object(ptInner,"Point3D");
        }
    },

    /*
     *得到剖面线纹理的BitMap
     */
    outputProfileToBitMap:function(strFilePath,imgeType)
    {
        if(this._innerProfile != null)
        {
            this._innerProfile.OutputProfileToBitMap(strFilePath,imgeType);
        }
    },

   /*
     *得到剖面线纹理的JPG
     */
    outputProfileToJPG:function()
    {
        if(this._innerProfile != null)
        {
          return this._innerProfile.OutputProfileToJPG();
        }
    },

    /*
     *Build方法：分析并显示结果
     */
    build:function()
    {
        if(this._innerProfile != null)
        {
            this._innerProfile.Build();
        }
    },
    /*
     *Clear方法：清除分析结果
     */
    clear:function()
    {
        if(this._innerProfile != null)
        {
            this._innerProfile.Clear();
        }
    }
 };
SuperMap.Web.Realspace.Profile.registerClass('SuperMap.Web.Realspace.Profile', Sys.Component, Sys.IDisposable);
