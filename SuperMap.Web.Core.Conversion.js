//==========================================================================
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。
// 作者：			SuperMap WebClient Team
// 修改：
// 文件名：			SuperMap.Web.Core.Conversion
// 功能：			 转换类，负责com与脚本层的对象转换。内部实现类，不对外开放。
// 最后修改时间：
//==========================================================================
Type.registerNamespace('SuperMap.Web.Core');

SuperMap.Web.Core.Conversion = function()
{
  	// <summary>转换函数集合。</summary>
	// <returns type="object">返回一个 object 对象。</returns>
};

SuperMap.Web.Core.Conversion.registerClass('SuperMap.Web.Core.Conversion', null, Sys.IDisposable);

//////////////////////////////////////////////
/////脚本对象转换为COM对象
//////////////////////////////////////////////
SuperMap.Web.Core.Conversion._ConvertObject2SRObject = function(object)
{
    if (SuperMap.Pixel.isInstanceOfType(object))
    {//转换为com层的Point对象
        var innerPoint = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreatePoint();
        innerPoint.X = object.x;
        innerPoint.Y = object.y;
        return innerPoint;
    }
    if (SuperMap.LonLat.isInstanceOfType(object))
    {//转换为com层的Point2D对象
        var innerPoint2D = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreatePoint2D();

        innerPoint2D.X = object.lon;

        innerPoint2D.Y = object.lat;

        return innerPoint2D;
    }
    if (SuperMap.Web.Core.Point3D.isInstanceOfType(object))
    {//转换为com层的Point3D对象
        var innerPoint3D = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreatePoint3D();

        innerPoint3D.X = object.x;

        innerPoint3D.Y = object.y;

        innerPoint3D.Z = object.z;

        return innerPoint3D;
    }
    if (SuperMap.Bounds.isInstanceOfType(object))
    {//转换为com层的Rectangle2D对象
        var innerRectangle2D = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateRectangle2D();

        innerRectangle2D.Left = object.left;

        innerRectangle2D.Bottom = object.bottom;

        innerRectangle2D.Right = object.right;

        innerRectangle2D.Top = object.top;

        return innerRectangle2D;
    }
    if (this._isPoint2Ds(object))
    {//转换为com层的Point2Ds对象
        var innerPoint2Ds = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreatePoint2Ds();

        for (var i = 0; i < object.length; i++)
        {
            var point2D = object[i];
            var innerPoint2D = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreatePoint2D();
            innerPoint2D.X = point2D.lon;
            innerPoint2D.Y = point2D.lat;
            innerPoint2Ds.Add(innerPoint2D);
        }
        return innerPoint2Ds;
    }
    if (SuperMap.Geometry.Point.isInstanceOfType(object))
    {
        var geopoint3dOjbect = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateGeometry(SuperMap.Web.Core.GeometryType.GEOPOINT3D);
        geopoint3dOjbect.X = object.x;
        geopoint3dOjbect.Y = object.y;

        return geopoint3dOjbect;
    }
    if (SuperMap.Geometry.MultiLineString.isInstanceOfType(object))
    {
		if (object.components.length > 0)
		{
			var geoline3dOjbect = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateGeometry(SuperMap.Web.Core.GeometryType.GEOLINE3D);
			var pnt3DsObject = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreatePoint3Ds();
			var pnt3DObject = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreatePoint3D();

			for (var polycount = 0; polycount < object.components.length; polycount++)
			{
                var pnt2ds = object.components[polycount];
                pnt3DsObject.RemoveAll();
                for (var pntcount = 0; pntcount < pnt2ds.components.length; pntcount++)
                {
                    pnt3DObject.X = pnt2ds.components[pntcount].x;
                    pnt3DObject.Y = pnt2ds.components[pntcount].y;
                    pnt3DsObject.Add(pnt3DObject);
                }
                geoline3dOjbect.AddPart(pnt3DsObject);
            }
			return geoline3dOjbect;
		}
    }
    if (SuperMap.Geometry.Polygon.isInstanceOfType(object))
    {
		if (object.components.length > 0)
		{
			var georegion3dOjbect = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateGeometry(SuperMap.Web.Core.GeometryType.GEOREGION3D);
            var pnt3DsObject = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreatePoint3Ds();
            var pnt3DObject = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreatePoint3D();

			for (var polycount = 0; polycount < object.components.length; polycount++)
            {
                var pnt2ds = object.components[polycount];
                pnt3DsObject.RemoveAll();
                for (var pntcount = 0; pntcount < pnt2ds.components.length; pntcount++)
                {
                    pnt3DObject.X = pnt2ds.components[pntcount].x;
                    pnt3DObject.Y = pnt2ds.components[pntcount].y;
                    pnt3DsObject.Add(pnt3DObject);
                }
                georegion3dOjbect.AddPart(pnt3DsObject);
            }
            return georegion3dOjbect;
		}
    }

    if(SuperMap.Web.Core.GeoRegion3D.isInstanceOfType(object)){
        if (object.get_partCount() > 0)
        {
            var region3dInner = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateGeometry(SuperMap.Web.Core.GeometryType.GEOREGION3D);
            var pt3dsInner = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreatePoint3Ds();
            var pt3dInner = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreatePoint3D();
            for (var polycount = 0; polycount < object.get_partCount(); polycount++)
            {
                var pt3ds = object.getPart(polycount);
                pt3dsInner.RemoveAll();
                for (var pntcount = 0; pntcount < pt3ds.get_count(); pntcount++)
                {
                    var pt = pt3ds.get_item(pntcount);
                    pt3dInner.X = pt.x;
                    pt3dInner.Y = pt.y;
                    pt3dInner.Z = pt.z;
                    pt3dsInner.Add(pt3dInner);
                }
                region3dInner.AddPart(pt3dsInner);
            }
            return region3dInner;
        }
    }
    if(SuperMap.Web.Core.GeoBox.isInstanceOfType(object)){

        var boxinner = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateGeometry(SuperMap.Web.Core.GeometryType.GEOBOX);
        boxinner.Length = object.get_length();
        boxinner.Width = object.get_width();
        boxinner.Height = object.get_height();
        var pnt3DObject = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreatePoint3D();
        pnt3DObject.X = object.get_position().x;
        pnt3DObject.Y = object.get_position().y;
        pnt3DObject.Z = object.get_position().z;
        boxinner.Position = pnt3DObject;
        return boxinner;

    }
    if(SuperMap.Web.Core.GeoLine3D.isInstanceOfType(object)){
        if(object.get_partCount()>0){
            var geoline3dOjbect = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreateGeometry(SuperMap.Web.Core.GeometryType.GEOLINE3D);
            var pnt3DsObject = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreatePoint3Ds();
            var pnt3DObject = SuperMap.Web.Realspace.Utility._SceneControl._get_innerObjectManager().CreatePoint3D();
            for(var count=0;count<object.get_partCount();count++){
                var point3ds=object.getPart(count);
                pnt3DsObject.RemoveAll();
                for(var point3dcount=0;point3dcount<point3ds.get_count();point3dcount++){
                    pnt3DObject.X = point3ds.get_item(point3dcount).x;
                    pnt3DObject.Y =  point3ds.get_item(point3dcount).y;
                    pnt3DObject.Z =  point3ds.get_item(point3dcount).z;
                    pnt3DsObject.Add(pnt3DObject);
                }
                geoline3dOjbect.AddPart(pnt3DsObject);

            }
            return geoline3dOjbect;

        }

    }
    return null;
};

SuperMap.Web.Core.Conversion._isPoint2Ds = function(object)
{
    //判断参数是否为SuperMap.Web.Core.Point2D类型的数组
    var e = Function._validateParams(arguments, [{ name: "object", type: Array, elementType: SuperMap.LonLat}]);
    if (e) {
        return false;
    }
    else {
        return true;
    }
};

SuperMap.Web.Core.Conversion.ConvertColorsToRGBLong = function(colors)
{
    var longARGBs = new Array();
   var length = colors.length;
    for(var i=0; i<length; i++){
        if(SuperMap.Web.Core.Color.isInstanceOfType(colors[i])){
            longARGBs[i] =  (colors[i].get_alpha() << 24 | colors[i].get_blue() << 16) | (colors[i].get_green() << 8) | colors[i].get_red();
        }
    }
    return longARGBs;
};

SuperMap.Web.Core.Conversion.ConvertLongToColors = function(longColors)
{
    var colors = new Array();
    var length = longColors.length;
    for(var i=0; i<length; i++){
        if( !isNaN(longColors[i]) && (longColors[i]!== "") ){
             var tmpColor = new SuperMap.Web.Core.Color();
            tmpColor.set_alpha(255 & 0x00FF);
            tmpColor.set_blue( (longColors[i] >> 16) & 0x00FF);
            tmpColor.set_green( (longColors[i] >> 8) & 0x00FF);
            tmpColor.set_red( longColors[i] & 0x00FF);
            colors[i] = tmpColor;
        }
    }
    return colors;
};


//////////////////////////////////////////////
////COM对象转换为脚本对象
//////////////////////////////////////////////
SuperMap.Web.Core.Conversion._ConvertSRObject2Object = function(object,type)
{
    if("Point"==type)
    {
        var point = new SuperMap.Pixel(object.X, object.Y);
        return point;
    }
    if("Point2D"==type)
    {
        var point2D = new SuperMap.LonLat(object.X, object.Y);
        return point2D;
    }
    if("Point2Ds"==type)
    {
        var point2Ds = [];
        for (var i = 0; i < object.Count; i++)
        {
            var innerPoint2D = object.Item(i);
            var point2D = new SuperMap.LonLat(innerPoint2D.X, innerPoint2D.Y);
            point2Ds.push(point2D);
        }
        return point2Ds;
    }
    if("Point3D"==type)
    {
        var point3D = new SuperMap.Web.Core.Point3D(object.X, object.Y, object.Z);
        return point3D;
    }
    if("Rectangle2D"==type)
    {
		// 解决Ajax Rectangle2D对象对bounds检查
        var rectangle2D = new SuperMap.Bounds();
		rectangle2D.extend(new SuperMap.LonLat(object.Left, object.Bottom));
		rectangle2D.extend(new SuperMap.LonLat(object.Right, object.Top));
        return rectangle2D;
    }
    if("GeoLine3D"==type){
        var geoLine3d = new SuperMap.Web.Core.GeoLine3D();
        for(var i=0;i<object.PartCount;i++){
            var pt3ds = new SuperMap.Web.Core.Point3Ds();
            var part = object.GetPart(i);
            var ptCount = part.Count;
            for(var j=0;j<ptCount;j++){
                var ptInner = part.get_Item(j);
                var pt3d = new SuperMap.Web.Core.Point3D();
                pt3d.x = ptInner.X;
                pt3d.y = ptInner.Y;
                pt3d.z = ptInner.Z;
                pt3ds.add(pt3d);
            }
            geoLine3d.addPart(pt3ds);
        }
        return geoLine3d;
    }
    if("SceneServiceInfo"==type)
    {
        var sceneinfo = new SuperMap.Web.Realspace.SceneServiceInfo();
        sceneinfo.set_name(object.Name);
        sceneinfo.set_serverRootAddress(object.ServerRootAddress);
        return sceneinfo;
    }
    return null;
};

//////////////////////////////////////////////
////将COM对象包装为脚本对象
//////////////////////////////////////////////
SuperMap.Web.Core.Conversion._CreateObjectBySRObject = function(object,type)
{
    if("Point3Ds"==type)
    {
        var point3D = new SuperMap.Web.Core.Point3Ds();
        point3D._set_innerPoint3Ds(object);
        return point3D;
    }
    if("BoundingBox"==type)
    {
        var boundingBox = new SuperMap.Web.Core.BoundingBox();
        boundingBox._set_innerBoundingBox(object);
        return boundingBox;
    }
    if("Vector3D"==type)
    {
        var vector3D = new SuperMap.Web.Core.Vector3D();
        vector3D._set_innerVector3D(object);
        return vector3D;
    }
    if("TextPart3D"==type)
    {
        var textPart3D = new SuperMap.Web.Core.TextPart3D();
        textPart3D._set_innerTextPart3D(object);
        return textPart3D;
    }
    if("Geometry"==type)
    {
        var geometry3D = null;
        switch (object.Type)
        {
            case SuperMap.Web.Core.GeometryType.GEOPOINT3D:
                {
                    geometry3D = new SuperMap.Web.Core.GeoPoint3D();
                }
                break;
            case SuperMap.Web.Core.GeometryType.GEOLINE3D:
                {
                    geometry3D = new SuperMap.Web.Core.GeoLine3D();
                }
                break;
            case SuperMap.Web.Core.GeometryType.GEOREGION3D:
                {
                    geometry3D = new SuperMap.Web.Core.GeoRegion3D();
                }
                break;
            case SuperMap.Web.Core.GeometryType.GEOTEXT3D:
                {
                    geometry3D = new SuperMap.Web.Core.GeoText3D();
                }
                break;
            case SuperMap.Web.Core.GeometryType.GEOPLACEMARK:
                {
                    geometry3D = new SuperMap.Web.Core.GeoPlacemark();
                }
                break;
            case SuperMap.Web.Core.GeometryType.GEOPICTURE3D:
                {
                    geometry3D = new SuperMap.Web.Core.GeoPicture3D();
                }
                break;
            case SuperMap.Web.Core.GeometryType.GEOMODEL:
                {
                    geometry3D = new SuperMap.Web.Core.GeoModel();
                }
                break;
            case SuperMap.Web.Core.GeometryType.GEOMODELPRO:
                {
                    geometry3D = new SuperMap.Web.Core.GeoModel3D();
                }
            default:
                return null;
        }
            geometry3D._set_innerGeometry(object);
            return geometry3D;
    }
    if("Style3D"==type)
    {
        var style3d = new SuperMap.Web.Core.Style3D();
        style3d._set_innerStyle3D(object);
        return style3d;
    }
    if("Camera"==type)
    {
        var camera = new SuperMap.Web.Realspace.Camera();
        camera._set_innerCamera(object);
        return camera;
    }
    if("TextStyle3D"==type)
    {
        var textstyle3d = new SuperMap.Web.Core.TextStyle3D();
        textstyle3d._set_innerTextStyle3D(object);
        return textstyle3d;
    }
    if("Layer3D"==type)
    {
        var layer3D = new SuperMap.Web.Realspace.Layer3D("", "", "", -1, object);
        return layer3D;
    }
    if("Layer3DCustom"==type)
    {
        var layer3D = new SuperMap.Web.Realspace.Layer3DCustom("", null, object);
        return layer3D;
    }
    if("DownloadRequest"==type)
    {
        var request = new SuperMap.Web.Realspace.DownloadRequest(object);
        return request;
    }
	if("CacheConfigue"==type)
    {
        var cacheFile = new SuperMap.Web.Realspace.CacheConfigue(object);
        return cacheFile;
    }
    if ("Layer3DURLParam" == type) {
        var layer3DURLParam = new SuperMap.Web.Realspace.Layer3DURLParam(object);
        return layer3DURLParam;
    }
    if ("Volume3D" == type) {
        var volume3D = new SuperMap.Web.Realspace.Volume3D(object);
        return volume3D;
    }
    if ("Splitter" == type)
    {
        var splitter = new SuperMap.Web.Realspace.Splitter(object);
        return splitter;
    }
    return null;
};
