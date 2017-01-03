//========================================================================== 
// SuperMap Realspace 客户端程序，版权所有，北京超图软件股份有限公司，2000-2009。 
// 本程序只能在有效的授权许可下使用。未经许可，不得以任何手段擅自使用或传播。 
// 作者：			SuperMap WebClient Team 
// 修改：	 
// 文件名：			SuperMap.Web.iServerJava.Data3D.js  
// 功能：			 iServerJava Data3D服务主要是构建查询参数和查询结果的回调提取
// 最后修改时间：	2009-8-8
//========================================================================== 
//------------------------GetFeaturesBy**Service------------------------------------------------
Type.registerNamespace('SuperMap.Web.iServerJava.Data3D');

SuperMap.Web.iServerJava.Data3D.GetFeature3DsResult = function() {
	/// <summary>查询要素结果类</summary>
	
	 
		
};
SuperMap.Web.iServerJava.Data3D.GetFeature3DsResult.prototype = {

	convert:function(feature){
        var geoVector = feature.geometry;
        var geoType = geoVector.type;
		var id=feature.ID;
//POINT  LINE REGION 转化为三维可用
        switch (geoType){
            case "POINT3D":
                var geoPt = new SuperMap.Web.Core.GeoPoint3D();
                geoPt.set_x( geoVector.points[0].x);
                geoPt.set_y( geoVector.points[0].y)
                geoPt.set_z( geoVector.points[0].z);
				var feature3d = new SuperMap.Web.Core.Feature3D();
                feature3d.set_geometry(geoPt);
				
                return {feature3d:feature3d,id:id};
                break;
            case "LINE3D":
                var geoLine3d = new SuperMap.Web.Core.GeoLine3D();
                var pt3ds = new SuperMap.Web.Core.Point3Ds();
                var pt3d = new SuperMap.Web.Core.Point3D(0,0,0);
                for(var i=0;i<geoVector.points.length;i++){
                    pt3d.x = geoVector.points[i].x;
                    pt3d.y = geoVector.points[i].y;
					pt3d.z = geoVector.points[i].z;
                    pt3ds.add(pt3d);
                }
                geoLine3d.addPart(pt3ds);
				
                var feature3d = new SuperMap.Web.Core.Feature3D();
                feature3d.set_geometry(geoLine3d);
				
                return {feature3d:feature3d,id:id};
                break;
			 case "POINT":
                var geoPt = new SuperMap.Web.Core.GeoPoint3D();
                geoPt.set_x( geoVector.points[0].x);
                geoPt.set_y( geoVector.points[0].y)
                geoPt.set_z(0);
				
                var feature3d = new SuperMap.Web.Core.Feature3D();
                feature3d.set_geometry(geoPt);
				
                return {feature3d:feature3d,id:id};
                break;
            case "LINE":
                var geoLine3d = new SuperMap.Web.Core.GeoLine3D();
                var pt3ds = new SuperMap.Web.Core.Point3Ds();
                var pt3d = new SuperMap.Web.Core.Point3D(0,0,0);
                for(var i=0;i<geoVector.points.length;i++){
                    pt3d.x = geoVector.points[i].x;
                    pt3d.y = geoVector.points[i].y;
                    pt3ds.add(pt3d);
                }
                geoLine3d.addPart(pt3ds);
				
                var feature3d = new SuperMap.Web.Core.Feature3D();
                feature3d.set_geometry(geoLine3d);
				
                return {feature3d:feature3d,id:id};
                break;
            case "REGION":
                var geoRegion3d = new SuperMap.Web.Core.GeoRegion3D();
                var pt3ds = new SuperMap.Web.Core.Point3Ds();
                var pt3d = new SuperMap.Web.Core.Point3D(0,0,0);
                for(var i=0;i<geoVector.points.length;i++){
                    pt3d.x = geoVector.points[i].x;
                    pt3d.y = geoVector.points[i].y;
                    pt3ds.add(pt3d);
                }
                geoRegion3d.addPart(pt3ds);
				
                var feature3d = new SuperMap.Web.Core.Feature3D();
                feature3d.set_geometry(geoRegion3d);
				
                return {feature3d:feature3d,id:id};
                break;
            default :
                break;
        }
    }
};
SuperMap.Web.iServerJava.Data3D.GetFeature3DsResult.registerClass('SuperMap.Web.iServerJava.Data3D.GetFeature3DsResult');




