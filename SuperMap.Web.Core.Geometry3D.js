//==========================================================================
// SuperMap Realspace客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。
// 作者：			SuperMap WebClient Team
// 修改：
// 文件名：			SuperMap.Web.Core.Geometry3D.js
// 功能：			三维集几何对象类库
// 最后修改时间：
//==========================================================================
Type.registerNamespace('SuperMap.Web.Core');

/**
* 类名 : Geometry3D
* 描   述： 三维几何对象基类
* 版 本 号：
*/
SuperMap.Web.Core.Geometry3D = function() {

	SuperMap.Web.Core.Geometry3D.initializeBase(this);

//Com对象,子类需create出Geometry的com实例
    this._innerGeometry = null;

};
SuperMap.Web.Core.Geometry3D.prototype = {

    dispose: function() {
        ///<returns type="void">析构函数</returns>
        this._innerGeometry = null;
    },


    /*
    *设置和获取com对象，不对外开放
    */
    _get_innerGeometry: function() {
        if (/**/ this._innerGeometry == null) {
            return null;
        }
        return this._innerGeometry;
    },

    _set_innerGeometry: function(innerGeometry) {
        if (innerGeometry == null) {
            this._innerGeometry = null;
            return;
        }
        if (innerGeometry.Type) {
            if (this._innerGeometry) {
                this._innerGeometry.SetEmpty();
                this._innerGeometry = null;
            }
            this._innerGeometry = innerGeometry;
        }
    },

    /*
    *返回几何对象的类型
     */
    get_type:function(){
      if(this._innerGeometry != null){
           return this._innerGeometry.Type;
      }
    },
    /*
    *获得三维几何对象最小外接矩形，是二维矩形，区别于三维的包围盒
    */
    get_bounds: function() {
        ///<value type="SuperMap.Web.Core.Rectangle2D"></value>
        if ( this._innerGeometry == null) {
            return null;
        }
        var bounds = this._innerGeometry.Bounds;
        return SuperMap.Web.Core.Conversion._ConvertSRObject2Object(bounds,"Rectangle2D");
    },

    /*
    *获得三维几何对象最小外接包围盒，是三维的长方体，区别于二维矩形
    */
    get_boundingBox: function() {
        ///<value type="SuperMap.Web.Core.BoundingBox"></value>
        if ( this._innerGeometry == null) {
            return null;
        }
        var boundingBox = this._innerGeometry.BoundingBox;
        return SuperMap.Web.Core.Conversion._CreateObjectBySRObject(boundingBox,"BoundingBox");
    },

    /*
    *获得三维几何对象二维内点，对于不同类型的几何对象，ugc内点的获取方式不一样
    *例如geoline3D，就是获取最长的子对象的中间的点(中间个数的点, 而不是中间距离的点)
    */
    get_innerPoint: function() {
        ///<value type="SuperMap.Web.Core.Point2D"></value>
        if ( this._innerGeometry == null) {
            return null;
        }
        var innerPoint = this._innerGeometry.InnerPoint;
        return SuperMap.Web.Core.Conversion._ConvertSRObject2Object(innerPoint,"Point2D");
    },

    /*
    *获得三维几何对象三维内点，对于不同类型的几何对象，ugc内点的获取方式不一样
    *例如geoline3D，就是获取最长的子对象的中间的点(中间个数的点, 而不是中间距离的点)
    */
    get_innerPoint3D: function() {
        ///<value type="SuperMap.Web.Core.Point3D"></value>
        if ( this._innerGeometry == null) {
            return null;
        }
        var innerPoint3D = this._innerGeometry.InnerPoint3D;
        return SuperMap.Web.Core.Conversion._ConvertSRObject2Object(innerPoint3D,"Point3D");
    },

    /*
    *几何对象是否为空，即对象里面是否有数据
    */
    isEmpty: function() {
        ///<returns type="Boolean"></returns>
        if ( this._innerGeometry == null) {
            return null;
        }
        return this._innerGeometry.IsEmpty;
    },

    /*
    *几何对象是否有效，例如对于Geoline3D如果只有一个点就为无效的Geoline3D，区别于isEmpty
    *对于GeoReion3D，如果三点在一条直线上也是无效的。
    */
    isValid: function() {
        ///<returns type="Boolean"></returns>
        if ( this._innerGeometry == null) {
            return null;
        }
        return this._innerGeometry.IsValid;
    },

    /*
    *设置和获取几何对象的位置，目前只对模型、图片有效
    */
    get_position: function() {
        ///<value type="SuperMap.Web.Core.Point3D"></value>
        if ( this._innerGeometry == null) {
            return null;
        }
        var position = this._innerGeometry.Position;
        return SuperMap.Web.Core.Conversion._ConvertSRObject2Object(position,"Point3D");
    },
    set_position: function(position) {
        if ( this._innerGeometry == null) {
            return;
        }

        if (SuperMap.Web.Core.Point3D.isInstanceOfType(position)) {
            var innerPosition = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(position);
            this._innerGeometry.Position = innerPosition;
        }
    },

    /*
    *设置和获取几何对象的绕X轴的旋转角度，目前只对模型、图片有效
    */
    get_rotationX: function() {
        ///<value type="Number" integer="false"></value>

        if ( this._innerGeometry == null) {
            return null;
        }
        return this._innerGeometry.RotationX;
    },
    set_rotationX: function(rotationX) {
        if ( this._innerGeometry == null) {
            return;
        }
        this._innerGeometry.RotationX = rotationX;
    },

    /*
    *设置和获取几何对象的绕Y轴的旋转角度，目前只对模型、图片有效
    */
    get_rotationY: function() {
        ///<value type="Number" integer="false"></value>
        if ( this._innerGeometry == null) {
            return null;
        }

        return this._innerGeometry.RotationY;
    },
    set_rotationY: function(rotationY) {
        if ( this._innerGeometry == null) {
            return;
        }

        this._innerGeometry.RotationY = rotationY;
    },

    /*
    *设置和获取几何对象的绕Z轴的旋转角度，目前只对模型、图片有效
    */
    get_rotationZ: function() {
        ///<value type="Number" integer="false"></value>
        if ( this._innerGeometry == null) {
            return null;
        }

        return this._innerGeometry.RotationZ;
    },
    set_rotationZ: function(rotationZ) {
        if ( this._innerGeometry == null) {
            return;
        }
        this._innerGeometry.RotationZ = rotationZ;
    },

    /*
    *设置和获取几何对象的绕X轴的旋转角度，目前只对模型、图片有效
    */
    get_scaleX: function() {
        ///<value type="Number" integer="false"></value>
        if ( this._innerGeometry == null) {
            return null;
        }
        return this._innerGeometry.ScaleX;
    },
    set_scaleX: function(scaleX) {
        if ( this._innerGeometry == null) {
            return;
        }
        this._innerGeometry.ScaleX = scaleX;
    },

    /*
    *设置和获取几何对象的绕Y轴的旋转角度，目前只对模型、图片有效
    */
    get_scaleY: function() {
        ///<value type="Number" integer="false"></value>
        if ( this._innerGeometry == null) {
            return null;
        }
        return this._innerGeometry.ScaleY;
    },
    set_scaleY: function(scaleY) {
        if ( this._innerGeometry == null) {
            return;
        }
        this._innerGeometry.ScaleY = scaleY;
    },

    /*
    *设置和获取几何对象的绕Z轴的旋转角度，目前只对模型、图片有效
    */
    get_scaleZ: function() {
        ///<value type="Number" integer="false"></value>
        if ( this._innerGeometry == null) {
            return null;
        }
        return this._innerGeometry.ScaleZ;
    },
    set_scaleZ: function(scaleZ) {
        if ( this._innerGeometry == null) {
            return;
        }
        this._innerGeometry.ScaleZ = scaleZ;
    },

    get_volume: function ()  {
    //暂不实现
         if ( this._innerGeometry == null) {
             return null;
       }
       return this._innerGeometry.Volume;
    },


    hitTest: function(point, tolerance) {
        ///<param name="point" type="SuperMap.Web.Core.Point2D"></param>
        ///<param name="tolerance" type="Number" integer="false"></param>
        ///<returns type="Boolean"></returns>

        if ( this._innerGeometry == null) {
            return null;
        }
        var n_tolerance = parseFloat(tolerance);
        if (SuperMap.LonLat.isInstanceOfType(point) && !isNaN(n_tolerance)) {
            var innerPoint = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(point);
            return this._innerGeometry.HitTest(innerPoint, n_tolerance);
        }
        return false;
    },

    //    hitTest3d: function()
    //    {
    //        //暂不实现
    //        return ;
    //    },

    offset: function(offsetX, offsetY) {
        ///<param name="offsetX" type="Number" integer="false"></param>
        ///<param name="offsetY" type="Number" integer="false"></param>
        ///<returns type="void"></returns>
        if ( this._innerGeometry == null) {
            return null;
        }
        var n_offsetX = parseFloat(offsetX);
        var n_offsetY = parseFloat(offsetY);
        if (!isNaN(n_offsetX) && !isNaN(offsetY)) {
            this._innerGeometry.Offset(n_offsetX, offsetY);
        }

    },

    offset3D: function(offsetX, offsetY, offsetZ) {
        ///<param name="offsetX" type="Number" integer="false"></param>
        ///<param name="offsetY" type="Number" integer="false"></param>
        ///<param name="offsetZ" type="Number" integer="false"></param>
        ///<returns type="void"></returns>

        if ( this._innerGeometry == null) {
            return null;
        }
        var n_offsetX = parseFloat(offsetX);
        var n_offsetY = parseFloat(offsetY);
        var n_offsetZ = parseFloat(offsetZ);
        if (!isNaN(n_offsetX) && !isNaN(n_offsetY) && !isNaN(n_offsetZ)) {
            this._innerGeometry.Offset3D(n_offsetX, n_offsetY, n_offsetZ);
        }

    },

    //    resize: function (bounds)
    //    {
    ////         if ( this._innerGeometry == null)
    ////         {
    ////             return null;
    ////         }
    ////         if (SuperMap.Web.Core.Rectangle.isInstanceOfType(bounds))
    ////         {
    ////             var innerBounds = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(bounds);
    ////             this._innerGeometry.Resize(innerBounds);
    ////         }
    //    },

    //    resize3D: function (boundingBox)
    //    {
    ////        if ( this._innerGeometry == null)
    ////        {
    ////            return null;
    ////        }
    ////        if (SuperMap.Web.Core.BoundingBox.isInstanceOfType(boundingBox))
    ////        {
    ////            var innerBoundingBox = boundingBox._get_innerBoundingBox();
    ////            this._innerGeometry.Resize3D(innerBoundingBox);
    ////        }
    //    },


    //    rotate: function (pntOrigin, dAngle)
    //    {
    ////         if ( this._innerGeometry == null)
    ////         {
    ////             return null;
    ////         }
    ////         if (SuperMap.Web.Core.Point2D.isInstanceOfType(pntOrigin) && !isNaN(dAngle) && (dAngle !== ""))
    ////         {
    ////             var innerPntOrigin = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(pntOrigin);
    ////             this._innerGeometry.Rotate(innerPntOrigin,dAngle);
    ////         }
    //    },

    rotate3D: function(vecOrigin, dAngle) {
        ///<param name="vecOrigin" type="SuperMap.Web.Core.Vector3D"></param>
        ///<param name="dAngle" type="Number" integer="false"></param>
        ///<returns type="void"></returns>
        if ( this._innerGeometry == null) {
            return;
        }
        var n_dAngle = parseFloat(dAngle);
        if (SuperMap.Web.Core.Vector3D.isInstanceOfType(vecOrigin) && !vecOrigin.isEmpty() && !isNaN(n_dAngle)) {
            var innerVecOrigin = vecOrigin._get_innerVector3D();
            if (innerVecOrigin != null) {
                this._innerGeometry.Rotate3D(innerVecOrigin, n_dAngle);
            }

        }
    },

    //    inflate: function(dRatioX, dRatioY)
    //    {
    ////         if ( this._innerGeometry == null)
    ////         {
    ////             return null;
    ////         }
    ////         if (!isNaN(dRatioX) && (dRatioX !== "") && !isNaN(dRatioY) && (dRatioY !== ""))
    ////         {
    ////            this._innerGeometry.Inflate(dRatioX, dRatioY);
    ////         }

    //    },

    inflate3D: function(dRatioX, dRatioY, dRatioZ) {
        ///<param name="dRatioX" type="Number" integer="false"></param>
        ///<param name="dRatioY" type="Number" integer="false"></param>
        ///<param name="dRatioZ" type="Number" integer="false"></param>
        ///<returns type="void"></returns>
        if ( this._innerGeometry == null) {
            return null;
        }
        var n_dRatioX = parseFloat(dRatioX);
        var n_dRatioY = parseFloat(dRatioY);
        var n_dRatioZ = parseFloat(dRatioZ);

        if (!isNaN(n_dRatioX) && !isNaN(n_dRatioY) && !isNaN(n_dRatioZ)) {
            this._innerGeometry.Inflate3D(n_dRatioX, n_dRatioY, n_dRatioZ);
        }

    },

    setEmpty: function() {
        ///<returns type="void"></returns>
        if ( this._innerGeometry == null) {
            return null;
        }
        this._innerGeometry.SetEmpty();
    },

    getGeoModel:function(lStacks,lSlices){
        ///<param name="lStacks" type="Number" integer="ture">横向分几份</param>
        ///<param name="lSlices" type="Number" integer="ture">竖向分几段</param>
        ///<return type="SuperMap.Web.Core.GeoModel"></returns>
        var innerModel=this._innerGeometry.GetModel(lStacks,lSlices);
        if(innerModel==null)
        {
            return null;
        }
        var geoModel=new SuperMap.Web.Core.GeoModel();
        geoModel._set_innerGeometry(innerModel);
        return geoModel;
    }
}

SuperMap.Web.Core.Geometry3D.registerClass('SuperMap.Web.Core.Geometry3D', SuperMap.Geometry, Sys.IDisposable);

/**
* 类名 : GeoPoint3D
* 描   述： 三维几何点对象基类
* 版 本 号：
*/
SuperMap.Web.Core.GeoPoint3D = function(point3D) {
     ///<param name="point3D" type="SuperMap.Web.Core.Point3D"></param>
      ///<returns type="SuperMap.Web.Core.GeoPoint3D"></returns>

	SuperMap.Web.Core.GeoPoint3D.initializeBase(this);

    //Com对象
	this._innerGeometry = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateGeometry(SuperMap.Web.Core.GeometryType.GEOPOINT3D);
    if ( this._innerGeometry == null)
    {
        return null;
    }

    if (SuperMap.Web.Core.Point3D.isInstanceOfType(point3D))
    {
        this._innerGeometry.X = parseFloat(point3D.x);
        this._innerGeometry.Y = parseFloat(point3D.y);
        this._innerGeometry.Z = parseFloat(point3D.z);
    }
    else
    {
        this._innerGeometry.X = NaN;
        this._innerGeometry.Y = NaN;
        this._innerGeometry.Z = NaN;
    }
};
SuperMap.Web.Core.GeoPoint3D.prototype = {

    dispose: function() {
        ///<returns type="void">析构函数</returns>
        this._innerGeometry = null;
    },

    convertToGeoPoint: function()
    {
        var geoPoint = new SuperMap.Geometry.Point();
        geoPoint.x = this.get_x();
        geoPoint.y = this.get_y();
        return geoPoint;
    },

    get_x: function() {
        ///<value type="Number" integer="false"></value>

        return this._innerGeometry.X;
    },
    set_x: function(x) {
        var n_x = parseFloat(x);
        if (!isNaN(n_x)) {
            this._innerGeometry.X = n_x;
        }
    },
    get_y: function() {
        ///<value type="Number" integer="false"></value>

        return this._innerGeometry.Y;
    },
    set_y: function(y) {
        var n_y = parseFloat(y);
        if (!isNaN(n_y)) {
            this._innerGeometry.Y = n_y;
        }
    },
    get_z: function() {
        ///<value type="Number" integer="false"></value>
        return this._innerGeometry.Z;
    },
    set_z: function(z) {
        var n_z = parseFloat(z);
        if (!isNaN(n_z)) {
            this._innerGeometry.Z = n_z;
        }
    },
    clone: function() {
        ///<returns type="SuperMap.Web.Core.GeoPoint3D"></returns>
        var innerPoint3D = this._innerGeometry.Clone();
        if (innerPoint3D == null) {
            return null;
        }
        var geoPoint3D = new SuperMap.Web.Core.GeoPoint3D();
        geoPoint3D._set_innerGeometry(innerPoint3D);
        return geoPoint3D;
    },

    //    mirror: function(startPoint,endPoint)
    //    {
    ////         if (SuperMap.Web.Core.Point2D.isInstanceOfType(startPoint) && SuperMap.Web.Core.Point2D.isInstanceOfType(endPoint))
    ////         {
    ////             var innerStartPoint = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(startPoint);
    ////             var innerEndPoint = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(endPoint);
    ////             var innerPoint3D = this._innerGeometry.Mirror(innerStartPoint, innerEndPoint);
    ////             if (innerPoint3D == null)
    ////             {
    ////                 return null;
    ////             }
    ////             var geoPoint3D = new SuperMap.Web.Core.GeoPoint3D();
    ////             geoPoint3D._set_innerGeometry(innerPoint3D);
    ////             return geoPoint3D;
    ////         }
    //        return null;
    //    },

    /*
    *几何对象是否为空，即对象里面是否有数据
    */
    isEmpty: function() {
        ///<returns type="Boolean"></returns>
        if ( this._innerGeometry == null ||
          isNaN(this._innerGeometry.X) || isNaN(this._innerGeometry.Y) || isNaN(this._innerGeometry.Z)) {
            return true;
        }
        return this._innerGeometry.IsEmpty;
    },

    /*
    *几何对象是否有效，例如对于Geoline3D如果只有一个点就为无效的Geoline3D，区别于isEmpty
    *对于GeoReion3D，如果三点在一条直线上也是无效的。
    */
    isValid: function() {
        ///<returns type="Boolean"></returns>
        if ( this._innerGeometry == null ||
              isNaN(this._innerGeometry.X) || isNaN(this._innerGeometry.Y) || isNaN(this._innerGeometry.Z)) {
            return false;
        }
        return this._innerGeometry.IsValid;
    },

    mirror3D: function(mirrorPoint1, mirrorPoint2, mirrorPoint3) {
        ///<param name="mirrorPoint1" type="SuperMap.Web.Core.Point3D"></param>
        ///<param name="mirrorPoint2" type="SuperMap.Web.Core.Point3D"></param>
        ///<param name="mirrorPoint3" type="SuperMap.Web.Core.Point3D"></param>
        ///<returns type="SuperMap.Web.Core.GeoPoint3D"></returns>
        if ( this._innerGeometry == null) {
            return null;
        }
        if (SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint1) && !mirrorPoint1.isEmpty() &&
            SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint2) && !mirrorPoint2.isEmpty() &&
            SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint3) && !mirrorPoint3.isEmpty()) {

            var innerMirrorPoint1 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint1);
            var innerMirrorPoint2 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint2);
            var innerMirrorPoint3 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint3);

            if (innerMirrorPoint1 == null || innerMirrorPoint2 == null || innerMirrorPoint3 == null) {
                return null;
            }
            var innerPoint3D = this._innerGeometry.Mirror3D(innerMirrorPoint1, innerMirrorPoint2, innerMirrorPoint3);
            if (innerPoint3D == null) {
                return null;
            }
            var geoPoint3D = new SuperMap.Web.Core.GeoPoint3D();
            geoPoint3D._set_innerGeometry(innerPoint3D);
            return geoPoint3D;
        }
        return null;
    }
}
SuperMap.Web.Core.GeoPoint3D.registerClass('SuperMap.Web.Core.GeoPoint3D', SuperMap.Web.Core.Geometry3D, Sys.IDisposable);


/**
* 类名 : GeoLine3D
* 描   述： 三维几何线对象类
* 版 本 号：
*/
SuperMap.Web.Core.GeoLine3D = function(point3DsArray) {

     ///<param name="point3Ds" type="Array" elementType="SuperMap.Web.Core.Point3Ds"></param>
     ///<returns type="SuperMap.Web.Core.GeoLine3D"></returns>

	SuperMap.Web.Core.GeoLine3D.initializeBase(this);

//Com对象
	this._innerGeometry = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateGeometry(SuperMap.Web.Core.GeometryType.GEOLINE3D);
    if ( this._innerGeometry == null)
    {
        return null;
    }
    if(Function._validateParams(arguments, [{name: "point3DsArray", type: Array, elementType: SuperMap.Web.Core.Point3Ds}]) == null)
    {
        for(var i=0; i<point3DsArray.length; i++)
        {
            var innerPoint3Ds = point3DsArray[i]._get_innerPoint3Ds();
            if (innerPoint3Ds != null) {
               this._innerGeometry.AddPart(innerPoint3Ds);
            }
        }
    }
};
SuperMap.Web.Core.GeoLine3D.prototype = {
    dispose: function() {
        ///<returns type="void">析构函数</returns>

        this._innerGeometry = null;
    },

    convertToGeoLine: function()
    {
        if (this.get_partCount() > 0)
        {
            var geoLine = new SuperMap.Geometry.MultiLineString();
            for (var polycount = 0; polycount < this.get_partCount(); polycount++)
            {
               var pnt3Ds = this.getPart(polycount);
               var pnt2Ds = pnt3Ds.toPoint2Ds();
               geoLine.components[polycount] = pnt2Ds;
            }
            return geoLine;
        }
        return null;
    },

    get_partCount: function() {
        ///<value type="Number" integer="true"></value>

        if ( this._innerGeometry == null) {
            return null;
        }
        return this._innerGeometry.PartCount;
    },

    get_length: function() {
        ///<value type="Number" integer="false"></value>

        if ( this._innerGeometry == null) {
            return null;
        }
        return this._innerGeometry.Length;
    },

    clone: function() {
        ///<returns type="SuperMap.Web.Core.GeoLine3D"></returns>

        if ( this._innerGeometry == null) {
            return null;
        }
        var innerLine3D = this._innerGeometry.Clone();
        if (innerLine3D == null) {
            return null;
        }
        var geoLine3D = new SuperMap.Web.Core.GeoLine3D();
        geoLine3D._set_innerGeometry(innerLine3D);
        return geoLine3D;
    },
    //    mirror: function(startPoint,endPoint)
    //    {
    ////         if ( this._innerGeometry == null)
    ////         {
    ////             return null;
    ////         }
    ////         if (SuperMap.Web.Core.Point2D.isInstanceOfType(startPoint) && SuperMap.Web.Core.Point2D.isInstanceOfType(endPoint))
    ////         {
    ////             var innerStartPoint = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(startPoint);
    ////             var innerEndPoint = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(endPoint);
    ////             var innerLine3D = this._innerGeometry.Mirror(innerStartPoint, innerEndPoint);
    ////             if (innerLine3D == null)
    ////             {
    ////                 return null;
    ////             }
    ////             var geoLine3D = new SuperMap.Web.Core.GeoLine3D();
    ////             geoLine3D._set_innerGeometry(innerLine3D);
    ////             return geoLine3D;
    ////         }
    //        return null;
    //    },

    mirror3D: function(mirrorPoint1, mirrorPoint2, mirrorPoint3) {
        ///<param name="mirrorPoint1" type="SuperMap.Web.Core.Point3D"></param>
        ///<param name="mirrorPoint2" type="SuperMap.Web.Core.Point3D"></param>
        ///<param name="mirrorPoint3" type="SuperMap.Web.Core.Point3D"></param>
        ///<returns type="SuperMap.Web.Core.GeoLine3D"></returns>

        if ( this._innerGeometry == null) {
            return null;
        }

        if (SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint1) && !mirrorPoint1.isEmpty() &&
            SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint2) && !mirrorPoint2.isEmpty() &&
            SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint3) && !mirrorPoint3.isEmpty()) {

            var innerMirrorPoint1 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint1);
            var innerMirrorPoint2 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint2);
            var innerMirrorPoint3 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint3);

            if (innerMirrorPoint1 == null || innerMirrorPoint2 == null || innerMirrorPoint3 == null) {
                return null;
            }
            var innerLine3D = this._innerGeometry.Mirror3D(innerMirrorPoint1, innerMirrorPoint2, innerMirrorPoint3);
            if (innerLine3D == null) {
                return null;
            }
            var geoLine3D = new SuperMap.Web.Core.GeoLine3D();
            geoLine3D._set_innerGeometry(innerLine3D);
            return geoLine3D;
        }
        return null;
    },
    addPart: function(point3Ds) {
        ///<param name="point3Ds" type="SuperMap.Web.Core.Point3Ds"></param>
        ///<returns type="Number" integer="true"></returns>

        if ( this._innerGeometry == null) {
            return null;
        }
        if (SuperMap.Web.Core.Point3Ds.isInstanceOfType(point3Ds)) {
            var innerPoint3Ds = point3Ds._get_innerPoint3Ds();
            return this._innerGeometry.AddPart(innerPoint3Ds);
        }
        return -1;

    },

    getPart: function(nIndex) {
        ///<param name="nIndex" type="Number" integer="true"></param>
        ///<returns type="SuperMap.Web.Core.Point3Ds"></returns>

        if ( this._innerGeometry == null) {
            return null;
        }
        var n_nIndex = parseInt(nIndex);
        if (!isNaN(n_nIndex)) {
            if (n_nIndex < 0 || n_nIndex >= this._innerGeometry.PartCount) {
                return null;
            }
            var innerPoint3Ds = this._innerGeometry.GetPart(n_nIndex);
            return SuperMap.Web.Core.Conversion._CreateObjectBySRObject(innerPoint3Ds,"Point3Ds");
        }
    },

    indexOf: function(point3Ds) {
        ///<param name="point3Ds" type="SuperMap.Web.Core.Point3Ds"></param>
        ///<returns type="Number" integer="true"></returns>

        if ( this._innerGeometry == null) {
            return null;
        }
        if (SuperMap.Web.Core.Point3Ds.isInstanceOfType(point3Ds)) {
            var innerPoint3Ds = point3Ds._get_innerPoint3Ds();
            return this._innerGeometry.IndexOf(innerPoint3Ds);
        }
        return -1;
    },

    insertPart: function(nIndex, point3Ds) {
        ///<param name="nIndex" type="Number" integer="true"></param>
        ///<param name="point3Ds" type="SuperMap.Web.Core.Point3Ds"></param>
        ///<returns type="Boolean"></returns>
        if ( this._innerGeometry == null) {
            return null;
        }
        var n_nIndex = parseInt(nIndex);
        if (!isNaN(n_nIndex) && SuperMap.Web.Core.Point3Ds.isInstanceOfType(point3Ds)) {
            if (n_nIndex < 0 || n_nIndex > this._innerGeometry.PartCount) {
                return false;
            }
            var innerPoint3Ds = point3Ds._get_innerPoint3Ds();
            return this._innerGeometry.InsertPart(n_nIndex, innerPoint3Ds);
        }
        return false;
    },

    removePart: function(nIndex) {
        ///<param name="nIndex" type="Number" integer="true"></param>
        ///<returns type="Boolean"></returns>

        if ( this._innerGeometry == null) {
            return null;
        }
        var n_nIndex = parseInt(nIndex);
        if (!isNaN(n_nIndex)) {
            if (n_nIndex < 0 || n_nIndex >= this._innerGeometry.PartCount) {
                return false;
            }

            return this._innerGeometry.RemovePart(n_nIndex);
        }
        return false;
    },

    setPart: function(nIndex, point3Ds) {

        ///<param name="nIndex" type="Number" integer="true"></param>
        ///<param name="point3Ds" type="SuperMap.Web.Core.Point3Ds"></param>
        ///<returns type="Boolean"></returns>

        if ( this._innerGeometry == null) {
            return null;
        }
        var n_nIndex = parseInt(nIndex);
        if (!isNaN(n_nIndex) && SuperMap.Web.Core.Point3Ds.isInstanceOfType(point3Ds)) {
            if (n_nIndex < 0 || n_nIndex >= this._innerGeometry.PartCount) {
                return false;
            }
            var innerPoint3Ds = point3Ds._get_innerPoint3Ds();
            return this._innerGeometry.SetPart(n_nIndex, innerPoint3Ds);
        }
        return false;
    }

}
SuperMap.Web.Core.GeoLine3D.registerClass('SuperMap.Web.Core.GeoLine3D', SuperMap.Web.Core.Geometry3D, Sys.IDisposable);


/**
* 类名 : GeoRegion3D
* 描   述： 三维几何面对象类
* 版 本 号：
*/
SuperMap.Web.Core.GeoRegion3D = function(point3DsArray) {

     ///<param name="point3DsArray" type="Array" elementType="SuperMap.Web.Core.Point3Ds"></param>
         ///<returns type="SuperMap.Web.Core.GeoRegion3D"></returns>

	SuperMap.Web.Core.GeoRegion3D.initializeBase(this);

//Com对象
	this._innerGeometry = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateGeometry(SuperMap.Web.Core.GeometryType.GEOREGION3D);
    if(Function._validateParams(arguments, [{name: "point3DsArray", type: Array, elementType: SuperMap.Web.Core.Point3Ds}]) == null)
    {
        for(var i=0; i<point3DsArray.length; i++)
        {
            var innerPoint3Ds = point3DsArray[i]._get_innerPoint3Ds();
            this._innerGeometry.AddPart(innerPoint3Ds);
        }
    }
};
SuperMap.Web.Core.GeoRegion3D.prototype = {

    dispose: function()
    {
    ///<returns type="void">析构函数</returns>
        this._innerGeometry = null;
    },

    convertToGeoRegion: function()
    {
        if (this.get_partCount() > 0)
        {
            var geoRegion = new SuperMap.Geometry.Polygon();
            for (var polycount = 0; polycount < this.get_partCount(); polycount++)
            {
               var pnt3Ds = this.getPart(polycount);
               var pnt2Ds = pnt3Ds.toPoint2Ds();
               geoRegion.components[polycount] = pnt2Ds;
            }
           return geoRegion;
        }
        return null;
    },

    get_partCount: function ()
    {
         ///<value type="Number" integer="true"></value>

        if ( this._innerGeometry == null)
        {
            return null;
        }
        return this._innerGeometry.PartCount;
    },

    get_perimeter: function ()
    {
     ///<value type="Number" integer="false"></value>

        if ( this._innerGeometry == null)
        {
            return null;
        }
        return this._innerGeometry.Perimeter;
    },

    get_area: function ()
    {
     ///<value type="Number" integer="false"></value>

        if ( this._innerGeometry == null)
        {
            return null;
        }
        return this._innerGeometry.Area;
    },

    clone: function()
    {
        ///<return type="SuperMap.Web.Core.GeoRegion3D"></return>

        if ( this._innerGeometry == null)
        {
            return null;
        }
        var innerRegion3D = this._innerGeometry.Clone();
        if (innerRegion3D == null)
        {
            return null;
        }
        var geoRegion3D = new SuperMap.Web.Core.GeoRegion3D();
        geoRegion3D._set_innerGeometry(innerRegion3D);
        return geoRegion3D;
    },

//    mirror: function(startPoint,endPoint)
//    {
////         if ( this._innerGeometry == null)
////         {
////             return null;
////         }
////         if (SuperMap.Web.Core.Point2D.isInstanceOfType(startPoint) && SuperMap.Web.Core.Point2D.isInstanceOfType(endPoint))
////         {
////             var innerStartPoint = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(startPoint);
////             var innerEndPoint = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(endPoint);
////             var innerRegion3D = this._innerGeometry.Mirror(innerStartPoint, innerEndPoint);
////             if (innerRegion3D == null)
////             {
////                 return null;
////             }
////             var geoRegion3D = new SuperMap.Web.Core.GeoRegion3D();
////             geoRegion3D._set_innerGeometry(innerRegion3D);
////             return geoRegion3D;
////         }
//        return null;
//    },

    mirror3D: function(mirrorPoint1,mirrorPoint2,mirrorPoint3)
    {
    ///<param name="mirrorPoint1" type="SuperMap.Web.Core.Point3D"></param>
      ///<param name="mirrorPoint2" type="SuperMap.Web.Core.Point3D"></param>
      ///<param name="mirrorPoint3" type="SuperMap.Web.Core.Point3D"></param>
      ///<returns type="SuperMap.Web.Core.GeoRegion3D"></returns>

        if ( this._innerGeometry == null)
        {
            return null;
        }

        if (SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint1) && !mirrorPoint1.isEmpty() &&
            SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint2) && !mirrorPoint2.isEmpty() &&
            SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint3) && !mirrorPoint3.isEmpty()) {

            var innerMirrorPoint1 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint1);
            var innerMirrorPoint2 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint2);
            var innerMirrorPoint3 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint3);

            if (innerMirrorPoint1 == null || innerMirrorPoint2 == null || innerMirrorPoint3 == null) {
                return null;
            }
            var innerRegion3D = this._innerGeometry.Mirror3D(innerMirrorPoint1, innerMirrorPoint2, innerMirrorPoint3);
            if (innerRegion3D == null) {
                return null;
            }
            var geoRegion3D = new SuperMap.Web.Core.GeoRegion3D();
            geoRegion3D._set_innerGeometry(innerRegion3D);
            return geoRegion3D;
        }
        return null;
    },

    addPart: function(point3Ds) {
        ///<param name="point3Ds" type="SuperMap.Web.Core.Point3Ds"></param>
        ///<returns type="Number" integer="true"></returns>

        if ( this._innerGeometry == null) {
            return null;
        }
        if (SuperMap.Web.Core.Point3Ds.isInstanceOfType(point3Ds)) {
            var innerPoint3Ds = point3Ds._get_innerPoint3Ds();
            return this._innerGeometry.AddPart(innerPoint3Ds);
        }
        return -1;

    },

    getPart: function(nIndex) {
        ///<param name="nIndex" type="Number" integer="true"></param>
        ///<returns type="SuperMap.Web.Core.Point3Ds"></returns>

        if ( this._innerGeometry == null) {
            return null;
        }
        var n_nIndex = parseInt(nIndex);
        if (!isNaN(n_nIndex)) {
            if (n_nIndex < 0 || n_nIndex >= this._innerGeometry.PartCount) {
                return null;
            }
            var innerPoint3Ds = this._innerGeometry.GetPart(n_nIndex);
            return SuperMap.Web.Core.Conversion._CreateObjectBySRObject(innerPoint3Ds,"Point3Ds");
        }
    },

    indexOf: function(point3Ds) {
        ///<param name="point3Ds" type="SuperMap.Web.Core.Point3Ds"></param>
        ///<returns type="Number" integer="true"></returns>

        if ( this._innerGeometry == null) {
            return null;
        }
        if (SuperMap.Web.Core.Point3Ds.isInstanceOfType(point3Ds)) {
            var innerPoint3Ds = point3Ds._get_innerPoint3Ds();
            return this._innerGeometry.IndexOf(innerPoint3Ds);
        }
        return -1;
    },

    insertPart: function(nIndex, point3Ds) {
        ///<param name="nIndex" type="Number" integer="true"></param>
        ///<param name="point3Ds" type="SuperMap.Web.Core.Point3Ds"></param>
        ///<returns type="Boolean"></returns>
        if ( this._innerGeometry == null) {
            return null;
        }
        var n_nIndex = parseInt(nIndex);
        if (!isNaN(n_nIndex) && SuperMap.Web.Core.Point3Ds.isInstanceOfType(point3Ds)) {
            if (n_nIndex < 0 || n_nIndex > this._innerGeometry.PartCount) {
                return false;
            }
            var innerPoint3Ds = point3Ds._get_innerPoint3Ds();
            return this._innerGeometry.InsertPart(n_nIndex, innerPoint3Ds);
        }
        return false;
    },

    removePart: function(nIndex) {
        ///<param name="nIndex" type="Number" integer="true"></param>
        ///<returns type="Boolean"></returns>

        if ( this._innerGeometry == null) {
            return null;
        }
        var n_nIndex = parseInt(nIndex);
        if (!isNaN(n_nIndex)) {
            if (n_nIndex < 0 || n_nIndex >= this._innerGeometry.PartCount) {
                return false;
            }

            return this._innerGeometry.RemovePart(n_nIndex);
        }
        return false;
    },

    setPart: function(nIndex, point3Ds) {

        ///<param name="nIndex" type="Number" integer="true"></param>
        ///<param name="point3Ds" type="SuperMap.Web.Core.Point3Ds"></param>
        ///<returns type="Boolean"></returns>

        if ( this._innerGeometry == null) {
            return null;
        }
        var n_nIndex = parseInt(nIndex);
        if (!isNaN(n_nIndex) && SuperMap.Web.Core.Point3Ds.isInstanceOfType(point3Ds)) {
            if (n_nIndex < 0 || n_nIndex >= this._innerGeometry.PartCount) {
                return false;
            }
            var innerPoint3Ds = point3Ds._get_innerPoint3Ds();
            return this._innerGeometry.SetPart(n_nIndex, innerPoint3Ds);
        }
        return false;
    }

}
SuperMap.Web.Core.GeoRegion3D.registerClass('SuperMap.Web.Core.GeoRegion3D', SuperMap.Web.Core.Geometry3D, Sys.IDisposable);


/**
* 类名 : GeoModel
* 描   述： 三维模型对象类
* 版 本 号：
*/
SuperMap.Web.Core.GeoModel = function() {
    ///<returns type="SuperMap.Web.Core.GeoModel"></returns>

	SuperMap.Web.Core.GeoModel.initializeBase(this);

//Com对象
	this._innerGeometry = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateGeometry(SuperMap.Web.Core.GeometryType.GEOMODEL);

};
SuperMap.Web.Core.GeoModel.prototype = {

    dispose: function()
    {
    ///<returns type="void">析构函数</returns>
        this._innerGeometry = null;
    },
    get_dataName: function ()
    {
        ///<value type="String"></value>
        if ( this._innerGeometry == null)
        {
            return null;
        }
        return this._innerGeometry.DataName;
    },
    set_dataName: function (dataName)
    {
        if ( this._innerGeometry == null)
        {
            return null;
        }
        if (typeof(dataName) == "string")
        {
            this._innerGeometry.DataName = dataName;
        }

    },

    get_id: function ()
    {
        ///<value type="String"></value>
        if ( this._innerGeometry == null)
        {
            return null;
        }
        return this._innerGeometry.ID;
    },
    set_id: function (id)
    {
        if ( this._innerGeometry == null)
        {
            return null;
        }
        var n_id = parseInt(id);
        if (!isNaN(n_id)) {
            if (n_id <= 0 )
            {
                return null;
            }
            this._innerGeometry.ID = n_id;
        }
    },

    fromModelFile: function (strPathURL)
    {
        ///<param name="strPathURL" type="String"></param>
        ///<value type="Boolean"></value>

        if ( this._innerGeometry == null)
        {
            return null;
        }
        if (typeof(strPathURL) == "string")
        {
            if (this._innerGeometry.FromModelFile(strPathURL) == false) {
                var ex = new Error(SuperMap.Lang.translate("打开失败"));
                ex.name = SuperMap.Web.Realspace.ExceptionName.FileOrDownloadFailed;
                throw ex;
            }

        }
        return true;

    },
    clone: function()
    {
        ///<returns type="SuperMap.Web.Core.GeoModel"></returns>

        if ( this._innerGeometry == null)
        {
            return null;
        }
        var innerModel = this._innerGeometry.Clone();
        if (innerModel == null)
        {
            return null;
        }
        var geoModel = new SuperMap.Web.Core.GeoModel();
        geoModel._set_innerGeometry(innerModel);
        return geoModel;
    },

    get_animationState: function ()
    {
        ///<value type="SuperMap.Web.Realspace.Animation">模型动画状态</value>
        if ( this._innerGeometry == null)
        {
            return null;
        }

        var animation = new SuperMap.Web.Realspace.Animation();
        animation._set_innerAnimation(this._innerGeometry.AnimationState);
        return animation;
    },
    set_animationState: function (animationState)
    {
        if ( this._innerGeometry == null)
        {
            return null;
        }
        if (typeof(animationState) == "SuperMap.Web.Realspace.Animation")
        {
            this._innerGeometry.AnimationState = animationState._get_innerAnimation();
        }
    },
    get_meshes: function ()
    {
        if ( this._innerGeometry == null)
        {
            return null;
        }
        return new SuperMap.Web.Realspace.Meshes(this._innerGeometry.Meshes);
    },
    get_nodeAnimationState: function () {
        ///<value type="SuperMap.Web.Realspace.NodeAnimationState">获取节点动画</value>
        if (this._innerGeometry == null) {
            return null;
        }

        var nodeAnimationState = new SuperMap.Web.Realspace.NodeAnimation();
        nodeAnimationState._set_innerNodeAnimation(this._innerGeometry.NodeAnimationState);
        return nodeAnimationState;
    }
}
SuperMap.Web.Core.GeoModel.registerClass('SuperMap.Web.Core.GeoModel', SuperMap.Web.Core.Geometry3D, Sys.IDisposable);

/**
* 类名 : GeoModel3D
* 描   述： 三维模型对象类(新)
* 版 本 号：
*/
SuperMap.Web.Core.GeoModel3D = function(model) {
    ///<returns type="SuperMap.Web.Core.GeoModel3D"></returns>

	SuperMap.Web.Core.GeoModel3D.initializeBase(this);

//Com对象
	this._innerGeometry = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateModel3D(model._innerModel);

};
SuperMap.Web.Core.GeoModel3D.prototype = {

    dispose: function()
    {
    ///<returns type="void">析构函数</returns>
        this._innerGeometry = null;
    },
	get_nodeAnimationState: function () {
        ///<value type="SuperMap.Web.Realspace.NodeAnimationState">获取节点动画</value>
        if (this._innerGeometry == null) {
            return null;
        }

        var nodeAnimationState = new SuperMap.Web.Realspace.NodeAnimation();
        nodeAnimationState._set_innerNodeAnimation(this._innerGeometry.NodeAnimation);
        return nodeAnimationState;
    },
	set_filePath: function(filePath) {
		if ( this._innerGeometry == null) {
			return null;
		}
		if (typeof (filePath) == "string") {
			this._innerGeometry.FilePath = filePath;
		}

	},
	get_filePath: function() {
		if ( this._innerGeometry == null) {
			return null;
		}

		return this._innerGeometry.FilePath;
	},
	get_isLonLat: function() {
		if ( this._innerGeometry == null) {
			return null;
		}

		return this._innerGeometry.IsLonLat;
	},
	set_isLonLat: function(isLonLat) {
		if ( this._innerGeometry == null) {
			return null;
		}

		if( typeof isLonLat === "boolean"){
			this._innerGeometry.IsLonLat = isLonLat;
		}
	}
}
SuperMap.Web.Core.GeoModel3D.registerClass('SuperMap.Web.Core.GeoModel3D', SuperMap.Web.Core.Geometry3D, Sys.IDisposable);

/**
* 类名 : GeoPicture3D
* 描   述： 三维图片对象类
* 版 本 号：
*/
SuperMap.Web.Core.GeoPicture3D = function() {

    ///<returns type="SuperMap.Web.Core.GeoPicture3D"></returns>

	SuperMap.Web.Core.GeoPicture3D.initializeBase(this);

//Com对象
    this._innerGeometry = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateGeometry(SuperMap.Web.Core.GeometryType.GEOPICTURE3D);

};
SuperMap.Web.Core.GeoPicture3D.prototype = {

    dispose: function() {
        ///<returns type="void">析构函数</returns>
        this._innerGeometry = null;
    },

    get_dataName: function() {
        ///<value type="String"></value>

        if ( this._innerGeometry == null) {
            return null;
        }
        return this._innerGeometry.DataName;
    },
    set_dataName: function(dataName) {
        if ( this._innerGeometry == null) {
            return null;
        }
        if (typeof (dataName) == "string") {
            this._innerGeometry.DataName = dataName;
        }

    },

    get_width: function() {
        ///<value type="Number" integer="false"></value>

        if ( this._innerGeometry == null) {
            return null;
        }
        return this._innerGeometry.Width;
    },
    set_width: function(width) {
        if ( this._innerGeometry == null) {
            return null;
        }
        var n_width = parseFloat(width);
        if (!isNaN(n_width)) {
            this._innerGeometry.Width = n_width;
        }

    },

    get_height: function() {
        ///<value type="Number" integer="false"></value>

        if ( this._innerGeometry == null) {
            return null;
        }
        return this._innerGeometry.Height;
    },
    set_height: function(height) {
        if ( this._innerGeometry == null) {
            return null;
        }
        var n_height = parseFloat(height);
        if (!isNaN(n_height)) {
            this._innerGeometry.Height = n_height;
        }

    },

    fromImageFile: function(strPathURL) {
        ///<param name="strPathURL" type="String"></param>
        ///<returns type="Boolean"></returns>

        if ( this._innerGeometry == null) {
            return null;
        }
        if (typeof (strPathURL) == "string") {
            if (this._innerGeometry.FromImageFile(strPathURL) == false) {
                var ex = new Error(SuperMap.Lang.translate("SuperMap.Web.Realspace.Resources", "Realspace_Open_PictureFile_Failed"));
                ex.name = SuperMap.Web.Realspace.ExceptionName.FileOrDownloadFailed;
                throw ex;
            }

        }
        return true;

    },
    clone: function() {
        ///<returns type="SuperMap.Web.Core.GeoPicture3D"></returns>

        if ( this._innerGeometry == null) {
            return null;
        }
        var innerPicture = this._innerGeometry.Clone();
        if (innerPicture == null) {
            return null;
        }
        var geoPicture3D = new SuperMap.Web.Core.GeoPicture3D();
        geoPicture3D._set_innerGeometry(innerPicture);
        return geoPicture3D;
    }

    //    mirror: function(startPoint,endPoint)
    //    {
    ////         if ( this._innerGeometry == null)
    ////         {
    ////             return null;
    ////         }
    ////         if (SuperMap.Web.Core.Point2D.isInstanceOfType(startPoint) && SuperMap.Web.Core.Point2D.isInstanceOfType(endPoint))
    ////         {
    ////             var innerStartPoint = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(startPoint);
    ////             var innerEndPoint = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(endPoint);
    ////             var innerPicture = this._innerGeometry.Mirror(innerStartPoint, innerEndPoint);
    ////             if (innerPicture == null)
    ////             {
    ////                 return null;
    ////             }
    ////             var geoPicture3d = new SuperMap.Web.Core.GeoPicture3D();
    ////             geoPicture3d._set_innerGeometry(innerPicture);
    ////             return geoPicture3d;
    ////         }
    //        return null;
    //    },

    // 底层也暂未实现。
    //    mirror3D: function(mirrorPoint1,mirrorPoint2,mirrorPoint3)
    //    {
    ////         if ( this._innerGeometry == null)
    ////         {
    ////             return null;
    ////         }
    ////         if (SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint1) && SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint2) && SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint3))
    ////         {
    ////             var innerMirrorPoint1 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint1);
    ////             var innerMirrorPoint2 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint2);
    ////             var innerMirrorPoint3 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint3);
    ////             var innerPicture = this._innerGeometry.Mirror3D(innerMirrorPoint1, innerMirrorPoint2, innerMirrorPoint3);
    ////             if (innerPicture == null)
    ////             {
    ////                 return null;
    ////             }
    ////             var geoPicture3d = new SuperMap.Web.Core.GeoPicture3D();
    ////             geoPicture3d._set_innerGeometry(innerPicture);
    ////             return geoPicture3d;
    ////         }
    //        return null;
    //    }
}
SuperMap.Web.Core.GeoPicture3D.registerClass('SuperMap.Web.Core.GeoPicture3D', SuperMap.Web.Core.Geometry3D, Sys.IDisposable);

/**
* 类名 : GeoPlacemark
* 描   述： 三维地标对象类
* 版 本 号：
*/
SuperMap.Web.Core.GeoPlacemark = function() {
    ///<returns type="SuperMap.Web.Core.GeoPlacemark"></returns>

	SuperMap.Web.Core.GeoPlacemark.initializeBase(this);

//Com对象
    this._innerGeometry = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateGeometry(SuperMap.Web.Core.GeometryType.GEOPLACEMARK);
    this._feature3d = null;
};
SuperMap.Web.Core.GeoPlacemark.prototype = {

    dispose: function()
    {
    ///<returns type="void">析构函数</returns>
        this._innerGeometry = null;
    },

    get_name: function ()
    {
        ///<value type="String"></value>

        if ( this._innerGeometry == null)
        {
            return null;
        }
        return this._innerGeometry.Name;
    },
    set_name: function (name)
    {
        if ( this._innerGeometry == null)
        {
            return;
        }
        if (typeof(name) == "string")
        {
            this._innerGeometry.Name = name;
        }

    },

    get_geometry: function () {

        if (this._innerGeometry == null) {
            return null;
        }
        return this._innerGeometry.Geometry;
    },
    set_geometry: function (geometry) {

        if (this._innerGeometry == null) {
            return;
        }
        if (SuperMap.Geometry.isInstanceOfType(geometry)) {
            this._innerGeometry.Geometry = geometry._get_innerGeometry();
        }

    },


    setEmpty: function()
    {
        ///<returns type="void"></returns>
        if ( this._innerGeometry == null)
        {
            return null;
        }
        this._innerGeometry.SetEmpty();

    },

    clone: function()
    {
    ///<returns type="SuperMap.Web.Core.GeoPlacemark"></returns>

        if ( this._innerGeometry == null)
        {
            return null;
        }
        var innerPlacemark = this._innerGeometry.Clone();
        if (innerPlacemark == null)
        {
            return null;
        }
        var geoPlacemark = new SuperMap.Web.Core.GeoPlacemark();
        geoPlacemark._set_innerGeometry(innerPlacemark);
        return geoPlacemark;
    }

//    mirror: function(startPoint,endPoint)
//    {
////         if ( this._innerGeometry == null)
////         {
////             return null;
////         }
////         if (SuperMap.Web.Core.Point2D.isInstanceOfType(startPoint) && SuperMap.Web.Core.Point2D.isInstanceOfType(endPoint))
////         {
////             var innerStartPoint = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(startPoint);
////             var innerEndPoint = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(endPoint);
////             var innerPlacemark = this._innerGeometry.Mirror(innerStartPoint, innerEndPoint);
////             if (innerPlacemark == null)
////             {
////                 return null;
////             }
////             var geoPlacemark = new SuperMap.Web.Core.GeoPlacemark();
////             geoPlacemark._set_innerGeometry(innerPlacemark);
////             return geoPlacemark;
////         }
//        return null;
//    },
//
//    // 底层也暂未实现。
//    mirror3D: function(mirrorPoint1,mirrorPoint2,mirrorPoint3)
//    {
////         if ( this._innerGeometry == null)
////         {
////             return null;
////         }
////         if (SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint1) && SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint2) && SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint3))
////         {
////             var innerMirrorPoint1 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint1);
////             var innerMirrorPoint2 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint2);
////             var innerMirrorPoint3 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint3);
////             var innerPlacemark = this._innerGeometry.Mirror3D(innerMirrorPoint1, innerMirrorPoint2, innerMirrorPoint3);
////             if (innerPlacemark == null)
////             {
////                 return null;
////             }
////             var geoPlacemark = new SuperMap.Web.Core.GeoPlacemark();
////             geoPlacemark._set_innerGeometry(innerPlacemark);
////             return geoPlacemark;
////         }
//        return null;
//    }
}
SuperMap.Web.Core.GeoPlacemark.registerClass('SuperMap.Web.Core.GeoPlacemark', SuperMap.Web.Core.Geometry3D, Sys.IDisposable);


/**
* 类名 : TextPart3D
* 描   述： 三维文本子对象
* 版 本 号：
*/
SuperMap.Web.Core.TextPart3D  = function(text, point3D) {
    ///<param name="text" type="String"></param>
    ///<param name="point3D" type="SuperMap.Web.Core.Point3D"></param>
    ///<returns type="SuperMap.Web.Core.TextPart3D"></returns>

    this._innerTextPart3D = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateTextPart3D();
	if (this._innerTextPart3D == null)
	{
	    return;
	}
	this._anchorPoint = new SuperMap.Web.Core.Point3D();
	if (typeof(text) == "string")
	{
	    this._innerTextPart3D.Text = text;
	}
	if (SuperMap.Web.Core.Point3D.isInstanceOfType(point3D))
	{
	    this._innerTextPart3D.AnchorPoint = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(point3D);
	}

};
SuperMap.Web.Core.TextPart3D.prototype = {

    dispose: function() {
        ///<returns type="void">析构函数</returns>
        this._innerTextPart3D = null;
        this._anchorPoint = null;
    },
    /*
    *innerTextPart3D对象，不对外开放
    */
    _get_innerTextPart3D: function(innerTextPart3D) {

        if (this._innerTextPart3D == null) {
            return null;
        }
        return this._innerTextPart3D;
    },
    _set_innerTextPart3D: function(innerTextPart3D) {
        if (innerTextPart3D == null) {
            return null;
        }
        this._innerTextPart3D = innerTextPart3D;
    },

    get_rotation: function() {
        ///<value type="Number"></value>
        if (this._innerTextPart3D == null) {
            return null;
        }

        return this._innerTextPart3D.Rotation;

    },
    set_rotation: function(rotation) {
        if (this._innerTextPart3D == null) {
            return;
        }
        var n_rotation = parseFloat(rotation);
        if (!isNaN(n_rotation)) {
            this._innerTextPart3D.Rotation = n_rotation;
        }
    },

    get_text: function() {
        ///<value type="String"></value>

        if (this._innerTextPart3D == null) {
            return null;
        }

        return this._innerTextPart3D.Text;

    },
    set_text: function(text) {
        if (this._innerTextPart3D == null) {
            return;
        }
        if (typeof (text) == "string") {
            this._innerTextPart3D.Text = text;
        }
    },

    get_anchorPoint: function() {
        ///<value type="SuperMap.Web.Core.Point3D"></value>
        if (this._innerTextPart3D == null) {
            return null;
        }
        this._anchorPoint.x = this._innerTextPart3D.AnchorPoint.X;
        this._anchorPoint.y = this._innerTextPart3D.AnchorPoint.Y;
        this._anchorPoint.z = this._innerTextPart3D.AnchorPoint.Z;

        return this._anchorPoint;

    },
    set_anchorPoint: function(point3D) {
        if (this._innerTextPart3D == null) {
            return;
        }
        if (SuperMap.Web.Core.Point3D.isInstanceOfType(point3D)) {
            this._innerTextPart3D.AnchorPoint = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(point3D);
        }
    },

    get_x: function() {
        ///<value type="Number"></value>
        if (this._innerTextPart3D == null) {
            return null;
        }
        return this._innerTextPart3D.X;
    },
    set_x: function(x) {
        if (this._innerTextPart3D == null) {
            return;
        }
        var n_x = parseFloat(x);
        if (!isNaN(n_x)) {
            this._innerTextPart3D.X = n_x;
        }

    },
    get_y: function() {
        ///<value type="Number"></value>
        if (this._innerTextPart3D == null) {
            return null;
        }
        return this._innerTextPart3D.Y;
    },
    set_y: function(y) {
        if (this._innerTextPart3D == null) {
            return;
        }
        var n_y = parseFloat(y);
        if (!isNaN(n_y)) {
            this._innerTextPart3D.Y = n_y;
        }
    },
    get_z: function() {
        ///<value type="Number"></value>
        if (this._innerTextPart3D == null) {
            return null;
        }
        return this._innerTextPart3D.Z;
    },
    set_z: function(z) {
        if (this._innerTextPart3D == null) {
            return;
        }
        var n_z = parseFloat(z);
        if (!isNaN(n_z)) {
            this._innerTextPart3D.Z = n_z;
        }
    },
    clone: function() {
        /// <summary>克隆三维文本子对象</summary>
        /// <returns type="SuperMap.Web.Core.TextPart3D"></returns>
        var innerTextPart3D = this._innerTextPart3D.Clone();
        if (innerTextPart3D == null) {
            return null;
        }
        var textPart3D = new SuperMap.Web.Core.TextPart3D();
        textPart3D._set_innerTextPart3D(innerTextPart3D);
        return textPart3D;
    }

};
SuperMap.Web.Core.TextPart3D.registerClass('SuperMap.Web.Core.TextPart3D');

/**
* 类名 : GeoText3D
* 描   述： 三维文本类
* 版 本 号：
*/
SuperMap.Web.Core.GeoText3D = function(textPart3Ds) {
    ///<param name="textPart3Ds" type="Array" elementType="SuperMap.Web.Core.TextPart3D"></param>
    ///<returns type="SuperMap.Web.Core.GeoText3D"></returns>

	SuperMap.Web.Core.GeoText3D.initializeBase(this);

//Com对象
	this._innerGeometry = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateGeometry(SuperMap.Web.Core.GeometryType.GEOTEXT3D);


    if(Function._validateParams(arguments, [{name: "textPart3Ds", type: Array, elementType: SuperMap.Web.Core.TextPart3D}]) == null)
    {
        for(var i=0; i<textPart3Ds.length; i++)
        {
            var innerTextPart3D = textPart3Ds[i]._get_innerTextPart3D();
            this._innerGeometry.AddPart(innerTextPart3D);
        }

    }

};
SuperMap.Web.Core.GeoText3D.prototype = {

    dispose: function() {
        ///<returns type="void">析构函数</returns>
        this._innerGeometry = null;
    },

    get_partCount: function() {
        ///<value type="Number" integer="true"></value>

        if ( this._innerGeometry == null) {
            return null;
        }
        return this._innerGeometry.PartCount;
    },

    get_text: function() {
        ///<value type="String"></value>

        if ( this._innerGeometry == null) {
            return null;
        }
        return this._innerGeometry.Text;
    },

    clone: function() {
        ///<returns type="SuperMap.Web.Core.GeoText3D"></returns>

        if ( this._innerGeometry == null) {
            return null;
        }
        var innerText3D = this._innerGeometry.Clone();
        if (innerText3D == null) {
            return null;
        }
        var geoText3D = new SuperMap.Web.Core.GeoText3D();
        geoText3D._set_innerGeometry(innerText3D);
        return geoText3D;
    },

    //    mirror: function(startPoint,endPoint)
    //    {
    ////         if ( this._innerGeometry == null)
    ////         {
    ////             return null;
    ////         }
    ////         if (SuperMap.Web.Core.Point2D.isInstanceOfType(startPoint) && SuperMap.Web.Core.Point2D.isInstanceOfType(endPoint))
    ////         {
    ////             var innerStartPoint = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(startPoint);
    ////             var innerEndPoint = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(endPoint);
    ////             var innerText3D = this._innerGeometry.Mirror(innerStartPoint, innerEndPoint);
    ////             if (typeof(innerText3D) != "object" || innerText3D == null)
    ////             {
    ////                 return null;
    ////             }
    ////
    ////             var geoText3D = new SuperMap.Web.Core.GeoText3D();
    ////             geoText3D._set_innerGeometry(innerText3D);
    ////             return geoText3D;
    ////         }
    //        return null;
    //    },
    //
    //    // 底层也暂未实现。
    //    mirror3D: function(mirrorPoint1,mirrorPoint2,mirrorPoint3)
    //    {
    ////         if ( this._innerGeometry == null)
    ////         {
    ////             return null;
    ////         }
    ////         if (SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint1) && SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint2) && SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint3))
    ////         {
    ////             var innerMirrorPoint1 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint1);
    ////             var innerMirrorPoint2 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint2);
    ////             var innerMirrorPoint3 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint3);
    ////             var innerText3D = this._innerGeometry.Mirror3D(innerMirrorPoint1, innerMirrorPoint2, innerMirrorPoint3);
    ////            if (typeof(innerText3D) != "object" || innerText3D == null)
    ////             {
    ////                 return null;
    ////             }
    ////
    ////             var geoText3D = new SuperMap.Web.Core.GeoText3D();
    ////             geoText3D._set_innerGeometry(innerText3D);
    ////             return geoText3D;
    ////         }
    //        return null;
    //    },

    addPart: function(textPart3D) {
        ///<param name="textPart3D" type="SuperMap.Web.Core.TextPart3D"></param>
        ///<returns type="Number" integer="true"></returns>

        if ( this._innerGeometry == null) {
            return null;
        }
        if (SuperMap.Web.Core.TextPart3D.isInstanceOfType(textPart3D)) {

            var innerTextPart3D = textPart3D._get_innerTextPart3D();
            return this._innerGeometry.AddPart(innerTextPart3D);
        }
        return -1;

    },

    getPart: function(nIndex) {
        ///<param name="nIndex" type="Number" integer="true"></param>
        ///<returns type="SuperMap.Web.Core.TextPart3D"></returns>


        if ( this._innerGeometry == null) {
            return null;
        }

        var n_nIndex = parseInt(nIndex);
        if (!isNaN(n_nIndex)) {
            if (n_nIndex < 0 || n_nIndex >= this._innerGeometry.PartCount) {
                return null;
            }
            var innerTextPart3D = this._innerGeometry.GetPart(n_nIndex);
            return SuperMap.Web.Core.Conversion._CreateObjectBySRObject(innerTextPart3D,"TextPart3D");
        }
    },

    indexOf: function(textPart3D) {
        ///<param name="textPart3D" type="SuperMap.Web.Core.TextPart3D"></param>
        ///<returns type="Number" integer="true"></returns>

        if ( this._innerGeometry == null) {
            return null;
        }
        if (SuperMap.Web.Core.TextPart3D.isInstanceOfType(textPart3D)) {
            var innerTextPart3D = textPart3D._get_innerTextPart3D();
            return this._innerGeometry.IndexOf(innerTextPart3D);
        }
        return -1;
    },

    insertPart: function(nIndex, textPart3D) {
        ///<param name="nIndex" type="Number" integer="true"></param>
        ///<param name="textPart3D" type="SuperMap.Web.Core.TextPart3D"></param>
        ///<returns type="Boolean"></returns>

        if ( this._innerGeometry == null) {
            return null;
        }
        var n_nIndex = parseInt(nIndex);
        if (!isNaN(n_nIndex) && SuperMap.Web.Core.TextPart3D.isInstanceOfType(textPart3D)) {
            if (n_nIndex < 0 || n_nIndex > this._innerGeometry.PartCount) {
                return false;
            }
            var innerTextPart3D = textPart3D._get_innerTextPart3D();
            return this._innerGeometry.InsertPart(n_nIndex, innerTextPart3D);
        }
        return false;
    },

    removePart: function(nIndex) {
        ///<param name="nIndex" type="Number" integer="true"></param>
        ///<returns type="Boolean"></returns>

        if ( this._innerGeometry == null) {
            return null;
        }
        var n_nIndex = parseInt(nIndex);
        if (!isNaN(n_nIndex)) {
            if (n_nIndex < 0 || n_nIndex >= this._innerGeometry.PartCount) {
                return false;
            }

            return this._innerGeometry.RemovePart(n_nIndex);
        }
        return false;
    },

    setPart: function(nIndex, textPart3D) {
        ///<param name="nIndex" type="Number" integer="true"></param>
        ///<param name="textPart3D" type="SuperMap.Web.Core.TextPart3D"></param>
        ///<returns type="Boolean"></returns>

        if ( this._innerGeometry == null) {
            return null;
        }
        var n_nIndex = parseInt(nIndex);
        if (!isNaN(n_nIndex) && SuperMap.Web.Core.TextPart3D.isInstanceOfType(textPart3D)) {
            if (n_nIndex < 0 || n_nIndex >= this._innerGeometry.PartCount) {
                return false;
            }
            var innerTextPart3D = textPart3D._get_innerTextPart3D();
            return this._innerGeometry.SetPart(n_nIndex, innerTextPart3D);
        }
        return false;
    }

}
SuperMap.Web.Core.GeoText3D.registerClass('SuperMap.Web.Core.GeoText3D', SuperMap.Web.Core.Geometry3D, Sys.IDisposable);

/**
* 类名 : GeoParticle
* 描   述： 粒子
* 版 本 号：
*/
SuperMap.Web.Core.GeoParticle = function() {
    ///<returns type="SuperMap.Web.Core.GeoParticle"></returns>

	SuperMap.Web.Core.GeoParticle.initializeBase(this);

//Com对象
	this._innerGeometry = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateGeometry(SuperMap.Web.Core.GeometryType.GEOPARTICLE);

};
SuperMap.Web.Core.GeoParticle.prototype = {

    dispose: function()
    {
    ///<returns type="void">析构函数</returns>
        this._innerGeometry = null;
    },
    _resFileName2ParticleType:function(resfilename)
    {
        if (typeof (resfilename) != "string")
        {
            return null;
        }
        var type = 0;
        if (resfilename=="fire.par")
	    {
		    type = SuperMap.Web.Core.ParticleType.Fire;
	    }
	    else if (resfilename=="tailflame.par")
	    {
		    type = SuperMap.Web.Core.ParticleType.Tailflame;
	    }
	    else if (resfilename=="smoke.par")
	    {
		    type = SuperMap.Web.Core.ParticleType.Smoke;
	    }
	    else if (resfilename=="firesmoke.par")
	    {
		    type = SuperMap.Web.Core.ParticleType.FireSmoke;
	    }
	    else if (resfilename=="fountain.par")
	    {
		    type = SuperMap.Web.Core.ParticleType.Fountain;
	    }
	    else if (resfilename=="explode.par")
	    {
		    type = SuperMap.Web.Core.ParticleType.Explode;
	    }
	    else if (resfilename=="rain.par")
	    {
		    type = SuperMap.Web.Core.ParticleType.Rain;
	    }
	    else if (resfilename=="snow.par")
	    {
		    type = SuperMap.Web.Core.ParticleType.Snow;
	    }
	    return type;
    },
    _particleType2ResFileName:function(type)
    {
        var result = null;
        switch (type)
        {
        case SuperMap.Web.Core.ParticleType.Fire:
	        result = "fire.par";
	        break;
        case SuperMap.Web.Core.ParticleType.Tailflame:
	        result = "tailflame.par";
	        break;
        case SuperMap.Web.Core.ParticleType.Smoke:
	        result = "smoke.par";
	        break;
        case SuperMap.Web.Core.ParticleType.FireSmoke:
	        result = "firesmoke.par";
	        break;
        case SuperMap.Web.Core.ParticleType.Fountain:
	        result = "fountain.par";
	        break;
        case SuperMap.Web.Core.ParticleType.Explode:
	        result = "explode.par";
	        break;
        case SuperMap.Web.Core.ParticleType.Rain:
	        result = "rain.par";
	        break;
        case SuperMap.Web.Core.ParticleType.Snow:
	        result = "snow.par";
	        break;
        default:
        }
        return result;
    },
    get_particleFilePath: function()
    {
        ///<value type="String">获取或设置粒子效果资源文件的路径</value>
        if ( this._innerGeometry == null) {
            return null;
        }
        return this._innerGeometry.ParticleFilePath;
    },
    set_particleFilePath: function(filePath)
    {
        if ( this._innerGeometry == null) {
            return null;
        }
        if (typeof (filePath) == "string") {
            this._innerGeometry.ParticleFilePath = filePath;
        }
    },
    get_particleType: function()
    {
        ///<value type="SuperMap.Web.Core.ParticleType">粒子效果类型</value>
        if ( this._innerGeometry == null) {
            return null;
        }
        return this._innerGeometry.ParticleType;
    },
    set_particleType: function(type)
    {
        if ( this._innerGeometry == null) {
            return null;
        }
        var name = this._particleType2ResFileName(type)
        if(name != null)
        {
            this._innerGeometry.ParticleFilePath = name;
        }
    },

    makeWithGeometry: function(geometry)
    {
        ///<param name="geometry" type="SuperMap.Web.Core.Geometry3D">设置与三维粒子几何对象关联的几何对象""</param>
		///<returns type="Boolean"></returns>
        if ( this._innerGeometry == null) {
            return null;
        }
        return this._innerGeometry.MakeWithGeometry(geometry._innerGeometry);
    },

    getParticleSystemCount: function()
    {
        ///<returns type="Number">获取与三维粒子几何对象持有的 ParticleSystem 对象总数</value>
        if ( this._innerGeometry == null) {
            return null;
        }
        return this._innerGeometry.GetParticleSystemCount();
    },
    getParticleSystemByIndex: function(index)
    {
		///<param name="index" type="Number" integer="true"></param>
        ///<returns type="SuperMap.Web.Core.ParticleSystem">根据索引获取 particleSystem 对</returns>
        if ( this._innerGeometry == null) {
            return null;
        }
        var n_index = parseInt(index);
        if (!isNaN(n_index))
        {
            var innerParticleSystem = this._innerGeometry.GetParticleSystemByIndex(n_index);
            var particleSystem = new SuperMap.Web.Realspace.ParticleSystem(innerParticleSystem);
            return particleSystem;
        }
        return null;
    },

    clone: function()
    {
        ///<returns type="SuperMap.Web.Core.GeoParticle">拷贝方法</returns>
        if ( this._innerGeometry == null)
        {
            return null;
        }
        var innerParticle = this._innerGeometry.Clone();
        if (innerParticle == null)
        {
            return null;
        }
        var geoParticle = new SuperMap.Web.Core.GeoParticle();
        geoParticle._set_innerGeometry(innerParticle);
        return geoParticle;
    }
}
SuperMap.Web.Core.GeoParticle.registerClass('SuperMap.Web.Core.GeoParticle', SuperMap.Web.Core.Geometry3D, Sys.IDisposable);

/**
* 类名 : GeoSphere
* 描   述： 三维几何球对象
* 版 本 号：
*/
SuperMap.Web.Core.GeoSphere = function(radius) {
     ///<param name="radius" type="Number" integer="false">球的半径</param>
      ///<returns type="SuperMap.Web.Core.GeoSphere"></returns>
	SuperMap.Web.Core.GeoSphere.initializeBase(this);

    //Com对象
	this._innerGeometry = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateGeometry(SuperMap.Web.Core.GeometryType.GEOSPHERE);
    if ( this._innerGeometry == null)
    {
        return null;
    }
    this._innerGeometry.Radius=radius;

};
SuperMap.Web.Core.GeoSphere.prototype = {

    dispose: function() {
        ///<returns type="void">析构函数</returns>
        this._innerGeometry = null;
    },
    get_radius: function() {
        ///<value type="Number" integer="false">球半径</value>
        return this._innerGeometry.Radius;
    },
    set_radius: function(x) {
        var n_x = parseFloat(x);
        if (!isNaN(n_x)) {
            this._innerGeometry.Radius = n_x;
        }
    },
    get_center: function() {
        ///<value type="SuperMap.Web.Core.Point3D">球中心点</value>
        var center = this._innerGeometry.CenterPoint;
        return SuperMap.Web.Core.Conversion._ConvertSRObject2Object(center, "Point3D");
    },
    clone: function() {
        ///<returns type="SuperMap.Web.Core.GeoSphere"></returns>
        var innerGeoSphere = this._innerGeometry.Clone();
        if (innerGeoSphere == null) {
            return null;
        }
        var geoSphere = new SuperMap.Web.Core.GeoSphere();
        geoSphere._set_innerGeometry(innerGeoSphere);
        return geoSphere;
    },
    /*
    *几何对象是否有效，例如对于Geoline3D如果只有一个点就为无效的Geoline3D，区别于isEmpty
    *对于GeoReion3D，如果三点在一条直线上也是无效的。
    */
    isValid: function() {
        ///<returns type="Boolean"></returns>
        if ( this._innerGeometry == null){
            return false;
        }
        return this._innerGeometry.IsValid;
    },

    mirror3D: function(mirrorPoint1, mirrorPoint2, mirrorPoint3) {
        ///<param name="mirrorPoint1" type="SuperMap.Web.Core.Point3D"></param>
        ///<param name="mirrorPoint2" type="SuperMap.Web.Core.Point3D"></param>
        ///<param name="mirrorPoint3" type="SuperMap.Web.Core.Point3D"></param>
        ///<returns type="SuperMap.Web.Core.GeoSphere"></returns>
        if ( this._innerGeometry == null) {
            return null;
        }
        if (SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint1) && !mirrorPoint1.isEmpty() &&
            SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint2) && !mirrorPoint2.isEmpty() &&
            SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint3) && !mirrorPoint3.isEmpty()) {

            var innerMirrorPoint1 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint1);
            var innerMirrorPoint2 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint2);
            var innerMirrorPoint3 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint3);

            if (innerMirrorPoint1 == null || innerMirrorPoint2 == null || innerMirrorPoint3 == null) {
                return null;
            }
            var innerSphere = this._innerGeometry.Mirror3D(innerMirrorPoint1, innerMirrorPoint2, innerMirrorPoint3);
            if (innerSphere == null) {
                return null;
            }
            var geoSphere = new SuperMap.Web.Core.GeoSphere();
            geoSphere._set_innerGeometry(innerSphere);
            return geoSphere;
        }
        return null;
    }
}
SuperMap.Web.Core.GeoSphere.registerClass('SuperMap.Web.Core.GeoSphere', SuperMap.Web.Core.Geometry3D, Sys.IDisposable);


/**
* 类名 : GeoCircle3D
* 描   述： 三维几何圆对象
* 版 本 号：
*/
SuperMap.Web.Core.GeoCircle3D = function(radius) {
      ///<param name="radius" type="Number" integer="false"></param>
      ///<returns type="SuperMap.Web.Core.GeoCircle3D"></returns>
	SuperMap.Web.Core.GeoCircle3D.initializeBase(this);

    //Com对象
	this._innerGeometry = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateGeometry(SuperMap.Web.Core.GeometryType.GEOCIRCLE3D);
    if ( this._innerGeometry == null)
    {
        return null;
    }
    this._innerGeometry.Radius=radius;

};
SuperMap.Web.Core.GeoCircle3D.prototype = {

    dispose: function() {
        ///<returns type="void">析构函数</returns>
        this._innerGeometry = null;
    },

    get_radius: function() {
        ///<value type="Number" integer="false">圆半径</value>

        return this._innerGeometry.Radius;
    },
    set_radius: function(x) {
        var n_x = parseFloat(x);
        if (!isNaN(n_x)) {
            this._innerGeometry.Radius = n_x;
        }
    },
    get_center: function() {
        ///<value type="SuperMap.Web.Core.Point3D">圆中心</value>
        var center = this._innerGeometry.CenterPoint;
		return SuperMap.Web.Core.Conversion._ConvertSRObject2Object(center, "Point3D");
    },
    clone: function() {
        ///<returns type="SuperMap.Web.Core.GeoCircle3D"></returns>
        var innerGeoCircle3D = this._innerGeometry.Clone();
        if (innerGeoCircle3D == null) {
            return null;
        }
        var geoCircle3D = new SuperMap.Web.Core.GeoCircle3D();
        geoCircle3D._set_innerGeometry(innerGeoCircle3D);
        return geoCircle3D;
    },
    /*
    *几何对象是否有效，例如对于Geoline3D如果只有一个点就为无效的Geoline3D，区别于isEmpty
    *对于GeoReion3D，如果三点在一条直线上也是无效的。
    */
    isValid: function() {
        ///<returns type="Boolean"></returns>
        if ( this._innerGeometry == null){
            return false;
        }
        return this._innerGeometry.IsValid;
    }
    /*******底层未实现*******
    mirror3D: function(mirrorPoint1, mirrorPoint2, mirrorPoint3) {
        ///<param name="mirrorPoint1" type="SuperMap.Web.Core.Point3D"></param>
        ///<param name="mirrorPoint2" type="SuperMap.Web.Core.Point3D"></param>
        ///<param name="mirrorPoint3" type="SuperMap.Web.Core.Point3D"></param>
        ///<returns type="SuperMap.Web.Core.GeoCircle3D"></returns>
        if ( this._innerGeometry == null) {
            return null;
        }
        if (SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint1) && !mirrorPoint1.isEmpty() &&
            SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint2) && !mirrorPoint2.isEmpty() &&
            SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint3) && !mirrorPoint3.isEmpty()) {

            var innerMirrorPoint1 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint1);
            var innerMirrorPoint2 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint2);
            var innerMirrorPoint3 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint3);

            if (innerMirrorPoint1 == null || innerMirrorPoint2 == null || innerMirrorPoint3 == null) {
                return null;
            }
            var innerGeoCircle3D = this._innerGeometry.Mirror3D(innerMirrorPoint1, innerMirrorPoint2, innerMirrorPoint3);
            if (innerGeoCircle3D == null) {
                return null;
            }
            var geoCircle3D = new SuperMap.Web.Core.GeoCircle3D();
            geoCircle3D._set_innerGeometry(innerSphere);
            return geoCircle3D;
        }
        return null;
    }
    *********************************/
}
SuperMap.Web.Core.GeoCircle3D.registerClass('SuperMap.Web.Core.GeoCircle3D', SuperMap.Web.Core.Geometry3D, Sys.IDisposable);


/**
* 类名 : GeoCone
* 描   述： 三维几何圆椎体对象
* 版 本 号：
*/
SuperMap.Web.Core.GeoCone = function(radius,height) {
     ///<param name="radius" type="Number" integer="false">圆锥底面半径</param>
     ///<param name="height" type="Number" integer="false">圆锥高度</param>
     ///<returns type="SuperMap.Web.Core.GeoCone"></returns>
	SuperMap.Web.Core.GeoCone.initializeBase(this);

    //Com对象
	this._innerGeometry = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateGeometry(SuperMap.Web.Core.GeometryType.GEOCONE);
    if ( this._innerGeometry == null)
    {
        return null;
    }
    this._innerGeometry.Radius=radius;
    this._innerGeometry.Height=height;

};
SuperMap.Web.Core.GeoCone.prototype = {

    dispose: function() {
        ///<returns type="void">析构函数</returns>
        this._innerGeometry = null;
    },
    get_radius: function() {
        ///<value type="Number" integer="false">圆锥底面半径</value>
        return this._innerGeometry.Radius;
    },
    set_radius: function(x) {
        var n_x = parseFloat(x);
        if (!isNaN(n_x)) {
            this._innerGeometry.Radius = n_x;
        }
    },
    get_center: function() {
        ///<value type="SuperMap.Web.Core.Point3D">圆锥中心点</value>
        var center = this._innerGeometry.CenterPoint;
		return SuperMap.Web.Core.Conversion._ConvertSRObject2Object(center, "Point3D");
    },
    get_height: function(){
        ///<value type="Number" integer="false">圆锥高度</value>
        return this._innerGeometry.Height;
    },
    set_height:function(x){
        var n_x = parseFloat(x);
        if (!isNaN(n_x)) {
            this._innerGeometry.Height = n_x;
        }
    },
    clone: function() {
        ///<returns type="SuperMap.Web.Core.GeoCone"></returns>
        var innerGeoCone = this._innerGeometry.Clone();
        if (innerGeoCone == null) {
            return null;
        }
        var geoCone = new SuperMap.Web.Core.GeoCone();
        geoCone._set_innerGeometry(innerGeoCone);
        return geoCone;
    },
    /*
    *几何对象是否有效，例如对于Geoline3D如果只有一个点就为无效的Geoline3D，区别于isEmpty
    *对于GeoReion3D，如果三点在一条直线上也是无效的。
    */
    isValid: function() {
        ///<returns type="Boolean"></returns>
        if ( this._innerGeometry == null){
            return false;
        }
        return this._innerGeometry.IsValid;
    }
   /*************************底层暂未实现
    mirror3D: function(mirrorPoint1, mirrorPoint2, mirrorPoint3) {
        ///<param name="mirrorPoint1" type="SuperMap.Web.Core.Point3D"></param>
        ///<param name="mirrorPoint2" type="SuperMap.Web.Core.Point3D"></param>
        ///<param name="mirrorPoint3" type="SuperMap.Web.Core.Point3D"></param>
        ///<returns type="SuperMap.Web.Core.GeoCone"></returns>
        if ( this._innerGeometry == null) {
            return null;
        }
        if (SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint1) && !mirrorPoint1.isEmpty() &&
            SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint2) && !mirrorPoint2.isEmpty() &&
            SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint3) && !mirrorPoint3.isEmpty()) {

            var innerMirrorPoint1 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint1);
            var innerMirrorPoint2 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint2);
            var innerMirrorPoint3 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint3);

            if (innerMirrorPoint1 == null || innerMirrorPoint2 == null || innerMirrorPoint3 == null) {
                return null;
            }
            var innerGeoCone = this._innerGeometry.Mirror3D(innerMirrorPoint1, innerMirrorPoint2, innerMirrorPoint3);
            if (innerGeoCone == null) {
                return null;
            }
            var geoCone = new SuperMap.Web.Core.GeoCone();
            geoCone._set_innerGeometry(innerSphere);
            return geoCone;
        }
        return null;
    }
    *****************************************///
}
SuperMap.Web.Core.GeoCone.registerClass('SuperMap.Web.Core.GeoCone', SuperMap.Web.Core.Geometry3D, Sys.IDisposable);

/**
* 类名 : GeoCylinder
* 描   述： 三维几何圆柱对象
* 版 本 号：
*/
SuperMap.Web.Core.GeoCylinder = function(radiusTop,radiusBottom,height) {
     ///<param name="radiusTop" type="Number" integer="false">圆柱顶面半径</param>
     ///<param name="radiusBottom" type="Number" integer="false">圆柱底面半径</param>
     ///<param name="height" type="Number" integer="false">圆柱体高度</param>
      ///<returns type="SuperMap.Web.Core.GeoCylinder"></returns>
	SuperMap.Web.Core.GeoCylinder.initializeBase(this);

    //Com对象
	this._innerGeometry = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateGeometry(SuperMap.Web.Core.GeometryType.GEOCYLINDER);
    if ( this._innerGeometry == null)
    {
        return null;
    }
    this._innerGeometry.RadiusTop=radiusTop;
    this._innerGeometry.RadiusBottom=radiusBottom;
    this._innerGeometry.Height=height;

};
SuperMap.Web.Core.GeoCylinder.prototype = {

    dispose: function() {
        ///<returns type="void">析构函数</returns>
        this._innerGeometry = null;
    },
    get_radiusTop: function() {
        ///<value type="Number" integer="false">圆柱顶面半径</value>
        return this._innerGeometry.RadiusTop;
    },
    set_radiusTop: function(x) {
        var n_x = parseFloat(x);
        if (!isNaN(n_x)) {
            this._innerGeometry.RadiusTop = n_x;
        }
    },
    get_radiusBottom: function() {
        ///<value type="Number" integer="false">圆柱底面半径</value>
        return this._innerGeometry.RadiusBottom;
    },
    set_radiusBottom: function(x) {
        var n_x = parseFloat(x);
        if (!isNaN(n_x)) {
            this._innerGeometry.RadiusBottom = n_x;
        }
    },
    get_center: function() {
        ///<value type="SuperMap.Web.Core.Point3D">圆柱体的中心点</value>
        var center = this._innerGeometry.CenterPoint;
		return SuperMap.Web.Core.Conversion._ConvertSRObject2Object(center, "Point3D");
    },
    get_height: function(){
         ///<value type="Number" integer="false">圆柱体高度</value>
        return this._innerGeometry.Height;
    },
    set_height:function(x){
        var n_x = parseFloat(x);
        if (!isNaN(n_x)) {
            this._innerGeometry.Height = n_x;
        }
    },
    clone: function() {
        ///<returns type="SuperMap.Web.Core.GeoCylinder"></returns>
        var innerGeoCylinder = this._innerGeometry.Clone();
        if (innerGeoCylinder == null) {
            return null;
        }
        var geoCylinder = new SuperMap.Web.Core.GeoCylinder();
        geoCylinder._set_innerGeometry(innerGeoCylinder);
        return geoCylinder;
    },
    /*
    *几何对象是否有效，例如对于Geoline3D如果只有一个点就为无效的Geoline3D，区别于isEmpty
    *对于GeoReion3D，如果三点在一条直线上也是无效的。
    */
    isValid: function() {
        ///<returns type="Boolean"></returns>
        if ( this._innerGeometry == null){
            return false;
        }
        return this._innerGeometry.IsValid;
    }
    /************暂未实现
    mirror3D: function(mirrorPoint1, mirrorPoint2, mirrorPoint3) {
        ///<param name="mirrorPoint1" type="SuperMap.Web.Core.Point3D"></param>
        ///<param name="mirrorPoint2" type="SuperMap.Web.Core.Point3D"></param>
        ///<param name="mirrorPoint3" type="SuperMap.Web.Core.Point3D"></param>
        ///<returns type="SuperMap.Web.Core.GeoCylinder"></returns>
        if ( this._innerGeometry == null) {
            return null;
        }
        if (SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint1) && !mirrorPoint1.isEmpty() &&
            SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint2) && !mirrorPoint2.isEmpty() &&
            SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint3) && !mirrorPoint3.isEmpty()) {

            var innerMirrorPoint1 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint1);
            var innerMirrorPoint2 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint2);
            var innerMirrorPoint3 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint3);

            if (innerMirrorPoint1 == null || innerMirrorPoint2 == null || innerMirrorPoint3 == null) {
                return null;
            }
            var innerGeoCylinder = this._innerGeometry.Mirror3D(innerMirrorPoint1, innerMirrorPoint2, innerMirrorPoint3);
            if (innerGeoCylinder == null) {
                return null;
            }
            var geoCylinder = new SuperMap.Web.Core.GeoCylinder();
            geoCylinder._set_innerGeometry(innerSphere);
            return geoCylinder;
        }
        return null;
    }
    ********************/
}
SuperMap.Web.Core.GeoCylinder.registerClass('SuperMap.Web.Core.GeoCylinder', SuperMap.Web.Core.Geometry3D, Sys.IDisposable);


/**
* 类名 : GeoEllipsoid
* 描   述： 三维几何椭球对象
* 版 本 号：
*/
SuperMap.Web.Core.GeoEllipsoid = function(xAxis,yAxis,zAxis,angle) {
     ///<param name="xAxis" type="Number" integer="false">椭球的x轴值</param>
     ///<param name="yAxis" type="Number" integer="false">椭球的y轴值</param>
     ///<param name="zAxis" type="Number" integer="false">椭球的z轴值</param>
     ///<param name="angle" type="Number" integer="false">椭球旋转角度</param>
      ///<returns type="SuperMap.Web.Core.GeoEllipsoid"></returns>
	SuperMap.Web.Core.GeoEllipsoid.initializeBase(this);

    //Com对象
	this._innerGeometry = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateGeometry(SuperMap.Web.Core.GeometryType.GEOELLIPSOID);
    if ( this._innerGeometry == null)
    {
        return null;
    }
    this._innerGeometry.PriAxis=xAxis;
    this._innerGeometry.ThiAxis=yAxis;
    this._innerGeometry.SecAxis=zAxis;
    this._innerGeometry.Angle=angle;

};
SuperMap.Web.Core.GeoEllipsoid.prototype = {

    dispose: function() {
        ///<returns type="void">析构函数</returns>
        this._innerGeometry = null;
    },
    get_xAxis: function() {
        ///<value type="Number" integer="false">椭球的x轴值</value>

        return this._innerGeometry.PriAxis;
    },
    set_xAxis: function(x) {
        var n_x = parseFloat(x);
        if (!isNaN(n_x)) {
            this._innerGeometry.PriAxis = n_x;
        }
    },
    get_yAxis: function() {
        ///<value type="Number" integer="false">椭球的y轴值</value>
        return this._innerGeometry.ThiAxis;
    },
    set_yAxis: function(x) {
        var n_x = parseFloat(x);
        if (!isNaN(n_x)) {
            this._innerGeometry.ThiAxis = n_x;
        }
    },
    get_zAxis: function(){
         ///<value type="Number" integer="false">椭球的z轴值</value>
        return this._innerGeometry.SecAxis;
    },
    set_zAxis:function(x){
        var n_x = parseFloat(x);
        if (!isNaN(n_x)) {
            this._innerGeometry.SecAxis = n_x;
        }
    },
    get_angle:function(){
         ///<value type="Number" integer="false">椭球旋转角度值</value>
        return this._innerGeometry.Angle;
    },
    set_angle:function(x){
        var n_x = parseFloat(x);
        if (!isNaN(n_x)) {
            this._innerGeometry.Angle= n_x;
        }
    },
    get_center: function() {
       ///<value type="SuperMap.Web.Core.Point3D">椭球的中心点</value>
        var center = this._innerGeometry.CenterPoint;
		return SuperMap.Web.Core.Conversion._ConvertSRObject2Object(center, "Point3D");
    },
    clone: function() {
        ///<returns type="SuperMap.Web.Core.GeoEllipsoid"></returns>
        var innerGeoEllipsoid = this._innerGeometry.Clone();
        if (innerGeoEllipsoid == null) {
            return null;
        }
        var geoEllipsoid = new SuperMap.Web.Core.GeoEllipsoid();
        geoEllipsoid._set_innerGeometry(innerGeoEllipsoid);
        return geoEllipsoid;
    },
    /*
    *几何对象是否有效，例如对于Geoline3D如果只有一个点就为无效的Geoline3D，区别于isEmpty
    *对于GeoReion3D，如果三点在一条直线上也是无效的。
    */
    isValid: function() {
        ///<returns type="Boolean"></returns>
        if ( this._innerGeometry == null){
            return false;
        }
        return this._innerGeometry.IsValid;
    }
    /*********************暂不实现
    mirror3D: function(mirrorPoint1, mirrorPoint2, mirrorPoint3) {
        ///<param name="mirrorPoint1" type="SuperMap.Web.Core.Point3D"></param>
        ///<param name="mirrorPoint2" type="SuperMap.Web.Core.Point3D"></param>
        ///<param name="mirrorPoint3" type="SuperMap.Web.Core.Point3D"></param>
        ///<returns type="SuperMap.Web.Core.GeoEllipsoid"></returns>
        if ( this._innerGeometry == null) {
            return null;
        }
        if (SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint1) && !mirrorPoint1.isEmpty() &&
            SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint2) && !mirrorPoint2.isEmpty() &&
            SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint3) && !mirrorPoint3.isEmpty()) {

            var innerMirrorPoint1 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint1);
            var innerMirrorPoint2 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint2);
            var innerMirrorPoint3 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint3);

            if (innerMirrorPoint1 == null || innerMirrorPoint2 == null || innerMirrorPoint3 == null) {
                return null;
            }
            var innerGeoEllipsoid = this._innerGeometry.Mirror3D(innerMirrorPoint1, innerMirrorPoint2, innerMirrorPoint3);
            if (innerGeoEllipsoid == null) {
                return null;
            }
            var geoEllipsoid = new SuperMap.Web.Core.GeoEllipsoid();
            geoEllipsoid._set_innerGeometry(innerSphere);
            return geoEllipsoid;
        }
        return null;
    }
    ************************/
}
SuperMap.Web.Core.GeoEllipsoid.registerClass('SuperMap.Web.Core.GeoEllipsoid', SuperMap.Web.Core.Geometry3D, Sys.IDisposable);


/**
* 类名 : GeoHemiSphere
* 描   述： 三维几何半球对象
* 版 本 号：
*/
SuperMap.Web.Core.GeoHemiSphere = function(radius) {
     ///<param name="radius" type="Number" integer="false">几何半球半径</param>
      ///<returns type="SuperMap.Web.Core.GeoHemiSphere"></returns>

	SuperMap.Web.Core.GeoHemiSphere.initializeBase(this);

    //Com对象
	this._innerGeometry = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateGeometry(SuperMap.Web.Core.GeometryType.GEOHEMISPHERE);
    if ( this._innerGeometry == null)
    {
        return null;
    }
    this._innerGeometry.Radius=radius;

};
SuperMap.Web.Core.GeoHemiSphere.prototype = {

    dispose: function() {
        ///<returns type="void">析构函数</returns>
        this._innerGeometry = null;
    },

    get_radius: function() {
        ///<value type="Number" integer="false">几何半球半径</value>

        return this._innerGeometry.Radius;
    },
    set_radius: function(x) {
        var n_x = parseFloat(x);
        if (!isNaN(n_x)) {
            this._innerGeometry.Radius = n_x;
        }
    },
    get_center: function() {
       ///<value type="SuperMap.Web.Core.Point3D">几何半球的中心点</value>
        var center = this._innerGeometry.CenterPoint;
		return SuperMap.Web.Core.Conversion._ConvertSRObject2Object(center, "Point3D");
    },
    clone: function() {
        ///<returns type="SuperMap.Web.Core.GeoHemiSphere"></returns>
        var innerGeoHemiSphere = this._innerGeometry.Clone();
        if (innerGeoHemiSphere == null) {
            return null;
        }
        var geoHemiSphere = new SuperMap.Web.Core.GeoHemiSphere();
        geoHemiSphere._set_innerGeometry(innerGeoHemiSphere);
        return geoHemiSphere;
    },
    /*
    *几何对象是否有效，例如对于Geoline3D如果只有一个点就为无效的Geoline3D，区别于isEmpty
    *对于GeoReion3D，如果三点在一条直线上也是无效的。
    */
    isValid: function() {
        ///<returns type="Boolean"></returns>
        if ( this._innerGeometry == null){
            return false;
        }
        return this._innerGeometry.IsValid;
    }
    /************************暂未实现
    mirror3D: function(mirrorPoint1, mirrorPoint2, mirrorPoint3) {
        ///<param name="mirrorPoint1" type="SuperMap.Web.Core.Point3D"></param>
        ///<param name="mirrorPoint2" type="SuperMap.Web.Core.Point3D"></param>
        ///<param name="mirrorPoint3" type="SuperMap.Web.Core.Point3D"></param>
        ///<returns type="SuperMap.Web.Core.GeoHemiSphere"></returns>
        if ( this._innerGeometry == null) {
            return null;
        }
        if (SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint1) && !mirrorPoint1.isEmpty() &&
            SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint2) && !mirrorPoint2.isEmpty() &&
            SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint3) && !mirrorPoint3.isEmpty()) {

            var innerMirrorPoint1 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint1);
            var innerMirrorPoint2 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint2);
            var innerMirrorPoint3 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint3);

            if (innerMirrorPoint1 == null || innerMirrorPoint2 == null || innerMirrorPoint3 == null) {
                return null;
            }
            var innerHemiSphere = this._innerGeometry.Mirror3D(innerMirrorPoint1, innerMirrorPoint2, innerMirrorPoint3);
            if (innerHemiSphere == null) {
                return null;
            }
            var geoHemiSphere = new SuperMap.Web.Core.GeoHemiSphere();
            geoHemiSphere._set_innerGeometry(innerHemiSphere);
            return geoHemiSphere;
        }
        return null;
    }
    ***************/
}
SuperMap.Web.Core.GeoHemiSphere.registerClass('SuperMap.Web.Core.GeoHemiSphere', SuperMap.Web.Core.Geometry3D, Sys.IDisposable);

/**
* 类名 : GeoPie3D
* 描   述： 三维几何扇形对象
* 版 本 号：
*/
SuperMap.Web.Core.GeoPie3D = function() {
      ///<returns type="SuperMap.Web.Core.GeoPie3D"></returns>
	SuperMap.Web.Core.GeoPie3D.initializeBase(this);

    //Com对象
	this._innerGeometry = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateGeometry(SuperMap.Web.Core.GeometryType.GEOPIE3D);
    if ( this._innerGeometry == null)
    {
        return null;
    }
};
SuperMap.Web.Core.GeoPie3D.prototype = {

    dispose: function() {
        ///<returns type="void">析构函数</returns>
        this._innerGeometry = null;
    },
    get_semiMajorAxis: function() {
        ///<value type="Number" integer="false">长半轴</value>
        return this._innerGeometry.SemiMajorAxis;
    },
    set_semiMajorAxis: function(x) {
        var n_x = parseFloat(x);
        if (!isNaN(n_x)) {
            this._innerGeometry.SemiMajorAxis = n_x;
        }
    },
    get_semiMinorAxis: function() {
        ///<value type="Number" integer="false">短半轴</value>
        return this._innerGeometry.SemiMinorAxis;
    },
    set_semiMinorAxis: function(x) {
        var n_x = parseFloat(x);
        if (!isNaN(n_x)) {
            this._innerGeometry.SemiMinorAxis = n_x;
        }
    },
    get_startAngle: function(){
        ///<value type="Number" integer="false">起始角度</value>
        return this._innerGeometry.StartAngle;
    },
    set_startAngle:function(x){
        var n_x = parseFloat(x);
        if (!isNaN(n_x)) {
            this._innerGeometry.StartAngle = n_x;
        }
    },
    get_endAngle:function(){
        ///<value type="Number" integer="false">终止角度</value>
        return this._innerGeometry.EndAngle;
    },
    set_endAngle:function(x){
        var n_x = parseFloat(x);
        if (!isNaN(n_x)) {
            this._innerGeometry.EndAngle= n_x;
        }
    },
    get_rotationAngle:function(){
        ///<value type="Number" integer="false">旋转角度</value>
        return this._innerGeometry.RotationAngle;
    },
    set_rotationAngle:function(x){
        var n_x = parseFloat(x);
        if (!isNaN(n_x)) {
            this._innerGeometry.RotationAngle= n_x;
        }
    },
    get_center: function() {
        ///<value type="SuperMap.Web.Core.Point3D">三维扇面的中心点</value>
        var center = this._innerGeometry.CenterPoint;
		return SuperMap.Web.Core.Conversion._ConvertSRObject2Object(center, "Point3D");
    },
    clone: function() {
        ///<returns type="SuperMap.Web.Core.GeoPie3D"></returns>
        var innerGeoPie3D = this._innerGeometry.Clone();
        if (innerGeoPie3D == null) {
            return null;
        }
        var geoPie3D = new SuperMap.Web.Core.GeoPie3D();
        geoPie3D._set_innerGeometry(innerGeoPie3D);
        return geoPie3D;
    },
    /*
    *几何对象是否有效，例如对于Geoline3D如果只有一个点就为无效的Geoline3D，区别于isEmpty
    *对于GeoReion3D，如果三点在一条直线上也是无效的。
    */
    isValid: function() {
        ///<returns type="Boolean"></returns>
        if ( this._innerGeometry == null){
            return false;
        }
        return this._innerGeometry.IsValid;
    }
    /***************************
    mirror3D: function(mirrorPoint1, mirrorPoint2, mirrorPoint3) {
        ///<param name="mirrorPoint1" type="SuperMap.Web.Core.Point3D"></param>
        ///<param name="mirrorPoint2" type="SuperMap.Web.Core.Point3D"></param>
        ///<param name="mirrorPoint3" type="SuperMap.Web.Core.Point3D"></param>
        ///<returns type="SuperMap.Web.Core.GeoPie3D"></returns>
        if ( this._innerGeometry == null) {
            return null;
        }
        if (SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint1) && !mirrorPoint1.isEmpty() &&
            SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint2) && !mirrorPoint2.isEmpty() &&
            SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint3) && !mirrorPoint3.isEmpty()) {

            var innerMirrorPoint1 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint1);
            var innerMirrorPoint2 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint2);
            var innerMirrorPoint3 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint3);

            if (innerMirrorPoint1 == null || innerMirrorPoint2 == null || innerMirrorPoint3 == null) {
                return null;
            }
            var innerGeoPie3D = this._innerGeometry.Mirror3D(innerMirrorPoint1, innerMirrorPoint2, innerMirrorPoint3);
            if (innerGeoPie3D == null) {
                return null;
            }
            var geoPie3D = new SuperMap.Web.Core.GeoPie3D();
            geoPie3D._set_innerGeometry(innerSphere);
            return geoPie3D;
        }
        return null;
    }
    *****************************/
}
SuperMap.Web.Core.GeoPie3D.registerClass('SuperMap.Web.Core.GeoPie3D', SuperMap.Web.Core.Geometry3D, Sys.IDisposable);

/**
* 类名 : GeoPieCylinder
* 描   述： 三维几何扇面圆柱体对象
* 版 本 号：
*/
SuperMap.Web.Core.GeoPieCylinder = function() {
      ///<returns type="SuperMap.Web.Core.GeoPieCylinder"></returns>
	SuperMap.Web.Core.GeoPieCylinder.initializeBase(this);

    //Com对象
	this._innerGeometry = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateGeometry(SuperMap.Web.Core.GeometryType.GEOPIECYLINDER);
    if ( this._innerGeometry == null)
    {
        return null;
    }
};
SuperMap.Web.Core.GeoPieCylinder.prototype = {

    dispose: function() {
        ///<returns type="void">析构函数</returns>
        this._innerGeometry = null;
    },
    get_semiMajorAxis: function() {
        ///<value type="Number" integer="false">扇面的长半轴</value>
        return this._innerGeometry.SemiMajorAxis;
    },
    set_semiMajorAxis: function(x) {
        var n_x = parseFloat(x);
        if (!isNaN(n_x)) {
            this._innerGeometry.SemiMajorAxis = n_x;
        }
    },
    get_semiMinorAxis: function() {
        ///<value type="Number" integer="false">扇面的短半轴</value>
        return this._innerGeometry.SemiMinorAxis;
    },
    set_semiMinorAxis: function(x) {
        var n_x = parseFloat(x);
        if (!isNaN(n_x)) {
            this._innerGeometry.SemiMinorAxis = n_x;
        }
    },
    get_startAngle: function(){
        ///<value type="Number" integer="false">扇面的起始角度</value>
        return this._innerGeometry.StartAngle;
    },
    set_startAngle:function(x){
        var n_x = parseFloat(x);
        if (!isNaN(n_x)) {
            this._innerGeometry.StartAngle = n_x;
        }
    },
    get_endAngle:function(){
         ///<value type="Number" integer="false">扇面的终止角度</value>
        return this._innerGeometry.EndAngle;
    },
    set_endAngle:function(x){
        var n_x = parseFloat(x);
        if (!isNaN(n_x)) {
            this._innerGeometry.EndAngle= n_x;
        }
    },
    get_rotationAngle:function(){
         ///<value type="Number" integer="false">旋转角度</value>
        return this._innerGeometry.RotationAngle;
    },
    set_rotationAngle:function(x){
        var n_x = parseFloat(x);
        if (!isNaN(n_x)) {
            this._innerGeometry.RotationAngle= n_x;
        }
    },
    get_height:function(){
        ///<value type="Number" integer="false">扇面圆柱的高度</value>
        return this._innerGeometry.Height;
    },
    set_height:function(x){
        var n_x = parseFloat(x);
        if (!isNaN(n_x)) {
            this._innerGeometry.Height= n_x;

        }
    },
    get_center: function() {
        ///<value type="SuperMap.Web.Core.Point3D">扇面圆柱的中心点</value>
        var center = this._innerGeometry.CenterPoint;
		return SuperMap.Web.Core.Conversion._ConvertSRObject2Object(center, "Point3D");
    },
    clone: function() {
        ///<returns type="SuperMap.Web.Core.GeoPieCylinder"></returns>
        var innerGeoPieCylinder = this._innerGeometry.Clone();
        if (innerGeoPieCylinder == null) {
            return null;
        }
        var geoPieCylinder = new SuperMap.Web.Core.GeoPieCylinder();
        geoPieCylinder._set_innerGeometry(innerGeoPieCylinder);
        return geoPieCylinder;
    },
    /*
    *几何对象是否有效，例如对于Geoline3D如果只有一个点就为无效的Geoline3D，区别于isEmpty
    *对于GeoReion3D，如果三点在一条直线上也是无效的。
    */
    isValid: function() {
        ///<returns type="Boolean"></returns>
        if ( this._innerGeometry == null){
            return false;
        }
        return this._innerGeometry.IsValid;
    }
    /*******************暂未实现
    mirror3D: function(mirrorPoint1, mirrorPoint2, mirrorPoint3) {
        ///<param name="mirrorPoint1" type="SuperMap.Web.Core.Point3D"></param>
        ///<param name="mirrorPoint2" type="SuperMap.Web.Core.Point3D"></param>
        ///<param name="mirrorPoint3" type="SuperMap.Web.Core.Point3D"></param>
        ///<returns type="SuperMap.Web.Core.GeoPieCylinder"></returns>
        if ( this._innerGeometry == null) {
            return null;
        }
        if (SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint1) && !mirrorPoint1.isEmpty() &&
            SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint2) && !mirrorPoint2.isEmpty() &&
            SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint3) && !mirrorPoint3.isEmpty()) {

            var innerMirrorPoint1 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint1);
            var innerMirrorPoint2 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint2);
            var innerMirrorPoint3 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint3);

            if (innerMirrorPoint1 == null || innerMirrorPoint2 == null || innerMirrorPoint3 == null) {
                return null;
            }
            var innerGeoPieCylinder = this._innerGeometry.Mirror3D(innerMirrorPoint1, innerMirrorPoint2, innerMirrorPoint3);
            if (innerGeoPieCylinder == null) {
                return null;
            }
            var geoPieCylinder = new SuperMap.Web.Core.GeoPieCylinder();
            geoPieCylinder._set_innerGeometry(innerSphere);
            return geoPieCylinder;
        }
        return null;
    }
    ******************/
}
SuperMap.Web.Core.GeoPieCylinder.registerClass('SuperMap.Web.Core.GeoPieCylinder', SuperMap.Web.Core.Geometry3D, Sys.IDisposable);


/**
* 类名 : GeoPyramid
* 描   述： 三维棱锥对象
* 版 本 号：
*/
SuperMap.Web.Core.GeoPyramid = function(length,width,height) {
      ///<param name="length" type="Number" integer="false">棱锥底部的长度</param>
      ///<param name="width" type="Number" integer="false">棱锥底部的宽度</param>
      ///<param name="height" type="Number" integer="false">棱锥的高度</param>
      ///<returns type="SuperMap.Web.Core.GeoPyramid"></returns>
	SuperMap.Web.Core.GeoPyramid.initializeBase(this);

    //Com对象
	this._innerGeometry = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateGeometry(SuperMap.Web.Core.GeometryType.GEOPYRAMID);
    if ( this._innerGeometry == null)
    {
        return null;
    }
    this._innerGeometry.PyramidLength=length;
    this._innerGeometry.PyramidWidth=width;
    this._innerGeometry.PyramidHeight=height;
};
SuperMap.Web.Core.GeoPyramid.prototype = {

    dispose: function() {
        ///<returns type="void">析构函数</returns>
        this._innerGeometry = null;
    },
    get_pyramidLength: function() {
        ///<value type="Number" integer="false">棱锥底部的长度</value>
        return this._innerGeometry.PyramidLength;
    },
    set_pyramidLength: function(x) {
        var n_x = parseFloat(x);
        if (!isNaN(n_x)) {
            this._innerGeometry.PyramidLength = n_x;
        }
    },
    get_pyramidWidth: function() {
        ///<value type="Number" integer="false">棱锥底部的宽度</value>
        return this._innerGeometry.PyramidWidth;
    },
    set_pyramidWidth: function(x) {
        var n_x = parseFloat(x);
        if (!isNaN(n_x)) {
            this._innerGeometry.PyramidWidth = n_x;
        }
    },
    get_pyramidHeight: function(){
        ///<value type="Number" integer="false">棱锥底部的高度</value>
        return this._innerGeometry.PyramidHeight;
    },
    set_pyramidHeight:function(x){
        var n_x = parseFloat(x);
        if (!isNaN(n_x)) {
            this._innerGeometry.PyramidHeight = n_x;
        }
    },
    get_center: function() {
       ///<value type="SuperMap.Web.Core.Point3D">棱锥的中心点</value>
        var center = this._innerGeometry.CenterPoint;
		return SuperMap.Web.Core.Conversion._ConvertSRObject2Object(center, "Point3D");
    },
    clone: function() {
        ///<returns type="SuperMap.Web.Core.GeoPyramid"></returns>
        var innerGeoPyramid = this._innerGeometry.Clone();
        if (innerGeoPyramid == null) {
            return null;
        }
        var geoPyramid = new SuperMap.Web.Core.GeoPyramid();
        geoPyramid._set_innerGeometry(innerGeoPyramid);
        return geoPyramid;
    },
    /*
    *几何对象是否有效，例如对于Geoline3D如果只有一个点就为无效的Geoline3D，区别于isEmpty
    *对于GeoReion3D，如果三点在一条直线上也是无效的。
    */
    isValid: function() {
        ///<returns type="Boolean"></returns>
        if ( this._innerGeometry == null){
            return false;
        }
        return this._innerGeometry.IsValid;
    }
    /***************暂未实现
    mirror3D: function(mirrorPoint1, mirrorPoint2, mirrorPoint3) {
        ///<param name="mirrorPoint1" type="SuperMap.Web.Core.Point3D"></param>
        ///<param name="mirrorPoint2" type="SuperMap.Web.Core.Point3D"></param>
        ///<param name="mirrorPoint3" type="SuperMap.Web.Core.Point3D"></param>
        ///<returns type="SuperMap.Web.Core.GeoPyramid"></returns>
        if ( this._innerGeometry == null) {
            return null;
        }
        if (SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint1) && !mirrorPoint1.isEmpty() &&
            SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint2) && !mirrorPoint2.isEmpty() &&
            SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint3) && !mirrorPoint3.isEmpty()) {

            var innerMirrorPoint1 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint1);
            var innerMirrorPoint2 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint2);
            var innerMirrorPoint3 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint3);

            if (innerMirrorPoint1 == null || innerMirrorPoint2 == null || innerMirrorPoint3 == null) {
                return null;
            }
            var innerGeoPyramid = this._innerGeometry.Mirror3D(innerMirrorPoint1, innerMirrorPoint2, innerMirrorPoint3);
            if (innerGeoPyramid == null) {
                return null;
            }
            var geoPyramid = new SuperMap.Web.Core.GeoPyramid();
            geoPyramid._set_innerGeometry(innerSphere);
            return geoPyramid;
        }
        return null;
    }
    ***********************/
}
SuperMap.Web.Core.GeoPyramid.registerClass('SuperMap.Web.Core.GeoPyramid', SuperMap.Web.Core.Geometry3D, Sys.IDisposable);


/**
* 类名 : GeoBox
* 描   述： 三维盒对象
* 版 本 号：
*/
SuperMap.Web.Core.GeoBox = function(length,width,height) {
     ///<param name="length" type="Number" integer="false">盒的长度(z)</param>
     ///<param name="width"  type="Number" integer="false">盒的宽度(x)</param>
     ///<param name="height" type="Number" integer="false">盒的高度(y)</param>
      ///<returns type="SuperMap.Web.Core.GeoBox"></returns>
	SuperMap.Web.Core.GeoBox.initializeBase(this);

    //Com对象
	this._innerGeometry = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateGeometry(SuperMap.Web.Core.GeometryType.GEOBOX);
    if ( this._innerGeometry == null)
    {
        return null;
    }
    this._innerGeometry.Length=length;
    this._innerGeometry.Width=width;
    this._innerGeometry.Height=height;
};
SuperMap.Web.Core.GeoBox.prototype = {

    dispose: function() {
        ///<returns type="void">析构函数</returns>
        this._innerGeometry = null;
    },
    get_length: function() {
        ///<value type="Number" integer="false">盒的长度(z)</value>
        return this._innerGeometry.Length;
    },
    set_length: function(x) {
        var n_x = parseFloat(x);
        if (!isNaN(n_x)) {
            this._innerGeometry.Length = n_x;
        }
    },
    get_width: function() {
        ///<value type="Number" integer="false">盒的宽度(x)</value>
        return this._innerGeometry.Width;
    },
    set_width: function(x) {
        var n_x = parseFloat(x);
        if (!isNaN(n_x)) {
            this._innerGeometry.Width = n_x;
        }
    },
    get_height: function(){
        ///<value type="Number" integer="false">盒的高度(y)</value>
        return this._innerGeometry.Height;
    },
    set_height:function(x){
        var n_x = parseFloat(x);
        if (!isNaN(n_x)) {
            this._innerGeometry.Height = n_x;
        }
    },
    get_center: function() {
        ///<value type="SuperMap.Web.Core.Point3D">盒的中心点</value>
        var center = this._innerGeometry.CenterPoint;
		return SuperMap.Web.Core.Conversion._ConvertSRObject2Object(center, "Point3D");
    },
    clone: function() {
        ///<returns type="SuperMap.Web.Core.GeoBox"></returns>
        var innerGeoBox = this._innerGeometry.Clone();
        if (innerGeoBox == null) {
            return null;
        }
        var geoBox = new SuperMap.Web.Core.GeoBox();
        geoBox._set_innerGeometry(innerGeoBox);
        return geoBox;
    },
    /*
    *几何对象是否有效，例如对于Geoline3D如果只有一个点就为无效的Geoline3D，区别于isEmpty
    *对于GeoReion3D，如果三点在一条直线上也是无效的。
    */
    isValid: function() {
        ///<returns type="Boolean"></returns>
        if ( this._innerGeometry == null){
            return false;
        }
        return this._innerGeometry.IsValid;
    }
    /************暂未实现
    mirror3D: function(mirrorPoint1, mirrorPoint2, mirrorPoint3) {
        ///<param name="mirrorPoint1" type="SuperMap.Web.Core.Point3D"></param>
        ///<param name="mirrorPoint2" type="SuperMap.Web.Core.Point3D"></param>
        ///<param name="mirrorPoint3" type="SuperMap.Web.Core.Point3D"></param>
        ///<returns type="SuperMap.Web.Core.GeoBox"></returns>
        if ( this._innerGeometry == null) {
            return null;
        }
        if (SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint1) && !mirrorPoint1.isEmpty() &&
            SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint2) && !mirrorPoint2.isEmpty() &&
            SuperMap.Web.Core.Point3D.isInstanceOfType(mirrorPoint3) && !mirrorPoint3.isEmpty()) {

            var innerMirrorPoint1 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint1);
            var innerMirrorPoint2 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint2);
            var innerMirrorPoint3 = SuperMap.Web.Core.Conversion._ConvertObject2SRObject(mirrorPoint3);

            if (innerMirrorPoint1 == null || innerMirrorPoint2 == null || innerMirrorPoint3 == null) {
                return null;
            }
            var innerGeoBox = this._innerGeometry.Mirror3D(innerMirrorPoint1, innerMirrorPoint2, innerMirrorPoint3);
            if (innerGeoBox == null) {
                return null;
            }
            var geoBox = new SuperMap.Web.Core.GeoBox();
            geoBox._set_innerGeometry(innerSphere);
            return geoBox;
        }
        return null;
    }
    **************/
}
SuperMap.Web.Core.GeoBox.registerClass('SuperMap.Web.Core.GeoBox', SuperMap.Web.Core.Geometry3D, Sys.IDisposable);
